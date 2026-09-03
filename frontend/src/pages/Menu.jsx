import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import Loading from '../components/common/Loading';
import ProductModal from '../components/products/ProductModal';
import { formatProductPrice } from '../utils/currency';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setError('Failed to load menu items. Please check database connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenProduct = async (product) => {
    try {
      const detailData = await productService.getProduct(product.slug);
      setSelectedProduct(detailData.product || product);
      setIsModalOpen(true);
    } catch {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const categoryEmojis = {
    coffee: '☕',
    bakery: '🥐',
    treats: '🍰',
    tea: '🫖',
    cold_drinks: '🥤',
  };

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header & Search */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
            Artisanal Selection
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brown-900 mt-3 mb-4">
            Our Specialty Menu & Bakery
          </h1>
          <p className="text-brown-700 text-sm md:text-base mb-8 max-w-xl mx-auto">
            Discover single-origin espresso drinks, 48-hr slow-fermented croissants, and gourmet cakes made fresh daily.
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search espresso, cold brew, croissant, eclair..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12 pr-10 py-3.5 rounded-full shadow-sm text-sm"
            />
            <svg
              className="w-5 h-5 absolute left-4 top-4 text-brown-400"
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
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs text-brown-400 hover:text-brown-800 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === 'all'
                ? 'bg-brown-900 text-white shadow-md scale-105'
                : 'bg-white text-brown-800 hover:bg-orange-50 border border-gray-200'
            }`}
          >
            🌟 All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                selectedCategory === cat.slug
                  ? 'bg-brown-900 text-white shadow-md scale-105'
                  : 'bg-white text-brown-800 hover:bg-orange-50 border border-gray-200'
              }`}
            >
              <span>{categoryEmojis[cat.slug] || '☕'}</span>
              <span>{cat.name}</span>
              <span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                {cat.products_count}
              </span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-2xl text-center shadow border border-red-200">
            <p className="text-red-600 font-semibold mb-2">{error}</p>
            <button onClick={fetchProducts} className="btn btn-outline text-xs mt-2">
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-amber-100 max-w-md mx-auto p-8">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-lg font-bold text-brown-900 mb-1">No items found</p>
            <p className="text-xs text-brown-600 mb-4">
              Try clearing your search term or selecting another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="btn btn-primary text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="card card-hover flex flex-col justify-between p-6">
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                      {product.category?.name}
                    </span>
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                      ★ 4.9 <span className="text-[10px] text-brown-400">({product.prep_time_mins}m prep)</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-brown-900 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-brown-600 mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {product.calories && (
                    <div className="text-[10px] text-brown-500 mb-3 font-semibold">
                      🔥 {product.calories} kcal
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-amber-100 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] text-brown-400 block">Price</span>
                    <div className="text-sm font-bold text-brown-900">
                      {formatProductPrice(product.price)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenProduct(product)}
                      className="btn btn-outline text-xs py-2 px-3"
                    >
                      Customize ⚙️
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn btn-primary text-xs py-2 px-3 shadow"
                    >
                      Add 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Customization Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Menu;
