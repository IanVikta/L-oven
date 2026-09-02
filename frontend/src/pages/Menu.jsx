import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import Loading from '../components/common/Loading';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart } = useCart();

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const fetchInitialData = async () => {
    try {
      const catData = await productService.getCategories();
      setCategories(catData.categories || []);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }
      if (searchQuery.trim() !== '') {
        params.search = searchQuery.trim();
      }

      const prodData = await productService.getProducts(params);
      setProducts(prodData.products || []);
      setError(null);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load menu items. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header & Search */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brown-900 mb-4">
            Our Menu & Treats
          </h1>
          <p className="text-brown-700 text-lg mb-6">
            Handcrafted coffees, artisanal pastries, and savory gourmet bites.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search coffee, croissants, sandwiches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-11 pr-4 py-3 rounded-full shadow-sm text-sm"
            />
            <svg
              className="w-5 h-5 absolute left-4 top-3.5 text-brown-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white text-brown-800 hover:bg-orange-50'
            }`}
          >
            All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-brown-800 hover:bg-orange-50'
              }`}
            >
              {cat.name} ({cat.products_count})
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-xl text-center shadow border border-red-200">
            <p className="text-red-600 font-semibold mb-2">{error}</p>
            <button onClick={fetchProducts} className="btn btn-outline text-xs mt-2">
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-brown-600">
            <p className="text-xl font-semibold mb-2">No items found</p>
            <p className="text-sm">Try clearing your search query or selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="product-card flex flex-col justify-between p-6">
                <div>
                  {/* Category Badge & Prep Time */}
                  <div className="flex items-center justify-between mb-3 text-xs font-semibold text-orange-600">
                    <span>{product.category?.name}</span>
                    <span className="text-brown-500 flex items-center gap-1">
                      ⏱ {product.prep_time_mins} mins
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-brown-900 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-brown-700 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-100 flex items-center justify-between mt-auto">
                  <div className="text-xl font-bold text-brown-900">
                    ${product.price.toFixed(2)}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="btn btn-primary text-xs py-2 px-4 shadow"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
