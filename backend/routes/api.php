<?php

use App\Http\Controllers\Api\V1\Admin\AdminOrderController;
use App\Http\Controllers\Api\V1\Admin\AdminProductController;
use App\Http\Controllers\Api\V1\Admin\AdminReportController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\LoyaltyController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\PaymentController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Middleware\EnsureAdminOrStaff;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — L'Oven Coffee & Bakery (v1)
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // Health check
    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'app' => 'L\'Oven Coffee API',
            'version' => '1.0.0',
            'timestamp' => now()->toIso8601String(),
        ]);
    });

    // Public Auth endpoints
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Public Catalog endpoints
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);

    // Public Order placement (supports Guest & Auth checkout)
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/track/{order_number}', [OrderController::class, 'show']);

    // Mobile Money Payment Engine
    Route::post('/payments/initiate', [PaymentController::class, 'initiate']);
    Route::post('/payments/callback', [PaymentController::class, 'callback']);
    Route::get('/payments/{reference}/status', [PaymentController::class, 'status']);

    // Rewards catalog
    Route::get('/loyalty/rewards', [LoyaltyController::class, 'rewards']);

    // Protected Customer endpoints (Sanctum)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Customer order history
        Route::get('/orders', [OrderController::class, 'index']);

        // Staff & Admin Protected Dashboard endpoints
        Route::middleware(EnsureAdminOrStaff::class)->prefix('admin')->group(function () {
            // Live Kitchen & Barista Order Stream
            Route::get('/orders', [AdminOrderController::class, 'index']);
            Route::patch('/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);

            // Product Stock & Inventory
            Route::get('/products', [AdminProductController::class, 'index']);
            Route::post('/products', [AdminProductController::class, 'store']);
            Route::put('/products/{id}', [AdminProductController::class, 'update']);
            Route::patch('/products/{id}/availability', [AdminProductController::class, 'toggleAvailability']);

            // Sales Analytics
            Route::get('/reports/sales', [AdminReportController::class, 'sales']);
        });
    });
});
