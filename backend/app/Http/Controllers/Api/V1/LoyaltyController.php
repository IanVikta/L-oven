<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\RewardResource;
use App\Models\Reward;
use Illuminate\Http\JsonResponse;

class LoyaltyController extends Controller
{
    /**
     * List all active redeemable rewards.
     */
    public function rewards(): JsonResponse
    {
        $rewards = Reward::where('is_active', true)
            ->orderBy('points_required')
            ->get();

        return response()->json([
            'rewards' => RewardResource::collection($rewards),
        ]);
    }
}
