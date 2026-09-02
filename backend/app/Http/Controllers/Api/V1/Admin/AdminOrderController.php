<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\OrderResource;
use App\Models\Order;
use App\Models\OrderStatusHistory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    /**
     * Display live stream of orders for staff/kitchen dashboard.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Order::with(['items.options', 'dineInDetail', 'takeawayDetail', 'deliveryDetail', 'statusHistory', 'user']);

        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        if ($request->has('fulfilment_type') && !empty($request->fulfilment_type)) {
            $query->where('fulfilment_type', $request->fulfilment_type);
        }

        $orders = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'orders' => OrderResource::collection($orders),
        ]);
    }

    /**
     * Update order status (e.g. pending -> confirmed -> preparing -> ready -> completed).
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,confirmed,preparing,ready,out_for_delivery,completed,cancelled'],
            'notes' => ['nullable', 'string', 'max:255'],
            'payment_status' => ['nullable', 'in:unpaid,paid,refunded'],
        ]);

        $order = Order::findOrFail($id);
        $order->status = $validated['status'];

        if (!empty($validated['payment_status'])) {
            $order->payment_status = $validated['payment_status'];
        }

        $order->save();

        // Audit status transition
        OrderStatusHistory::create([
            'order_id' => $order->id,
            'status' => $validated['status'],
            'changed_by' => $request->user()->id,
            'notes' => $validated['notes'] ?? "Status updated to {$validated['status']}",
        ]);

        $order->load(['items.options', 'dineInDetail', 'takeawayDetail', 'deliveryDetail', 'statusHistory']);

        return response()->json([
            'message' => "Order status updated to {$validated['status']}",
            'order' => new OrderResource($order),
        ]);
    }
}
