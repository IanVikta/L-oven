import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import AOS from 'aos';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import Loading from '../components/common/Loading';
import ProductModal from '../components/products/ProductModal';
import { formatProductPrice } from '../utils/currency';
import { getProductImage } from '../utils/productImages';
import italianCoffee from '../assets/coffee high end/Italian coffee.jpg';
import PopularPicksCarousel from '../components/menu/PopularPicksCarousel';
import ComeBackForMore from '../components/menu/ComeBackForMore';
import BackToTop from '../components/common/BackToTop';

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

  // Recalculate AOS offsets on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        'Failed to load menu items. Please check your connection and try again.';
      setError(errorMsg);
    } finally {
      setLoading(false);
      setTimeout(() => {
        AOS.refreshHard();
      }, 150);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery]);

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

  const handleQuickAdd = (product, e) => {
    e?.stopPropagation?.();
    handleAddToCart(product);
  };

  const groupedProducts = useMemo(() => {
    if (selectedCategory !== 'all') {
      const category = categories.find((item) => item.slug === selectedCategory);
      return [
        {
          key: selectedCategory,
          name: category?.name || 'Selection',
          order: 1,
          products,
        },
      ];
    }

    const groups = [];
    const categoryMap = new Map();

    products.forEach((product) => {
      const category = normalizeCategory(product.category);
      const key = category?.slug || 'other';
      if (!categoryMap.has(key)) {
        categoryMap.set(key, {
          key,
          name: category?.name || 'More to Love',
          order: category?.display_order || 99,
          products: [],
        });
      }
      categoryMap.get(key).products.push(product);
    });

    categories.forEach((category, idx) => {
      if (categoryMap.has(category.slug)) {
        const group = categoryMap.get(category.slug);
        groups.push({
          ...group,
          name: category.name,
          order: category.display_order || idx + 1,
        });
      }
    });

    categoryMap.forEach((group) => {
      if (!groups.some((item) => item.key === group.key)) {
        groups.push(group);
      }
    });

    groups.sort((a, b) => (a.order || 0) - (b.order || 0));
    return groups;
  }, [categories, products, selectedCategory]);

  return (
    <div className="bg-[#FFF4E6] min-h-screen text-[#2B1B12] pb-24 selection:bg-[#F28C13] selection:text-white">
      {/* MAGAZINE EDITORIAL HERO (STYLED AFTER CONTACT PAGE) */}
      <section className="pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-[#2B1B12]/10 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Hero Left: Editorial Narrative & Typography (7 cols) */}
            <div
              className="lg:col-span-7 space-y-6 text-left"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#F28C13]" aria-hidden="true" />
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#F28C13]">
                  OUR MENU &amp; DAILY OFFERINGS
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-['Lora',Georgia,serif] font-medium text-[#2B1B12] leading-[1.1] tracking-tight">
                Made with Love, Served with{' '}
                <span className="italic font-serif text-[#F28C13] block sm:inline">
                  Artisanal Care.
                </span>
              </h1>

              <p className="text-sm md:text-base text-[#2B1B12]/75 max-w-xl font-normal leading-relaxed">
                Handcrafted drinks and freshly baked treats, prepared with the same care and devotion that defines the L'Oven experience. From micro-batch espresso roasts to flaky morning croissants, browse our seasonal selections below.
              </p>
            </div>

            {/* Hero Right: Architectural Photo Showcase (5 cols) */}
            <div
              className="lg:col-span-5 relative"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              {/* Soft Ambient Background Glow */}
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-amber-300/20 rounded-full filter blur-3xl pointer-events-none" />

              {/* Clean Architectural Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200/80 group aspect-[4/5] max-h-[440px] bg-[#2B1B12]/5">
                <img
                  src={italianCoffee}
                  alt="L'Oven Artisanal Coffee Preparation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B12]/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating Architectural Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-amber-200/80 shadow-lg flex items-center justify-between">
                  <div>
                    <p className="font-['Lora',Georgia,serif] text-sm font-medium text-[#2B1B12]">
                      Signature Extraction
                    </p>
                    <p className="font-sans text-[11px] text-[#2B1B12]/60">
                      Crafted daily by our master baristas
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#F28C13] uppercase tracking-wider bg-[#F28C13]/10 px-2.5 py-1 rounded-full">
                    Fresh Daily
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* SECTION 2 — MENU CONTROLS (SEARCH & CATEGORY NAVIGATION) */}
      <div className="border-b border-[#2B1B12]/10 bg-[#FFF4E6]/95 backdrop-blur-md relative md:sticky md:top-20 z-20 shadow-[0_4px_20px_-4px_rgba(43,27,18,0.06)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-3 sm:py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 md:gap-6">
            
            {/* Category Navigation - clean responsive wrapping on all screens */}
            <nav
              role="tablist"
              aria-label="Menu categories"
              className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2 py-1"
            >
              <button
                type="button"
                role="tab"
                id="tab-all"
                aria-selected={selectedCategory === 'all'}
                aria-controls="menu-catalog"
                onClick={() => setSelectedCategory('all')}
                className={`relative py-2 sm:py-2.5 font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] ${
                  selectedCategory === 'all'
                    ? 'text-[#2B1B12]'
                    : 'text-[#2B1B12]/60 hover:text-[#2B1B12]'
                }`}
              >
                ALL
                {selectedCategory === 'all' && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F28C13]"
                    transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                  />
                )}
              </button>

              {categories.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.id || cat.slug}
                    type="button"
                    role="tab"
                    id={`tab-${cat.slug}`}
                    aria-selected={isActive}
                    aria-controls="menu-catalog"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`relative py-2 sm:py-2.5 font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] ${
                      isActive
                        ? 'text-[#2B1B12]'
                        : 'text-[#2B1B12]/60 hover:text-[#2B1B12]'
                    }`}
                  >
                    {cat.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F28C13]"
                        transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Editorial Search Control */}
            <div className="w-full md:w-72 lg:w-80 relative shrink-0">
              <label htmlFor="menu-search-input" className="sr-only">
                Search menu items
              </label>
              <div className="relative flex items-center">
                <svg
                  className="absolute left-3.5 h-4 w-4 text-[#2B1B12]/40 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="m21 21-4.35-4.35m2.1-5.15a7.25 7.25 0 1 1-14.5 0 7.25 7.25 0 0 1 14.5 0Z"
                  />
                </svg>
                <input
                  id="menu-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search coffee, pastry, toast..."
                  className="w-full bg-white/95 border border-[#2B1B12]/15 rounded py-2 sm:py-2.5 pl-10 pr-9 font-sans text-xs sm:text-sm text-[#2B1B12] placeholder:text-[#2B1B12]/45 transition-colors focus:border-[#F28C13] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#F28C13] shadow-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                    className="absolute right-2.5 flex h-7 w-7 items-center justify-center rounded-full text-[#2B1B12]/50 hover:text-[#2B1B12] hover:bg-[#2B1B12]/10 transition-colors text-sm"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 3 & 4 — MAIN EDITORIAL MENU & CATEGORY PRESENTATION */}
      <main id="menu-catalog" className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 lg:pt-16">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loading />
          </div>
        ) : error ? (
          <div
            className="mx-auto max-w-md border border-[#2B1B12]/15 bg-white p-8 text-center sm:p-10 rounded shadow-sm"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <p className="font-['Lora',Georgia,serif] text-xl text-[#2B1B12]">{error}</p>
            <button
              type="button"
              onClick={fetchProducts}
              className="mt-6 inline-flex items-center justify-center rounded bg-[#2B1B12] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#FFF4E6] transition-colors hover:bg-[#F28C13] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
            >
              TRY AGAIN
            </button>
          </div>
        ) : products.length === 0 ? (
          <div
            className="mx-auto max-w-md border border-[#2B1B12]/15 bg-white p-8 text-center sm:p-10 rounded shadow-sm"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <span className="block mb-3 text-3xl font-light text-[#F28C13]" aria-hidden="true">
              ✦
            </span>
            <h3 className="font-['Lora',Georgia,serif] text-2xl font-normal text-[#2B1B12]">
              No items found
            </h3>
            <p className="mt-2 font-sans text-xs sm:text-sm leading-relaxed text-[#2B1B12]/70">
              No menu selections match "{searchQuery}". Try selecting another category or clear your search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-6 inline-flex items-center justify-center rounded bg-[#F28C13] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#d97706] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
            >
              RESET MENU FILTERS
            </button>
          </div>
        ) : (
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {groupedProducts.map((group, groupIdx) => {
              const formattedNumber = String(groupIdx + 1).padStart(2, '0');
              return (
                <section
                  key={group.key}
                  aria-labelledby={`category-heading-${group.key}`}
                  className="space-y-8"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-offset="80"
                >
                  {/* Category Header with Editorial Numbering & Rule */}
                  <div className="flex items-baseline justify-between border-b border-[#2B1B12]/15 pb-4">
                    <div className="flex items-baseline gap-3 sm:gap-4">
                      <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F28C13]">
                        {formattedNumber}
                      </span>
                      <h2
                        id={`category-heading-${group.key}`}
                        className="font-['Lora',Georgia,serif] text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight uppercase text-[#2B1B12]"
                      >
                        {group.name}
                      </h2>
                    </div>
                    <span className="font-sans text-xs text-[#2B1B12]/50 tracking-wider uppercase hidden sm:inline">
                      {group.products.length} {group.products.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  {/* Editorial Product Grid (2 to 3 columns, clean presentation, no giant rounded cards) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                    {group.products.map((product, pIdx) => {
                      const imageSrc = getProductImage(product);
                      const isAdded = addedProductId === product.id;

                      return (
                        <article
                          key={product.id}
                          data-aos="fade-up"
                          data-aos-duration="600"
                          data-aos-offset="40"
                          data-aos-delay={(pIdx % 3) * 100}
                          className="group flex flex-col justify-between"
                        >
                          {/* Top: Product Image with restrained ratio & hover ease */}
                          <div>
                            <div
                              onClick={() => handleOpenProduct(product)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleOpenProduct(product);
                                }
                              }}
                              className="relative aspect-[4/3] w-full overflow-hidden bg-[#2B1B12]/5 cursor-pointer rounded-sm"
                              aria-label={`View details and options for ${product.name}`}
                            >
                              <img
                                src={imageSrc}
                                alt={product.name}
                                loading="lazy"
                                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                              />

                              {product.is_featured && (
                                <span className="absolute top-3 left-3 bg-[#2B1B12] text-[#FFF4E6] px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] rounded-sm">
                                  FAVOURITE
                                </span>
                              )}
                            </div>

                            {/* Product Info: Typography First */}
                            <div className="pt-4 pb-2">
                              <div className="flex items-baseline justify-between gap-4">
                                <h3
                                  onClick={() => handleOpenProduct(product)}
                                  className="font-['Lora',Georgia,serif] text-xl sm:text-[22px] font-normal leading-snug text-[#2B1B12] group-hover:text-[#F28C13] transition-colors cursor-pointer"
                                >
                                  {product.name}
                                </h3>
                              </div>

                              <p className="mt-1.5 font-sans text-xs sm:text-sm text-[#2B1B12]/70 leading-relaxed line-clamp-2">
                                {product.description ||
                                  'Carefully prepared with quality ingredients and served fresh.'}
                              </p>
                            </div>
                          </div>

                          {/* Bottom: Price and Actions */}
                          <div className="pt-4 mt-2 border-t border-[#2B1B12]/10 flex items-center justify-between gap-3">
                            <span className="font-sans text-sm sm:text-base font-semibold text-[#2B1B12] tracking-tight">
                              {formatProductPrice(product.price)}
                            </span>

                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => handleOpenProduct(product)}
                                className="min-h-[44px] px-2.5 py-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-[#2B1B12]/80 hover:text-[#F28C13] underline underline-offset-4 decoration-[#2B1B12]/25 hover:decoration-[#F28C13] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
                              >
                                CUSTOMIZE
                              </button>

                              <button
                                type="button"
                                onClick={(e) => handleQuickAdd(product, e)}
                                disabled={isAdded}
                                aria-label={`Add ${product.name} to order`}
                                className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-sm font-sans text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200 flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] ${
                                  isAdded
                                    ? 'bg-[#F28C13] text-white'
                                    : 'bg-[#2B1B12] text-[#FFF4E6] hover:bg-[#F28C13]'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <svg
                                      className="h-3.5 w-3.5"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2.5"
                                      viewBox="0 0 24 24"
                                      aria-hidden="true"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    <span className="hidden sm:inline">ADDED</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-sm font-light leading-none">+</span>
                                    <span>ADD</span>
                                  </>
                                )}
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

      {/* Redesigned Signature Closing Section — Come Back For More */}
      <ComeBackForMore onOrderNow={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      {/* Product Customization Modal */}
      {/* Product Customization Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
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
