<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminProductController extends Controller
{
    /**
     * Display complete product inventory list.
     */
    public function index(): JsonResponse
    {
        $this->ensureDefaultCategoriesExist();
        $products = Product::with(['category', 'variants'])->orderBy('name')->get();

        return response()->json([
            'products' => ProductResource::collection($products),
        ]);
    }

    /**
     * Create a new product.
     */
    public function store(Request $request): JsonResponse
    {
        $this->normalizeCategoryId($request);

        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:191'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'image_url' => ['nullable', 'string'],
            'prep_time_mins' => ['nullable', 'integer', 'min:1'],
            'calories' => ['nullable', 'integer', 'min:0'],
            'is_available' => ['nullable', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . rand(100, 999);

        $product = Product::create($validated);
        $product->load(['category', 'variants']);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => new ProductResource($product),
        ], 201);
    }

    /**
     * Update product details.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        if ($request->has('category_id')) {
            $this->normalizeCategoryId($request);
        }

        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'category_id' => ['sometimes', 'exists:categories,id'],
            'name' => ['sometimes', 'string', 'max:191'],
            'description' => ['nullable', 'string'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'image_url' => ['nullable', 'string'],
            'prep_time_mins' => ['nullable', 'integer', 'min:1'],
            'calories' => ['nullable', 'integer', 'min:0'],
            'is_available' => ['nullable', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
        ]);

        if (isset($validated['name']) && $validated['name'] !== $product->name) {
            $validated['slug'] = Str::slug($validated['name']) . '-' . rand(100, 999);
        }

        $product->update($validated);
        $product->load(['category', 'variants']);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => new ProductResource($product),
        ]);
    }

    /**
     * Toggle product stock availability.
     */
    public function toggleAvailability(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->is_available = !$product->is_available;
        $product->save();

        return response()->json([
            'message' => "Product availability updated to " . ($product->is_available ? 'Available' : 'Sold Out'),
            'is_available' => $product->is_available,
        ]);
    }

    /**
     * Delete product item.
     */
    public function destroy(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
        ]);
    }

    /**
     * Upload an image file for a product.
     */
    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'file', 'image', 'mimes:jpeg,jpg,png,gif,webp', 'max:5120'],
        ]);

        $path = $request->file('image')->store('products', 'public');
        $url = asset('storage/' . $path);

        return response()->json([
            'message' => 'Image uploaded successfully',
            'url' => $url,
            'path' => $path,
        ]);
    }

    /**
     * Ensure default coffee & pastry categories exist in database.
     */
    private function ensureDefaultCategoriesExist(): void
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
    }

    /**
     * Normalize category ID from request to prevent validation failures.
     */
    private function normalizeCategoryId(Request $request): void
    {
        $this->ensureDefaultCategoriesExist();

        $catId = $request->input('category_id');
        if (empty($catId)) {
            $first = Category::where('is_active', true)->first();
            if ($first) {
                $request->merge(['category_id' => $first->id]);
            }
            return;
        }

        $existing = Category::find($catId);
        if (!$existing) {
            $byName = Category::where('name', $catId)->orWhere('slug', Str::slug($catId))->first();
            if ($byName) {
                $request->merge(['category_id' => $byName->id]);
                return;
            }

            if (is_numeric($catId)) {
                $names = [
                    1 => 'Coffees',
                    2 => 'Roasts',
                    3 => 'Ice Creams',
                    4 => 'Cocktails',
                    5 => 'Snacks',
                    6 => 'Bakery',
                ];
                $name = $names[(int)$catId] ?? ('Category ' . $catId);
                $newCat = Category::updateOrCreate(
                    ['id' => (int)$catId],
                    [
                        'name' => $name,
                        'slug' => Str::slug($name),
                        'description' => $name . ' selection',
                        'display_order' => (int)$catId,
                        'is_active' => true,
                    ]
                );
                $request->merge(['category_id' => $newCat->id]);
            }
        }
    }
}
