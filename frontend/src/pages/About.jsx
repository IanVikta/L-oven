import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';

// High-End Coffee Assets - Using numbered files to avoid special characters
import roasteryBeans from '../assets/coffee high end/130956301659872151.jpg';
import specialtyBeans from '../assets/coffee high end/24277285508179752.jpg';
import coffeeArt from '../assets/coffee high end/254171972718602478.jpg';
import coffeeWallpaper from '../assets/coffee high end/295196950594306982.jpg';
import coffeeSimple from '../assets/coffee high end/COFFEE.jpg';
import italianCoffee from '../assets/coffee high end/Italian coffee.jpg';

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
      {/* Hero Section */}
      <section className="relative bg-brown-900 text-cream-100 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={roasteryBeans} 
            alt="L'Oven Coffee Roastery" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brown-900/80 via-brown-900/70 to-brown-900/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
          <div className="min-h-[540px] lg:min-h-[640px] flex items-center py-20 lg:py-28">
            <div className="max-w-3xl" data-aos="fade-right" data-aos-duration="1000">
              <span className="block text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase mb-5">
                About L'Oven Coffee
              </span>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-cream-100 mb-6">
                Supporting 15,300+<br />
                Ugandan <span className="italic text-orange-600">farmers.</span>
              </h1>

              <div className="w-20 h-[3px] bg-orange-600 my-7" aria-hidden="true" />

              <p className="text-base sm:text-lg md:text-xl text-cream-100/90 font-light leading-relaxed max-w-xl">
                Building a coffee company owned by the farmers who grow it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-cream-100 text-brown-900 py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Heading */}
            <div data-aos="fade-right" data-aos-duration="800">
              <span className="block text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase mb-6">
                Our Story
              </span>

              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brown-900 font-bold leading-[1.08] tracking-tight mb-8">
                Started small.<br />
                Dreamed <span className="italic text-orange-600">big.</span>
              </h2>

              <div className="w-20 h-[3px] bg-orange-600 mb-8" aria-hidden="true" />

              <p className="text-base sm:text-lg text-brown-700/90 leading-relaxed font-light italic max-w-xl">
                From delivering espresso to offices around Kampala, to becoming a farmer-owned coffee company serving thousands.
              </p>
            </div>

            {/* Right Column - Story Content */}
            <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="100" className="space-y-5">
              <div className="bg-white border border-brown-900/10 p-8 rounded-3xl shadow-md space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-600/10 text-orange-600 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2v2.343M14 2v2.343M8.5 7.5h7v7h-7z" />
                      <path d="M8.5 14.5v2a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-2" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
                    The Beginning
                  </span>
                </div>
                <p className="text-sm sm:text-base text-brown-900 leading-relaxed font-normal">
                  L'Oven Coffee started small, delivering espresso to offices around Kampala. 
                  We served bankers, insurers, and other professionals who loved our coffee so much 
                  they kept referring their colleagues.
                </p>
              </div>

              <div className="bg-white border border-brown-900/10 p-8 rounded-3xl shadow-md space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-600/10 text-orange-600 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
                    The Growth
                  </span>
                </div>
                <p className="text-sm sm:text-base text-brown-900 leading-relaxed font-normal">
                  Before we knew it, <span className="font-bold text-orange-600">70% of the offices</span> in the area were drinking L'Oven coffee 
                  every day. What started as small cash transactions grew into something bigger.
                </p>
              </div>

              <div className="bg-brown-900 text-cream-100 p-8 rounded-3xl shadow-lg space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
                    Today
                  </span>
                </div>
                <p className="text-sm sm:text-base text-cream-100 leading-relaxed font-normal">
                  In <span className="font-bold text-orange-600">August 2019</span>, we registered 
                  as a private company. Today, we are owned by <span className="font-bold text-orange-600">ten members</span> — all 
                  coffee entrepreneurs and farmers. Our goal is simple: get more farmers to own shares 
                  in L'Oven, so they benefit directly from their hard work.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-20 sm:mt-24 lg:mt-28" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center sm:text-left bg-white p-8 rounded-3xl shadow-sm border border-amber-200/70">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-600 text-white mb-4 text-2xl font-display font-bold">
                  1
                </div>
                <h3 className="text-xs font-bold tracking-widest text-brown-900 uppercase mb-2">
                  Small Beginnings
                </h3>
                <p className="text-xs text-brown-700 leading-relaxed">
                  Office deliveries and word-of-mouth growth in Kampala
                </p>
              </div>

              <div className="text-center sm:text-left bg-white p-8 rounded-3xl shadow-sm border border-amber-200/70">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-600 text-white mb-4 text-2xl font-display font-bold">
                  2
                </div>
                <h3 className="text-xs font-bold tracking-widest text-brown-900 uppercase mb-2">
                  August 2019
                </h3>
                <p className="text-xs text-brown-700 leading-relaxed">
                  Registered as a private company with farmer-owners
                </p>
              </div>

              <div className="text-center sm:text-left bg-white p-8 rounded-3xl shadow-sm border border-amber-200/70">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-600 text-white mb-4 text-2xl font-display font-bold">
                  3
                </div>
                <h3 className="text-xs font-bold tracking-widest text-brown-900 uppercase mb-2">
                  15,300+ Farmers
                </h3>
                <p className="text-xs text-brown-700 leading-relaxed">
                  Supporting thousands of farming families across 3 regions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brown-900 text-cream-100 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
            {[
              { number: '15,300+', label: 'Farmers' },
              { number: '3', label: 'Regions' },
              { number: '2019', label: 'Established' },
              { number: '100%', label: 'Farmer Owned' }
            ].map((stat, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={index * 100}
                className="text-center"
              >
                <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-orange-600 mb-3">
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

      {/* Mission & Vision with Background */}
      <section className="relative bg-brown-900 text-cream-100 py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={coffeeWallpaper} 
            alt="Coffee Craft" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brown-900/90 via-brown-900/85 to-brown-900/90"></div>
        </div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl relative z-10">
          <div className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="800">
            <span className="block text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase mb-6">
              Purpose and Direction
            </span>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream-100 font-bold leading-[1.12] tracking-tight mb-6">
              Mission and Vision
            </h2>

            <div className="w-20 h-[3px] bg-orange-600 mx-auto" aria-hidden="true" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div
              data-aos="fade-right"
              data-aos-duration="800"
              className="bg-white/95 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border border-amber-200/60 shadow-xl space-y-6"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12h20" />
                    <path d="M12 2v20" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <span className="block text-xs font-bold tracking-widest text-orange-600 uppercase">
                  Our Vision
                </span>
              </div>
              <p className="text-sm sm:text-base text-brown-900 leading-relaxed font-normal">
                To market smallholder farmers' coffee beans and empower them to sell value-added 
                coffee at competitive prices nationally and internationally.
              </p>
            </div>

            <div
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="100"
              className="bg-white/95 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border border-amber-200/60 shadow-xl space-y-6"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v20" />
                    <path d="M17 7l-5 5-5-5" />
                    <path d="m17 13-5 5-5-5" />
                  </svg>
                </div>
                <span className="block text-xs font-bold tracking-widest text-orange-600 uppercase">
                  Our Mission
                </span>
              </div>
              <p className="text-sm sm:text-base text-brown-900 leading-relaxed font-normal">
                To be a leading coffee shop marketing farmer-owned coffees by maintaining exceptional 
                quality and offering excellent prices that improve livelihoods.
              </p>
            </div>
          </div>

          {/* Additional Values */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-12 border-t border-cream-100/20" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <div className="text-center">
              <div className="text-orange-600 mb-3">
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h4 className="text-xs font-bold tracking-widest text-cream-100 uppercase mb-1.5">
                Fair Prices
              </h4>
              <p className="text-xs text-cream-100/70 leading-relaxed">
                Competitive rates for farmers
              </p>
            </div>

            <div className="text-center">
              <div className="text-orange-600 mb-3">
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </div>
              <h4 className="text-xs font-bold tracking-widest text-cream-100 uppercase mb-1.5">
                Quality First
              </h4>
              <p className="text-xs text-cream-100/70 leading-relaxed">
                Excellence in every cup
              </p>
            </div>

            <div className="text-center">
              <div className="text-orange-600 mb-3">
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="7" r="4" />
                  <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
                </svg>
              </div>
              <h4 className="text-xs font-bold tracking-widest text-cream-100 uppercase mb-1.5">
                Community
              </h4>
              <p className="text-xs text-cream-100/70 leading-relaxed">
                Farmer partnerships
              </p>
            </div>

            <div className="text-center">
              <div className="text-orange-600 mb-3">
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h4 className="text-xs font-bold tracking-widest text-cream-100 uppercase mb-1.5">
                Global Reach
              </h4>
              <p className="text-xs text-cream-100/70 leading-relaxed">
                Local to international
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coffee Regions */}
      <section className="bg-cream-100 text-brown-900 py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="800">
            <span className="block text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase mb-6">
              Where We Source
            </span>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brown-900 font-bold leading-[1.08] tracking-tight">
              Three regions.<br />
              One <span className="italic text-orange-600">mission.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: 'Mt. Elgon Belt',
                type: 'ARABICA COFFEE',
                desc: 'Grown at 1,600m-2,000m altitude on volcanic soils. We work with Kabeywa United (5,800 farmers) and Bufumbo Organic (5,000+ farmers).',
                note: '100% organic'
              },
              {
                title: 'Mt. Rwenzori Belt',
                type: 'DRUGAR COFFEE',
                desc: 'From mountains rising 17,000m on Uganda\'s western border. Partnered with Kabonero Peak Modern Farmers (3,000 farmers).',
                note: 'High-altitude'
              },
              {
                title: 'Lake Victoria',
                type: 'ROBUSTA COFFEE',
                desc: 'Premium Robusta from northern lake shores. Working with BUNJAKKO Modern Farm (1,500 farmers).',
                note: 'Full-bodied'
              }
            ].map((region, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={index * 100}
                className="bg-white p-8 rounded-3xl shadow-md border border-amber-200/70 space-y-4"
              >
                <span className="block text-xs font-bold tracking-widest text-orange-600 uppercase">
                  {region.type}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-brown-900 font-bold leading-tight">
                  {region.title}
                </h3>
                <p className="text-xs sm:text-sm text-brown-900 leading-relaxed">
                  {region.desc}
                </p>
                <p className="text-xs text-orange-600 font-bold uppercase tracking-wide">
                  {region.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bean to Cup Section with New Image */}
      <section className="bg-white text-brown-900 py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 md:order-1" data-aos="fade-right" data-aos-duration="800">
              <div className="overflow-hidden rounded-3xl bg-cream-100 aspect-[4/3] w-full shadow-xl border border-amber-200/60">
                <img 
                  src={specialtyBeans} 
                  alt="Specialty Coffee beans" 
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
            <div className="order-1 md:order-2 space-y-8" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
              <div>
                <span className="block text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase mb-6">
                  Our Process
                </span>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brown-900 font-bold leading-[1.12] tracking-tight mb-6">
                  From bean<br />to <span className="italic text-orange-600">cup.</span>
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-xs font-bold tracking-widest text-brown-900 uppercase mb-1">
                      Farm Selection
                    </h4>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed">
                      Hand-picked from high-altitude farms across Uganda's best coffee regions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-xs font-bold tracking-widest text-brown-900 uppercase mb-1">
                      Roasting
                    </h4>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed">
                      Carefully roasted to bring out each variety's unique flavors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-xs font-bold tracking-widest text-brown-900 uppercase mb-1">
                      Quality Control
                    </h4>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed">
                      Multiple checks ensure consistency in every batch.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coffee Moment with New Image */}
      <section className="relative bg-brown-900 text-cream-100 py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={coffeeArt} 
            alt="Coffee Moment" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brown-900/90 via-brown-900/85 to-brown-900/90"></div>
        </div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8" data-aos="fade-right" data-aos-duration="800">
              <div>
                <span className="block text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase mb-6">
                  Our Philosophy
                </span>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream-100 font-bold leading-[1.12] tracking-tight mb-6">
                  Take a<br /><span className="italic text-orange-600">moment.</span>
                </h2>

                <p className="text-base sm:text-lg text-cream-100/90 font-light leading-relaxed mb-8">
                  In today's busy world, L'Oven Coffee is where you can slow down. Whether you're meeting 
                  friends, working, or just taking a break — we're here for you.
                </p>

                <div className="space-y-4 text-sm sm:text-base text-cream-100 leading-relaxed">
                  <p className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span>Every cup is made fresh</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span>Comfortable, welcoming space</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span>A place to connect</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
              <div className="overflow-hidden rounded-3xl bg-brown-950 aspect-[4/3] w-full shadow-2xl border border-amber-200/30">
                <img 
                  src={coffeeSimple} 
                  alt="Golden hour coffee moment" 
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coffee Experience with New Image */}
      <section className="bg-cream-100 text-brown-900 py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div data-aos="fade-right" data-aos-duration="800">
              <div className="overflow-hidden rounded-3xl bg-amber-50 aspect-[4/3] w-full shadow-xl border border-amber-200/60">
                <img 
                  src={italianCoffee} 
                  alt="Italian Coffee Experience" 
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
            <div className="space-y-8" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
              <div>
                <span className="block text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase mb-6">
                  What To Expect
                </span>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brown-900 font-bold leading-[1.12] tracking-tight mb-6">
                  Fresh <span className="italic text-orange-600">daily.</span>
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2v2.343M14 2v2.343M8.5 7.5h7v7h-7z" />
                      <path d="M8.5 14.5v2a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-2" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-xs font-bold tracking-widest text-brown-900 uppercase mb-1">
                      Fresh Daily
                    </h4>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed">
                      Every cup is made to order, right in front of you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="9" cy="7" r="4" />
                      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                      <path d="m16 11 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-xs font-bold tracking-widest text-brown-900 uppercase mb-1">
                      Expert Baristas
                    </h4>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed">
                      Our team knows coffee and they're happy to help you find what you like.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-xs font-bold tracking-widest text-brown-900 uppercase mb-1">
                      Ethical Sourcing
                    </h4>
                    <p className="text-sm sm:text-base text-brown-700 leading-relaxed">
                      Every purchase supports Ugandan farmers directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with Cozy Coffee Image */}
      <section className="relative bg-orange-600 text-cream-100 py-20 sm:py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={italianCoffee} 
            alt="Cozy Coffee Experience" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/95 via-orange-600/90 to-orange-700/95"></div>
        </div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-4xl text-center relative z-10">
          <div className="space-y-8" data-aos="fade-up" data-aos-duration="800">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight">
              Visit us.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-cream-100/95 max-w-2xl mx-auto font-light leading-relaxed">
              Come try our coffee. Dine-in, takeaway, or delivery — we're ready to serve you.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-brown-900 font-bold text-xs sm:text-sm tracking-widest uppercase rounded-xl shadow-lg hover:bg-cream-100 transition-all duration-300 hover:scale-105"
              >
                VIEW MENU
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-white text-white font-bold text-xs sm:text-sm tracking-widest uppercase rounded-xl transition-all duration-300 hover:bg-white hover:text-orange-600 hover:scale-105"
              >
                FIND US
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
