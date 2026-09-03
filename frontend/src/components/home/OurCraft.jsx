import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

// Existing high-resolution photography assets from project assets
import craftFeatureImg from '../../assets/cand_bakery.jpg';
import ovenImg from '../../assets/cand_croissant2.jpg';
import barImg from '../../assets/cand_coffee1.jpg';

const OurCraft = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <section
      id="our-craft"
      aria-labelledby="craft-heading"
      className="bg-[#FFF4E6] text-[#2B1B12] py-20 sm:py-28 lg:py-36 selection:bg-[#F28C13] selection:text-white"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
        {/* 1. INTRO */}
        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          viewport={fadeIn.viewport}
          transition={fadeIn.transition}
          className="max-w-3xl"
        >
          <span className="block font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-6">
            OUR CRAFT
          </span>

          <h2
            id="craft-heading"
            className="font-['Playfair_Display',Georgia,serif] text-4xl sm:text-5xl lg:text-6xl text-[#2B1B12] font-normal leading-[1.12] tracking-tight mb-6 sm:mb-8"
          >
            Made fresh.<br />
            Made with care.
          </h2>

          <p className="font-sans text-base sm:text-lg lg:text-xl text-[#2B1B12]/80 font-normal leading-relaxed max-w-2xl">
            At L'Oven, the experience begins long before the first sip or first bite.
          </p>
        </motion.div>

        {/* 2. LARGE FEATURE IMAGE */}
        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          viewport={fadeIn.viewport}
          transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
          className="mt-12 sm:mt-16 lg:mt-20 mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="overflow-hidden rounded-sm bg-[#EFE3D3] aspect-[16/9] sm:aspect-[21/10] lg:aspect-[2.3/1] w-full shadow-none">
            <img
              src={craftFeatureImg}
              alt="Artisan baker shaping handcrafted dough on floured wooden worktop at L'Oven"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>

        {/* 3. STORY BLOCK */}
        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          viewport={fadeIn.viewport}
          transition={fadeIn.transition}
          className="max-w-2xl mb-16 sm:mb-20 lg:mb-28"
        >
          <h3 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl lg:text-4xl text-[#2B1B12] font-normal tracking-tight mb-4 sm:mb-5">
            THE MORNING STARTS HERE
          </h3>
          <p className="font-sans text-base sm:text-lg text-[#2B1B12]/75 font-normal leading-relaxed">
            Dough is prepared. Coffee is ground. Every detail gets the attention it deserves.
          </p>
        </motion.div>

        {/* 4. TWO SUPPORTING VISUAL STORIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 lg:gap-20 items-start mb-16 sm:mb-20 lg:mb-24">
          {/* Left Story: From the Oven */}
          <motion.article
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={fadeIn.transition}
            className="space-y-5 sm:space-y-6"
          >
            <div className="overflow-hidden rounded-sm bg-[#EFE3D3] aspect-[4/3] sm:aspect-[3/2] w-full">
              <img
                src={ovenImg}
                alt="Golden hand-laminated butter croissants fresh from the oven"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <span className="block font-sans text-xs font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-2">
                FROM THE OVEN
              </span>
              <p className="font-sans text-sm sm:text-base text-[#2B1B12]/75 leading-relaxed max-w-md">
                Slow natural sourdough fermentation, pure French butter, and delicate morning lamination that yields an authentic crisp crumb.
              </p>
            </div>
          </motion.article>

          {/* Right Story: From the Bar */}
          <motion.article
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="space-y-5 sm:space-y-6 md:pt-10 lg:pt-16"
          >
            <div className="overflow-hidden rounded-sm bg-[#EFE3D3] aspect-[4/3] sm:aspect-[3/2] w-full">
              <img
                src={barImg}
                alt="Barista executing single-origin espresso extraction at the coffee bar"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <span className="block font-sans text-xs font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-2">
                FROM THE BAR
              </span>
              <p className="font-sans text-sm sm:text-base text-[#2B1B12]/75 leading-relaxed max-w-md">
                Carefully sourced single-origin Arabica beans, precisely dialed extraction ratios, and silky textured microfoam poured with intention.
              </p>
            </div>
          </motion.article>
        </div>

        {/* 5. CTA */}
        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          viewport={fadeIn.viewport}
          transition={fadeIn.transition}
          className="pt-6 border-t border-[#2B1B12]/10"
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-3 font-sans text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#2B1B12] hover:text-[#F28C13] transition-colors duration-150 group border-b border-[#2B1B12]/20 hover:border-[#F28C13] pb-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]"
          >
            <span>OUR STORY</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-1.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OurCraft;
