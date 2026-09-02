<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role,
            'avatar_url' => $this->avatar_url,
            'loyalty' => $this->whenLoaded('loyaltyAccount', function () {
                return [
                    'current_points' => $this->loyaltyAccount->current_points ?? 0,
                    'lifetime_points' => $this->loyaltyAccount->lifetime_points ?? 0,
                    'tier' => $this->loyaltyAccount->tier ?? 'bronze',
                ];
            }),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
