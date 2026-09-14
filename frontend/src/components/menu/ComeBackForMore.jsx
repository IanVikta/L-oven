import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import coffeeVisual from '../../assets/cand_croissant_coffee.jpg';

const ComeBackForMore = ({ onOrderNow }) => {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Restrained scroll-based parallax (subtle depth, disabled on reduced-motion)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageParallax = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-16, 16]
  );
  const textParallax = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -6]
  );

  const easeCurve = [0.16, 1, 0.3, 1];

  const handleOrderClick = () => {
    if (onOrderNow) {
      onOrderNow();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Coordinated staged reveal variants
  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: easeCurve,
      },
    },
  };

  const headlineMaskVariants = {
    hidden: { y: shouldReduceMotion ? 0 : '105%', opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: easeCurve,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="comeback-heading"
      className="relative bg-[#FFF4E6] pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden text-[#2B1B12]"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          
          {/* ── LEFT / MAIN TYPOGRAPHIC & BRAND STORY (lg:col-span-7) ── */}
          <motion.div
            style={{ y: textParallax }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7"
          >
            {/* STAGE 1 & 2: Coffee Emblem with Organic Steam Detail + Eyebrow Tag */}
            <motion.div variants={itemFadeUp} className="flex items-center gap-3.5 mb-5 sm:mb-6">
              
            </motion.div>

            {/* STAGE 3: Masked Split Headline ("COME BACK" / "FOR MORE") */}
            <div className="mb-5 sm:mb-7">
              <h2
                id="comeback-heading"
                className="font-['Playfair_Display',Georgia,serif] text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-normal tracking-[-0.025em] text-[#2B1B12] leading-[1.08]"
              >
                {/* Line 1: COME BACK */}
                <div className="overflow-hidden py-0.5">
                  <motion.div variants={headlineMaskVariants}>
                    Come back
                  </motion.div>
                </div>

                {/* Line 2: FOR MORE */}
                <div className="overflow-hidden py-0.5 mt-0.5 sm:mt-1">
                  <motion.div variants={headlineMaskVariants} className="italic text-[#2B1B12]">
                    for more.
                  </motion.div>
                </div>
              </h2>
            </div>

            {/* STAGE 4: Supporting Paragraph */}
            <motion.p
              variants={itemFadeUp}
              className="font-sans text-[15px] sm:text-base lg:text-[17px] leading-[1.75] text-[#2B1B12]/75 max-w-xl font-normal"
            >
              Every visit is a new opportunity to discover your next favorite.
              From our slow-steeped cold brews and velvety flat whites to warm,
              flaky morning pastries, we're here to make each moment special.
            </motion.p>

            {/* ── MOBILE-ONLY COFFEE VISUAL (Placed between supporting text & values per requirement 24) ── */}
            <div className="block lg:hidden my-8">
              <div className="relative overflow-hidden bg-white p-3 border border-[#2B1B12]/10 shadow-[0_12px_28px_-8px_rgba(43,27,18,0.1)]">
                <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden bg-[#F4ECE1]">
                  <img
                    src={coffeeVisual}
                    alt="Artisanal coffee and pastry at L'Oven"
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* STAGE 5: The Three Brand Values (Fresh, Quality, Warmth) */}
            <motion.div
              variants={itemFadeUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 pt-7 mt-7 sm:pt-8 sm:mt-8 border-t border-[#2B1B12]/10 mb-8 sm:mb-10"
            >
              {/* FRESH */}
              <div className="group">
                <div className="flex items-center gap-2 mb-1.5">
                  <svg
                    className="w-4 h-4 text-[#F28C13] flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 7-7c4 0 9 2 9 7a7 7 0 0 1-9 7z" />
                    <path d="M11 20v-7a4 4 0 0 1 4-4" />
                  </svg>
                  <h3 className="font-['Playfair_Display',Georgia,serif] text-xl sm:text-[22px] font-medium text-[#2B1B12] tracking-tight">
                    Fresh
                  </h3>
                </div>
                <p className="font-sans text-[13px] leading-relaxed text-[#2B1B12]/70 font-normal">
                  Made daily with carefully selected, authentic ingredients.
                </p>
              </div>

              {/* QUALITY */}
              <div className="group">
                <div className="flex items-center gap-2 mb-1.5">
                  <svg
                    className="w-4 h-4 text-[#F28C13] flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="6" />
                    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.204 0l-3.58 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                  </svg>
                  <h3 className="font-['Playfair_Display',Georgia,serif] text-xl sm:text-[22px] font-medium text-[#2B1B12] tracking-tight">
                    Quality
                  </h3>
                </div>
                <p className="font-sans text-[13px] leading-relaxed text-[#2B1B12]/70 font-normal">
                  Thoughtfully prepared with care, precision, and expertise.
                </p>
              </div>

              {/* WARMTH */}
              <div className="group">
                <div className="flex items-center gap-2 mb-1.5">
                  <svg
                    className="w-4 h-4 text-[#F28C13] flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 2v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="M20 12h2" />
                    <path d="m19.07 4.93-1.41 1.41" />
                    <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128 3.5 3.5 0 0 0-3.997 4.198A4 4 0 0 0 8 20h8a4 4 0 0 0 3.974-4.524 3.5 3.5 0 0 0-3.027-2.826" />
                  </svg>
                  <h3 className="font-['Playfair_Display',Georgia,serif] text-xl sm:text-[22px] font-medium text-[#2B1B12] tracking-tight">
                    Warmth
                  </h3>
                </div>
                <p className="font-sans text-[13px] leading-relaxed text-[#2B1B12]/70 font-normal">
                  A genuinely welcoming atmosphere every time you visit.
                </p>
              </div>
            </motion.div>

            {/* STAGE 6: Premium CTA System & Final Invitation Note */}
            <motion.div variants={itemFadeUp} className="space-y-3.5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                {/* Primary CTA: ORDER NOW */}
                <button
                  type="button"
                  onClick={handleOrderClick}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#2B1B12] text-[#FFF4E6] font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] rounded transition-all duration-300 hover:bg-[#3d261a] hover:shadow-[0_8px_20px_-4px_rgba(43,27,18,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  <span>Order Now</span>
                  <svg
                    className="w-4 h-4 text-[#F28C13] transition-transform duration-200 ease-out group-hover:translate-x-1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>

                {/* Secondary CTA: LEARN OUR STORY */}
                <Link
                  to="/about"
                  className="group inline-flex items-center justify-center gap-2 font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-[#2B1B12] hover:text-[#F28C13] transition-colors duration-200 py-3 px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] rounded"
                >
                  <span>Learn Our Story</span>
                  <span
                    aria-hidden="true"
                    className="text-base transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT / ASYMMETRIC EDITORIAL COFFEE STILL-LIFE (DESKTOP) ── */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <motion.div
              style={{ y: imageParallax }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Refined Photographic Frame with Clean Mat */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.8,
                  delay: shouldReduceMotion ? 0 : 0.15,
                  ease: easeCurve,
                }}
                className="relative overflow-hidden bg-white p-3.5 xl:p-4 border border-[#2B1B12]/10 shadow-[0_18px_48px_-12px_rgba(43,27,18,0.12)]"
              >
                {/* Image Container with Controlled Clip & Reveal */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4ECE1]">
                  <motion.img
                    src={coffeeVisual}
                    alt="Artisanal espresso and freshly prepared coffee moment at L'Oven"
                    loading="lazy"
                    initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.05 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 1.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                </div>
              </motion.div>

              {/* SLOW ROTATING CIRCULAR "RETURN" BADGE MOTIF */}
              <div
                className="absolute -bottom-6 -right-6 xl:-right-8 w-28 h-28 items-center justify-center pointer-events-none select-none flex"
                aria-hidden="true"
              >
                {/* Circular Spinning Text */}
                <motion.div
                  animate={shouldReduceMotion ? {} : { rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
                  className="w-full h-full"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      id="circleTextPath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="font-sans text-[8.5px] uppercase tracking-[0.24em] fill-[#2B1B12]/75 font-semibold">
                      <textPath href="#circleTextPath" startOffset="0%">
                        • COFFEE • COMFORT • CONNECTION • REPEAT
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                {/* Center Wheat Stamp */}
                <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#FFF4E6] border border-[#F28C13]/40 flex items-center justify-center text-[#F28C13] shadow-sm">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M12 2v20M8 5c1 1 2.5 1.5 4 1.5M16 5c-1 1-2.5 1.5-4 1.5M7 9c1.2 1 3 1.5 5 1.5M17 9c-1.2 1-3 1.5-5 1.5M8 17c1 1 2.5 1.2 4 1.2M16 17c-1 1-2.5 1.2-4 1.2" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── ARCHITECTURAL TRANSITION INTO FOOTER ── */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-7 border-t border-[#2B1B12]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Understated Community Tag */}
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F28C13]" aria-hidden="true" />
            <span className="font-sans text-xs text-[#2B1B12]/60">
              Join our community of coffee lovers.
            </span>
          </div>

          {/* Right: Understated "Return" Cue */}
          <button
            type="button"
            onClick={handleOrderClick}
            className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#2B1B12]/50 hover:text-[#F28C13] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13] rounded"
          >
            <span>See You Again</span>
            <svg
              className="w-3.5 h-3.5 text-[#F28C13]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComeBackForMore;
