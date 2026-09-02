<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProductDetailResource;
use App\Http\Resources\V1\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of products with optional search and category filters.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::where('is_available', true)
            ->with(['category', 'variants']);

        if ($request->has('category') && !empty($request->category)) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = '%' . $request->search . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', $searchTerm)
                  ->orWhere('description', 'like', $searchTerm);
            });
        }

        $products = $query->orderBy('name')->get();

        return response()->json([
            'products' => ProductResource::collection($products),
        ]);
    }

    /**
     * Display the specified product with variants and option groups.
     */
    public function show(string $slug): JsonResponse
    {
        $product = Product::where('slug', $slug)
            ->where('is_available', true)
            ->with(['category', 'variants', 'optionGroups.items'])
            ->firstOrFail();

        return response()->json([
            'product' => new ProductDetailResource($product),
        ]);
    }
}
