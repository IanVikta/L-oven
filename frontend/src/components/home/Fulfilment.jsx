import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';

// Existing photography assets from project assets
import dineInImg from '../../assets/cand_table_coffee2.jpg';
import takeawayImg from '../../assets/cand_coffee_table.jpg';
import deliveryImg from '../../assets/cand_croissant_table.jpg';

const FULFILMENT_MODES = [
  {
    id: 'dine_in',
    number: '01',
    title: 'DINE IN',
    tagline: 'Take your time.',
    image: dineInImg,
    alt: 'Ceramic cups of coffee served at a relaxed wooden café table with greenery',
  },
  {
    id: 'takeaway',
    number: '02',
    title: 'TAKEAWAY',
    tagline: 'Made for the way.',
    image: takeawayImg,
    alt: 'Takeaway coffee cups prepared to go from the café espresso bar',
  },
  {
    id: 'delivery',
    number: '03',
    title: 'DELIVERY',
    tagline: 'At your door.',
    image: deliveryImg,
    alt: 'Freshly baked artisanal pastries and café order packaged for delivery to your doorstep',
  },
];

const CYCLE_DURATION = 4500; // 4.5 seconds per mode
const RESUME_DELAY = 6000; // 6 seconds after user interaction

const Fulfilment = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const resumeTimeoutRef = useRef(null);
  const lastTimeRef = useRef(null);

  const handleSelectMode = useCallback((index) => {
    setActiveIndex(index);
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
            setActiveIndex((current) => (current + 1) % FULFILMENT_MODES.length);
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

  const activeMode = FULFILMENT_MODES[activeIndex];

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
                className="font-['Playfair_Display',Georgia,serif] text-4xl sm:text-5xl lg:text-6xl text-[#2B1B12] font-normal leading-[1.08] tracking-tight mb-4 sm:mb-5"
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
                const isActive = index === activeIndex;
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
                    className={`w-full text-left py-5 sm:py-6 border-b border-[#2B1B12]/10 transition-colors duration-200 group flex items-baseline gap-6 sm:gap-8 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] rounded-sm ${
                      isActive ? 'text-[#2B1B12]' : 'text-[#2B1B12]/50 hover:text-[#2B1B12]/80'
                    }`}
                  >
                    {/* Number */}
                    <span
                      className={`font-sans text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-200 w-6 flex-shrink-0 ${
                        isActive ? 'text-[#F28C13]' : 'text-[#2B1B12]/40 group-hover:text-[#F28C13]/70'
                      }`}
                    >
                      {mode.number}
                    </span>

                    {/* Mode Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <span
                          className={`font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-colors duration-200 ${
                            isActive ? 'text-[#2B1B12]' : 'text-[#2B1B12]/70 group-hover:text-[#2B1B12]'
                          }`}
                        >
                          {mode.title}
                        </span>

                        {/* Subtle Active Indicator */}
                        <span
                          className={`font-sans text-xs font-semibold tracking-[0.16em] uppercase transition-opacity duration-200 ${
                            isActive ? 'text-[#F28C13] opacity-100' : 'opacity-0'
                          }`}
                          aria-hidden="true"
                        >
                          ACTIVE
                        </span>
                      </div>

                      <p
                        className={`font-['Playfair_Display',Georgia,serif] text-xl sm:text-2xl italic font-normal mt-1.5 transition-colors duration-200 ${
                          isActive ? 'text-[#2B1B12]' : 'text-[#2B1B12]/50 group-hover:text-[#2B1B12]/75'
                        }`}
                      >
                        {mode.tagline}
                      </p>
                    </div>

                    {/* Thin Orange Progress Indicator for Active Mode */}
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
                className="inline-flex items-center gap-3 font-sans text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#2B1B12] hover:text-[#F28C13] transition-colors duration-150 group border-b border-[#2B1B12]/20 hover:border-[#F28C13] pb-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
              >
                <span>ORDER NOW</span>
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1.5 text-[#F28C13]"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: One Large Contextual Photograph (~55%) */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
            <div
              id={`panel-${activeMode.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeMode.id}`}
              className="relative w-full overflow-hidden rounded-sm bg-[#F4ECE1] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[16/11] shadow-none"
            >
              {FULFILMENT_MODES.map((mode, index) => {
                const isCurrent = index === activeIndex;
                return (
                  <img
                    key={mode.id}
                    src={mode.image}
                    alt={mode.alt}
                    aria-hidden={!isCurrent}
                    className={`absolute inset-0 w-full h-full object-cover object-center ${
                      shouldReduceMotion
                        ? isCurrent
                          ? 'opacity-100 z-10'
                          : 'opacity-0 pointer-events-none z-0'
                        : `transition-opacity duration-500 ease-in-out ${
                            isCurrent
                              ? 'opacity-100 z-10'
                              : 'opacity-0 pointer-events-none z-0'
                          }`
                    }`}
                  />
                );
              })}
            </div>

            {/* Mobile CTA (Below the Photograph) */}
            <div className="lg:hidden pt-8 text-center sm:text-left">
              <Link
                to="/menu"
                className="inline-flex items-center gap-3 font-sans text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#2B1B12] hover:text-[#F28C13] transition-colors duration-150 group border-b border-[#2B1B12]/20 hover:border-[#F28C13] pb-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
              >
                <span>ORDER NOW</span>
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1.5 text-[#F28C13]"
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
