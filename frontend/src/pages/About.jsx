import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';

// High-End Coffee Assets
import roasteryBeans from '../assets/coffee high end/130956301659872151.jpg';
import specialtyBeans from '../assets/coffee high end/24277285508179752.jpg';
import coffeeArt from '../assets/coffee high end/254171972718602478.jpg';
import coffeeWallpaper from '../assets/coffee high end/295196950594306982.jpg';
import coffeeSimple from '../assets/coffee high end/COFFEE.jpg';
import italianCoffee from '../assets/coffee high end/Italian coffee.jpg';
import kilimanjaroCoffee from '../assets/Kilimanjaro coffee aesthetic.jpg';
import baristaItaly from '../assets/barista making espresso Italy.jpg';
import cappuccinoCloseUp from '../assets/cappuccino close up aesthetic.jpg';
import africanPlantation from '../assets/African coffee plantation mountain cinematic.jpg';

// Bean to Cup Process Images
import coffeeCherries from '../assets/coffee cherries harvesting.jpg';
import coffeeRoasting from '../assets/coffee beans roasting machine.jpg';
import baristaPulling from '../assets/barista pulling espresso shot.jpg';
import latteArt from '../assets/cand_latte_art.jpg';
import coffeeTable from '../assets/cand_table_coffee1.jpg';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out',
    });
    
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-cream-100 min-h-screen">
      {/* Hero Section - Cinematic Design */}
      <section className="relative bg-brown-900 text-cream-100 overflow-hidden">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0">
          <img 
            src={africanPlantation} 
            alt="African Coffee Plantation on Mountain" 
            className="w-full h-full object-cover object-center"
          />
          {/* Layered Gradient Overlays for Depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-brown-900/95 via-brown-900/70 to-brown-900/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brown-900/80 via-transparent to-brown-900/30"></div>
        </div>

        {/* Animated Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
          <div className="min-h-[85vh] lg:min-h-[90vh] flex items-center py-20 sm:py-24 lg:py-32">
            <div className="max-w-4xl" data-aos="fade-up" data-aos-duration="1200">
              
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-orange-600/20 backdrop-blur-sm border border-orange-400/30 rounded-full mb-8" data-aos="fade-up" data-aos-delay="200">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-bold tracking-widest text-orange-300 uppercase">
                  Our Story
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tight text-cream-100 mb-8" data-aos="fade-up" data-aos-delay="300">
                From Kilimanjaro<br />
                to Your <span className="italic text-orange-400">Cup.</span>
              </h1>

              {/* Accent Line */}
              <div className="flex items-center gap-4 mb-8" data-aos="fade-up" data-aos-delay="400">
                <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"></div>
                <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-transparent rounded-full"></div>
              </div>

              {/* Description */}
              <p className="text-lg sm:text-xl md:text-2xl text-cream-100/90 font-light leading-relaxed max-w-2xl mb-12" data-aos="fade-up" data-aos-delay="500">
                Where East African altitude meets Italian attitude. A journey of passion from volcanic slopes to perfectly crafted espresso.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 sm:gap-6" data-aos="fade-up" data-aos-delay="600">
                <a 
                  href="#our-story" 
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span>Discover Our Journey</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
                <a 
                  href="#bean-to-cup" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-cream-100/10 hover:bg-cream-100/20 backdrop-blur-sm text-cream-100 font-bold rounded-full border-2 border-cream-100/30 hover:border-cream-100/50 transition-all duration-300"
                >
                  <span>Our Process</span>
                </a>
              </div>

              {/* Stats Row */}
              <div className="mt-16 sm:mt-20 flex flex-wrap gap-8 sm:gap-12 lg:gap-16" data-aos="fade-up" data-aos-delay="700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-600/20 backdrop-blur-sm border border-orange-400/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-display font-bold text-cream-100">Kilimanjaro</div>
                    <div className="text-xs sm:text-sm text-cream-100/70">Origin</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-600/20 backdrop-blur-sm border border-orange-400/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-display font-bold text-cream-100">Italian</div>
                    <div className="text-xs sm:text-sm text-cream-100/70">Roasting</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-600/20 backdrop-blur-sm border border-orange-400/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-display font-bold text-cream-100">100%</div>
                    <div className="text-xs sm:text-sm text-cream-100/70">Arabica</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" data-aos="fade-up" data-aos-delay="1000">
            <svg className="w-6 h-6 text-cream-100/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="m19 9-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Our Story - Redesigned with rich content and visual split layout */}
      <section id="our-story" className="relative bg-white text-brown-900 py-20 sm:py-28 lg:py-36 overflow-hidden scroll-mt-20">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-50/30 to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="block text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase mb-4">
              Our Story
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brown-900 font-bold leading-tight mb-6">
              From Altitude to<br />
              <span className="italic text-orange-600">Attitude</span>
            </h2>
            <p className="text-base sm:text-lg text-brown-700 leading-relaxed max-w-3xl mx-auto">
              A journey of passion that bridges the volcanic slopes of Mount Kilimanjaro 
              with the timeless craft of Italian espresso culture.
            </p>
          </div>

          {/* Timeline Layout with Images */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {/* The Roots - Kilimanjaro */}
            <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7" data-aos="fade-right">
                <div className="relative">
                  <div className="absolute -left-2 sm:-left-4 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-orange-600 to-transparent"></div>
                  <div className="pl-4 sm:pl-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-600 to-orange-700 text-white flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold tracking-widest text-orange-600 uppercase">The Roots</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-brown-900 mb-3 sm:mb-4">
                      Born on the Slopes of Kilimanjaro
                    </h3>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed mb-3 sm:mb-4">
                      Great coffee isn't just made; it is grown, nurtured, and carefully chosen. Our journey begins high 
                      on the volcanic slopes of Mount Kilimanjaro, where the rich, mineral-dense soil and high-altitude 
                      climate produce some of the most vibrant coffee cherries in the world.
                    </p>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed mb-3 sm:mb-4">
                      We partner directly with <span className="font-bold text-orange-600">generational farmers</span> who 
                      possess an intuitive understanding of the land, hand-picking only the most perfect, sun-ripened cherries 
                      to ensure a foundation of unparalleled flavor and aromatic complexity.
                    </p>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed">
                      From the misty mountain air to the meticulous sun-drying process, every bean we source is a testament 
                      to our profound love for authentic, high-quality coffee.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay="100">
                <div className="relative h-[280px] sm:h-[350px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                  <img src={kilimanjaroCoffee} alt="Mount Kilimanjaro coffee beans" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs sm:text-sm font-bold">Mount Kilimanjaro</p>
                    <p className="text-[10px] sm:text-xs opacity-90">High-Altitude Arabica Excellence</p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Spark - Italian Epiphany */}
            <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1" data-aos="fade-right">
                <div className="relative h-[280px] sm:h-[350px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                  <img src={baristaItaly} alt="Italian espresso culture" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs sm:text-sm font-bold">Rome, Italy</p>
                    <p className="text-[10px] sm:text-xs opacity-90">Where Passion Ignited</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2" data-aos="fade-left" data-aos-delay="100">
                <div className="relative">
                  <div className="absolute -left-2 sm:-left-4 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-orange-600 to-transparent"></div>
                  <div className="pl-4 sm:pl-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-600 to-orange-700 text-white flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold tracking-widest text-orange-600 uppercase">The Spark</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-brown-900 mb-3 sm:mb-4">
                      An Italian Epiphany
                    </h3>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed mb-3 sm:mb-4">
                      The soul of our shop was forged in Italy. Our Founder and CEO always appreciated a good cup of coffee, 
                      but it wasn't until a trip to a small, bustling café in Rome that the true passion was ignited.
                    </p>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed mb-3 sm:mb-4">
                      Tasting a perfectly pulled espresso there was a <span className="font-bold text-orange-600">revelation</span>—it 
                      wasn't just a drink; it was an experience, a moment of pure connection. It was an immersion into a culture 
                      built on a deep-rooted respect for the art of extraction.
                    </p>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed">
                      Armed with that inspiration and a newfound obsession with the art of roasting, the vision became crystal 
                      clear: combine the world-class beans of East Africa with the timeless, meticulous craft of Italian roasting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Craft - Beyond the Bean */}
            <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7" data-aos="fade-right">
                <div className="relative">
                  <div className="absolute -left-2 sm:-left-4 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-orange-600 to-transparent"></div>
                  <div className="pl-4 sm:pl-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-600 to-orange-700 text-white flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold tracking-widest text-orange-600 uppercase">The Craft</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-brown-900 mb-3 sm:mb-4">
                      Beyond the Bean
                    </h3>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed mb-3 sm:mb-4">
                      Today, that intense passion translates into every beverage we pour. While our heart beats for our 
                      signature roasts, our menu is a playground of flavor and innovation.
                    </p>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed mb-3 sm:mb-4">
                      Whether you are craving the <span className="font-bold text-orange-600">deep, velvety micro-foam</span> of 
                      our classic cappuccinos, the smooth, comforting warmth of our artisanal lattes, or looking to shake things 
                      up with our vibrant, handcrafted coffee-infused mocktails, every glass is poured with precision and passion.
                    </p>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed">
                      We are not just serving drinks; we are pouring our devotion into every single glass, honoring both the 
                      bean and the brew.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay="100">
                <div className="relative h-[280px] sm:h-[350px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                  <img src={cappuccinoCloseUp} alt="Artisanal coffee craft" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs sm:text-sm font-bold">Handcrafted Excellence</p>
                    <p className="text-[10px] sm:text-xs opacity-90">From Classic to Creative</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today - Our Impact */}
            <div className="bg-gradient-to-br from-brown-900 to-brown-800 text-cream-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-16 shadow-2xl" data-aos="fade-up">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest text-orange-400 uppercase">Today</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-cream-100 mb-4 sm:mb-6">
                  A Sanctuary Where <span className="text-orange-400">Passion Meets Perfection</span>
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-cream-100/90 leading-relaxed mb-6 sm:mb-8">
                  We've created more than a café—we've built a sanctuary where the profound love for coffee can be shared, 
                  bridging the gap between East African terroir and Italian mastery. Every cup served is a celebration of 
                  this extraordinary journey.
                </p>
                <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto">
                  <div className="bg-orange-600/20 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-orange-400/30">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-orange-400 mb-1 sm:mb-2">100%</div>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-cream-100/80">Arabica Beans</p>
                  </div>
                  <div className="bg-orange-600/20 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-orange-400/30">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-orange-400 mb-1 sm:mb-2">Italian</div>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-cream-100/80">Roasting Method</p>
                  </div>
                  <div className="bg-orange-600/20 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-orange-400/30">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-orange-400 mb-1 sm:mb-2">Direct</div>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-cream-100/80">Farm Partnership</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Updated */}
      <section className="bg-brown-900 text-cream-100 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
            {[
              { number: 'Kilimanjaro', label: 'Origin' },
              { number: 'Italian', label: 'Roasting' },
              { number: '100%', label: 'Arabica' },
              { number: 'Direct', label: 'Trade' }
            ].map((stat, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={index * 100}
                className="text-center"
              >
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-600 mb-3">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-widest text-cream-100/80 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Updated content */}
      <section className="bg-cream-100 text-brown-900 py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="block text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase mb-4">
              Purpose &amp; Direction
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brown-900 font-bold leading-tight">
              Our Mission &amp; Vision
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <div data-aos="fade-right" data-aos-duration="800" className="relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-orange-600 to-orange-400 rounded-full"></div>
              <div className="pl-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-700 text-white flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-brown-900">Our Mission</h3>
                </div>
                <p className="text-base sm:text-lg text-brown-700 leading-relaxed mb-6">
                  To meticulously source, roast, and brew the finest East African coffee, merging authentic Italian 
                  craftsmanship with local community spirit to deliver an unforgettable sensory experience in every cup.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-sm text-brown-700">Bridge Kilimanjaro beans with Italian craft</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-sm text-brown-700">Inspire connection and joy in every cup</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-sm text-brown-700">Foster community through exceptional coffee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="100" className="relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-orange-600 to-orange-400 rounded-full"></div>
              <div className="pl-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-700 text-white flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-brown-900">Our Vision</h3>
                </div>
                <p className="text-base sm:text-lg text-brown-700 leading-relaxed mb-6">
                  To redefine the local café culture by becoming the ultimate destination for coffee enthusiasts and 
                  casual lovers alike, recognized globally for our uncompromising quality, innovative menu, and warm, 
                  inviting atmosphere.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-sm text-brown-700">Become the most beloved community hub</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-sm text-brown-700">Set the standard for coffee excellence</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-sm text-brown-700">Create lasting memorable experiences</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" data-aos="fade-up" data-aos-delay="200">
            {[
              { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', title: 'Artisanal Excellence', desc: 'Precision roasting & brewing' },
              { icon: 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20', title: 'Sustainable Partnerships', desc: 'Empowering Kilimanjaro farmers' },
              { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', title: 'Community Connection', desc: 'A gathering place for all' },
              { icon: 'M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z', title: 'Authenticity', desc: 'Real beans, real stories' }
            ].map((value, i) => (
              <div key={i} className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-brown-100 hover:border-orange-200 hover:shadow-md transition-all duration-300">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-orange-600 mb-3 sm:mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d={value.icon} />
                </svg>
                <h4 className="text-xs sm:text-sm font-bold text-brown-900 mb-1">{value.title}</h4>
                <p className="text-[10px] sm:text-xs text-brown-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bean to Cup Process - Redesigned with visual storytelling */}
      <section id="bean-to-cup" className="relative bg-gradient-to-b from-white via-cream-50 to-white text-brown-900 py-20 sm:py-28 lg:py-36 overflow-hidden scroll-mt-20">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-brown-100 rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24" data-aos="fade-up">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-full mb-6">
              Our Process
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brown-900 font-bold leading-tight mb-6">
              The Bean to Cup <br className="hidden sm:block" />
              <span className="italic text-orange-600">Journey</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-brown-700 max-w-3xl mx-auto leading-relaxed">
              From the volcanic soils of Kilimanjaro to the perfect crema in your cup, every step is crafted with precision and passion.
            </p>
          </div>

          {/* Process Steps with Alternating Layout */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-28">
            
            {/* Step 1: Selective Harvesting */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1" data-aos="fade-right" data-aos-duration="1000">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-br from-orange-600 to-orange-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                    <img src={coffeeCherries} alt="Selective coffee harvesting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 via-brown-900/20 to-transparent"></div>
                    {/* Step Badge */}
                    <div className="absolute top-6 left-6 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-2xl sm:text-3xl font-display font-bold shadow-xl">
                      01
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                <div className="lg:pl-8">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase">Step One</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brown-900 mb-6 leading-tight">
                    Selective <br className="hidden sm:block" />Harvesting
                  </h3>
                  <p className="text-base sm:text-lg text-brown-700 leading-relaxed mb-6">
                    Only the ripest cherries from our high-altitude Kilimanjaro partner farms are chosen to guarantee a vibrant, complex flavor profile. Our farmers use generations of expertise to identify peak ripeness.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-semibold rounded-full border border-orange-200">Hand-Picked</span>
                    <span className="px-4 py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-semibold rounded-full border border-orange-200">High-Altitude</span>
                    <span className="px-4 py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-semibold rounded-full border border-orange-200">Peak Ripeness</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Precision Roasting */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2" data-aos="fade-left" data-aos-duration="1000">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-br from-orange-600 to-orange-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                    <img src={coffeeRoasting} alt="Precision coffee roasting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 via-brown-900/20 to-transparent"></div>
                    {/* Step Badge */}
                    <div className="absolute top-6 right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-2xl sm:text-3xl font-display font-bold shadow-xl">
                      02
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                <div className="lg:pr-8">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase">Step Two</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brown-900 mb-6 leading-tight">
                    Precision <br className="hidden sm:block" />Roasting
                  </h3>
                  <p className="text-base sm:text-lg text-brown-700 leading-relaxed mb-6">
                    We small-batch roast our beans using authentic Italian techniques, carefully manipulating temperature and airflow to unlock hidden caramelized sugars and distinct regional tasting notes unique to Kilimanjaro.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-semibold rounded-full border border-orange-200">Small-Batch</span>
                    <span className="px-4 py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-semibold rounded-full border border-orange-200">Italian Method</span>
                    <span className="px-4 py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-semibold rounded-full border border-orange-200">Temperature Control</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Expert Extraction */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1" data-aos="fade-right" data-aos-duration="1000">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-br from-orange-600 to-orange-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                    <img src={baristaPulling} alt="Expert coffee extraction" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 via-brown-900/20 to-transparent"></div>
                    {/* Step Badge */}
                    <div className="absolute top-6 left-6 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-2xl sm:text-3xl font-display font-bold shadow-xl">
                      03
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                <div className="lg:pl-8">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase">Step Three</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brown-900 mb-6 leading-tight">
                    Expert <br className="hidden sm:block" />Extraction
                  </h3>
                  <p className="text-base sm:text-lg text-brown-700 leading-relaxed mb-6">
                    Our baristas are trained in the rigorous Italian tradition, meticulously calibrating the grind, tamping pressure, and water temperature to pull a flawless, crema-rich shot every single time.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-semibold rounded-full border border-orange-200">Italian Trained</span>
                    <span className="px-4 py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-semibold rounded-full border border-orange-200">Perfect Crema</span>
                    <span className="px-4 py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-semibold rounded-full border border-orange-200">Precision Calibrated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Creative Formulation */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2" data-aos="fade-left" data-aos-duration="1000">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-br from-orange-600 to-orange-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                    <img src={latteArt} alt="Creative coffee formulation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 via-brown-900/20 to-transparent"></div>
                    {/* Step Badge */}
                    <div className="absolute top-6 right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-2xl sm:text-3xl font-display font-bold shadow-xl">
                      04
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                <div className="lg:pr-8">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase">Step Four</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brown-900 mb-6 leading-tight">
                    Creative <br className="hidden sm:block" />Formulation
                  </h3>
                  <p className="text-base sm:text-lg text-brown-700 leading-relaxed mb-6">
                    Beyond classic espresso, we continuously innovate by pairing our roasts with botanical syrups and fresh ingredients to craft our highly sought-after signature mocktails and specialty beverages.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-semibold rounded-full border border-orange-200">Signature Mocktails</span>
                    <span className="px-4 py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-semibold rounded-full border border-orange-200">Botanical Infusions</span>
                    <span className="px-4 py-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-semibold rounded-full border border-orange-200">Innovation</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* End Result Showcase */}
          <div className="mt-16 sm:mt-20 lg:mt-28" data-aos="fade-up" data-aos-duration="1000">
            <div className="relative bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 text-cream-100 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 xl:p-20 overflow-hidden shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-cream-100 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-cream-100 rounded-full"></div>
              </div>
              
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                <div className="inline-block p-3 bg-orange-600/20 rounded-2xl mb-6">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
                  The Result? <span className="text-orange-400">Perfection in Every Cup</span>
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-cream-100/90 leading-relaxed">
                  This meticulous four-step journey ensures that every beverage we serve honors the farmers, the craft, and most importantly—you.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Philosophy - Redesigned with magazine-style layout */}
      <section className="relative py-16 sm:py-20 lg:py-28 xl:py-36 overflow-hidden">
        {/* Split background - hidden on mobile, shown on lg+ */}
        <div className="absolute inset-0 hidden lg:block">
          <div className="absolute inset-0 left-0 w-1/2 bg-brown-900"></div>
          <div className="absolute inset-0 right-0 w-1/2 bg-cream-100"></div>
        </div>
        {/* Solid background for mobile */}
        <div className="absolute inset-0 lg:hidden bg-brown-900"></div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch">
            {/* Left side - Dark */}
            <div className="bg-brown-900 text-cream-100 p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-center" data-aos="fade-right">
              <span className="block text-[10px] sm:text-xs lg:text-sm font-bold tracking-widest text-orange-400 uppercase mb-4 sm:mb-6">
                Our Philosophy
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 sm:mb-8">
                More than just<br />
                <span className="italic text-orange-400">coffee.</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-cream-100/90 leading-relaxed mb-6 sm:mb-8">
                Every cup tells a story. A story of farmers waking before dawn, carefully selecting ripe cherries. 
                A story of communities coming together, building futures. A story of you, taking a moment in your busy day.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-cream-100 mb-0.5 sm:mb-1">Crafted with Care</h4>
                    <p className="text-xs sm:text-sm text-cream-100/70">Every bean, every brew, every moment matters</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-cream-100 mb-0.5 sm:mb-1">Built on Values</h4>
                    <p className="text-xs sm:text-sm text-cream-100/70">Fairness, quality, and community in every decision</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Light with image */}
            <div className="relative h-[350px] sm:h-[400px] lg:h-auto" data-aos="fade-left" data-aos-delay="100">
              <img 
                src={coffeeSimple} 
                alt="Coffee philosophy" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 to-transparent"></div>
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                <p className="text-base sm:text-lg font-light italic leading-relaxed">
                  "Coffee is a bridge between cultures, a catalyst for conversations, and a daily reminder 
                  that the best things in life are worth waiting for."
                </p>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold tracking-wide">— L'Oven Coffee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified CTA - More elegant and minimal */}
      <section className="bg-orange-600 text-white py-16 sm:py-20">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
            Experience the difference.
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8" data-aos="fade-up" data-aos-delay="100">
            Visit our café, explore our menu, or learn more about our farmer partnerships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
            <Link
              to="/menu"
              className="px-10 py-4 bg-white text-orange-600 font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-cream-100 transition-colors shadow-lg hover:shadow-xl"
            >
              View Menu
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-white hover:text-orange-600 transition-colors"
            >
              Visit Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
