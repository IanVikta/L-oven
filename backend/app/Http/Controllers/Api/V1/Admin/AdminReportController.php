<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AdminReportController extends Controller
{
    /**
     * Generate sales and revenue analytics report.
     */
    public function sales(): JsonResponse
    {
        $totalRevenue = (float) Order::where('status', '!=', 'cancelled')->sum('total_amount');
        $totalOrders = Order::count();
        $completedOrders = Order::where('status', 'completed')->count();
        $pendingOrders = Order::whereIn('status', ['pending', 'confirmed', 'preparing'])->count();

        // Revenue breakdown by fulfilment type
        $fulfilmentBreakdown = Order::select('fulfilment_type', DB::raw('count(*) as count'), DB::raw('sum(total_amount) as revenue'))
            ->where('status', '!=', 'cancelled')
            ->groupBy('fulfilment_type')
            ->get();

        // Top 5 best selling items
        $topProducts = OrderItem::select('product_name', DB::raw('sum(quantity) as total_sold'), DB::raw('sum(line_total) as total_revenue'))
            ->groupBy('product_name')
            ->orderBy('total_sold', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'analytics' => [
                'total_revenue' => $totalRevenue,
                'total_orders' => $totalOrders,
                'completed_orders' => $completedOrders,
                'pending_orders' => $pendingOrders,
                'average_order_value' => $totalOrders > 0 ? round($totalRevenue / $totalOrders, 2) : 0.00,
                'fulfilment_breakdown' => $fulfilmentBreakdown,
                'top_products' => $topProducts,
            ],
        ]);
    }
}
