import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';

// Food and Beverage Showcase Assets (Pure product photography, no people)
import icecreamImg from '../../assets/fulfilment/icecream.jpg';
import skewersImg from '../../assets/fulfilment/skewers.jpg';
import coffeesImg from '../../assets/fulfilment/coffees.jpg';
import lattesImg from '../../assets/fulfilment/lattes.jpg';
import bitesImg from '../../assets/fulfilment/bites.jpg';


const FULFILMENT_MODES = [
  {
    id: 'dine_in',
    number: '01',
    title: 'DINE IN',
    tagline: 'Take your time.',
    description: 'Savor artisanal coffees, flame-grilled skewers and handcrafted gelato in our ambient dining sanctuary.',
  },
  {
    id: 'takeaway',
    number: '02',
    title: 'TAKEAWAY',
    tagline: 'Made for the way.',
    description: 'Freshly baked viennoiserie, thick creamy shakes and barista extractions packaged swiftly on the go.',
  },
  {
    id: 'delivery',
    number: '03',
    title: 'DELIVERY',
    tagline: 'At your door.',
    description: 'Golden whole herb chicken roasts, gourmet savory bites and chilled beverages delivered fresh to your door.',
  },
];

const SHOWCASE_ITEMS = [
  {
    id: 'icecream',
    name: 'Artisanal Ice Cream',
    subtitle: 'House-churned creamy gelato with waffle crisps',
    badge: 'GELATO & SWEETS',
    modeId: 'dine_in',
    image: icecreamImg,
    alt: 'Artisanal gelato ice cream scoops in a ceramic bowl with waffle wafer',
  },
  {
    id: 'skewers',
    name: 'Flame-Grilled Skewers',
    subtitle: 'Tender marinated meat & vegetable skewers with chimichurri',
    badge: 'GRILL & SAVORY',
    modeId: 'dine_in',
    image: skewersImg,
    alt: 'Sizzling flame-grilled savory skewers on rustic wooden platter',
  },
  {
    id: 'coffees',
    name: 'Specialty Coffees',
    subtitle: 'Single-origin extractions & slow cold brews',
    badge: 'ROASTERY EXTRACTIONS',
    modeId: 'dine_in',
    image: coffeesImg,
    alt: 'Freshly brewed single-origin specialty black coffee',
  },
  {
    id: 'lattes',
    name: 'Handcrafted Lattes',
    subtitle: 'Silky microfoam with intricate floral latte art',
    badge: 'ESPRESSO BAR',
    modeId: 'takeaway',
    image: lattesImg,
    alt: 'Velvety latte art in an artisanal ceramic cup',
  },
  {
    id: 'bites',
    name: 'Fresh Bites & Pastries',
    subtitle: 'Warm golden croissants & flaky chef bites',
    badge: 'DAILY BAKERY',
    modeId: 'takeaway',
    image: bitesImg,
    alt: 'Fresh golden flaky croissants and artisanal bakery pastries',
  },
];

const CYCLE_DURATION = 3500; // 3.5 seconds per showcase slide
const RESUME_DELAY = 6000; // 6 seconds after user interaction

const Fulfilment = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const resumeTimeoutRef = useRef(null);
  const lastTimeRef = useRef(null);

  const currentItem = SHOWCASE_ITEMS[activeItemIndex];
  const activeModeIndex = FULFILMENT_MODES.findIndex((m) => m.id === currentItem.modeId);
  const activeMode = FULFILMENT_MODES[activeModeIndex >= 0 ? activeModeIndex : 0];

  const handleSelectMode = useCallback((modeIndex) => {
    const targetMode = FULFILMENT_MODES[modeIndex];
    // Find the first showcase item belonging to this mode
    const matchingItemIndex = SHOWCASE_ITEMS.findIndex((item) => item.modeId === targetMode.id);
    if (matchingItemIndex >= 0) {
      setActiveItemIndex(matchingItemIndex);
    }
    setProgress(0);
    setIsUserPaused(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserPaused(false);
      setProgress(0);
    }, RESUME_DELAY);
  }, []);

  const handleSelectItem = useCallback((itemIndex) => {
    setActiveItemIndex(itemIndex);
    setProgress(0);
    setIsUserPaused(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserPaused(false);
      setProgress(0);
    }, RESUME_DELAY);
  }, []);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    if (shouldReduceMotion) return;

    let animId;
    lastTimeRef.current = performance.now();

    const step = (now) => {
      const delta = now - (lastTimeRef.current || now);
      lastTimeRef.current = now;

      const isPaused = isUserPaused || isFocused;

      if (!isPaused) {
        setProgress((prev) => {
          const next = prev + (delta / CYCLE_DURATION) * 100;
          if (next >= 100) {
            setActiveItemIndex((current) => (current + 1) % SHOWCASE_ITEMS.length);
            return 0;
          }
          return next;
        });
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [shouldReduceMotion, isUserPaused, isFocused]);

  return (
    <section
      id="fulfilment"
      aria-labelledby="fulfilment-heading"
      className="bg-[#FFFFFF] text-[#2B1B12] py-20 sm:py-28 lg:py-36 selection:bg-[#F28C13] selection:text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
        {/* Editorial Two-Column Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* LEFT SIDE: Typography & Fulfilment Selector (~45%) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <span className="block font-sans text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#F28C13] uppercase mb-4 sm:mb-5">
                THREE WAYS TO ENJOY L'OVEN
              </span>

              <h2
                id="fulfilment-heading"
                className="font-['Cormorant_Garamond',Georgia,serif] text-4xl sm:text-5xl lg:text-6xl text-[#2B1B12] font-normal leading-[1.08] tracking-tight mb-4 sm:mb-5"
              >
                Your L'Oven,<br />
                your way.
              </h2>

              <p className="font-sans text-base sm:text-lg text-[#2B1B12]/75 font-normal leading-relaxed max-w-md">
                Three ways to enjoy what we make fresh every day.
              </p>
            </div>

            {/* Fulfilment Selector List */}
            <div
              role="tablist"
              aria-label="Fulfilment options"
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="border-t border-[#2B1B12]/10"
            >
              {FULFILMENT_MODES.map((mode, index) => {
                const isActive = mode.id === activeMode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    role="tab"
                    id={`tab-${mode.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${mode.id}`}
                    tabIndex={0}
                    onClick={() => handleSelectMode(index)}
                    className={`w-full text-left py-5 sm:py-6 border-b border-[#2B1B12]/10 transition-colors duration-200 group flex items-baseline gap-6 sm:gap-8 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] rounded-sm cursor-pointer ${isActive ? 'text-[#2B1B12]' : 'text-[#2B1B12]/50 hover:text-[#2B1B12]/80'
                      }`}
                  >
                    {/* Number */}
                    <span
                      className={`font-sans text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-200 w-6 flex-shrink-0 ${isActive ? 'text-[#F28C13]' : 'text-[#2B1B12]/40 group-hover:text-[#F28C13]/70'
                        }`}
                    >
                      {mode.number}
                    </span>

                    {/* Mode Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <span
                          className={`font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-colors duration-200 ${isActive ? 'text-[#2B1B12]' : 'text-[#2B1B12]/70 group-hover:text-[#2B1B12]'
                            }`}
                        >
                          {mode.title}
                        </span>

                        {/* Active Mode Indicator */}
                        <span
                          className={`font-sans text-xs font-semibold tracking-[0.16em] uppercase transition-opacity duration-200 ${isActive ? 'text-[#F28C13] opacity-100' : 'opacity-0'
                            }`}
                          aria-hidden="true"
                        >
                          ACTIVE
                        </span>
                      </div>

                      <p
                        className={`font-['Cormorant_Garamond',Georgia,serif] text-xl sm:text-2xl italic font-normal mt-1.5 transition-colors duration-200 ${isActive ? 'text-[#2B1B12]' : 'text-[#2B1B12]/50 group-hover:text-[#2B1B12]/75'
                          }`}
                      >
                        {mode.tagline}
                      </p>
                    </div>

                    {/* Orange Progress Indicator for Active Mode */}
                    {isActive && !shouldReduceMotion && (
                      <div
                        className="absolute -bottom-[1px] left-0 h-[2px] bg-[#F28C13] pointer-events-none"
                        style={{
                          width: `${Math.min(100, Math.max(0, progress))}%`,
                          transition: isUserPaused || isFocused ? 'none' : 'width 60ms linear',
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA for Desktop/Tablet (Below Selector) */}
            <div className="hidden lg:block pt-8 sm:pt-10">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#2B1B12] text-[#FFF4E6] hover:bg-[#F28C13] hover:text-white font-sans text-xs sm:text-sm font-bold tracking-[0.18em] uppercase rounded-sm transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] group"
              >
                <span>ORDER NOW</span>
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: Large Product Showcase Photograph (~55%) */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
            <div
              id={`panel-${currentItem.id}`}
              role="region"
              aria-label="Culinary Offerings Showcase"
              className="relative w-full overflow-hidden rounded-sm bg-[#1E120B] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[16/11] shadow-lg group"
            >
              {/* Image Cross-fade Layer */}
              {SHOWCASE_ITEMS.map((item, index) => {
                const isCurrent = index === activeItemIndex;
                return (
                  <img
                    key={item.id}
                    src={item.image}
                    alt={item.alt}
                    aria-hidden={!isCurrent}
                    className={`absolute inset-0 w-full h-full object-cover object-center ${shouldReduceMotion
                      ? isCurrent
                        ? 'opacity-100 z-10'
                        : 'opacity-0 pointer-events-none z-0'
                      : `transition-opacity duration-700 ease-in-out ${isCurrent
                        ? 'opacity-100 z-10 scale-100'
                        : 'opacity-0 pointer-events-none z-0 scale-105'
                      }`
                      }`}
                  />
                );
              })}

              {/* Bottom Editorial Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#120D0A]/90 via-[#120D0A]/55 to-transparent pt-12 pb-5 px-5 sm:px-7 pointer-events-none">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="inline-block text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.22em] text-[#F28C13] uppercase mb-1">
                      {currentItem.badge}
                    </span>
                    <h3 className="font-['Lora',serif] text-xl sm:text-2xl text-[#FFF4E6] font-normal leading-tight">
                      {currentItem.name}
                    </h3>
                    <p className="text-xs text-[#D4C3B5]/85 font-light mt-0.5 max-w-sm hidden sm:block">
                      {currentItem.subtitle}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick-Pick Offerings Strip (Below Image) */}
            <div className="mt-4 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar scrollbar-hide py-1 text-[11px] text-[#7A695E]">
              {SHOWCASE_ITEMS.map((item, idx) => {
                const isCur = idx === activeItemIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectItem(idx)}
                    className={`px-2 py-1 transition-colors whitespace-nowrap uppercase tracking-wider font-medium cursor-pointer rounded-xs ${isCur
                      ? 'text-[#F28C13] bg-[#F28C13]/10 font-semibold'
                      : 'hover:text-[#2B1B12]'
                      }`}
                  >
                    {item.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Mobile CTA (Below the Photograph) */}
            <div className="lg:hidden pt-6 text-center sm:text-left">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#2B1B12] text-[#FFF4E6] hover:bg-[#F28C13] hover:text-white font-sans text-xs sm:text-sm font-bold tracking-[0.18em] uppercase rounded-sm transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] group"
              >
                <span>ORDER NOW</span>
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Fulfilment;
