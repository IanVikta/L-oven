import { Link } from 'react-router-dom';

// High-End Coffee & Bakery Assets
import bakeryStory from '../assets/bakery_story.jpg';
import heroBanner from '../assets/hero_banner.jpg';
import croissantCoffee from '../assets/cand_croissant_coffee.jpg';
import coffeeBeans from '../assets/cand_coffee_beans_cup.jpg';
import roasteryBeans from '../assets/coffee high end/130956301659872151.jpg';

const About = () => {
  return (
    <div className="bg-cream-100 min-h-screen py-12 md:py-20 text-brown-900 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-6xl space-y-20">

        {/* 1. Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
            Our Origins &amp; Craft
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-brown-900 leading-[1.12]">
            Born from Volcanic Soil, Fire &amp; Sourdough.
          </h1>
          <p className="text-base sm:text-lg text-brown-700 leading-relaxed font-light">
            Founded in Kololo, Kampala, L’Oven was created out of a singular obsession: uniting the world-class coffee terroir of East Africa’s volcanic slopes with the timeless precision of classical French viennoiserie.
          </p>
        </div>

        {/* 2. Full-Width Editorial Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200/80 h-[380px] sm:h-[480px] group">
          <img
            src={heroBanner}
            alt="L'Oven Atmosphere & Roastery"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-950/90 via-brown-950/30 to-transparent flex items-end p-8 sm:p-12">
            <div className="text-white max-w-2xl space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Kololo, Kampala
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                Where Artisanal Roasting Meets Dawn-Fresh Pastries
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-light">
                We believe that every morning deserves a quiet moment of luxury—a freshly pulled espresso with vibrant floral notes, paired with a shatteringly crisp butter croissant baked before sunrise.
              </p>
            </div>
          </div>
        </div>

        {/* 3. The Sourcing Story: Volcanic Slopes of Mount Elgon & Kilimanjaro */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Terroir &amp; Direct Trade
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-brown-900 leading-snug">
                Sourced from the Volcanic Slopes of Mount Elgon &amp; Kilimanjaro
              </h2>
              <p className="text-sm text-brown-700 leading-relaxed font-light">
                Great coffee begins in the soil. Our specialty Arabica beans are hand-harvested on the high-altitude volcanic slopes of Mount Elgon in Eastern Uganda and the nutrient-dense ridges of Mount Kilimanjaro. Grown between 1,800 and 2,200 meters above sea level, these shade-grown cherries mature slowly in cool mountain air, developing intense sweetness, complex fruit notes, and rich cocoa undertones.
              </p>
              <p className="text-sm text-brown-700 leading-relaxed font-light">
                We partner directly with smallholder farming cooperatives, paying transparent premiums well above market rates to support sustainable high-altitude agriculture, clean water processing, and soil conservation.
              </p>
            </div>

            <div className="lg:col-span-6 relative h-[320px] sm:h-[380px] rounded-2xl overflow-hidden shadow-lg border border-amber-100">
              <img
                src={roasteryBeans}
                alt="Volcanic High-Altitude Coffee Beans"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>

        {/* 4. The Roasting & Baking Ritual (2-Column Feature Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card A: Micro-Batch Roasting */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-amber-200/70 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-brown-900 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-brown-900">
                Patience in Micro-Batch Roasting
              </h3>
              <p className="text-xs sm:text-sm text-brown-700 leading-relaxed font-light">
                Every morning in our Kololo café, our master roasters listen for the 'first crack' in small drum batches. We roast with restraint and precision to highlight the natural jasmine, citrus, and wild berry aromatics inherent to East African high-altitude origins.
              </p>
            </div>
            <div className="pt-4 h-48 rounded-2xl overflow-hidden border border-amber-100">
              <img src={coffeeBeans} alt="Micro Batch Roasting" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Card B: 48-Hour Fermentation Baking */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-amber-200/70 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-brown-900 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.595 15.1a2 2 0 00-1.8 1.488l-.206.824a2 2 0 001.022 2.316l2.387.477a6 6 0 003.86-.517l.318-.158a6 6 0 013.86-.517l2.387.477a2 2 0 002.316-1.022l.824-.824z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-brown-900">
                48-Hour Cold Fermentation
              </h3>
              <p className="text-xs sm:text-sm text-brown-700 leading-relaxed font-light">
                Our viennoiserie and sourdough breads never rely on commercial dough conditioners or pre-mixes. We use pure French butter, unbleached stoneground flour, and natural levain starter cultured in-house, aged for 48 hours for deep flavor digestion.
              </p>
            </div>
            <div className="pt-4 h-48 rounded-2xl overflow-hidden border border-amber-100">
              <img src={croissantCoffee} alt="48-Hour Fermentation Baking" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>

        {/* 5. Foundational Pillars / Values (3 Cards) */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
              What We Stand For
            </p>
            <h2 className="text-3xl font-display font-bold text-brown-900">
              Our Core Commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-200/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-brown-900 flex items-center justify-center text-sm font-bold">
                01
              </div>
              <h3 className="text-xl font-display font-bold text-brown-900">High-Altitude Arabica</h3>
              <p className="text-xs text-brown-700 leading-relaxed font-light">
                100% single-origin volcanic Arabica sourced directly from Mount Elgon and Kilimanjaro high-altitude farms.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-200/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-brown-900 flex items-center justify-center text-sm font-bold">
                02
              </div>
              <h3 className="text-xl font-display font-bold text-brown-900">Pure Ingredients</h3>
              <p className="text-xs text-brown-700 leading-relaxed font-light">
                Pure French butter, organic eggs, natural sourdough levain, and zero artificial preservatives or additives.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-200/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-brown-900 flex items-center justify-center text-sm font-bold">
                03
              </div>
              <h3 className="text-xl font-display font-bold text-brown-900">Community &amp; Warmth</h3>
              <p className="text-xs text-brown-700 leading-relaxed font-light">
                Whether enjoying coffee on our Kololo garden terrace or receiving sameday Kampala delivery, every guest is family.
              </p>
            </div>
          </div>
        </div>

        {/* 6. Spotlight Showcase: Master Craftsmanship */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-200/60 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full md:w-1/2 h-[300px] sm:h-[360px] rounded-2xl overflow-hidden shadow-lg border border-amber-100 shrink-0">
            <img
              src={bakeryStory}
              alt="Master Baker & Roaster Craft"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 md:w-1/2">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
              Uncompromising Quality
            </p>
            <h2 className="text-3xl font-display font-bold text-brown-900 leading-tight">
              No Shortcuts. Just Honest Craft.
            </h2>
            <p className="text-xs sm:text-sm text-brown-700 leading-relaxed font-light">
              From hand-sorting defect-free green coffee beans to hand-shaping dozens of brioche and baguette doughs before dawn, we hold every step of our process to uncompromising standards.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-brown-900 text-white hover:bg-orange-600 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md"
              >
                <span>Explore Menu</span>
                <span className="text-sm">→</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-cream-100 text-brown-900 hover:bg-amber-200/80 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl border border-amber-300/80 transition-all"
              >
                <span>Visit Us in Kololo</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
