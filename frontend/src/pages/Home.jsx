import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import ProductModal from '../components/products/ProductModal';
import heroBanner from '../assets/hero_banner.jpg';
import bakeryStory from '../assets/bakery_story.jpg';

const Home = () => {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await productService.getProducts();
      const products = res.products || [];
      // Take first 6 available items
      setFeaturedProducts(products.slice(0, 6));
    } catch (e) {
      console.error('Failed to fetch featured products:', e);
    }
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-white bg-brown-900 overflow-hidden">
        {/* Background Image with Dark Vignette Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900 via-transparent to-black/50" />

        <div className="container mx-auto px-4 py-20 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-orange-300">
              Handcrafted Artisanal Coffee & French Bakery
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-display font-bold leading-tight mb-6"
          >
            Taste the Craft of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-amber-500">
              Pure Perfection.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl text-cream-100/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Savor single-origin espresso micro-batches, 48-hour fermented sourdough croissants, and gourmet desserts crafted fresh every morning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/menu" className="btn btn-primary text-base px-8 py-4 w-full sm:w-auto shadow-2xl">
              🚀 Order Online Now
            </Link>
            <a href="#featured" className="btn btn-secondary text-base px-8 py-4 w-full sm:w-auto">
              ☕ View Today's Specials
            </a>
          </motion.div>

          {/* Quick Highlights Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-8"
          >
            <div className="flex items-center justify-center gap-3 text-xs font-semibold text-cream-200">
              <span className="text-2xl">☕</span> 100% Single Origin Arabica Beans
            </div>
            <div className="flex items-center justify-center gap-3 text-xs font-semibold text-cream-200">
              <span className="text-2xl">🥐</span> Freshly Baked Every 3 Hours
            </div>
            <div className="flex items-center justify-center gap-3 text-xs font-semibold text-cream-200">
              <span className="text-2xl">⚡</span> Dine-In, Pickup & Express Delivery
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Menu Specials Grid */}
      <section id="featured" className="py-20 bg-cream-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
              Chef's Pick
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-brown-900 mt-3 mb-4">
              Today's Featured Menu
            </h2>
            <p className="text-brown-700 text-sm max-w-xl mx-auto">
              Our baristas and pastry chefs recommend these signature creations for an unforgettable cafe experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card card-hover flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                      {product.category?.name}
                    </span>
                    <span className="text-xs font-bold text-amber-500">★ 4.9</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-brown-900 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-brown-600 line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="p-6 pt-0 border-t border-amber-100/60 mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-xs text-brown-500">Starting from</span>
                    <div className="text-xl font-bold text-brown-900">${product.price.toFixed(2)}</div>
                  </div>

                  <button
                    onClick={() => handleOpenModal(product)}
                    className="btn btn-primary text-xs py-2 px-4 shadow"
                  >
                    Customize & Add 🛒
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu" className="btn btn-secondary px-8 py-3.5 text-sm">
              Explore Complete Menu (20+ Items) →
            </Link>
          </div>
        </div>
      </section>

      {/* Craftsmanship & Storytelling Section */}
      <section className="py-20 bg-brown-900 text-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img
                src={bakeryStory}
                alt="Artisan Baker Crafting Pastries"
                className="rounded-3xl shadow-2xl border-2 border-orange-500/20 w-full object-cover h-[450px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-2xl shadow-2xl hidden sm:block max-w-[200px]">
                <div className="text-3xl font-display font-bold">100%</div>
                <div className="text-xs font-semibold mt-1">Artisanal Sourdough & Specialty Coffee</div>
              </div>
            </motion.div>

            {/* Story Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
                Our Heritage & Passion
              </span>

              <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-cream-50">
                Slow Roasted Beans, <br />
                <span className="text-orange-400">Hand-Rolled Passion.</span>
              </h2>

              <p className="text-sm md:text-base text-cream-200/80 leading-relaxed">
                At L'Oven Coffee & Bakery, every espresso shot is pulled from single-origin Arabica beans roasted in micro-batches. Our bakers start before dawn, hand-laminating French butter croissant dough and fermenting artisan sourdough for 48 hours to deliver unprecedented depth of flavor.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <div className="text-3xl font-display font-bold text-orange-400">48 Hours</div>
                  <div className="text-xs text-cream-200/70 mt-1">Natural Slow Dough Fermentation</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-orange-400">4.9 / 5.0</div>
                  <div className="text-xs text-cream-200/70 mt-1">Based on 1,200+ Customer Reviews</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Fulfilment Types Section */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brown-900 mb-3">
              How Would You Like Your Order?
            </h2>
            <p className="text-brown-700 text-sm max-w-md mx-auto">
              Choose your preferred fulfilment method for maximum convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                🪑
              </div>
              <h3 className="text-2xl font-display font-bold text-brown-900">Dine-In Table Order</h3>
              <p className="text-xs text-brown-600 leading-relaxed">
                Scan your table QR code, order your coffee & treats, and we'll deliver straight to your table!
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                🛍️
              </div>
              <h3 className="text-2xl font-display font-bold text-brown-900">Express Takeaway</h3>
              <p className="text-xs text-brown-600 leading-relaxed">
                Schedule your pickup time. Your hot espresso and warm pastries will be packaged and ready at the counter.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                🛵
              </div>
              <h3 className="text-2xl font-display font-bold text-brown-900">Doorstep Delivery</h3>
              <p className="text-xs text-brown-600 leading-relaxed">
                Enjoy fresh coffee and oven-baked pastries delivered hot to your home or office in under 30 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
            Limited Time Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-4">
            Get 10% Off Your Order
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 font-light">
            Use promo code <span className="font-bold bg-brown-900 px-3 py-1 rounded text-orange-400">LOVEN10</span> at checkout to unlock 10% off your cart plus earn loyalty points!
          </p>
          <Link to="/menu" className="btn btn-secondary text-base px-8 py-3.5 shadow-2xl">
            Claim Promo & Order Now →
          </Link>
        </div>
      </section>

      {/* Product Customization Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
