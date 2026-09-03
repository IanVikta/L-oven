<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\OrderResource;
use App\Models\DeliveryDetail;
use App\Models\DineInDetail;
use App\Models\LoyaltyAccount;
use App\Models\LoyaltyTransaction;
use App\Models\OptionItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderItemOption;
use App\Models\OrderStatusHistory;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\TakeawayDetail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Store a new order (Supports Dine-In, Takeaway, Delivery).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'fulfilment_type' => ['required', 'in:dine_in,takeaway,delivery'],
            'customer_notes' => ['nullable', 'string', 'max:500'],
            'payment_method' => ['nullable', 'in:cash,mpesa,card,apple_pay,google_pay'],

            // Dine-in fields
            'table_number' => ['required_if:fulfilment_type,dine_in', 'nullable', 'string', 'max:30'],
            'guest_count' => ['nullable', 'integer', 'min:1'],

            // Takeaway fields
            'requested_pickup_at' => ['nullable', 'date'],
            'vehicle_description' => ['nullable', 'string', 'max:100'],

            // Delivery fields
            'recipient_name' => ['required_if:fulfilment_type,delivery', 'nullable', 'string', 'max:191'],
            'recipient_phone' => ['required_if:fulfilment_type,delivery', 'nullable', 'string', 'max:50'],
            'street_address' => ['required_if:fulfilment_type,delivery', 'nullable', 'string'],
            'city' => ['required_if:fulfilment_type,delivery', 'nullable', 'string', 'max:100'],
            'delivery_instructions' => ['nullable', 'string'],

            // Items array
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'exists:products,id'],
            'items.*.product_variant_id' => ['nullable', 'exists:product_variants,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.item_notes' => ['nullable', 'string', 'max:255'],
            'items.*.options' => ['nullable', 'array'],
            'items.*.options.*' => ['exists:option_items,id'],
        ]);

        $user = $request->user();
        $orderNumber = 'LOV-' . date('Ymd') . '-' . strtoupper(Str::random(4));

        $order = DB::transaction(function () use ($validated, $user, $orderNumber) {
            $subtotal = 0.00;
            $itemsData = [];

            // 1. Process Order Line Items and calculate totals
            foreach ($validated['items'] as $itemInput) {
                $product = Product::findOrFail($itemInput['product_id']);
                $variant = isset($itemInput['product_variant_id'])
                    ? ProductVariant::find($itemInput['product_variant_id'])
                    : null;

                $baseUnitPrice = (float) $product->price;
                $variantModifier = $variant ? (float) $variant->price_modifier : 0.00;
                $unitPrice = $baseUnitPrice + $variantModifier;

                $optionsTotal = 0.00;
                $optionsToSave = [];

                if (!empty($itemInput['options'])) {
                    $optionItems = OptionItem::with('group')->whereIn('id', $itemInput['options'])->get();
                    foreach ($optionItems as $optItem) {
                        $priceMod = (float) $optItem->price_modifier;
                        $optionsTotal += $priceMod;
                        $optionsToSave[] = [
                            'option_item_id' => $optItem->id,
                            'option_group_name' => $optItem->group ? $optItem->group->name : 'Customization',
                            'option_item_name' => $optItem->name,
                            'price_modifier' => $priceMod,
                        ];
                    }
                }

                $quantity = (int) $itemInput['quantity'];
                $itemLineTotal = ($unitPrice + $optionsTotal) * $quantity;
                $subtotal += $itemLineTotal;

                $itemsData[] = [
                    'product_id' => $product->id,
                    'product_variant_id' => $variant ? $variant->id : null,
                    'product_name' => $product->name,
                    'variant_name' => $variant ? $variant->name : null,
                    'unit_price' => $unitPrice,
                    'quantity' => $quantity,
                    'line_total' => $itemLineTotal,
                    'item_notes' => $itemInput['item_notes'] ?? null,
                    'options' => $optionsToSave,
                ];
            }

            // 2. Fees & Totals (Tax calculation disabled for now)
            $taxAmount = 0.00;
            $deliveryFee = $validated['fulfilment_type'] === 'delivery' ? 3.00 : 0.00;
            $discountAmount = 0.00;
            $totalAmount = round($subtotal + $deliveryFee - $discountAmount, 2);

            // 3. Create Master Order
            $order = Order::create([
                'order_number' => $orderNumber,
                'user_id' => $user ? $user->id : null,
                'fulfilment_type' => $validated['fulfilment_type'],
                'status' => 'pending',
                'payment_status' => 'unpaid',
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'delivery_fee' => $deliveryFee,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'customer_notes' => $validated['customer_notes'] ?? null,
            ]);

            // 4. Create Fulfilment Extended Details
            if ($validated['fulfilment_type'] === 'dine_in') {
                DineInDetail::create([
                    'order_id' => $order->id,
                    'table_number' => $validated['table_number'],
                    'guest_count' => $validated['guest_count'] ?? 1,
                ]);
            } elseif ($validated['fulfilment_type'] === 'takeaway') {
                TakeawayDetail::create([
                    'order_id' => $order->id,
                    'requested_pickup_at' => $validated['requested_pickup_at'] ?? null,
                    'vehicle_description' => $validated['vehicle_description'] ?? null,
                ]);
            } elseif ($validated['fulfilment_type'] === 'delivery') {
                DeliveryDetail::create([
                    'order_id' => $order->id,
                    'recipient_name' => $validated['recipient_name'],
                    'recipient_phone' => $validated['recipient_phone'],
                    'street_address' => $validated['street_address'],
                    'city' => $validated['city'],
                    'delivery_instructions' => $validated['delivery_instructions'] ?? null,
                    'estimated_delivery_at' => now()->addMinutes(35),
                ]);
            }

            // 5. Create Order Items & Options
            foreach ($itemsData as $itemData) {
                $orderItem = OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $itemData['product_id'],
                    'product_variant_id' => $itemData['product_variant_id'],
                    'product_name' => $itemData['product_name'],
                    'variant_name' => $itemData['variant_name'],
                    'unit_price' => $itemData['unit_price'],
                    'quantity' => $itemData['quantity'],
                    'line_total' => $itemData['line_total'],
                    'item_notes' => $itemData['item_notes'],
                ]);

                foreach ($itemData['options'] as $opt) {
                    OrderItemOption::create([
                        'order_item_id' => $orderItem->id,
                        'option_item_id' => $opt['option_item_id'],
                        'option_group_name' => $opt['option_group_name'],
                        'option_item_name' => $opt['option_item_name'],
                        'price_modifier' => $opt['price_modifier'],
                    ]);
                }
            }

            // 6. Initial Status History
            OrderStatusHistory::create([
                'order_id' => $order->id,
                'status' => 'pending',
                'notes' => 'Order submitted successfully',
            ]);

            // 7. Award Loyalty Points if logged in
            if ($user) {
                $pointsEarned = (int) floor($totalAmount);
                if ($pointsEarned > 0) {
                    $account = LoyaltyAccount::firstOrCreate(
                        ['user_id' => $user->id],
                        ['current_points' => 0, 'lifetime_points' => 0, 'tier' => 'bronze']
                    );

                    $account->current_points += $pointsEarned;
                    $account->lifetime_points += $pointsEarned;

                    // Calculate Tier Progression
                    if ($account->lifetime_points >= 1000) {
                        $account->tier = 'platinum';
                    } elseif ($account->lifetime_points >= 500) {
                        $account->tier = 'gold';
                    } elseif ($account->lifetime_points >= 200) {
                        $account->tier = 'silver';
                    }
                    $account->save();

                    LoyaltyTransaction::create([
                        'user_id' => $user->id,
                        'order_id' => $order->id,
                        'transaction_type' => 'earned',
                        'points' => $pointsEarned,
                        'balance_after' => $account->current_points,
                        'description' => "Earned {$pointsEarned} points for order #{$order->order_number}",
                    ]);
                }
            }

            return $order;
        });

        $order->load([
            'items.options',
            'dineInDetail',
            'takeawayDetail',
            'deliveryDetail',
            'statusHistory',
        ]);

        return response()->json([
            'message' => 'Order placed successfully!',
            'order' => new OrderResource($order),
        ], 201);
    }

    /**
     * Display authenticated customer's order history.
     */
    public function index(Request $request): JsonResponse
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with(['items.options', 'dineInDetail', 'takeawayDetail', 'deliveryDetail', 'statusHistory'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'orders' => OrderResource::collection($orders),
        ]);
    }

    /**
     * Display live tracking details for a specific order number.
     */
    public function show(string $orderNumber): JsonResponse
    {
        $order = Order::where('order_number', $orderNumber)
            ->with(['items.options', 'dineInDetail', 'takeawayDetail', 'deliveryDetail', 'statusHistory'])
            ->firstOrFail();

        return response()->json([
            'order' => new OrderResource($order),
        ]);
    }
}
