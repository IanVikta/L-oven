<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('loyalty_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->onDelete('cascade');
            $table->unsignedInteger('current_points')->default(0);
            $table->unsignedInteger('lifetime_points')->default(0);
            $table->enum('tier', ['bronze', 'silver', 'gold', 'platinum'])->default('bronze');
            $table->timestamps();
        });

        Schema::create('rewards', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedInteger('points_required');
            $table->enum('discount_type', ['free_product', 'fixed_amount', 'percentage']);
            $table->decimal('discount_value', 10, 2)->default(0.00);
            $table->foreignId('product_id')->nullable()->constrained('products')->onDelete('set null');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('loyalty_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('order_id')->nullable()->constrained('orders')->onDelete('set null');
            $table->foreignId('reward_id')->nullable()->constrained('rewards')->onDelete('set null');
            $table->enum('transaction_type', ['earned', 'redeemed', 'expired', 'adjusted']);
            $table->integer('points');
            $table->unsignedInteger('balance_after');
            $table->string('description')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loyalty_transactions');
        Schema::dropIfExists('rewards');
        Schema::dropIfExists('loyalty_accounts');
    }
};
