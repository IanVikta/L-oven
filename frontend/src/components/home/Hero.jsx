import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

// ============================================================================
// TEMPORARY HERO IMAGE CONFIGURATION
// Note: This temporary landscape asset satisfies the Hero A direction.
// When final client photography is ready, simply update this import.
// ============================================================================
import heroImage from '../../assets/hero_coffee_croissant.jpg';

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <section
      aria-label="Hero"
      className="relative bg-[#2B1B12] text-[#FFF4E6] overflow-hidden"
    >
      {/* Background Photography with Natural Left Fade (Desktop full-bleed feel) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 xl:w-7/12 pointer-events-none select-none">
        <img
          src={heroImage}
          alt="Freshly baked artisan croissant and hot espresso on a cafe table"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Editorial Left & Top Vignette Gradients for Text Legibility (No heavy muddy overlay) */}
        <div
          className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#2B1B12] via-[#2B1B12]/80 lg:via-[#2B1B12]/60 to-transparent lg:to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[#2B1B12]/20 lg:bg-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Editorial Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
        <div className="min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center py-16 sm:py-20 lg:py-28">
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
            className="max-w-xl lg:max-w-2xl"
          >
            {/* Eyebrow */}
            <span className="block text-xs sm:text-[13px] font-sans font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-5">
              L'OVEN COFFEE &amp; BAKERY
            </span>

            {/* Main Editorial Heading */}
            <h1 className="font-['Playfair_Display',Georgia,serif] text-[38px] sm:text-5xl md:text-6xl lg:text-[68px] font-normal leading-[1.12] tracking-tight text-[#FFF4E6]">
              Made fresh.
              <br />
              Served with <span className="text-[#F28C13]">care.</span>
            </h1>

            {/* Accent Line */}
            <div
              className="w-12 h-[2px] bg-[#F28C13] my-6 sm:my-7"
              aria-hidden="true"
            />

            {/* Supporting Copy */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#FFF4E6]/85 font-normal leading-relaxed max-w-lg mb-8 sm:mb-10">
              Artisanal coffee and freshly baked pastries, crafted for every moment.
            </p>

            {/* CTA Hierarchy */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-8">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center px-7 py-3.5 sm:px-8 sm:py-4 bg-[#F28C13] hover:bg-[#d97706] text-[#FFFFFF] font-sans font-semibold text-xs sm:text-[13px] tracking-[0.16em] uppercase rounded transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B1B12]"
              >
                EXPLORE THE MENU
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-sans font-semibold tracking-[0.16em] uppercase text-[#FFF4E6] hover:text-[#F28C13] transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13] py-2"
              >
                OUR STORY <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
