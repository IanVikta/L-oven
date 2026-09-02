<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_number' => $this->order_number,
            'fulfilment_type' => $this->fulfilment_type,
            'status' => $this->status,
            'payment_status' => $this->payment_status,
            'subtotal' => (float) $this->subtotal,
            'tax_amount' => (float) $this->tax_amount,
            'delivery_fee' => (float) $this->delivery_fee,
            'discount_amount' => (float) $this->discount_amount,
            'total_amount' => (float) $this->total_amount,
            'customer_notes' => $this->customer_notes,
            'cancellation_reason' => $this->cancellation_reason,
            'created_at' => $this->created_at?->toIso8601String(),
            
            // Fulfilment Details
            'dine_in' => $this->whenLoaded('dineInDetail', function () {
                return [
                    'table_number' => $this->dineInDetail->table_number,
                    'guest_count' => $this->dineInDetail->guest_count,
                ];
            }),
            'takeaway' => $this->whenLoaded('takeawayDetail', function () {
                return [
                    'requested_pickup_at' => $this->takeawayDetail->requested_pickup_at?->toIso8601String(),
                    'vehicle_description' => $this->takeawayDetail->vehicle_description,
                ];
            }),
            'delivery' => $this->whenLoaded('deliveryDetail', function () {
                return [
                    'recipient_name' => $this->deliveryDetail->recipient_name,
                    'recipient_phone' => $this->deliveryDetail->recipient_phone,
                    'street_address' => $this->deliveryDetail->street_address,
                    'city' => $this->deliveryDetail->city,
                    'delivery_instructions' => $this->deliveryDetail->delivery_instructions,
                    'estimated_delivery_at' => $this->deliveryDetail->estimated_delivery_at?->toIso8601String(),
                    'delivered_at' => $this->deliveryDetail->delivered_at?->toIso8601String(),
                ];
            }),

            // Items
            'items' => $this->whenLoaded('items', function () {
                return $this->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_id' => $item->product_id,
                        'product_name' => $item->product_name,
                        'variant_name' => $item->variant_name,
                        'unit_price' => (float) $item->unit_price,
                        'quantity' => $item->quantity,
                        'line_total' => (float) $item->line_total,
                        'item_notes' => $item->item_notes,
                        'options' => $item->options->map(function ($opt) {
                            return [
                                'group' => $opt->option_group_name,
                                'item' => $opt->option_item_name,
                                'price_modifier' => (float) $opt->price_modifier,
                            ];
                        }),
                    ];
                });
            }),

            // Status Timeline
            'status_history' => $this->whenLoaded('statusHistory', function () {
                return $this->statusHistory->map(function ($history) {
                    return [
                        'status' => $history->status,
                        'notes' => $history->notes,
                        'timestamp' => $history->created_at?->toIso8601String(),
                    ];
                });
            }),
        ];
    }
}
