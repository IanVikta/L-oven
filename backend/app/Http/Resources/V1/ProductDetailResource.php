<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductDetailResource extends JsonResource
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
            'option_groups' => $this->whenLoaded('optionGroups', function () {
                return $this->optionGroups->map(function ($group) {
                    return [
                        'id' => $group->id,
                        'name' => $group->name,
                        'description' => $group->description,
                        'is_required' => $group->is_required,
                        'min_selectable' => $group->min_selectable,
                        'max_selectable' => $group->max_selectable,
                        'items' => $group->items->where('is_available', true)->map(function ($item) {
                            return [
                                'id' => $item->id,
                                'name' => $item->name,
                                'price_modifier' => (float) $item->price_modifier,
                            ];
                        })->values(),
                    ];
                });
            }),
        ];
    }
}
