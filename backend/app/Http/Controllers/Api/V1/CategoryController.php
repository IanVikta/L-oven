<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Display a listing of active categories.
     */
    public function index(): JsonResponse
    {
        if (Category::count() === 0) {
            $defaultCategories = [
                ['id' => 1, 'name' => 'Coffees', 'slug' => 'coffees', 'description' => 'Artisanal espresso and coffee drinks crafted with premium roasted beans.', 'display_order' => 1, 'is_active' => true],
                ['id' => 2, 'name' => 'Roasts', 'slug' => 'roasts', 'description' => 'Freshly roasted whole beans and single-origin roast bags.', 'display_order' => 2, 'is_active' => true],
                ['id' => 3, 'name' => 'Ice Creams', 'slug' => 'ice-creams', 'description' => 'Creamy gelato, artisanal ice creams, and affogato scoops.', 'display_order' => 3, 'is_active' => true],
                ['id' => 4, 'name' => 'Cocktails', 'slug' => 'cocktails', 'description' => 'Signature coffee cocktails, espresso martinis, and mocktails.', 'display_order' => 4, 'is_active' => true],
                ['id' => 5, 'name' => 'Snacks', 'slug' => 'snacks', 'description' => 'Savory cafe snacks, paninis, avocado toast, and bites.', 'display_order' => 5, 'is_active' => true],
                ['id' => 6, 'name' => 'Bakery', 'slug' => 'bakery', 'description' => 'Freshly baked croissants, viennoiserie, and sourdough bread.', 'display_order' => 6, 'is_active' => true],
            ];
            foreach ($defaultCategories as $cat) {
                Category::updateOrCreate(['id' => $cat['id']], $cat);
            }
        }

        $categories = Category::where('is_active', true)
            ->withCount('products')
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'categories' => CategoryResource::collection($categories),
        ]);
    }
}
