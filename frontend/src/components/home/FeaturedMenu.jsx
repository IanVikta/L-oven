import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { formatProductPrice } from '../../utils/currency';

// ============================================================================
// TEMPORARY PRODUCT PHOTOGRAPHY FALLBACKS
// Centralized presentation fallback for development until client photography is ready.
// ============================================================================
import croissant1 from '../../assets/cand_croissant1.jpg';
import croissant2 from '../../assets/cand_croissant2.jpg';
import latteArt from '../../assets/cand_latte_art.jpg';
import coffeeArt from '../../assets/cand_coffee_art.jpg';
import toastImg from '../../assets/cand_pastry_coffee.jpg';
import coldBrewImg from '../../assets/cand_table_coffee1.jpg';
import defaultFallback from '../../assets/cand_croissant_cup.jpg';

const FALLBACK_IMAGES = {
  'almond-chocolate-pain-au-chocolat': croissant1,
  'butter-croissant': croissant2,
  'flat-white': coffeeArt,
  'loven-signature-latte': latteArt,
  'sourdough-avocado-toast': toastImg,
  'vanilla-cold-brew': coldBrewImg,
};

const getProductImage = (product) => {
  if (product?.image_url) return product.image_url;
  if (product?.image) return product.image;
  if (product?.slug && FALLBACK_IMAGES[product.slug]) {
    return FALLBACK_IMAGES[product.slug];
  }
  const catSlug = product?.category?.slug || '';
  if (catSlug.includes('bakery')) return croissant1;
  if (catSlug.includes('espresso') || catSlug.includes('coffee')) return latteArt;
  if (catSlug.includes('cold') || catSlug.includes('drink')) return coldBrewImg;
  return defaultFallback;
};

const FeaturedMenu = ({
  products = [],
  loading = false,
  error = null,
  onSelectProduct,
  onRetry,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
  };

  // Up to 3-4 products for the editorial composition hierarchy
  const dominantProduct = products[0];
  const supportingProduct = products[1];
  const featureProduct = products[2];
  const secondaryProduct = products[3];

  return (
    <section
      id="featured-menu"
      aria-labelledby="featured-menu-heading"
      className="bg-[#FAF6F0] text-[#2B1B12] py-20 sm:py-24 lg:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Editorial Header */}
        <div className="max-w-2xl mb-14 sm:mb-16 lg:mb-20">
          <span className="block text-xs sm:text-[13px] font-sans font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-3">
            OUR DAILY FAVOURITES
          </span>
          <h2
            id="featured-menu-heading"
            className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl lg:text-[46px] font-normal leading-[1.18] text-[#2B1B12] mb-4"
          >
            Made for the moment.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#2B1B12]/75 font-normal leading-relaxed max-w-lg">
            Artisanal coffees and freshly baked pastries, prepared in small batches each morning.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" aria-busy="true">
            <div className="lg:col-span-7 bg-[#F4ECE1] rounded aspect-[4/3] sm:aspect-[16/11] animate-pulse" />
            <div className="lg:col-span-5 bg-[#F4ECE1] rounded aspect-[4/3] animate-pulse" />
          </div>
        )}

        {/* Error State */}
        {!loading && error && products.length === 0 && (
          <div className="bg-[#FFF4E6] border border-[#2B1B12]/10 rounded-lg p-8 sm:p-12 text-center max-w-xl mx-auto">
            <p className="font-['Playfair_Display',Georgia,serif] text-xl text-[#2B1B12] mb-2">
              Unable to load today's favourites.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#2B1B12]/70 mb-6">
              Please check your connection or explore our full selection.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="px-6 py-2.5 bg-[#2B1B12] text-[#FFF4E6] text-xs font-sans font-semibold tracking-[0.14em] uppercase rounded hover:bg-[#332017] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
                >
                  RETRY
                </button>
              )}
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.16em] uppercase text-[#2B1B12] hover:text-[#F28C13] transition-colors py-2"
              >
                VIEW FULL MENU <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="bg-[#FFF4E6] border border-[#2B1B12]/10 rounded-lg p-8 sm:p-12 text-center max-w-xl mx-auto">
            <p className="font-['Playfair_Display',Georgia,serif] text-xl text-[#2B1B12] mb-2">
              Our daily selection is being freshly updated.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#2B1B12]/70 mb-6">
              Explore our complete assortment of single-origin coffee and freshly baked pastries.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.16em] uppercase text-[#F28C13] hover:text-[#2B1B12] transition-colors py-2"
            >
              EXPLORE THE FULL MENU <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        {/* Editorial Product Composition */}
        {!loading && products.length > 0 && (
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {/* Top Row: Asymmetric Dominant (Left) + Supporting (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
              {/* Dominant Product (Large scale, prominent editorial focus) */}
              {dominantProduct && (
                <motion.article
                  initial={fadeIn.initial}
                  whileInView={fadeIn.whileInView}
                  viewport={fadeIn.viewport}
                  transition={fadeIn.transition}
                  className="lg:col-span-7 xl:col-span-7 group"
                >
                  <div
                    onClick={() => onSelectProduct?.(dominantProduct)}
                    className="cursor-pointer overflow-hidden rounded-md bg-[#F4ECE1] aspect-[4/3] sm:aspect-[16/11] mb-5 sm:mb-6"
                  >
                    <img
                      src={getProductImage(dominantProduct)}
                      alt={`${dominantProduct.name} — fresh artisan specialty at L'Oven`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultFallback;
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="max-w-lg">
                      <h3
                        onClick={() => onSelectProduct?.(dominantProduct)}
                        className="cursor-pointer font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl text-[#2B1B12] group-hover:text-[#F28C13] transition-colors duration-150 mb-2"
                      >
                        {dominantProduct.name}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#2B1B12]/75 font-normal leading-relaxed mb-3">
                        {dominantProduct.description}
                      </p>
                      <span className="font-sans text-xs sm:text-sm font-medium tracking-wide text-[#2B1B12]/70 uppercase">
                        {formatProductPrice(dominantProduct.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProduct?.(dominantProduct)}
                      aria-label={`Select ${dominantProduct.name} to customize and add to cart`}
                      className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded border border-[#2B1B12]/20 bg-[#FAF6F0] hover:bg-[#F28C13] hover:border-[#F28C13] text-[#2B1B12] hover:text-[#FFFFFF] flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </motion.article>
              )}

              {/* Supporting Product (Offset, restrained scale) */}
              {supportingProduct && (
                <motion.article
                  initial={fadeIn.initial}
                  whileInView={fadeIn.whileInView}
                  viewport={fadeIn.viewport}
                  transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
                  className="lg:col-span-5 xl:col-span-5 lg:pt-12 group"
                >
                  <div
                    onClick={() => onSelectProduct?.(supportingProduct)}
                    className="cursor-pointer overflow-hidden rounded-md bg-[#F4ECE1] aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/3] mb-4 sm:mb-5"
                  >
                    <img
                      src={getProductImage(supportingProduct)}
                      alt={`${supportingProduct.name} — fresh specialty item at L'Oven`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultFallback;
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="max-w-md">
                      <h3
                        onClick={() => onSelectProduct?.(supportingProduct)}
                        className="cursor-pointer font-['Playfair_Display',Georgia,serif] text-xl sm:text-2xl text-[#2B1B12] group-hover:text-[#F28C13] transition-colors duration-150 mb-1.5"
                      >
                        {supportingProduct.name}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#2B1B12]/70 font-normal leading-relaxed mb-2.5">
                        {supportingProduct.description}
                      </p>
                      <span className="font-sans text-xs sm:text-sm font-medium tracking-wide text-[#2B1B12]/70 uppercase">
                        {formatProductPrice(supportingProduct.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProduct?.(supportingProduct)}
                      aria-label={`Select ${supportingProduct.name} to customize and add to cart`}
                      className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded border border-[#2B1B12]/20 bg-[#FAF6F0] hover:bg-[#F28C13] hover:border-[#F28C13] text-[#2B1B12] hover:text-[#FFFFFF] flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </motion.article>
              )}
            </div>

            {/* Subtle Editorial Rule Separator */}
            <div className="w-full h-px bg-[#2B1B12]/10" aria-hidden="true" />

            {/* Bottom Row: Large Feature Product (Reverse Stagger or Panoramic Showcase) */}
            {featureProduct && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
                {/* Secondary Product Column (if present) or Narrative */}
                {secondaryProduct ? (
                  <motion.article
                    initial={fadeIn.initial}
                    whileInView={fadeIn.whileInView}
                    viewport={fadeIn.viewport}
                    transition={fadeIn.transition}
                    className="lg:col-span-5 group order-2 lg:order-1"
                  >
                    <div
                      onClick={() => onSelectProduct?.(secondaryProduct)}
                      className="cursor-pointer overflow-hidden rounded-md bg-[#F4ECE1] aspect-[4/3] mb-4 sm:mb-5"
                    >
                      <img
                        src={getProductImage(secondaryProduct)}
                        alt={`${secondaryProduct.name} — fresh specialty item at L'Oven`}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = defaultFallback;
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div className="max-w-md">
                        <h3
                          onClick={() => onSelectProduct?.(secondaryProduct)}
                          className="cursor-pointer font-['Playfair_Display',Georgia,serif] text-xl sm:text-2xl text-[#2B1B12] group-hover:text-[#F28C13] transition-colors duration-150 mb-1.5"
                        >
                          {secondaryProduct.name}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-[#2B1B12]/70 font-normal leading-relaxed mb-2.5">
                          {secondaryProduct.description}
                        </p>
                        <span className="font-sans text-xs sm:text-sm font-medium tracking-wide text-[#2B1B12]/70 uppercase">
                          {formatProductPrice(secondaryProduct.price)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectProduct?.(secondaryProduct)}
                        aria-label={`Select ${secondaryProduct.name} to customize and add to cart`}
                        className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded border border-[#2B1B12]/20 bg-[#FAF6F0] hover:bg-[#F28C13] hover:border-[#F28C13] text-[#2B1B12] hover:text-[#FFFFFF] flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>
                  </motion.article>
                ) : (
                  <div className="hidden lg:block lg:col-span-5 pr-6">
                    <span className="block text-xs font-sans font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-2">
                      MORNING RITUAL
                    </span>
                    <p className="font-['Playfair_Display',Georgia,serif] text-2xl text-[#2B1B12] italic leading-snug">
                      "Every item is crafted with patience, reverence for tradition, and seasonal ingredients."
                    </p>
                  </div>
                )}

                {/* Feature Product (Large Visual Weight on Right) */}
                <motion.article
                  initial={fadeIn.initial}
                  whileInView={fadeIn.whileInView}
                  viewport={fadeIn.viewport}
                  transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
                  className="lg:col-span-7 group order-1 lg:order-2"
                >
                  <div
                    onClick={() => onSelectProduct?.(featureProduct)}
                    className="cursor-pointer overflow-hidden rounded-md bg-[#F4ECE1] aspect-[4/3] sm:aspect-[16/10] mb-5 sm:mb-6"
                  >
                    <img
                      src={getProductImage(featureProduct)}
                      alt={`${featureProduct.name} — fresh specialty item at L'Oven`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultFallback;
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="max-w-lg">
                      <h3
                        onClick={() => onSelectProduct?.(featureProduct)}
                        className="cursor-pointer font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl text-[#2B1B12] group-hover:text-[#F28C13] transition-colors duration-150 mb-2"
                      >
                        {featureProduct.name}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#2B1B12]/75 font-normal leading-relaxed mb-3">
                        {featureProduct.description}
                      </p>
                      <span className="font-sans text-xs sm:text-sm font-medium tracking-wide text-[#2B1B12]/70 uppercase">
                        {formatProductPrice(featureProduct.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProduct?.(featureProduct)}
                      aria-label={`Select ${featureProduct.name} to customize and add to cart`}
                      className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded border border-[#2B1B12]/20 bg-[#FAF6F0] hover:bg-[#F28C13] hover:border-[#F28C13] text-[#2B1B12] hover:text-[#FFFFFF] flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </motion.article>
              </div>
            )}

            {/* Bottom Editorial Call To Action */}
            <div className="pt-8 sm:pt-12 text-center">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold tracking-[0.18em] uppercase text-[#2B1B12] hover:text-[#F28C13] transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13] py-2"
              >
                EXPLORE THE FULL MENU <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedMenu;
