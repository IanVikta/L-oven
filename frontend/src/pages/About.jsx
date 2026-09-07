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

      {/* Our Story - Redesigned with rich content and visual split layout */}
      <section className="relative bg-white text-brown-900 py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-50/30 to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="block text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase mb-4">
              Our Journey
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brown-900 font-bold leading-tight mb-6">
              From Humble Beginnings to<br />
              <span className="italic text-orange-600">Farmer Empowerment</span>
            </h2>
            <p className="text-base sm:text-lg text-brown-700 leading-relaxed max-w-3xl mx-auto">
              What started as a simple dream to serve quality coffee has evolved into a movement 
              empowering thousands of Ugandan farmers through fair trade and shared ownership.
            </p>
          </div>

          {/* Timeline Layout with Images */}
          <div className="space-y-16 lg:space-y-24">
            {/* 2016 - The Spark */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7" data-aos="fade-right">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-orange-600 to-transparent"></div>
                  <div className="pl-8">
                    <div className="inline-flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-700 text-white flex items-center justify-center text-2xl font-display font-bold shadow-lg">
                        2016
                      </div>
                      <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">The Spark</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-brown-900 mb-4">
                      A Simple Idea in Kampala
                    </h3>
                    <p className="text-base text-brown-700 leading-relaxed mb-4">
                      It all began with a bicycle, a thermos, and a passion for exceptional coffee. Our founder 
                      started delivering freshly brewed espresso to busy professionals across Kampala's business district. 
                      The response was overwhelming—people weren't just drinking our coffee, they were sharing stories, 
                      building communities, and asking for more.
                    </p>
                    <p className="text-base text-brown-700 leading-relaxed">
                      Word spread fast. Within months, <span className="font-bold text-orange-600">70% of offices</span> in 
                      the area became regular customers. Coffee breaks turned into daily rituals, and our small operation 
                      couldn't keep up with demand.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay="100">
                <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <img src={italianCoffee} alt="Early days of L'Oven" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/40 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* 2017-2018 - Meeting the Farmers */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1" data-aos="fade-right">
                <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <img src={specialtyBeans} alt="Meeting coffee farmers" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/40 to-transparent"></div>
                </div>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2" data-aos="fade-left" data-aos-delay="100">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-orange-600 to-transparent"></div>
                  <div className="pl-8">
                    <div className="inline-flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-700 text-white flex items-center justify-center text-xl font-display font-bold shadow-lg">
                        2017
                      </div>
                      <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">The Discovery</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-brown-900 mb-4">
                      Finding Our Roots in the Mountains
                    </h3>
                    <p className="text-base text-brown-700 leading-relaxed mb-4">
                      To maintain our growing demand for quality, we ventured into Uganda's coffee heartlands—Mt. Elgon, 
                      Mt. Rwenzori, and the shores of Lake Victoria. What we discovered changed everything.
                    </p>
                    <p className="text-base text-brown-700 leading-relaxed mb-4">
                      Farmers were growing some of the world's finest beans but receiving pennies for their harvest. 
                      Middlemen dominated the supply chain, and these hardworking families barely earned enough to 
                      sustain themselves, let alone invest in better farming practices.
                    </p>
                    <p className="text-base text-brown-700 leading-relaxed">
                      We knew we had to do things differently. What if the farmers didn't just supply our beans—what if 
                      they <span className="font-bold text-orange-600">owned the company</span>?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2019 - The Transformation */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7" data-aos="fade-right">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-orange-600 to-transparent"></div>
                  <div className="pl-8">
                    <div className="inline-flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-700 text-white flex items-center justify-center text-2xl font-display font-bold shadow-lg">
                        2019
                      </div>
                      <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">The Revolution</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-brown-900 mb-4">
                      Becoming Farmer-Owned
                    </h3>
                    <p className="text-base text-brown-700 leading-relaxed mb-4">
                      In <span className="font-bold text-orange-600">August 2019</span>, we officially registered as a 
                      private company with a radical difference—farmers became shareholders. Ten founding members, all 
                      coffee entrepreneurs and smallholder farmers, took ownership.
                    </p>
                    <p className="text-base text-brown-700 leading-relaxed mb-4">
                      This wasn't just symbolic. Farmer-owners now receive <span className="font-bold text-orange-600">fair 
                      prices above market rates</span>, participate in business decisions, and share in our profits. 
                      Every bag of coffee sold directly benefits the families who grew it.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200">
                        <div className="text-3xl font-display font-bold text-orange-600 mb-1">10</div>
                        <p className="text-xs text-brown-700">Founding Farmer Members</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200">
                        <div className="text-3xl font-display font-bold text-orange-600 mb-1">100%</div>
                        <p className="text-xs text-brown-700">Farmer-Owned Company</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay="100">
                <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <img src={coffeeArt} alt="Farmer partnership" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/40 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Today - The Impact */}
            <div className="bg-gradient-to-br from-brown-900 to-brown-800 text-cream-100 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl" data-aos="fade-up">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-2xl font-display font-bold shadow-lg">
                      2024
                    </div>
                    <span className="text-xs font-bold tracking-widest text-orange-400 uppercase">Today</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-display font-bold text-cream-100 mb-4">
                    Empowering <span className="text-orange-400">15,300+ Farmers</span>
                  </h3>
                  <p className="text-base text-cream-100/90 leading-relaxed mb-4">
                    Today, L'Oven Coffee partners with over 15,300 smallholder farmers across three major growing regions. 
                    We're not just buying beans—we're building livelihoods, funding education, and creating sustainable 
                    communities.
                  </p>
                  <p className="text-base text-cream-100/90 leading-relaxed">
                    Our vision remains clear: expand farmer ownership, improve farming practices, and prove that ethical 
                    business isn't just possible—it's profitable for everyone involved.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-600/20 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/30">
                    <div className="text-4xl font-display font-bold text-orange-400 mb-2">15.3K</div>
                    <p className="text-sm text-cream-100/80">Farmer Partners</p>
                  </div>
                  <div className="bg-orange-600/20 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/30">
                    <div className="text-4xl font-display font-bold text-orange-400 mb-2">3</div>
                    <p className="text-sm text-cream-100/80">Growing Regions</p>
                  </div>
                  <div className="bg-orange-600/20 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/30">
                    <div className="text-4xl font-display font-bold text-orange-400 mb-2">5</div>
                    <p className="text-sm text-cream-100/80">Cooperatives</p>
                  </div>
                  <div className="bg-orange-600/20 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/30">
                    <div className="text-4xl font-display font-bold text-orange-400 mb-2">100%</div>
                    <p className="text-sm text-cream-100/80">Traceable Beans</p>
                  </div>
                </div>
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

      {/* Mission & Vision - Redesigned with side-by-side layout */}
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
            {/* Vision */}
            <div data-aos="fade-right" data-aos-duration="800" className="relative">
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
                  To market smallholder farmers' coffee beans and empower them to sell value-added coffee at competitive 
                  prices nationally and internationally.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-sm text-brown-700">Expand farmer ownership across Uganda</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-sm text-brown-700">Build international markets for Ugandan coffee</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-sm text-brown-700">Create sustainable farming communities</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="100" className="relative">
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
                  To be a leading coffee shop marketing farmer-owned coffees by maintaining exceptional quality and 
                  offering excellent prices that improve livelihoods.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-sm text-brown-700">Maintain exceptional coffee quality standards</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-sm text-brown-700">Ensure fair compensation for all farmers</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-sm text-brown-700">Deliver memorable coffee experiences</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8" data-aos="fade-up" data-aos-delay="200">
            {[
              { icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', title: 'Fair Prices', desc: 'Above-market rates' },
              { icon: 'M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z', title: 'Quality First', desc: 'Excellence guaranteed' },
              { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', title: 'Community', desc: 'Partnership driven' },
              { icon: 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20', title: 'Sustainability', desc: 'Future focused' }
            ].map((value, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-2xl border border-brown-100 hover:border-orange-200 hover:shadow-md transition-all duration-300">
                <svg className="w-10 h-10 mx-auto text-orange-600 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d={value.icon} />
                </svg>
                <h4 className="text-sm font-bold text-brown-900 mb-1">{value.title}</h4>
                <p className="text-xs text-brown-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Regions */}
      <section className="bg-white text-brown-900 py-20 sm:py-28 lg:py-36">
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
                className="bg-cream-100 p-8 rounded-3xl shadow-md border border-amber-200/70 space-y-4 hover:shadow-xl transition-shadow duration-300"
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

      {/* Bean to Cup Process */}
      <section className="bg-cream-100 text-brown-900 py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 md:order-1" data-aos="fade-right" data-aos-duration="800">
              <div className="overflow-hidden rounded-3xl bg-white aspect-[4/3] w-full shadow-xl border border-amber-200/60">
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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

      {/* Philosophy - Redesigned with magazine-style layout */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Split background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 left-0 w-1/2 bg-brown-900"></div>
          <div className="absolute inset-0 right-0 w-1/2 bg-cream-100"></div>
        </div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch">
            {/* Left side - Dark */}
            <div className="bg-brown-900 text-cream-100 p-8 sm:p-12 lg:p-16 flex flex-col justify-center" data-aos="fade-right">
              <span className="block text-xs sm:text-sm font-bold tracking-widest text-orange-400 uppercase mb-6">
                Our Philosophy
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                More than just<br />
                <span className="italic text-orange-400">coffee.</span>
              </h2>
              <p className="text-lg text-cream-100/90 leading-relaxed mb-8">
                Every cup tells a story. A story of farmers waking before dawn, carefully selecting ripe cherries. 
                A story of communities coming together, building futures. A story of you, taking a moment in your busy day.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-lg bg-orange-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-cream-100 mb-1">Crafted with Care</h4>
                    <p className="text-sm text-cream-100/70">Every bean, every brew, every moment matters</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-lg bg-orange-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-cream-100 mb-1">Built on Values</h4>
                    <p className="text-sm text-cream-100/70">Fairness, quality, and community in every decision</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Light with image */}
            <div className="relative h-[500px] lg:h-auto" data-aos="fade-left" data-aos-delay="100">
              <img 
                src={coffeeSimple} 
                alt="Coffee philosophy" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-lg font-light italic leading-relaxed">
                  "Coffee is a bridge between cultures, a catalyst for conversations, and a daily reminder 
                  that the best things in life are worth waiting for."
                </p>
                <p className="mt-4 text-sm font-bold tracking-wide">— L'Oven Coffee</p>
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
