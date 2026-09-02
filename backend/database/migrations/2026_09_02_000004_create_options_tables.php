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
        Schema::create('option_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('description')->nullable();
            $table->boolean('is_required')->default(false);
            $table->integer('min_selectable')->default(0);
            $table->integer('max_selectable')->default(1);
            $table->timestamps();
        });

        Schema::create('option_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('option_group_id')->constrained('option_groups')->onDelete('cascade');
            $table->string('name', 100);
            $table->decimal('price_modifier', 10, 2)->default(0.00);
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });

        Schema::create('product_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('option_group_id')->constrained('option_groups')->onDelete('cascade');
            $table->integer('display_order')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_options');
        Schema::dropIfExists('option_items');
        Schema::dropIfExists('option_groups');
    }
};
