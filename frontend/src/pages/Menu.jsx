import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import Loading from '../components/common/Loading';
import ProductModal from '../components/products/ProductModal';
import PopularPicksCarousel from '../components/menu/PopularPicksCarousel';
import BackToTop from '../components/common/BackToTop';
import { formatProductPrice } from '../utils/currency';

import heroImage from '../assets/hero_coffee_croissant.jpg';
import latteArt from '../assets/cand_latte_art.jpg';
import coffeeArt from '../assets/cand_coffee_art.jpg';
import coffeeBeansCup from '../assets/cand_coffee_beans_cup.jpg';
import artisanButterCroissant from '../assets/artisan_butter_croissant.jpg';
import almondPainAuChocolat from '../assets/almond_pain_au_chocolat.jpg';
import sourdoughAvocadoToast from '../assets/sourdough_avocado_toast.jpg';
import artisanVanillaColdBrew from '../assets/artisan_vanilla_cold_brew.jpg';
import bakeryBread from '../assets/cand_bakery.jpg';
import tableCoffee from '../assets/cand_table_coffee1.jpg';
import defaultFallback from '../assets/cand_croissant_cup.jpg';

const FALLBACK_IMAGES = {
  'flat-white': coffeeArt,
  'loven-signature-latte': latteArt,
  'vanilla-cold-brew': artisanVanillaColdBrew,
  'butter-croissant': artisanButterCroissant,
  'almond-chocolate-pain-au-chocolat': almondPainAuChocolat,
  'sourdough-avocado-toast': sourdoughAvocadoToast,
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
  if (slug.includes('sandwich') || slug.includes('toast')) return sourdoughAvocadoToast;
  if (slug.includes('bakery') || slug.includes('pastr')) return artisanButterCroissant;
  if (slug.includes('tea') || slug.includes('matcha')) return latteArt;
  if (slug.includes('cold') || slug.includes('drink')) return artisanVanillaColdBrew;
  if (slug.includes('coffee') || slug.includes('espresso')) return coffeeArt;
  if (slug.includes('treat') || slug.includes('cake')) return almondPainAuChocolat;
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

const CATEGORY_META = {
  'espresso-coffee': {
    index: '01',
    subtitle: 'Morning classics & artisan roasts',
    badgeText: 'HOUSE FAVORITE',
    featuredSlug: 'loven-signature-latte',
  },
  'cold-brew-drinks': {
    index: '02',
    subtitle: 'Slow-steeped & refreshing chillers',
    badgeText: 'SLOW STEEPED',
    featuredSlug: 'vanilla-cold-brew',
  },
  'fresh-bakery': {
    index: '03',
    subtitle: 'Handcrafted daily & fresh from the oven',
    badgeText: 'BAKED FRESH',
    featuredSlug: 'butter-croissant',
  },
  'sandwiches-toast': {
    index: '04',
    subtitle: 'Wholesome, savory & made to order',
    badgeText: "CHEF'S SELECTION",
    featuredSlug: 'sourdough-avocado-toast',
  },
};

const getCategoryMeta = (slug, index) => {
  if (slug && CATEGORY_META[slug]) return CATEGORY_META[slug];
  const num = String(index + 1).padStart(2, '0');
  return {
    index: num,
    subtitle: 'Artisanal cafe selections',
    badgeText: 'HOUSE SPECIALTY',
    featuredSlug: null,
  };
};

const isCustomizable = (product) => {
  if (!product) return false;
  if (product.variants && product.variants.length > 1) return true;
  const categorySlug = (product.category?.slug || '').toLowerCase();
  const productSlug = (product.slug || '').toLowerCase();
  if (
    categorySlug.includes('coffee') ||
    categorySlug.includes('espresso') ||
    categorySlug.includes('brew') ||
    categorySlug.includes('drink') ||
    categorySlug.includes('sandwich') ||
    categorySlug.includes('toast') ||
    productSlug.includes('sandwich') ||
    productSlug.includes('toast')
  ) {
    return true;
  }
  return false;
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
  const [addedProductId, setAddedProductId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

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

  const handleAddToCart = useCallback((product) => {
    addToCart(product);
    setAddedProductId(product.id);
    setToastMessage(`${product.name} added to cart`);
    setTimeout(() => setAddedProductId(null), 1800);
    setTimeout(() => setToastMessage(null), 2500);
  }, [addToCart]);

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

      {/* ─── OUR MENU ─── */}
      <section className="bg-[#FFF4E6] pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-28 lg:pb-12" aria-labelledby="menu-heading">

        {/* Section intro */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-5">
              <motion.div
                initial={shouldReduceMotion ? {} : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className="h-[2px] w-10 origin-left bg-[#F28C13]"
                aria-hidden="true"
              />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#F28C13] sm:text-xs">
                Our Menu
              </span>
            </div>
            <h2
              id="menu-heading"
              className="font-['Playfair_Display',Georgia,serif] text-[36px] font-normal leading-[1.1] tracking-[-0.02em] text-[#2B1B12] sm:text-5xl lg:text-[56px]"
            >
              Made with love,<br className="hidden sm:block" /> served with care.
            </h2>
            <p className="mt-5 max-w-xl font-sans text-[15px] leading-[1.7] text-[#2B1B12]/60 sm:text-base">
              Handcrafted drinks and freshly baked treats, prepared with the same care that defines the L'Oven experience.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-md sm:mt-12"
          >
            <label className="sr-only" htmlFor="menu-search">Search the menu</label>
            <div className="relative">
              <input
                id="menu-search"
                type="search"
                placeholder="Search coffee, pastry, cold brew..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#2B1B12]/10 bg-white py-3 pl-10 pr-10 font-sans text-sm text-[#2B1B12] shadow-[0_1px_3px_rgba(43,27,18,0.04)] transition-all duration-200 placeholder:text-[#2B1B12]/30 focus:border-[#F28C13] focus:outline-none focus:shadow-[0_0_0_3px_rgba(242,140,19,0.08)]"
              />
              <svg className="pointer-events-none absolute left-3 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#2B1B12]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m21 21-4.35-4.35m2.1-5.15a7.25 7.25 0 1 1-14.5 0 7.25 7.25 0 0 1 14.5 0Z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[#2B1B12]/35 transition-colors hover:bg-[#2B1B12]/8 hover:text-[#2B1B12]"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
            {searchQuery.trim() && !loading && !error && products.length > 0 && (
              <p className="mt-2.5 font-sans text-[13px] text-[#2B1B12]/40">
                {products.length} result{products.length !== 1 ? 's' : ''} for &ldquo;{searchQuery.trim()}&rdquo;
              </p>
            )}
          </motion.div>
        </div>

        {/* Category navigation — sticky below navbar */}
        <div className="sticky top-20 z-30 mt-10 bg-[#FFF4E6] sm:mt-12">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <nav
              className="relative border-b border-[#2B1B12]/8"
              role="tablist"
              aria-label="Menu categories"
            >
              {/* Mobile scroll-fade indicators */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-6 bg-gradient-to-r from-[#FFF4E6] to-transparent sm:hidden" aria-hidden="true" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-6 bg-gradient-to-l from-[#FFF4E6] to-transparent sm:hidden" aria-hidden="true" />

              <div className="scrollbar-hide -mb-px flex gap-0 overflow-x-auto">
                {/* All Items */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'all'}
                  onClick={() => setSelectedCategory('all')}
                  className={`relative whitespace-nowrap px-4 py-3.5 font-sans text-[13px] tracking-[0.01em] transition-colors duration-200 sm:px-5 ${
                    selectedCategory === 'all'
                      ? 'font-semibold text-[#2B1B12]'
                      : 'font-medium text-[#2B1B12]/40 hover:text-[#2B1B12]/70'
                  }`}
                >
                  All Items
                  {selectedCategory === 'all' && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#F28C13] sm:left-5 sm:right-5"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                {categories.map((cat) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === cat.slug}
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`relative whitespace-nowrap px-4 py-3.5 font-sans text-[13px] tracking-[0.01em] transition-colors duration-200 sm:px-5 ${
                      selectedCategory === cat.slug
                        ? 'font-semibold text-[#2B1B12]'
                        : 'font-medium text-[#2B1B12]/40 hover:text-[#2B1B12]/70'
                    }`}
                  >
                    {cat.name}
                    {selectedCategory === cat.slug && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#F28C13] sm:left-5 sm:right-5"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Products */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mt-12 sm:mt-14 lg:mt-16">
            {loading ? (
              <Loading />
            ) : error ? (
              /* Error state */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="py-20 text-center"
              >
                <svg className="mx-auto mb-4 h-10 w-10 text-[#F28C13]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                <p className="font-['Playfair_Display',Georgia,serif] text-lg text-[#2B1B12] sm:text-xl">{error}</p>
                <button
                  type="button"
                  onClick={fetchProducts}
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#2B1B12] px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#FFF4E6] transition-colors duration-200 hover:bg-[#3d2a1f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Try Again
                </button>
              </motion.div>
            ) : products.length === 0 ? (
              /* Empty state */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="py-20 text-center"
              >
                <svg className="mx-auto mb-4 h-10 w-10 text-[#2B1B12]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                <p className="font-['Playfair_Display',Georgia,serif] text-lg text-[#2B1B12] sm:text-xl">
                  {searchQuery.trim() ? <>No results for &ldquo;{searchQuery.trim()}&rdquo;</> : 'No items found'}
                </p>
                <p className="mt-2 font-sans text-sm text-[#2B1B12]/40">
                  {searchQuery.trim()
                    ? 'Try searching for latte, espresso, pastry, or sandwich.'
                    : 'Try selecting another category or clearing your filters.'}
                </p>
                <button
                  type="button"
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="mt-6 rounded-md bg-[#F28C13] px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-[#d97706] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              /* Product groups — animate on category change */
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory + '|' + searchQuery}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className="space-y-16 sm:space-y-20 lg:space-y-24"
                >
                  {groupedProducts.map((group, groupIndex) => {
                    const meta = getCategoryMeta(group.key, groupIndex);
                    const isSingle = group.products.length === 1;
                    const isDouble = group.products.length === 2;

                    return (
                      <motion.section
                        key={group.key}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : Math.min(groupIndex * 0.05, 0.15), ease: [0.16, 1, 0.3, 1] }}
                        aria-labelledby={`category-${group.key}`}
                      >
                        {/* Category header with editorial index & narrative subtitle */}
                        <div className="mb-8 sm:mb-10">
                          <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3">
                            <div className="flex items-baseline gap-3 sm:gap-4">
                              <span className="font-sans text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#F28C13]" aria-hidden="true">
                                {meta.index}
                              </span>
                              <h3
                                id={`category-${group.key}`}
                                className="font-['Playfair_Display',Georgia,serif] text-xl sm:text-2xl font-medium tracking-[-0.01em] text-[#2B1B12]"
                              >
                                {group.name}
                              </h3>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="hidden sm:inline-block font-sans text-xs italic text-[#2B1B12]/45">
                                {meta.subtitle}
                              </span>
                              <span className="font-sans text-[11px] font-semibold tracking-wider text-[#2B1B12]/45 uppercase bg-[#2B1B12]/5 px-2.5 py-0.5 rounded">
                                {group.products.length} {group.products.length === 1 ? 'item' : 'items'}
                              </span>
                            </div>
                          </div>
                          <motion.div
                            initial={shouldReduceMotion ? {} : { scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="h-px w-full origin-left bg-[#2B1B12]/10"
                            aria-hidden="true"
                          />
                        </div>

                        {/* Dynamic Editorial Grid */}
                        {isSingle ? (
                          /* 1 Product: Editorial Spotlight Showcase */
                          (() => {
                            const product = group.products[0];
                            const canCustomize = isCustomizable(product);
                            return (
                              <motion.article
                                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-30px' }}
                                transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                                className="group/card mx-auto max-w-4xl overflow-hidden rounded-lg bg-white transition-all duration-400 ease-out shadow-[0_1px_3px_rgba(43,27,18,0.04)] hover:shadow-[0_16px_36px_-10px_rgba(43,27,18,0.12)] hover:-translate-y-0.5 border border-[#2B1B12]/6 flex flex-col md:flex-row md:items-stretch"
                              >
                                {/* Photo Container (50% on desktop) */}
                                <div className="relative md:w-1/2 overflow-hidden bg-[#F4ECE1] min-h-[240px] md:min-h-0">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenProduct(product)}
                                    className="block absolute inset-0 h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F28C13]"
                                    aria-label={`View ${product.name} details`}
                                  >
                                    <img
                                      src={getProductImage(product)}
                                      alt={product.name}
                                      loading="lazy"
                                      onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = defaultFallback;
                                      }}
                                      className="h-full w-full object-cover object-center transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.035]"
                                    />
                                  </button>
                                  <span className="absolute left-3.5 top-3.5 z-10 rounded bg-[#2B1B12]/85 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#FFF4E6] backdrop-blur-sm">
                                    {meta.badgeText || 'SIGNATURE SELECTION'}
                                  </span>
                                </div>

                                {/* Information Container */}
                                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7 md:p-8 md:w-1/2">
                                  <div>
                                    <div className="mb-2 flex items-center justify-between">
                                      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F28C13]">
                                        {product.category?.name || group.name}
                                      </span>
                                      {product.prep_time_mins && (
                                        <span className="font-sans text-[11px] font-medium text-[#2B1B12]/45">
                                          {product.prep_time_mins} min craft
                                        </span>
                                      )}
                                    </div>

                                    <h4
                                      onClick={() => handleOpenProduct(product)}
                                      className="cursor-pointer font-['Playfair_Display',Georgia,serif] text-2xl sm:text-[26px] font-medium leading-snug tracking-[-0.01em] text-[#2B1B12] transition-colors hover:text-[#F28C13]"
                                    >
                                      {product.name}
                                    </h4>

                                    <p className="mt-2.5 font-sans text-sm leading-relaxed text-[#2B1B12]/65">
                                      {product.description || 'Carefully prepared with premium ingredients, crafted fresh for your enjoyment.'}
                                    </p>

                                    <div className="mt-4 flex items-baseline gap-3">
                                      <span className="font-sans text-xl sm:text-2xl font-bold text-[#2B1B12]">
                                        {formatProductPrice(product.price)}
                                      </span>
                                      <span className="font-sans text-xs text-[#2B1B12]/40">
                                        Handcrafted to order
                                      </span>
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="mt-6 flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(43,27,18,0.06)' }}>
                                    {canCustomize && (
                                      <button
                                        type="button"
                                        onClick={() => handleOpenProduct(product)}
                                        className="inline-flex items-center justify-center rounded border border-[#2B1B12]/20 bg-white px-4 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2B1B12] transition-all duration-200 hover:border-[#F28C13] hover:bg-[#F28C13] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] focus-visible:ring-offset-2 active:scale-[0.97]"
                                      >
                                        Customise
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => handleAddToCart(product)}
                                      disabled={addedProductId === product.id}
                                      className={`group/btn relative ${canCustomize ? 'ml-auto' : 'w-full sm:w-auto ml-auto'} inline-flex items-center justify-center overflow-hidden rounded border border-transparent px-6 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] focus-visible:ring-offset-2 ${
                                        addedProductId === product.id
                                          ? 'bg-[#2B1B12] text-[#FFF4E6]'
                                          : 'bg-[#2B1B12] text-white hover:border-[#F28C13] hover:bg-[#F28C13] active:scale-[0.97]'
                                      }`}
                                    >
                                      {addedProductId === product.id ? (
                                        <span className="inline-flex items-center gap-1.5">
                                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                          Added
                                        </span>
                                      ) : (
                                        <>
                                          <span className="transition-all duration-200 group-hover/btn:opacity-0 group-hover/btn:scale-75">
                                            ADD TO CART
                                          </span>
                                          <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 transition-all duration-200 group-hover/btn:opacity-100 group-hover/btn:scale-100 pointer-events-none">
                                            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
                                            </svg>
                                          </span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </motion.article>
                            );
                          })()
                        ) : (
                          /* 2, 3, or 4+ Products: Balanced & Editorial Responsive Grid */
                          <div
                            className={
                              isDouble
                                ? 'mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8'
                                : 'grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7'
                            }
                          >
                            {group.products.map((product, index) => {
                              const canCustomize = isCustomizable(product);
                              const isSignature = product.slug === meta.featuredSlug || product.is_featured;

                              return (
                                <motion.article
                                  key={product.id}
                                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, margin: '-30px' }}
                                  transition={{
                                    duration: shouldReduceMotion ? 0 : 0.4,
                                    delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.2),
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                  className="group/card overflow-hidden rounded-lg bg-white transition-all duration-400 ease-out shadow-[0_1px_3px_rgba(43,27,18,0.04)] hover:shadow-[0_12px_28px_-8px_rgba(43,27,18,0.12)] hover:-translate-y-0.5 border border-[#2B1B12]/6 flex flex-col justify-between"
                                >
                                  {/* Food-first Image with Subtle Hover Zoom */}
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() => handleOpenProduct(product)}
                                      className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F28C13]"
                                      aria-label={`View ${product.name} details`}
                                    >
                                      <div className={`relative ${isDouble ? 'aspect-[16/11]' : 'aspect-[4/3]'} overflow-hidden bg-[#F4ECE1]`}>
                                        <img
                                          src={getProductImage(product)}
                                          alt={product.name}
                                          loading="lazy"
                                          onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = defaultFallback;
                                          }}
                                          className="h-full w-full object-cover object-center transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.035]"
                                        />
                                        {/* Refined signature badge */}
                                        {isSignature && (
                                          <span className="absolute left-3 top-3 rounded bg-[#2B1B12]/85 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[#FFF4E6] backdrop-blur-sm">
                                            {meta.badgeText || 'SIGNATURE'}
                                          </span>
                                        )}
                                      </div>
                                    </button>

                                    {/* Card body */}
                                    <div className="p-5 sm:p-6">
                                      <div className="mb-1.5 flex items-center justify-between">
                                        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F28C13]">
                                          {product.category?.name || group.name}
                                        </span>
                                        {product.prep_time_mins && (
                                          <span className="font-sans text-[10px] font-medium text-[#2B1B12]/35">
                                            {product.prep_time_mins}m
                                          </span>
                                        )}
                                      </div>

                                      <h4
                                        onClick={() => handleOpenProduct(product)}
                                        className="cursor-pointer font-['Playfair_Display',Georgia,serif] text-lg sm:text-[19px] font-medium leading-snug tracking-[-0.01em] text-[#2B1B12] transition-colors hover:text-[#F28C13]"
                                      >
                                        {product.name}
                                      </h4>

                                      <p className="mt-1.5 line-clamp-2 font-sans text-[13px] leading-relaxed text-[#2B1B12]/55">
                                        {product.description || 'Carefully prepared with quality ingredients and served fresh.'}
                                      </p>

                                      <p className="mt-4 font-sans text-base font-bold text-[#2B1B12] sm:text-[17px]">
                                        {formatProductPrice(product.price)}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(43,27,18,0.06)' }}>
                                      {canCustomize ? (
                                        <>
                                          <button
                                            type="button"
                                            onClick={() => handleOpenProduct(product)}
                                            className="inline-flex items-center justify-center rounded border border-[#2B1B12]/20 bg-white px-3.5 py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2B1B12] transition-all duration-200 hover:border-[#F28C13] hover:bg-[#F28C13] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] focus-visible:ring-offset-2 active:scale-[0.97]"
                                          >
                                            Customise
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleAddToCart(product)}
                                            disabled={addedProductId === product.id}
                                            className={`group/btn relative ml-auto inline-flex items-center justify-center overflow-hidden rounded border border-transparent px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] focus-visible:ring-offset-2 ${
                                              addedProductId === product.id
                                                ? 'bg-[#2B1B12] text-[#FFF4E6]'
                                                : 'bg-[#2B1B12] text-white hover:border-[#F28C13] hover:bg-[#F28C13] active:scale-[0.97]'
                                            }`}
                                          >
                                            {addedProductId === product.id ? (
                                              <span className="inline-flex items-center gap-1.5">
                                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                                Added
                                              </span>
                                            ) : (
                                              <>
                                                <span className="transition-all duration-200 group-hover/btn:opacity-0 group-hover/btn:scale-75">
                                                  ADD TO CART
                                                </span>
                                                <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 transition-all duration-200 group-hover/btn:opacity-100 group-hover/btn:scale-100 pointer-events-none">
                                                  <svg
                                                    className="h-4 w-4 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                                                    />
                                                  </svg>
                                                </span>
                                              </>
                                            )}
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          <span className="font-sans text-[11px] font-medium text-[#2B1B12]/40 italic">
                                            Fresh from oven
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => handleAddToCart(product)}
                                            disabled={addedProductId === product.id}
                                            className={`group/btn relative ml-auto inline-flex items-center justify-center overflow-hidden rounded border border-transparent px-5 py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] focus-visible:ring-offset-2 ${
                                              addedProductId === product.id
                                                ? 'bg-[#2B1B12] text-[#FFF4E6]'
                                                : 'bg-[#2B1B12] text-white hover:border-[#F28C13] hover:bg-[#F28C13] active:scale-[0.97]'
                                            }`}
                                          >
                                            {addedProductId === product.id ? (
                                              <span className="inline-flex items-center gap-1.5">
                                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                                Added
                                              </span>
                                            ) : (
                                              <>
                                                <span className="transition-all duration-200 group-hover/btn:opacity-0 group-hover/btn:scale-75">
                                                  ADD TO CART
                                                </span>
                                                <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 transition-all duration-200 group-hover/btn:opacity-100 group-hover/btn:scale-100 pointer-events-none">
                                                  <svg
                                                    className="h-4 w-4 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                                                    />
                                                  </svg>
                                                </span>
                                              </>
                                            )}
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </motion.article>
                              );
                            })}
                          </div>
                        )}
                      </motion.section>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Editorial Bridge to Popular Picks */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-4">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#2B1B12]/10" aria-hidden="true" />
            <span className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2B1B12]/45 text-center">
              EXPLORE EVERYTHING · THEN DISCOVER WHAT PEOPLE LOVE MOST
            </span>
            <div className="h-px flex-1 bg-[#2B1B12]/10" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Timed Product Carousel — Our Popular Picks */}
      <PopularPicksCarousel
        products={products}
        onSelectProduct={handleOpenProduct}
        onAddToCart={handleAddToCart}
        getProductImage={getProductImage}
      />

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

      {/* Cart toast notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-4 right-4 z-50 mx-auto max-w-sm sm:left-auto sm:right-6"
          >
            <div className="flex items-center gap-3 rounded-lg bg-[#2B1B12] px-4 py-3 font-sans text-sm text-[#FFF4E6] shadow-[0_8px_24px_-6px_rgba(43,27,18,0.5)]">
              <svg className="h-4 w-4 flex-shrink-0 text-[#F28C13]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              <span className="flex-1 text-[13px]">{toastMessage}</span>
              <a href="/cart" className="flex-shrink-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#F28C13] transition-colors hover:text-white">
                View Cart
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
