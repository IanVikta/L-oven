<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Coupon;
use App\Models\OptionGroup;
use App\Models\OptionItem;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Reward;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Default Users (Admin, Barista, Customer)
        User::updateOrCreate(
            ['email' => 'admin@loven.com'],
            [
                'name' => 'Admin Chef',
                'phone' => '+256700000001',
                'role' => 'admin',
                'password' => Hash::make('password123'),
            ]
        );

        User::updateOrCreate(
            ['email' => 'staff@loven.com'],
            [
                'name' => 'Barista Staff',
                'phone' => '+256700000002',
                'role' => 'barista',
                'password' => Hash::make('password123'),
            ]
        );

        User::updateOrCreate(
            ['email' => 'customer@loven.com'],
            [
                'name' => 'Jane Doe',
                'phone' => '+256700000003',
                'role' => 'customer',
                'password' => Hash::make('password123'),
            ]
        );

        // 2. Categories
        $categories = [
            [
                'id' => 1,
                'name' => 'Espresso & Coffee',
                'slug' => 'espresso-coffee',
                'description' => 'Artisanal espresso drinks crafted with premium roasted beans.',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'id' => 2,
                'name' => 'Cold Brew & Drinks',
                'slug' => 'cold-brew-drinks',
                'description' => 'Refreshing cold brews, iced lattes, and specialty chillers.',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'id' => 3,
                'name' => 'Fresh Bakery',
                'slug' => 'fresh-bakery',
                'description' => 'Handcrafted croissants, muffins, pastries, and sourdough bread.',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'id' => 4,
                'name' => 'Sandwiches & Toast',
                'slug' => 'sandwiches-toast',
                'description' => 'Gourmet cafe sandwiches, paninis, and avocado toast.',
                'display_order' => 4,
                'is_active' => true,
            ],
        ];
        foreach ($categories as $cat) {
            Category::updateOrCreate(['id' => $cat['id']], $cat);
        }

        // 3. Products
        $products = [
            [
                'id' => 1,
                'category_id' => 1,
                'name' => "L'Oven Signature Latte",
                'slug' => 'loven-signature-latte',
                'description' => 'Rich double espresso with velvety steamed milk and subtle vanilla note.',
                'price' => 4.50,
                'prep_time_mins' => 4,
                'is_available' => true,
                'is_featured' => true,
            ],
            [
                'id' => 2,
                'category_id' => 1,
                'name' => 'Flat White',
                'slug' => 'flat-white',
                'description' => 'Smooth microfoam poured over two ristretto espresso shots.',
                'price' => 4.25,
                'prep_time_mins' => 4,
                'is_available' => true,
                'is_featured' => true,
            ],
            [
                'id' => 3,
                'category_id' => 2,
                'name' => 'Vanilla Cold Brew',
                'slug' => 'vanilla-cold-brew',
                'description' => 'Steeped for 18 hours, served over ice with Madagascar vanilla cream.',
                'price' => 4.95,
                'prep_time_mins' => 2,
                'is_available' => true,
                'is_featured' => true,
            ],
            [
                'id' => 4,
                'category_id' => 3,
                'name' => 'Butter Croissant',
                'slug' => 'butter-croissant',
                'description' => 'Flaky, golden French butter croissant baked fresh daily.',
                'price' => 3.75,
                'prep_time_mins' => 2,
                'is_available' => true,
                'is_featured' => true,
            ],
            [
                'id' => 5,
                'category_id' => 3,
                'name' => 'Almond Pain au Chocolat',
                'slug' => 'almond-chocolate-pain-au-chocolat',
                'description' => 'Decadent dark chocolate pastry topped with toasted sliced almonds.',
                'price' => 4.50,
                'prep_time_mins' => 2,
                'is_available' => true,
                'is_featured' => false,
            ],
            [
                'id' => 6,
                'category_id' => 4,
                'name' => 'Sourdough Avocado Toast',
                'slug' => 'sourdough-avocado-toast',
                'description' => 'Toasted sourdough with crushed avocado, cherry tomatoes, and microgreens.',
                'price' => 8.95,
                'prep_time_mins' => 7,
                'is_available' => true,
                'is_featured' => true,
            ],
        ];
        foreach ($products as $prod) {
            Product::updateOrCreate(['id' => $prod['id']], $prod);
        }

        // 4. Product Variants
        $variants = [
            ['id' => 1, 'product_id' => 1, 'name' => 'Regular (12oz)', 'price_modifier' => 0.00, 'is_default' => true],
            ['id' => 2, 'product_id' => 1, 'name' => 'Large (16oz)', 'price_modifier' => 0.75, 'is_default' => false],
            ['id' => 3, 'product_id' => 2, 'name' => 'Standard (8oz)', 'price_modifier' => 0.00, 'is_default' => true],
            ['id' => 4, 'product_id' => 3, 'name' => 'Regular (16oz)', 'price_modifier' => 0.00, 'is_default' => true],
            ['id' => 5, 'product_id' => 3, 'name' => 'Large (24oz)', 'price_modifier' => 0.85, 'is_default' => false],
        ];
        foreach ($variants as $v) {
            ProductVariant::updateOrCreate(['id' => $v['id']], $v);
        }

        // 5. Option Groups & Items
        $groups = [
            ['id' => 1, 'name' => 'Milk Choice', 'description' => 'Select your preferred milk alternative', 'is_required' => false, 'min_selectable' => 0, 'max_selectable' => 1],
            ['id' => 2, 'name' => 'Temperature', 'description' => 'Served hot or iced', 'is_required' => true, 'min_selectable' => 1, 'max_selectable' => 1],
            ['id' => 3, 'name' => 'Extra Shots', 'description' => 'Add extra espresso power', 'is_required' => false, 'min_selectable' => 0, 'max_selectable' => 2],
            ['id' => 4, 'name' => 'Sweetness Level', 'description' => 'Adjust syrup level', 'is_required' => false, 'min_selectable' => 0, 'max_selectable' => 1],
        ];
        foreach ($groups as $g) {
            OptionGroup::updateOrCreate(['id' => $g['id']], $g);
        }

        $items = [
            ['id' => 1, 'option_group_id' => 1, 'name' => 'Whole Milk', 'price_modifier' => 0.00],
            ['id' => 2, 'option_group_id' => 1, 'name' => 'Oat Milk', 'price_modifier' => 0.75],
            ['id' => 3, 'option_group_id' => 1, 'name' => 'Almond Milk', 'price_modifier' => 0.75],
            ['id' => 4, 'option_group_id' => 2, 'name' => 'Hot', 'price_modifier' => 0.00],
            ['id' => 5, 'option_group_id' => 2, 'name' => 'Iced', 'price_modifier' => 0.50],
            ['id' => 6, 'option_group_id' => 3, 'name' => 'Extra Single Shot', 'price_modifier' => 1.00],
            ['id' => 7, 'option_group_id' => 3, 'name' => 'Extra Double Shot', 'price_modifier' => 1.80],
            ['id' => 8, 'option_group_id' => 4, 'name' => 'Standard Sweetness (100%)', 'price_modifier' => 0.00],
            ['id' => 9, 'option_group_id' => 4, 'name' => 'Half Sweet (50%)', 'price_modifier' => 0.00],
            ['id' => 10, 'option_group_id' => 4, 'name' => 'Unsweetened (0%)', 'price_modifier' => 0.00],
        ];
        foreach ($items as $it) {
            OptionItem::updateOrCreate(['id' => $it['id']], $it);
        }

        // Product Option Attachments
        DB::table('product_options')->upsert([
            ['product_id' => 1, 'option_group_id' => 1, 'display_order' => 1],
            ['product_id' => 1, 'option_group_id' => 2, 'display_order' => 2],
            ['product_id' => 1, 'option_group_id' => 3, 'display_order' => 3],
            ['product_id' => 1, 'option_group_id' => 4, 'display_order' => 4],
            ['product_id' => 2, 'option_group_id' => 1, 'display_order' => 1],
            ['product_id' => 2, 'option_group_id' => 3, 'display_order' => 2],
            ['product_id' => 3, 'option_group_id' => 1, 'display_order' => 1],
            ['product_id' => 3, 'option_group_id' => 4, 'display_order' => 2],
        ], ['product_id', 'option_group_id'], ['display_order']);

        // 6. Rewards
        $rewards = [
            [
                'id' => 1,
                'title' => 'Free Coffee or Tea',
                'description' => 'Redeem for any regular size espresso drink or tea.',
                'points_required' => 100,
                'discount_type' => 'free_product',
                'discount_value' => 4.50,
                'product_id' => 1,
                'is_active' => true,
            ],
            [
                'id' => 2,
                'title' => '$5 Off Your Order',
                'description' => 'Get $5 off your total basket value.',
                'points_required' => 150,
                'discount_type' => 'fixed_amount',
                'discount_value' => 5.00,
                'product_id' => null,
                'is_active' => true,
            ],
            [
                'id' => 3,
                'title' => 'Free Fresh Pastry',
                'description' => 'Redeem for any fresh croissant or bakery item.',
                'points_required' => 80,
                'discount_type' => 'free_product',
                'discount_value' => 3.75,
                'product_id' => 4,
                'is_active' => true,
            ],
        ];
        foreach ($rewards as $r) {
            Reward::updateOrCreate(['id' => $r['id']], $r);
        }

        // 7. Coupons
        Coupon::updateOrCreate(
            ['code' => 'WELCOME10'],
            [
                'discount_type' => 'percentage',
                'discount_value' => 10.00,
                'min_order_amount' => 5.00,
                'is_active' => true,
                'starts_at' => now(),
                'expires_at' => now()->addYear(),
            ]
        );
    }
}
