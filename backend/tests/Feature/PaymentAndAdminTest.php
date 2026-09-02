<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaymentAndAdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_initiate_mobile_money_payment_and_receive_callback(): void
    {
        $category = Category::create([
            'name' => 'Brews',
            'slug' => 'brews-' . rand(100, 999),
            'display_order' => 1,
            'is_active' => true,
        ]);

        $product = Product::create([
            'category_id' => $category->id,
            'name' => 'Cold Brew',
            'slug' => 'cold-brew-' . rand(100, 999),
            'price' => 4.95,
            'is_available' => true,
        ]);

        $order = Order::create([
            'order_number' => 'LOV-TEST-999',
            'fulfilment_type' => 'takeaway',
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'subtotal' => 4.95,
            'tax_amount' => 0.40,
            'delivery_fee' => 0.00,
            'discount_amount' => 0.00,
            'total_amount' => 5.35,
        ]);

        // Initiate payment
        $initiateResponse = $this->postJson('/api/v1/payments/initiate', [
            'order_number' => $order->order_number,
            'provider' => 'mtn',
            'phone_number' => '+256770000000',
        ]);

        $initiateResponse->assertStatus(200)
            ->assertJsonPath('payment.status', 'pending');

        $reference = $initiateResponse->json('payment.transaction_reference');

        // Callback simulation
        $callbackResponse = $this->postJson('/api/v1/payments/callback', [
            'transaction_reference' => $reference,
            'status' => 'success',
        ]);

        $callbackResponse->assertStatus(200)
            ->assertJsonPath('payment_status', 'completed')
            ->assertJsonPath('order_payment_status', 'paid');

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'payment_status' => 'paid',
        ]);
    }

    public function test_staff_can_advance_order_status(): void
    {
        $staff = User::create([
            'name' => 'Kitchen Chef',
            'email' => 'chef' . rand(100, 999) . '@loven.coffee',
            'password' => bcrypt('password123'),
            'role' => 'kitchen',
        ]);

        $order = Order::create([
            'order_number' => 'LOV-TEST-888',
            'fulfilment_type' => 'dine_in',
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'subtotal' => 10.00,
            'tax_amount' => 0.80,
            'delivery_fee' => 0.00,
            'discount_amount' => 0.00,
            'total_amount' => 10.80,
        ]);

        $response = $this->actingAs($staff, 'sanctum')
            ->patchJson("/api/v1/admin/orders/{$order->id}/status", [
                'status' => 'preparing',
                'notes' => 'Started espresso extraction',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('order.status', 'preparing');

        $this->assertDatabaseHas('order_status_history', [
            'order_id' => $order->id,
            'status' => 'preparing',
            'changed_by' => $staff->id,
        ]);
    }
}
