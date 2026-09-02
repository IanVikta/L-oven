import bakeryStory from '../assets/bakery_story.jpg';
import heroBanner from '../assets/hero_banner.jpg';

const About = () => {
  return (
    <div className="bg-cream-100 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl space-y-16">
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
            Our Story & Craft
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-brown-900 mt-4 mb-6">
            Born from Fire, Flour & Passion.
          </h1>
          <p className="text-base md:text-lg text-brown-700 leading-relaxed font-light">
            Founded in 2024, L'Oven Coffee & Bakery was created with a simple vision: to elevate everyday coffee into an extraordinary ritual paired with freshly baked French pastry craftsmanship.
          </p>
        </div>

        {/* Hero Image Showcase */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200 h-[400px]">
          <img src={heroBanner} alt="L'Oven Atmosphere" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-900/90 via-transparent to-transparent flex items-end p-8">
            <div className="text-white max-w-xl">
              <h2 className="text-2xl font-display font-bold mb-2">Our Artisanal Roastery</h2>
              <p className="text-xs text-cream-200/90 leading-relaxed">
                Every bean is ethically sourced from high-altitude shade-grown farms in Ethiopia and Colombia, roasted locally in micro-batches to preserve delicate floral and cocoa notes.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillar Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 space-y-3">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
              🌱
            </div>
            <h3 className="text-xl font-display font-bold text-brown-900">Direct Trade Beans</h3>
            <p className="text-xs text-brown-600 leading-relaxed">
              We work directly with coffee farming cooperatives, ensuring fair wages and sustainable farming practices.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 space-y-3">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
              🍞
            </div>
            <h3 className="text-xl font-display font-bold text-brown-900">48-Hr Fermentation</h3>
            <p className="text-xs text-brown-600 leading-relaxed">
              Our sourdough breads and butter croissants undergo a slow 48-hour cold fermentation for rich flavor and light texture.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 space-y-3">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
              ❤️
            </div>
            <h3 className="text-xl font-display font-bold text-brown-900">Community Hospitality</h3>
            <p className="text-xs text-brown-600 leading-relaxed">
              Whether dining in at table T-01 or receiving delivery at home, every order is prepared with warmth and care.
            </p>
          </div>
        </div>

        {/* Master Baker Spotlight */}
        <div className="bg-brown-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8">
          <img
            src={bakeryStory}
            alt="Master Baker"
            className="w-full md:w-1/2 h-[300px] object-cover rounded-2xl border border-orange-500/30 shadow-lg"
          />
          <div className="space-y-4 md:w-1/2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
              The Baking Technique
            </span>
            <h2 className="text-3xl font-display font-bold">No Shortcuts. Just Real Ingredients.</h2>
            <p className="text-xs md:text-sm text-cream-200/80 leading-relaxed">
              We never use artificial preservatives, dough conditioners, or premixes. Only pure French butter, unbleached flour, organic eggs, and natural sourdough starters cultured in-house.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
