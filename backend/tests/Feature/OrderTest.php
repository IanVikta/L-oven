<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\OptionGroup;
use App\Models\OptionItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    private function createFullProductContext(): array
    {
        $category = Category::create([
            'name' => 'Coffee',
            'slug' => 'coffee-' . rand(100, 999),
            'display_order' => 1,
            'is_active' => true,
        ]);

        $productA = Product::create([
            'category_id' => $category->id,
            'name' => "L'Oven Signature Latte",
            'slug' => 'latte-' . rand(100, 999),
            'price' => 4.50,
            'is_available' => true,
        ]);

        $productB = Product::create([
            'category_id' => $category->id,
            'name' => 'Butter Croissant',
            'slug' => 'croissant-' . rand(100, 999),
            'price' => 3.75,
            'is_available' => true,
        ]);

        $variantA = ProductVariant::create([
            'product_id' => $productA->id,
            'name' => 'Large 16oz',
            'price_modifier' => 1.50,
            'is_default' => false,
        ]);

        $variantB = ProductVariant::create([
            'product_id' => $productB->id,
            'name' => 'Toasted with Butter',
            'price_modifier' => 0.50,
            'is_default' => false,
        ]);

        $optionGroupA = OptionGroup::create([
            'name' => 'Milk Choice',
            'is_required' => false,
            'max_selectable' => 1,
        ]);
        $productA->optionGroups()->attach($optionGroupA->id, ['display_order' => 1]);

        $optionItemA = OptionItem::create([
            'option_group_id' => $optionGroupA->id,
            'name' => 'Oat Milk',
            'price_modifier' => 0.75,
            'display_order' => 1,
        ]);

        $optionGroupB = OptionGroup::create([
            'name' => 'Jam Selection',
            'is_required' => false,
            'max_selectable' => 1,
        ]);
        $productB->optionGroups()->attach($optionGroupB->id, ['display_order' => 1]);

        $optionItemB = OptionItem::create([
            'option_group_id' => $optionGroupB->id,
            'name' => 'Strawberry Jam',
            'price_modifier' => 0.60,
            'display_order' => 1,
        ]);

        $user = User::create([
            'name' => 'Alice Customer',
            'email' => 'alice' . rand(100, 999) . '@example.com',
            'password' => bcrypt('password123'),
            'role' => 'customer',
        ]);

        return [
            'productA' => $productA,
            'productB' => $productB,
            'variantA' => $variantA,
            'variantB' => $variantB,
            'optionItemA' => $optionItemA,
            'optionItemB' => $optionItemB,
            'user' => $user,
        ];
    }

    /**
     * 1. Unfinalized order creates ZERO records.
     */
    public function test_unfinalized_order_is_rejected_and_creates_zero_records(): void
    {
        config(['loven.pricing_finalized' => false]);
        $ctx = $this->createFullProductContext();

        $response = $this->actingAs($ctx['user'], 'sanctum')
            ->postJson('/api/v1/orders', [
                'fulfilment_type' => 'dine_in',
                'table_number' => 'T-01',
                'items' => [
                    [
                        'product_id' => $ctx['productA']->id,
                        'quantity' => 2,
                    ]
                ]
            ]);

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'Ordering is temporarily unavailable while menu pricing is being finalized.',
            ]);

        $this->assertDatabaseCount('orders', 0);
        $this->assertDatabaseCount('order_items', 0);
        $this->assertDatabaseCount('dine_in_details', 0);
    }

    /**
     * 2. Finalized valid order succeeds with exact calculation:
     *    (product.price + variant.price_modifier + option.price_modifier) * quantity.
     */
    public function test_finalized_valid_order_calculates_price_variant_option_multiplied_by_quantity(): void
    {
        config(['loven.pricing_finalized' => true]);
        $ctx = $this->createFullProductContext();

        // Product A (4.50) + Variant A (1.50) + Option A (0.75) = 6.75 unit price
        // Quantity 2 = 13.50 line total
        $response = $this->actingAs($ctx['user'], 'sanctum')
            ->postJson('/api/v1/orders', [
                'fulfilment_type' => 'dine_in',
                'table_number' => 'T-05',
                'guest_count' => 2,
                'items' => [
                    [
                        'product_id' => $ctx['productA']->id,
                        'product_variant_id' => $ctx['variantA']->id,
                        'options' => [$ctx['optionItemA']->id],
                        'quantity' => 2,
                    ]
                ]
            ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('orders', [
            'user_id' => $ctx['user']->id,
            'fulfilment_type' => 'dine_in',
            'subtotal' => 13.50,
            'tax_amount' => 0.00,
            'delivery_fee' => 0.00,
            'total_amount' => 13.50,
        ]);

        $this->assertDatabaseHas('order_items', [
            'product_name' => "L'Oven Signature Latte",
            'variant_name' => 'Large 16oz',
            'unit_price' => 6.00, // 4.50 base + 1.50 variant
            'quantity' => 2,
            'line_total' => 13.50, // (6.00 + 0.75 options) * 2
        ]);

        $this->assertDatabaseHas('order_item_options', [
            'option_item_name' => 'Oat Milk',
            'price_modifier' => 0.75,
        ]);
    }

    /**
     * 3. Unavailable/sold out product is rejected.
     */
    public function test_order_rejected_when_product_is_unavailable(): void
    {
        config(['loven.pricing_finalized' => true]);
        $ctx = $this->createFullProductContext();

        $ctx['productA']->update(['is_available' => false]);

        $response = $this->actingAs($ctx['user'], 'sanctum')
            ->postJson('/api/v1/orders', [
                'fulfilment_type' => 'takeaway',
                'items' => [
                    [
                        'product_id' => $ctx['productA']->id,
                        'quantity' => 1,
                    ]
                ]
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['items']);

        $this->assertDatabaseCount('orders', 0);
    }

    /**
     * 4. Invalid variant/product relationship is rejected.
     */
    public function test_order_rejected_when_variant_does_not_belong_to_product(): void
    {
        config(['loven.pricing_finalized' => true]);
        $ctx = $this->createFullProductContext();

        // Product A with Variant B (which belongs to Product B)
        $response = $this->actingAs($ctx['user'], 'sanctum')
            ->postJson('/api/v1/orders', [
                'fulfilment_type' => 'dine_in',
                'table_number' => 'T-01',
                'items' => [
                    [
                        'product_id' => $ctx['productA']->id,
                        'product_variant_id' => $ctx['variantB']->id, // Belongs to Product B!
                        'quantity' => 1,
                    ]
                ]
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['items']);

        $this->assertDatabaseCount('orders', 0);
    }

    /**
     * 5. Invalid option/product relationship is rejected.
     */
    public function test_order_rejected_when_option_does_not_belong_to_product(): void
    {
        config(['loven.pricing_finalized' => true]);
        $ctx = $this->createFullProductContext();

        // Product A with Option B (Jam, which is attached only to Product B)
        $response = $this->actingAs($ctx['user'], 'sanctum')
            ->postJson('/api/v1/orders', [
                'fulfilment_type' => 'dine_in',
                'table_number' => 'T-01',
                'items' => [
                    [
                        'product_id' => $ctx['productA']->id,
                        'options' => [$ctx['optionItemB']->id], // Option B belongs to Product B!
                        'quantity' => 1,
                    ]
                ]
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['items']);

        $this->assertDatabaseCount('orders', 0);
    }

    /**
     * 6. Client price, discount, tax, delivery, and total manipulation are ignored.
     */
    public function test_client_monetary_manipulation_is_completely_ignored(): void
    {
        config(['loven.pricing_finalized' => true]);
        $ctx = $this->createFullProductContext();

        $maliciousPayload = [
            'fulfilment_type' => 'dine_in',
            'table_number' => 'T-99',
            // Tampered root amounts:
            'subtotal' => 0.01,
            'discount_amount' => 99.00,
            'tax_amount' => 50.00,
            'delivery_fee' => 0.01,
            'total_amount' => 0.01,
            'items' => [
                [
                    'product_id' => $ctx['productA']->id,
                    'quantity' => 2, // 4.50 * 2 = 9.00
                    // Tampered line item amounts:
                    'price' => 0.01,
                    'unit_price' => 0.01,
                    'line_total' => 0.02,
                ]
            ]
        ];

        $response = $this->actingAs($ctx['user'], 'sanctum')->postJson('/api/v1/orders', $maliciousPayload);

        $response->assertStatus(201);

        // Server calculation must prevail (2 * 4.50 = 9.00, 0 tax, 0 delivery)
        $this->assertDatabaseHas('orders', [
            'user_id' => $ctx['user']->id,
            'subtotal' => 9.00,
            'tax_amount' => 0.00,
            'delivery_fee' => 0.00,
            'discount_amount' => 0.00,
            'total_amount' => 9.00,
        ]);
    }

    /**
     * 7. Server delivery fee configuration is authoritative.
     */
    public function test_delivery_fee_is_server_controlled_from_config(): void
    {
        config(['loven.pricing_finalized' => true]);
        config(['loven.default_delivery_fee' => 3.00]);
        $ctx = $this->createFullProductContext();

        $response = $this->actingAs($ctx['user'], 'sanctum')
            ->postJson('/api/v1/orders', [
                'fulfilment_type' => 'delivery',
                'recipient_name' => 'Jane Doe',
                'recipient_phone' => '+256770000000',
                'street_address' => 'Entebbe Road, Kitende',
                'city' => 'Kampala',
                // Client tries to declare 0 delivery fee:
                'delivery_fee' => 0.00,
                'items' => [
                    [
                        'product_id' => $ctx['productA']->id,
                        'quantity' => 1, // 4.50
                    ]
                ]
            ]);

        $response->assertStatus(201);

        // Server must enforce 3.00 from config (4.50 + 3.00 = 7.50)
        $this->assertDatabaseHas('orders', [
            'fulfilment_type' => 'delivery',
            'subtotal' => 4.50,
            'delivery_fee' => 3.00,
            'tax_amount' => 0.00,
            'total_amount' => 7.50,
        ]);
    }
}
