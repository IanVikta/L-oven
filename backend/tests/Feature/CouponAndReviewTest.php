<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Coupon;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CouponAndReviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_validate_coupon_code_with_minimum_spend(): void
    {
        Coupon::create([
            'code' => 'LOVEN10',
            'discount_type' => 'percentage',
            'discount_value' => 10.00,
            'min_order_amount' => 15.00,
            'is_active' => true,
        ]);

        // Attempting below min spend
        $failResponse = $this->postJson('/api/v1/coupons/validate', [
            'code' => 'LOVEN10',
            'subtotal' => 10.00,
        ]);

        $failResponse->assertStatus(422)
            ->assertJsonPath('message', 'Minimum order amount of $15.00 required for this coupon.');

        // Valid subtotal
        $successResponse = $this->postJson('/api/v1/coupons/validate', [
            'code' => 'LOVEN10',
            'subtotal' => 20.00,
        ]);

        $successResponse->assertStatus(200)
            ->assertJsonPath('coupon.code', 'LOVEN10')
            ->assertJsonPath('coupon.discount_amount', 2);
    }

    public function test_authenticated_user_can_submit_product_review(): void
    {
        $category = Category::create([
            'name' => 'Pastries',
            'slug' => 'pastries-' . rand(100, 999),
            'display_order' => 1,
            'is_active' => true,
        ]);

        $product = Product::create([
            'category_id' => $category->id,
            'name' => 'Butter Croissant',
            'slug' => 'croissant-' . rand(100, 999),
            'price' => 3.75,
            'is_available' => true,
        ]);

        $user = User::create([
            'name' => 'Bob Reviewer',
            'email' => 'bob' . rand(100, 999) . '@example.com',
            'password' => bcrypt('password123'),
            'role' => 'customer',
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson("/api/v1/products/{$product->id}/reviews", [
                'rating' => 5,
                'comment' => 'Flaky, buttery, and melt in your mouth!',
            ]);

        $response->assertStatus(201)
            ->assertJsonPath('review.rating', 5)
            ->assertJsonPath('review.comment', 'Flaky, buttery, and melt in your mouth!');

        $this->assertDatabaseHas('reviews', [
            'user_id' => $user->id,
            'product_id' => $product->id,
            'rating' => 5,
        ]);

        // Get reviews list
        $listResponse = $this->getJson("/api/v1/products/{$product->id}/reviews");
        $listResponse->assertStatus(200)
            ->assertJsonPath('average_rating', 5)
            ->assertJsonPath('total_reviews', 1);
    }
}
