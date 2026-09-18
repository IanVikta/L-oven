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
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Menu;