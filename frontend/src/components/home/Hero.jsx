import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCart } from '../../hooks/useCart';

// Transparent PNG Cutout Coffee Assets
import mochaImg from '../../assets/hero/mocha.png';
import cappuccinoImg from '../../assets/hero/cappuccino.png';
import latteImg from '../../assets/hero/latte.png';
import espressoImg from '../../assets/hero/espresso.png';
import coldbrewImg from '../../assets/hero/coldbrew.png';
import leavesBranchImg from '../../assets/hero/leaves_branch.png';
import beansCornerImg from '../../assets/hero/beans_corner.png';

const DRINKS = [
  {
    id: 'mocha',
    dbId: 5,
    name: 'Mocha',
    price: 219,
    description: 'Rich espresso blended with chocolate, steamed milk and a creamy topping.',
    image: mochaImg,
  },
  {
    id: 'cappuccino',
    dbId: 2,
    name: 'Cappuccino',
    price: 169,
    description: 'Rich espresso with steamed milk and a thick layer of silky velvety foam.',
    image: cappuccinoImg,
  },
  {
    id: 'latte',
    dbId: 1,
    name: 'Latte',
    price: 199,
    description: 'Smooth and creamy espresso with steamed milk and a light foam.',
    image: latteImg,
  },
  {
    id: 'espresso',
    dbId: 8,
    name: 'Espresso',
    price: 129,
    description: 'Rich, concentrated double shot of espresso with a golden crema.',
    image: espressoImg,
  },
  {
    id: 'coldbrew',
    dbId: 3,
    name: 'Cold Brew',
    price: 179,
    description: 'Slow-steeped smooth iced coffee served chilled over crystal ice.',
    image: coldbrewImg,
  },
];

const Hero = () => {
  // Arrangement matches the reference screenshot with Mocha as default active
  const [activeDrink, setActiveDrink] = useState(DRINKS[0]);
  const [isAdded, setIsAdded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { addToCart } = useCart();

  // Automatically cycle through coffee drinks every 3 seconds
  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = setTimeout(() => {
      setActiveDrink((prev) => {
        const currentIndex = DRINKS.findIndex((d) => d.id === prev.id);
        const nextIndex = (currentIndex + 1) % DRINKS.length;
        return DRINKS[nextIndex];
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeDrink, shouldReduceMotion]);

  const handleBuyNow = () => {
    addToCart({
      id: activeDrink.dbId,
      name: `L'Oven ${activeDrink.name}`,
      price: activeDrink.price,
      image: activeDrink.image,
      image_url: activeDrink.image,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <section
      aria-label="Artisanal Coffee Showcase Hero"
      className="relative bg-[#120D0A] text-[#FFF4E6] overflow-hidden select-none pt-8 pb-14 sm:pt-12 sm:pb-18 lg:pt-14 lg:pb-22 min-h-[700px] lg:min-h-[820px] flex flex-col justify-between"
    >
      {/* 1. ATMOSPHERIC BACKGROUND LIGHTING & VIGNETTES */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[650px] lg:w-[780px] aspect-square bg-[radial-gradient(circle,rgba(242,140,19,0.18)_0%,rgba(200,104,26,0.08)_40%,transparent_70%)] pointer-events-none blur-3xl z-0"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#120D0A]/80 via-transparent to-[#120D0A] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2. CORNER ORGANIC COFFEE ELEMENTS (Pure Transparent PNGs, Zero Borders) */}
      {/* Bottom Left Overturned Jar & Roasted Spilled Coffee Beans */}
      <div
        className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-64 sm:w-88 lg:w-[460px] aspect-square pointer-events-none select-none opacity-70 lg:opacity-85 z-0"
        aria-hidden="true"
      >
        <img
          src={beansCornerImg}
          alt=""
          className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
          loading="eager"
        />
      </div>

      {/* Bottom Right Coffee Leaves Accent */}
      <div
        className="absolute -bottom-8 -right-8 sm:-bottom-14 sm:-right-14 w-52 sm:w-72 lg:w-[400px] aspect-square pointer-events-none select-none opacity-30 sm:opacity-40 lg:opacity-45 rotate-180 z-0"
        aria-hidden="true"
      >
        <img
          src={leavesBranchImg}
          alt=""
          className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
          loading="lazy"
        />
      </div>

      {/* 3. MAIN HERO STAGE CONTENT (Left Headline + Center Showcase + Right Current Pick) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[380px] lg:min-h-[440px]">
          
          {/* LEFT: Grand Editorial Headline */}
          <div className="lg:col-span-4 text-center lg:text-left pt-2 sm:pt-4">
            <span className="inline-block text-[11px] font-sans font-semibold tracking-[0.24em] text-[#F28C13] uppercase mb-3 sm:mb-4">
              L'OVEN SPECIALTY ROASTERY
            </span>

            <h1 className="font-['Cormorant_Garamond',Georgia,serif] text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-normal leading-[0.96] tracking-tight text-[#FFF4E6]">
              Great
              <br />
              <span className="font-serif italic font-normal text-[#FFF4E6] lowercase block sm:inline lg:block">
                moments.
              </span>
            </h1>

            <p className="mt-4 sm:mt-5 font-sans text-xs sm:text-sm text-[#D4C3B5]/85 font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
              Brewed to make your day a little better. Handcrafted single-origin extractions and warm viennoiserie.
            </p>
          </div>

          {/* CENTER: Floating Spotlight Coffee Cup (Pure Transparent PNG Cutout, No Box/Border) */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-2 sm:py-6">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center">
              
              {/* Soft radial glow behind the cup */}
              <div className="absolute inset-0 bg-[#F28C13]/20 blur-3xl pointer-events-none rounded-full" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDrink.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06, y: -10 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img
                    src={activeDrink.image}
                    alt={`Freshly prepared ${activeDrink.name}`}
                    className="max-w-[85%] max-h-[85%] sm:max-w-[92%] sm:max-h-[92%] object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.92)] select-none pointer-events-none"
                    loading="eager"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Current Pick Architectural Specification (No price, name + description only) */}
          <div className="lg:col-span-3 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
            <div className="border-l-0 lg:border-l-2 border-[#C8681A] lg:pl-5 py-1 max-w-sm">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C8681A] mb-1.5 block">
                Current Pick
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDrink.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-4xl sm:text-5xl lg:text-6xl font-light text-[#FFF4E6] tracking-tight">
                    {activeDrink.name}
                  </h2>

                  <p className="font-sans text-xs sm:text-sm text-[#D4C3B5]/85 font-light leading-relaxed mt-3">
                    {activeDrink.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* 4. BOTTOM INTERACTIVE DRINK SELECTOR ROW (Pure Cutout PNGs, No Card Boxes, No Prices) */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 w-full mt-4 sm:mt-8 z-10">
        
        {/* Horizontal Drink Strip: Mocha, Cappuccino, Latte, Espresso, Cold Brew */}
        <div className="flex items-end justify-center gap-4 sm:gap-8 md:gap-12 overflow-x-auto no-scrollbar scrollbar-hide py-2">
          {DRINKS.map((drink) => {
            const isActive = drink.id === activeDrink.id;
            return (
              <button
                key={drink.id}
                type="button"
                onClick={() => setActiveDrink(drink)}
                aria-label={`Select ${drink.name} as current pick`}
                className={`group relative flex flex-col items-center p-1 sm:p-2 transition-all duration-300 rounded-none focus:outline-none cursor-pointer ${
                  isActive
                    ? 'scale-110 opacity-100'
                    : 'opacity-65 hover:opacity-95 hover:scale-105'
                }`}
              >
                {/* Pure Transparent PNG Cup — Free floating, no square cards, no box borders */}
                <div className="relative w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 flex items-center justify-center mb-1.5">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className={`max-w-full max-h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.85)] transition-transform duration-300 ${
                      isActive ? 'scale-105 drop-shadow-[0_12px_22px_rgba(242,140,19,0.35)]' : 'group-hover:scale-105'
                    }`}
                    loading="lazy"
                  />
                </div>

                {/* Drink Name Only (No Prices) */}
                <span
                  className={`font-['Cormorant_Garamond',Georgia,serif] text-sm sm:text-base md:text-lg transition-colors duration-200 tracking-wide ${
                    isActive ? 'text-[#FFF4E6] font-medium' : 'text-[#D4C3B5]/75'
                  }`}
                >
                  {drink.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* 5. PRIMARY ACTION CTA ("BUY NOW") */}
        <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={handleBuyNow}
            aria-label={`Buy ${activeDrink.name} now`}
            className={`min-h-[46px] px-8 sm:px-10 py-3 font-sans font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-200 flex items-center justify-center gap-2.5 rounded-none shadow-[4px_4px_0px_0px_rgba(242,140,19,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4E6] active:translate-x-[2px] active:translate-y-[2px] ${
              isAdded
                ? 'bg-[#2B1B12] border border-[#F28C13] text-[#FFF4E6]'
                : 'bg-[#E3A857] hover:bg-[#d49642] text-[#120D0A]'
            }`}
          >
            {/* Shopping bag icon */}
            <svg
              className="w-4 h-4 text-current"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            <span>{isAdded ? 'ADDED TO ORDER ✓' : 'BUY NOW'}</span>
          </button>

          <Link
            to="/menu"
            className="text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.18em] text-[#FFF4E6]/80 hover:text-[#F28C13] underline underline-offset-4 decoration-white/20 hover:decoration-[#F28C13] transition-colors py-1.5"
          >
            EXPLORE FULL MENU →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Hero;
