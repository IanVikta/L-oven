<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => (float) $this->price,
            'image_url' => $this->image_url,
            'prep_time_mins' => $this->prep_time_mins,
            'calories' => $this->calories,
            'is_available' => $this->is_available,
            'is_featured' => $this->is_featured,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'variants' => $this->whenLoaded('variants', function () {
                return $this->variants->map(function ($variant) {
                    return [
                        'id' => $variant->id,
                        'name' => $variant->name,
                        'price_modifier' => (float) $variant->price_modifier,
                        'is_default' => $variant->is_default,
                    ];
                });
            }),
        ];
    }
}
