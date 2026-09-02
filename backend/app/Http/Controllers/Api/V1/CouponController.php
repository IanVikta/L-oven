<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    /**
     * Validate coupon code and return calculated discount.
     */
    public function validateCoupon(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:50'],
            'subtotal' => ['required', 'numeric', 'min:0'],
        ]);

        $code = strtoupper(trim($validated['code']));
        $subtotal = (float) $validated['subtotal'];

        $coupon = Coupon::where('code', $code)
            ->where('is_active', true)
            ->first();

        if (!$coupon) {
            return response()->json([
                'message' => 'Invalid or expired promo code.',
            ], 422);
        }

        // Check expiration
        if ($coupon->starts_at && now()->lt($coupon->starts_at)) {
            return response()->json(['message' => 'This promo code is not active yet.'], 422);
        }

        if ($coupon->expires_at && now()->gt($coupon->expires_at)) {
            return response()->json(['message' => 'This promo code has expired.'], 422);
        }

        // Check usage limit
        if ($coupon->usage_limit && $coupon->used_count >= $coupon->usage_limit) {
            return response()->json(['message' => 'This promo code has reached its maximum usage limit.'], 422);
        }

        // Check minimum spend
        if ($subtotal < (float) $coupon->min_order_amount) {
            return response()->json([
                'message' => "Minimum order amount of $" . number_format($coupon->min_order_amount, 2) . " required for this coupon.",
            ], 422);
        }

        // Calculate discount
        $discount = 0.00;
        if ($coupon->discount_type === 'percentage') {
            $discount = round(($subtotal * (float) $coupon->discount_value) / 100, 2);
            if ($coupon->max_discount_amount && $discount > (float) $coupon->max_discount_amount) {
                $discount = (float) $coupon->max_discount_amount;
            }
        } elseif ($coupon->discount_type === 'fixed_amount') {
            $discount = (float) $coupon->discount_value;
        }

        if ($discount > $subtotal) {
            $discount = $subtotal;
        }

        return response()->json([
            'message' => 'Promo code applied successfully!',
            'coupon' => [
                'id' => $coupon->id,
                'code' => $coupon->code,
                'discount_type' => $coupon->discount_type,
                'discount_value' => (float) $coupon->discount_value,
                'discount_amount' => $discount,
            ],
        ]);
    }
}
