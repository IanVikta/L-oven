<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\OptionGroup;
use App\Models\OptionItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_dine_in_order_with_loyalty_points(): void
    {
        $category = Category::create([
            'name' => 'Coffee',
            'slug' => 'coffee-' . rand(100, 999),
            'display_order' => 1,
            'is_active' => true,
        ]);

        $product = Product::create([
            'category_id' => $category->id,
            'name' => 'Signature Espresso',
            'slug' => 'espresso-' . rand(100, 999),
            'price' => 4.50,
            'is_available' => true,
        ]);

        $user = User::create([
            'name' => 'Alice Customer',
            'email' => 'alice' . rand(100, 999) . '@example.com',
            'password' => bcrypt('password123'),
            'role' => 'customer',
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/orders', [
                'fulfilment_type' => 'dine_in',
                'table_number' => 'T-05',
                'guest_count' => 2,
                'customer_notes' => 'Extra hot',
                'items' => [
                    [
                        'product_id' => $product->id,
                        'quantity' => 2,
                    ]
                ]
            ]);

        $response->assertStatus(201)
            ->assertJsonPath('order.fulfilment_type', 'dine_in')
            ->assertJsonPath('order.dine_in.table_number', 'T-05');

        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'fulfilment_type' => 'dine_in',
            'status' => 'pending',
        ]);

        $this->assertDatabaseHas('loyalty_accounts', [
            'user_id' => $user->id,
            'tier' => 'bronze',
        ]);
    }
}
