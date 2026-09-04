import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import Loading from '../components/common/Loading';
import ProductModal from '../components/products/ProductModal';
import BackToTop from '../components/common/BackToTop';
import { formatProductPrice } from '../utils/currency';

import heroImage from '../assets/hero_coffee_croissant.jpg';
import latteArt from '../assets/cand_latte_art.jpg';
import coffeeArt from '../assets/cand_coffee_art.jpg';
import coffeeBeansCup from '../assets/cand_coffee_beans_cup.jpg';
import croissant1 from '../assets/cand_croissant1.jpg';
import croissant2 from '../assets/cand_croissant2.jpg';
import pastryCoffee from '../assets/cand_pastry_coffee.jpg';
import tableCoffee from '../assets/cand_table_coffee1.jpg';
import defaultFallback from '../assets/cand_croissant_cup.jpg';

const FALLBACK_IMAGES = {
  'flat-white': coffeeArt,
  'loven-signature-latte': latteArt,
  'vanilla-cold-brew': tableCoffee,
  'butter-croissant': croissant2,
  'almond-chocolate-pain-au-chocolat': croissant1,
  'sourdough-avocado-toast': pastryCoffee,
};

const categoryIcons = {
  coffee: '☕',
  bakery: '🥐',
  pastries: '🥐',
  treats: '🍰',
  tea: '🫖',
  cold_drinks: '🥤',
  cold: '🥤',
  non_coffee: '🍵',
  merch: '◌',
};

const getCategoryIcon = (slug = '') => {
  const key = slug.toLowerCase().replace(/-/g, '_');
  return categoryIcons[key] || '☕';
};

const getProductImage = (product) => {
  if (product?.image_url) return product.image_url;
  if (product?.image) return product.image;
  if (product?.slug && FALLBACK_IMAGES[product.slug]) return FALLBACK_IMAGES[product.slug];

  const slug = product?.category?.slug || '';
  if (slug.includes('bakery') || slug.includes('pastr')) return croissant1;
  if (slug.includes('tea') || slug.includes('matcha')) return latteArt;
  if (slug.includes('cold') || slug.includes('drink')) return tableCoffee;
  if (slug.includes('coffee') || slug.includes('espresso')) return coffeeArt;
  if (slug.includes('treat') || slug.includes('cake')) return pastryCoffee;
  if (slug.includes('merch')) return coffeeBeansCup;
  return defaultFallback;
};

const normalizeCategory = (category) => {
  if (!category) return null;
  return {
    ...category,
    slug: category.slug || String(category.name || '').toLowerCase().replace(/\s+/g, '_'),
  };
};

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addToCart } = useCart();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const fetchInitialData = async () => {
    try {
      const catData = await productService.getCategories();
      setCategories((catData.categories || []).map(normalizeCategory));
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (searchQuery.trim()) params.search = searchQuery.trim();

      const prodData = await productService.getProducts(params);
      setProducts(prodData.products || []);
      setError(null);
    } catch (err) {
      console.error('Failed to load products:', err);
      const errorMsg = err.response?.data?.message 
        || err.message 
        || 'Failed to load menu items. Please check your connection and try again.';
      setError(errorMsg);
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

  const groupedProducts = useMemo(() => {
    if (selectedCategory !== 'all') {
      const category = categories.find((item) => item.slug === selectedCategory);
      return [{ key: selectedCategory, name: category?.name || 'Selection', icon: getCategoryIcon(selectedCategory), products }];
    }

    const groups = [];
    const categoryMap = new Map();

    products.forEach((product) => {
      const category = normalizeCategory(product.category);
      const key = category?.slug || 'other';
      if (!categoryMap.has(key)) {
        categoryMap.set(key, {
          key,
          name: category?.name || 'More to love',
          icon: getCategoryIcon(key),
          products: [],
        });
      }
      categoryMap.get(key).products.push(product);
    });

    categories.forEach((category) => {
      if (categoryMap.has(category.slug)) {
        const group = categoryMap.get(category.slug);
        groups.push({ ...group, name: category.name, icon: getCategoryIcon(category.slug) });
      }
    });

    categoryMap.forEach((group) => {
      if (!groups.some((item) => item.key === group.key)) groups.push(group);
    });

    return groups;
  }, [categories, products, selectedCategory]);

  const heroText = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] },
  };

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className="bg-[#FFF4E6] min-h-screen text-[#2B1B12]">
      {/* Editorial menu hero — deliberately darker and more photographic than the content below. */}
      <section className="relative min-h-[430px] sm:min-h-[500px] lg:min-h-[540px] overflow-hidden bg-[#2B1B12] text-[#FFF4E6]">
        <img
          src={heroImage}
          alt="Fresh coffee and pastries at L'Oven"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B1B12]/95 via-[#2B1B12]/72 to-[#2B1B12]/25" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B12]/70 via-transparent to-[#2B1B12]/15" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex min-h-[430px] max-w-7xl items-center px-6 py-20 sm:min-h-[500px] sm:px-8 sm:py-24 lg:min-h-[540px] lg:px-12">
          <div className="max-w-xl">
            <motion.span
              initial={heroText.initial}
              animate={heroText.animate}
              transition={heroText.transition}
              className="mb-5 block font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#F28C13] sm:text-[13px]"
            >
              L'OVEN COFFEE &amp; BAKERY
            </motion.span>

            <div className="relative inline-block">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Playfair_Display',Georgia,serif] text-[64px] font-normal leading-[0.95] tracking-[-0.03em] text-[#FFF4E6] sm:text-7xl md:text-[88px]"
              >
                Menu<span className="ml-2 align-top font-sans text-3xl font-normal text-[#F28C13] sm:text-4xl"></span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.4, ease: 'easeOut' }}
              className="my-6 h-[2px] w-12 bg-[#F28C13] sm:my-7"
              aria-hidden="true"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md font-sans text-sm font-normal leading-relaxed text-[#FFF4E6]/90 sm:text-base md:text-lg"
            >
              Good coffee. Good mood.<br />
              Good day.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Menu content — warm editorial system shared with the home page. */}
      <section className="bg-[#FFF4E6] py-16 sm:py-20 lg:py-24" aria-labelledby="menu-heading">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={fadeIn.transition}
            className="max-w-3xl"
          >
            <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#F28C13] sm:text-[13px]">
              OUR MENU
            </span>
            <h2
              id="menu-heading"
              className="font-['Playfair_Display',Georgia,serif] text-4xl font-normal leading-[1.12] tracking-tight text-[#2B1B12] sm:text-5xl lg:text-[58px]"
            >
              Made with love,<br className="hidden sm:block" /> served with care.
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-[#2B1B12]/75 sm:text-base lg:text-lg">
              Handcrafted drinks and freshly baked treats, prepared with the same care that defines the L'Oven experience. Select a product, add to Cart and order now
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="mt-8 max-w-xl sm:mt-10"
          >
            <label className="sr-only" htmlFor="menu-search">Search the menu</label>
            <div className="relative">
              <input
                id="menu-search"
                type="search"
                placeholder="Search coffee, pastry, cold brew..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#2B1B12]/10 bg-white py-3.5 pl-11 pr-11 font-sans text-sm text-[#2B1B12] shadow-[0_4px_20px_-12px_rgba(43,27,18,0.35)] transition-all duration-200 placeholder:text-[#2B1B12]/40 focus:border-[#F28C13] focus:outline-none focus:ring-2 focus:ring-[#F28C13]/15"
              />
              <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#2B1B12]/45" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="m21 21-4.35-4.35m2.1-5.15a7.25 7.25 0 1 1-14.5 0 7.25 7.25 0 0 1 14.5 0Z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#F4ECE1] font-sans text-xs text-[#2B1B12]/60 transition-colors hover:bg-[#2B1B12] hover:text-white"
                >
                  ×
                </button>
              )}
            </div>
          </motion.div>

          {/* Category navigation */}
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.15 }}
            className="mt-9 overflow-x-auto pb-2 sm:mt-10"
            role="tablist"
            aria-label="Menu categories"
          >
            <div className="flex min-w-max gap-2.5 sm:gap-3">
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
                className={`inline-flex min-h-11 items-center rounded-lg border px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-200 sm:px-6 ${selectedCategory === 'all' ? 'border-[#F28C13] bg-[#F28C13] text-white shadow-md shadow-[#F28C13]/15' : 'border-[#2B1B12]/10 bg-white text-[#2B1B12] hover:border-[#F28C13]/40 hover:bg-[#F4ECE1]'}`}
              >
                ALL ITEMS
              </button>

              {categories.map((cat) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat.slug}
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`inline-flex min-h-11 items-center rounded-lg border px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-200 sm:px-6 ${selectedCategory === cat.slug ? 'border-[#F28C13] bg-[#F28C13] text-white shadow-md shadow-[#F28C13]/15' : 'border-[#2B1B12]/10 bg-white text-[#2B1B12] hover:border-[#F28C13]/40 hover:bg-[#F4ECE1]'}`}
                >
                  {cat.name.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Menu products */}
          <div className="mt-14 sm:mt-16 lg:mt-20">
            {loading ? (
              <Loading />
            ) : error ? (
              <div className="mx-auto max-w-md rounded-lg border border-[#2B1B12]/10 bg-white p-8 text-center shadow-sm sm:p-10">
                <p className="font-['Playfair_Display',Georgia,serif] text-xl text-[#2B1B12]">{error}</p>
                <button
                  type="button"
                  onClick={fetchProducts}
                  className="mt-6 rounded bg-[#2B1B12] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#FFF4E6] transition-colors hover:bg-[#332017] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
                >
                  TRY AGAIN
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="mx-auto max-w-md rounded-lg border border-[#2B1B12]/10 bg-white p-8 text-center shadow-sm sm:p-10">
                <div className="mb-4 text-3xl" aria-hidden="true">⌕</div>
                <p className="font-['Playfair_Display',Georgia,serif] text-xl text-[#2B1B12]">No items found</p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#2B1B12]/70">
                  Try clearing your search or selecting another category.
                </p>
                <button
                  type="button"
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="mt-6 rounded bg-[#F28C13] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#d97706] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="space-y-16 sm:space-y-20 lg:space-y-24">
                {groupedProducts.map((group) => (
                  <motion.section
                    key={group.key}
                    initial={fadeIn.initial}
                    whileInView={fadeIn.whileInView}
                    viewport={fadeIn.viewport}
                    transition={fadeIn.transition}
                    aria-labelledby={`category-${group.key}`}
                  >
                    <div className="mb-7 flex items-center gap-4 sm:mb-8">
                      <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <span className="text-lg text-[#F28C13]" aria-hidden="true">{group.icon}</span>
                        <h3 id={`category-${group.key}`} className="font-['Playfair_Display',Georgia,serif] text-xl font-medium tracking-tight text-[#2B1B12] sm:text-2xl">
                          {group.name}
                        </h3>
                      </div>
                      <div className="h-px flex-1 border-t border-dashed border-[#F28C13]/45" aria-hidden="true" />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {group.products.map((product, index) => (
                        <motion.article
                          key={product.id}
                          initial={fadeIn.initial}
                          whileInView={fadeIn.whileInView}
                          viewport={fadeIn.viewport}
                          transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.2) }}
                          className="group overflow-hidden rounded-lg border border-[#2B1B12]/10 bg-white shadow-[0_5px_20px_-16px_rgba(43,27,18,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F28C13]/30 hover:shadow-[0_18px_35px_-18px_rgba(242,140,19,0.28)]"
                        >
                          <button
                            type="button"
                            onClick={() => handleOpenProduct(product)}
                            className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F28C13]"
                            aria-label={`View ${product.name}`}
                          >
                            <div className="relative aspect-[4/3] overflow-hidden bg-[#F4ECE1]">
                              <img
                                src={getProductImage(product)}
                                alt={`${product.name} at L'Oven`}
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = defaultFallback;
                                }}
                                className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                              />
                              {product.featured && (
                                <span className="absolute left-3 top-3 rounded-full bg-[#2B1B12]/90 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.13em] text-[#FFF4E6] backdrop-blur-sm">
                                  FAVOURITE
                                </span>
                              )}
                            </div>
                          </button>

                          <div className="flex min-h-[178px] flex-col p-5 sm:p-5.5">
                            <div className="flex-1">
                              <h4 className="font-['Playfair_Display',Georgia,serif] text-xl font-medium tracking-tight text-[#2B1B12] transition-colors duration-200 group-hover:text-[#F28C13] sm:text-[22px]">
                                {product.name}
                              </h4>
                              <p className="mt-2 line-clamp-2 font-sans text-xs leading-relaxed text-[#2B1B12]/70 sm:text-sm">
                                {product.description || 'Carefully prepared with quality ingredients and served fresh.'}
                              </p>
                            </div>

                            <div className="mt-5 flex items-center justify-between gap-3">
                              <span className="font-sans text-base font-semibold text-[#2B1B12] sm:text-lg">
                                {formatProductPrice(product.price)}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleOpenProduct(product)}
                                  className="inline-flex rounded border border-[#F28C13] px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-[#F28C13] transition-colors hover:bg-[#F28C13] hover:text-white"
                                >
                                  CUSTOMIZE
                                </button>
                                <button
                                  type="button"
                                  onClick={() => addToCart(product)}
                                  aria-label={`Add ${product.name} to cart`}
                                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F28C13] text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-[#d97706] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] focus-visible:ring-offset-2"
                                >
                                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                                    <path d="M12 5v14M5 12h14" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Marquee Section - Product Cards */}
      <section className="bg-[#2B1B12] py-12 sm:py-16 overflow-hidden group" aria-labelledby="popular-picks-heading">
        {/* Section Heading */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-8 sm:mb-10">
          <h2 
            id="popular-picks-heading"
            className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FFF4E6] tracking-tight"
          >
            Our Popular <span className="text-[#F28C13]">Picks</span>
          </h2>
        </div>

        <div className="relative flex [&>*]:group-hover:pause">
          {/* First set of items */}
          <motion.div
            className="flex gap-8 sm:gap-10 lg:gap-12 animate-marquee pr-8 sm:pr-10 lg:pr-12"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {products.slice(0, 8).map((product, index) => (
              <div
                key={`marquee-1-${index}`}
                className="flex-shrink-0 w-64 bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden border border-[#F28C13]/20 hover:border-[#F28C13]/40 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] overflow-hidden bg-[#F4ECE1]">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-['Playfair_Display',Georgia,serif] text-lg font-normal text-[#2B1B12] mb-1.5 line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <p className="font-sans text-xs text-[#2B1B12]/70 leading-relaxed mb-3 line-clamp-2">
                    {product.description || 'Crafted with care and quality ingredients.'}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-sans text-base font-semibold text-[#2B1B12]">
                      {formatProductPrice(product.price)}
                    </span>
                    
                    <button
                      onClick={() => handleOpenProduct(product)}
                      className="w-8 h-8 rounded-full bg-[#F28C13] text-white flex items-center justify-center hover:bg-[#d97706] transition-colors duration-200"
                      aria-label={`View ${product.name}`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Second set of items (for seamless loop) */}
          <motion.div
            className="flex gap-8 sm:gap-10 lg:gap-12 animate-marquee pr-8 sm:pr-10 lg:pr-12"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {products.slice(0, 8).map((product, index) => (
              <div
                key={`marquee-2-${index}`}
                className="flex-shrink-0 w-64 bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden border border-[#F28C13]/20 hover:border-[#F28C13]/40 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] overflow-hidden bg-[#F4ECE1]">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-['Playfair_Display',Georgia,serif] text-lg font-normal text-[#2B1B12] mb-1.5 line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <p className="font-sans text-xs text-[#2B1B12]/70 leading-relaxed mb-3 line-clamp-2">
                    {product.description || 'Crafted with care and quality ingredients.'}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-sans text-base font-semibold text-[#2B1B12]">
                      {formatProductPrice(product.price)}
                    </span>
                    
                    <button
                      onClick={() => handleOpenProduct(product)}
                      className="w-8 h-8 rounded-full bg-[#F28C13] text-white flex items-center justify-center hover:bg-[#d97706] transition-colors duration-200"
                      aria-label={`View ${product.name}`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Third set for extra smoothness */}
          <motion.div
            className="flex gap-8 sm:gap-10 lg:gap-12 animate-marquee pr-8 sm:pr-10 lg:pr-12"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {products.slice(0, 8).map((product, index) => (
              <div
                key={`marquee-3-${index}`}
                className="flex-shrink-0 w-64 bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden border border-[#F28C13]/20 hover:border-[#F28C13]/40 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] overflow-hidden bg-[#F4ECE1]">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-['Playfair_Display',Georgia,serif] text-lg font-normal text-[#2B1B12] mb-1.5 line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <p className="font-sans text-xs text-[#2B1B12]/70 leading-relaxed mb-3 line-clamp-2">
                    {product.description || 'Crafted with care and quality ingredients.'}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-sans text-base font-semibold text-[#2B1B12]">
                      {formatProductPrice(product.price)}
                    </span>
                    
                    <button
                      onClick={() => handleOpenProduct(product)}
                      className="w-8 h-8 rounded-full bg-[#F28C13] text-white flex items-center justify-center hover:bg-[#d97706] transition-colors duration-200"
                      aria-label={`View ${product.name}`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#FFF4E6] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={fadeIn.transition}
            className="max-w-4xl"
          >
            {/* Coffee icon */}
            <div className="mb-6 sm:mb-8">
              <i className="fa-brands fa-java text-5xl sm:text-6xl text-[#F28C13]"></i>
            </div>

            {/* Heading */}
            <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2B1B12] mb-4 sm:mb-5 tracking-tight">
              Come back for more
            </h2>

            {/* Description */}
            <p className="font-sans text-base sm:text-lg text-[#2B1B12]/75 font-normal leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              Every visit is a new opportunity to discover your next favorite. From our signature blends to freshly baked pastries, we're here to make each moment special.
            </p>

            {/* Decorative line */}
            <div className="w-16 h-0.5 bg-[#F28C13] mb-8 sm:mb-10" aria-hidden="true" />

            {/* Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl font-['Playfair_Display',Georgia,serif] text-[#F28C13]">
                  Fresh
                </div>
                <p className="font-sans text-sm text-[#2B1B12]/70">
                  Made daily with premium ingredients
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl font-['Playfair_Display',Georgia,serif] text-[#F28C13]">
                  Quality
                </div>
                <p className="font-sans text-sm text-[#2B1B12]/70">
                  Handcrafted with care and expertise
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl font-['Playfair_Display',Georgia,serif] text-[#F28C13]">
                  Warmth
                </div>
                <p className="font-sans text-sm text-[#2B1B12]/70">
                  A welcoming atmosphere every time
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-3.5 bg-[#F28C13] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] rounded hover:bg-[#d97706] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] focus-visible:ring-offset-2"
              >
                Order Now
              </button>
              
              <a
                href="/about"
                className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-[#2B1B12] hover:text-[#F28C13] transition-colors duration-150 py-2"
              >
                Learn Our Story <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Trust message */}
            <p className="mt-10 font-sans text-xs text-[#2B1B12]/60 italic">
              Join our community of coffee lovers. Your next favorite is just an order away.
            </p>
          </motion.div>
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

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Menu;
