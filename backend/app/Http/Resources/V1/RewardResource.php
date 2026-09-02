<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RewardResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'points_required' => $this->points_required,
            'discount_type' => $this->discount_type,
            'discount_value' => (float) $this->discount_value,
            'product_id' => $this->product_id,
            'is_active' => $this->is_active,
        ];
    }
}
