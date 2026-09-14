import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { formatProductPrice } from '../../utils/currency';

import parallaxBg from '../../assets/cand_table_coffee2.jpg';

// Helper image fallback mapping
import latteArt from '../../assets/cand_latte_art.jpg';
import coffeeArt from '../../assets/cand_coffee_art.jpg';
import artisanButterCroissant from '../../assets/artisan_butter_croissant.jpg';
import almondPainAuChocolat from '../../assets/almond_pain_au_chocolat.jpg';
import sourdoughAvocadoToast from '../../assets/sourdough_avocado_toast.jpg';
import artisanVanillaColdBrew from '../../assets/artisan_vanilla_cold_brew.jpg';
import defaultFallback from '../../assets/cand_croissant_cup.jpg';

const FALLBACK_ITEMS = [
  {
    id: 'f1',
    name: "L'Oven Signature Latte",
    slug: 'loven-signature-latte',
    description: 'Double espresso with silky steamed oat milk and a touch of organic madagascar vanilla.',
    price: 18000,
    rating: 4.9,
    reviews_count: 64,
    category: { name: 'Espresso & Coffee', slug: 'espresso-coffee' },
    image_url: latteArt,
    featured: true,
  },
  {
    id: 'f2',
    name: 'Artisan Butter Croissant',
    slug: 'butter-croissant',
    description: 'Flaky, 81-layer french butter croissant baked fresh every morning at dawn.',
    price: 12000,
    rating: 4.95,
    reviews_count: 89,
    category: { name: 'Fresh Bakery', slug: 'fresh-bakery' },
    image_url: artisanButterCroissant,
    featured: true,
  },
  {
    id: 'f3',
    name: 'Vanilla Cold Brew',
    slug: 'vanilla-cold-brew',
    description: '18-hour slow steeped specialty cold brew with house vanilla bean cream.',
    price: 16000,
    rating: 4.85,
    reviews_count: 42,
    category: { name: 'Cold Brew & Drinks', slug: 'cold-brew-drinks' },
    image_url: artisanVanillaColdBrew,
    featured: true,
  },
  {
    id: 'f4',
    name: 'Almond Chocolate Pain au Chocolat',
    slug: 'almond-chocolate-pain-au-chocolat',
    description: 'Crisp sourdough pastry filled with dark belgian chocolate & roasted almond flakes.',
    price: 15000,
    rating: 4.9,
    reviews_count: 53,
    category: { name: 'Fresh Bakery', slug: 'fresh-bakery' },
    image_url: almondPainAuChocolat,
    featured: true,
  },
  {
    id: 'f5',
    name: 'Flat White',
    slug: 'flat-white',
    description: 'Micro-foamed whole milk poured over a ristretto shot of our house espresso bean.',
    price: 15000,
    rating: 4.88,
    reviews_count: 37,
    category: { name: 'Espresso & Coffee', slug: 'espresso-coffee' },
    image_url: coffeeArt,
    featured: true,
  },
  {
    id: 'f6',
    name: 'Sourdough Avocado Toast',
    slug: 'sourdough-avocado-toast',
    description: 'Toasted artisan sourdough topped with smashed avocado, chili flakes & sea salt.',
    price: 22000,
    rating: 4.92,
    reviews_count: 71,
    category: { name: 'Sandwiches & Toast', slug: 'sandwiches-toast' },
    image_url: sourdoughAvocadoToast,
    featured: true,
  },
];

const DISPLAY_DURATION_MS = 3000; // 3 seconds per product
const PROGRESS_TICK_MS = 30; // Update progress bar every 30ms

const PopularPicksCarousel = ({
  products = [],
  onSelectProduct,
  onAddToCart,
  getProductImage,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Parallax background
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['-15%', '15%']
  );

  // Prepare carousel product items (filter featured or top items)
  const carouselItems = useMemo(() => {
    let items = Array.isArray(products) ? products.filter((p) => p?.is_featured || p?.featured) : [];
    if (items.length < 3) {
      items = Array.isArray(products) && products.length >= 3 ? products : [];
    }
    if (items.length === 0) {
      items = FALLBACK_ITEMS;
    }
    return items.slice(0, 8);
  }, [products]);

  const totalItems = carouselItems.length;

  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  const timerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Active, Prev, Next product indices
  const activeProduct = carouselItems[currentIndex] || carouselItems[0];
  const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
  const nextIndex = (currentIndex + 1) % totalItems;
  const prevProduct = carouselItems[prevIndex];
  const nextProduct = carouselItems[nextIndex];

  // Helper for resolving image
  const resolveImage = useCallback(
    (item) => {
      if (getProductImage) {
        return getProductImage(item);
      }
      return item?.image_url || item?.image || defaultFallback;
    },
    [getProductImage]
  );

  // Navigation handlers
  const handleGoTo = useCallback(
    (targetIndex, newDirection = 1) => {
      if (isAnimating || targetIndex === currentIndex || totalItems <= 1) return;
      setIsAnimating(true);
      setDirection(newDirection);
      setCurrentIndex(targetIndex);
      setProgress(0);

      setTimeout(() => {
        setIsAnimating(false);
      }, 550);
    },
    [currentIndex, isAnimating, totalItems]
  );

  const handleNext = useCallback(() => {
    if (totalItems <= 1) return;
    handleGoTo((currentIndex + 1) % totalItems, 1);
  }, [currentIndex, handleGoTo, totalItems]);

  const handlePrev = useCallback(() => {
    if (totalItems <= 1) return;
    handleGoTo((currentIndex - 1 + totalItems) % totalItems, -1);
  }, [currentIndex, handleGoTo, totalItems]);

  // 3-Second Auto-Advance Timer & Progress Bar Loop
  useEffect(() => {
    if (isPaused || totalItems <= 1) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + (PROGRESS_TICK_MS / DISPLAY_DURATION_MS) * 100;
        if (nextProgress >= 100) {
          handleNext();
          return 0;
        }
        return nextProgress;
      });
    }, PROGRESS_TICK_MS);

    timerRef.current = interval;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, handleNext, totalItems]);

  // Handle Add to Cart action with inline visual feedback
  const handleAddToCartClick = (e, product) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
    setAddedItemNotice(product.id);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 1600);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndXRef.current = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    }
  };

  // Staggered text variants for active product information
  const textContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const textItemVariant = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Our Popular Picks Carousel"
      className="relative py-14 sm:py-20 lg:py-24 text-[#FFF4E6] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Parallax Background Image */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.img
          src={parallaxBg}
          alt=""
          style={{ y: parallaxY, height: '130%', top: '-15%' }}
          className="absolute left-0 right-0 w-full object-cover object-center pointer-events-none"
        />
        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B1B12]/92 via-[#2B1B12]/80 to-[#1a0f08]/90" />
      </div>

      {/* Background Subtle Accent Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83z' fill='%23F28C13' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
        {/* Header & Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <span className="block font-sans text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-[#F28C13] uppercase mb-3">
              CURATED FAVORITES
            </span>
            <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#FFF4E6]">
              Our Popular <span className="text-[#F28C13]">Picks</span>
            </h2>
          </div>

          {/* Previous / Next Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous product"
              className="w-11 h-11 rounded border border-[#FFF4E6]/20 bg-[#2B1B12] text-[#FFF4E6] flex items-center justify-center hover:bg-[#F28C13] hover:border-[#F28C13] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next product"
              className="w-11 h-11 rounded border border-[#FFF4E6]/20 bg-[#2B1B12] text-[#FFF4E6] flex items-center justify-center hover:bg-[#F28C13] hover:border-[#F28C13] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3-Second Progress Bar Indicator */}
        <div className="w-full bg-[#FFF4E6]/10 h-1 rounded overflow-hidden mb-10 sm:mb-12">
          <div
            className="bg-[#F28C13] h-full transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>

        {/* CAROUSEL STAGE CONTAINER (3D Depth Cards + Staggered Info) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left / Center / Right Product Card Stage (7 cols on desktop) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[340px] sm:min-h-[420px] lg:min-h-[460px]">
            {/* PREVIOUS PRODUCT PREVIEW (DESKTOP) */}
            <div
              onClick={handlePrev}
              className="hidden lg:block absolute left-0 z-10 w-52 opacity-50 scale-[0.82] cursor-pointer transition-all duration-500 hover:opacity-80"
              title={`Previous: ${prevProduct?.name}`}
            >
              <div className="rounded border border-[#FFF4E6]/15 bg-[#1f130c] p-4 shadow-xl">
                <div className="aspect-[4/3] rounded overflow-hidden mb-3 bg-[#2B1B12]">
                  <img
                    src={resolveImage(prevProduct)}
                    alt={prevProduct?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="block font-sans text-[11px] font-medium text-[#FFF4E6]/60 uppercase tracking-wider mb-1">
                  {prevProduct?.category?.name || 'Previous'}
                </span>
                <p className="font-['Playfair_Display',Georgia,serif] text-sm text-[#FFF4E6] line-clamp-1">
                  {prevProduct?.name}
                </p>
              </div>
            </div>

            {/* ACTIVE MAIN HERO PRODUCT CARD (CENTER) */}
            <div className="relative z-20 w-full max-w-sm sm:max-w-md lg:max-w-md mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct?.id || currentIndex}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.88, x: direction * 40 }
                  }
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.88, x: -direction * 40 }
                  }
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded border border-[#F28C13]/30 bg-[#251710] p-5 sm:p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block rounded bg-[#F28C13]/20 border border-[#F28C13]/30 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F28C13]">
                      ⭐ POPULAR PICK
                    </span>
                    <span className="font-sans text-xs text-[#FFF4E6]/60">
                      {currentIndex + 1} / {totalItems}
                    </span>
                  </div>

                  {/* Active Product Image */}
                  <div className="relative aspect-[4/3] rounded overflow-hidden bg-[#1f130c] mb-4 group">
                    <img
                      src={resolveImage(activeProduct)}
                      alt={activeProduct?.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#251710]/80 via-transparent to-transparent opacity-60" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* NEXT PRODUCT PREVIEW (DESKTOP) */}
            <div
              onClick={handleNext}
              className="hidden lg:block absolute right-0 z-10 w-52 opacity-50 scale-[0.82] cursor-pointer transition-all duration-500 hover:opacity-80"
              title={`Next: ${nextProduct?.name}`}
            >
              <div className="rounded border border-[#FFF4E6]/15 bg-[#1f130c] p-4 shadow-xl">
                <div className="aspect-[4/3] rounded overflow-hidden mb-3 bg-[#2B1B12]">
                  <img
                    src={resolveImage(nextProduct)}
                    alt={nextProduct?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="block font-sans text-[11px] font-medium text-[#F28C13] uppercase tracking-wider mb-1">
                  COMING NEXT →
                </span>
                <p className="font-['Playfair_Display',Georgia,serif] text-sm text-[#FFF4E6] line-clamp-1">
                  {nextProduct?.name}
                </p>
              </div>
            </div>
          </div>

          {/* ACTIVE PRODUCT DETAILS & ACTIONS (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct?.id || currentIndex}
                variants={textContainerVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-4 sm:space-y-5"
              >
                {/* Category */}
                <motion.span
                  variants={textItemVariant}
                  className="block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#F28C13]"
                >
                  {activeProduct?.category?.name || 'SPECIALTY ITEM'}
                </motion.span>

                {/* Name */}
                <motion.h3
                  variants={textItemVariant}
                  className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.12] text-[#FFF4E6]"
                >
                  {activeProduct?.name}
                </motion.h3>

                {/* Rating & Reviews */}
                <motion.div variants={textItemVariant} className="flex items-center gap-2">
                  <span className="text-[#F28C13] text-sm">★★★★★</span>
                  <span className="font-sans text-xs font-semibold text-[#FFF4E6]">
                    {activeProduct?.rating || 4.9}
                  </span>
                  <span className="font-sans text-xs text-[#FFF4E6]/50">
                    ({activeProduct?.reviews_count || 48} reviews)
                  </span>
                </motion.div>

                {/* Description */}
                <motion.p
                  variants={textItemVariant}
                  className="font-sans text-sm sm:text-base text-[#FFF4E6]/80 font-normal leading-relaxed max-w-lg"
                >
                  {activeProduct?.description ||
                    'Handcrafted with precision using high-grade ingredients for a remarkable taste.'}
                </motion.p>

                {/* Price */}
                <motion.div variants={textItemVariant} className="pt-1">
                  <span className="block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#FFF4E6]/60 mb-1">
                    PRICE
                  </span>
                  <span className="font-sans text-2xl sm:text-3xl font-bold text-[#F28C13]">
                    {formatProductPrice(activeProduct?.price)}
                  </span>
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={textItemVariant} className="flex flex-wrap items-center gap-4 pt-3">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCartClick(e, activeProduct)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#F28C13] hover:bg-[#d97706] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] rounded transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] focus-visible:ring-offset-2 min-w-[160px]"
                  >
                    {addedItemNotice === activeProduct?.id ? (
                      <>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>ADDED!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
                        </svg>
                        <span>ADD TO CART</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectProduct && onSelectProduct(activeProduct)}
                    className="inline-flex items-center justify-center px-6 py-3.5 border border-[#FFF4E6]/30 hover:border-[#F28C13] hover:text-[#F28C13] text-[#FFF4E6] font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] rounded transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
                  >
                    CUSTOMIZE
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* UPCOMING PRODUCT THUMBNAILS ROW */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#FFF4E6]/10">
          <span className="block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#FFF4E6]/60 mb-4">
            ALL FEATURED SELECTIONS
          </span>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
            {carouselItems.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id || idx}
                  type="button"
                  onClick={() => handleGoTo(idx, idx > currentIndex ? 1 : -1)}
                  className={`group relative rounded overflow-hidden border p-2 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] ${isActive
                      ? 'border-[#F28C13] bg-[#251710] shadow-md shadow-[#F28C13]/10 scale-105'
                      : 'border-[#FFF4E6]/15 bg-[#1f130c]/70 hover:border-[#F28C13]/50 hover:bg-[#251710]/70'
                    }`}
                  aria-label={`Select ${item.name}`}
                  aria-selected={isActive}
                >
                  <div className="aspect-[4/3] rounded overflow-hidden mb-2 bg-[#2B1B12]">
                    <img
                      src={resolveImage(item)}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p
                    className={`font-['Playfair_Display',Georgia,serif] text-xs line-clamp-1 ${isActive ? 'text-[#F28C13] font-medium' : 'text-[#FFF4E6]/80'
                      }`}
                  >
                    {item.name}
                  </p>

                  {/* Active bottom indicator line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F28C13]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularPicksCarousel;
