<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display product reviews and ratings summary.
     */
    public function index(int $productId): JsonResponse
    {
        $reviews = Review::where('product_id', $productId)
            ->with('user:id,name,avatar_url')
            ->orderBy('created_at', 'desc')
            ->get();

        $avgRating = $reviews->avg('rating') ?: 0.0;

        return response()->json([
            'average_rating' => round($avgRating, 1),
            'total_reviews' => $reviews->count(),
            'reviews' => $reviews->map(function ($rev) {
                return [
                    'id' => $rev->id,
                    'user_name' => $rev->user ? $rev->user->name : 'Anonymous Customer',
                    'rating' => $rev->rating,
                    'comment' => $rev->comment,
                    'created_at' => $rev->created_at?->toIso8601String(),
                ];
            }),
        ]);
    }

    /**
     * Store customer review and rating.
     */
    public function store(Request $request, int $productId): JsonResponse
    {
        $product = Product::findOrFail($productId);

        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ]);

        $review = Review::create([
            'user_id' => $request->user()->id,
            'product_id' => $product->id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
            'created_at' => now(),
        ]);

        return response()->json([
            'message' => 'Thank you for your review!',
            'review' => [
                'id' => $review->id,
                'user_name' => $request->user()->name,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'created_at' => $review->created_at?->toIso8601String(),
            ],
        ], 201);
    }
}
