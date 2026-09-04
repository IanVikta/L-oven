import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import heroBanner from '../assets/hero_banner.jpg';
import coffeeSplash from '../assets/coffee_splash.jpg';
import coffeeImage from '../assets/coffee.jpg';
import calmCoffee from '../assets/calm-coffee.jpg';

const About = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className="bg-[#FFF4E6]">
      {/* Hero Section */}
      <section className="relative bg-[#2B1B12] text-[#FFF4E6] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroBanner} 
            alt="L Oven Coffee" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2B1B12]/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
          <div className="min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center py-16 sm:py-20 lg:py-24">
            <motion.div
              initial={fadeIn.initial}
              animate={{ opacity: 1, y: 0 }}
              transition={fadeIn.transition}
              className="max-w-2xl"
            >
              <span className="block text-xs sm:text-[13px] font-sans font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-5">
                ABOUT L OVEN COFFEE
              </span>

              <h1 className="font-['Playfair_Display',Georgia,serif] text-[38px] sm:text-5xl md:text-6xl lg:text-[68px] font-normal leading-[1.12] tracking-tight text-[#FFF4E6] mb-6">
                Supporting 15,300+<br />
                Ugandan <span className="text-[#F28C13]">farmers.</span>
              </h1>

              <div className="w-12 h-[2px] bg-[#F28C13] my-6 sm:my-7" aria-hidden="true" />

              <p className="font-sans text-sm sm:text-base md:text-lg text-[#FFF4E6]/85 font-normal leading-relaxed max-w-lg">
                Building a coffee company owned by the farmers who grow it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-[#FFF4E6] text-[#2B1B12] py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Heading */}
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={fadeIn.viewport}
              transition={fadeIn.transition}
            >
              <span className="block font-sans text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-6">
                OUR STORY
              </span>

              <h2 className="font-['Playfair_Display',Georgia,serif] text-4xl sm:text-5xl lg:text-6xl text-[#2B1B12] font-normal leading-[1.08] tracking-tight mb-8">
                Started small.<br />
                Dreamed big.
              </h2>

              <div className="w-16 h-[2px] bg-[#F28C13] mb-8" aria-hidden="true" />

              <p className="font-sans text-base sm:text-lg text-[#2B1B12]/70 leading-relaxed italic">
                From delivering espresso to offices around Kampala, to becoming a farmer-owned coffee company serving thousands.
              </p>
            </motion.div>

            {/* Right Column - Story Content */}
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={fadeIn.viewport}
              transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
              className="space-y-6"
            >
              <div className="bg-white border border-[#2B1B12]/10 p-8 rounded-sm space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F28C13]/10 text-[#F28C13] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2v2.343M14 2v2.343M8.5 7.5h7v7h-7z" />
                      <path d="M8.5 14.5v2a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-2" />
                    </svg>
                  </div>
                  <span className="font-sans text-xs font-bold tracking-[0.15em] text-[#F28C13] uppercase">
                    THE BEGINNING
                  </span>
                </div>
                <p className="font-sans text-[15px] sm:text-[17px] text-[#2B1B12] leading-[1.7] antialiased">
                  L Oven Coffee started small delivering espresso to offices around Kampala. 
                  We served bankers, insurers, and other professionals who loved our coffee so much 
                  they kept referring their colleagues.
                </p>
              </div>

              <div className="bg-white border border-[#2B1B12]/10 p-8 rounded-sm space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F28C13]/10 text-[#F28C13] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <span className="font-sans text-xs font-bold tracking-[0.15em] text-[#F28C13] uppercase">
                    THE GROWTH
                  </span>
                </div>
                <p className="font-sans text-[15px] sm:text-[17px] text-[#2B1B12] leading-[1.7] antialiased">
                  Before we knew it, <span className="font-semibold text-[#F28C13]">70% of the offices</span> in the area were drinking L Oven coffee 
                  every day. What started as small cash transactions grew into something bigger.
                </p>
              </div>

              <div className="bg-[#2B1B12] text-[#FFF4E6] p-8 rounded-sm space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F28C13] text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                    </svg>
                  </div>
                  <span className="font-sans text-xs font-bold tracking-[0.15em] text-[#F28C13] uppercase">
                    TODAY
                  </span>
                </div>
                <p className="font-sans text-[15px] sm:text-[17px] text-[#FFF4E6] leading-[1.7] antialiased">
                  In <span className="font-semibold text-[#F28C13]">August 2019</span>, we registered 
                  as a private company. Today, we are owned by <span className="font-semibold text-[#F28C13]">ten members</span> - all 
                  coffee entrepreneurs and farmers. Our goal is simple: get more farmers to own shares 
                  in L Oven, so they benefit directly from their hard work.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="mt-20 sm:mt-24 lg:mt-28"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center sm:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F28C13] text-white mb-4">
                  <span className="font-['Playfair_Display',Georgia,serif] text-2xl font-normal">1</span>
                </div>
                <h3 className="font-sans text-sm font-bold tracking-[0.15em] text-[#2B1B12] uppercase mb-2">
                  Small Beginnings
                </h3>
                <p className="font-sans text-sm text-[#2B1B12]/70 leading-relaxed">
                  Office deliveries and word-of-mouth growth in Kampala
                </p>
              </div>

              <div className="text-center sm:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F28C13] text-white mb-4">
                  <span className="font-['Playfair_Display',Georgia,serif] text-2xl font-normal">2</span>
                </div>
                <h3 className="font-sans text-sm font-bold tracking-[0.15em] text-[#2B1B12] uppercase mb-2">
                  August 2019
                </h3>
                <p className="font-sans text-sm text-[#2B1B12]/70 leading-relaxed">
                  Registered as a private company with farmer-owners
                </p>
              </div>

              <div className="text-center sm:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F28C13] text-white mb-4">
                  <span className="font-['Playfair_Display',Georgia,serif] text-2xl font-normal">3</span>
                </div>
                <h3 className="font-sans text-sm font-bold tracking-[0.15em] text-[#2B1B12] uppercase mb-2">
                  15,300+ Farmers
                </h3>
                <p className="font-sans text-sm text-[#2B1B12]/70 leading-relaxed">
                  Supporting thousands of farming families across 3 regions
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#2B1B12] text-[#FFF4E6] py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
            {[
              { number: '15,300+', label: 'Farmers' },
              { number: '3', label: 'Regions' },
              { number: '2019', label: 'Established' },
              { number: '100%', label: 'Farmer Owned' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={fadeIn.initial}
                whileInView={fadeIn.whileInView}
                viewport={fadeIn.viewport}
                transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                className="text-center"
              >
                <div className="font-['Playfair_Display',Georgia,serif] text-5xl sm:text-6xl lg:text-7xl font-normal text-[#F28C13] mb-3">
                  {stat.number}
                </div>
                <div className="font-sans text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#FFF4E6]/70 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#FFF4E6] text-[#2B1B12] py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={fadeIn.transition}
            className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto"
          >
            <span className="block font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-6">
              PURPOSE AND DIRECTION
            </span>

            <h2 className="font-['Playfair_Display',Georgia,serif] text-4xl sm:text-5xl lg:text-6xl text-[#2B1B12] font-normal leading-[1.12] tracking-tight mb-6">
              Mission and Vision
            </h2>

            <div className="w-16 h-[2px] bg-[#F28C13] mx-auto" aria-hidden="true" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={fadeIn.viewport}
              transition={fadeIn.transition}
              className="bg-white p-8 sm:p-10 rounded-sm border border-[#2B1B12]/5 space-y-6"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F28C13] text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12h20" />
                    <path d="M12 2v20" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <span className="block font-sans text-xs font-bold tracking-[0.2em] text-[#F28C13] uppercase">
                  OUR VISION
                </span>
              </div>
              <p className="font-sans text-[15px] sm:text-[17px] text-[#2B1B12] leading-[1.75] antialiased">
                To market smallholder farmers coffee beans and empower them to sell value-added 
                coffee at competitive prices nationally and internationally.
              </p>
            </motion.div>

            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={fadeIn.viewport}
              transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
              className="bg-white p-8 sm:p-10 rounded-sm border border-[#2B1B12]/5 space-y-6"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F28C13] text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v20" />
                    <path d="M17 7l-5 5-5-5" />
                    <path d="m17 13-5 5-5-5" />
                  </svg>
                </div>
                <span className="block font-sans text-xs font-bold tracking-[0.2em] text-[#F28C13] uppercase">
                  OUR MISSION
                </span>
              </div>
              <p className="font-sans text-[15px] sm:text-[17px] text-[#2B1B12] leading-[1.75] antialiased">
                To be a leading coffee shop marketing farmer-owned coffees by maintaining exceptional 
                quality and offering excellent prices that improve livelihoods.
              </p>
            </motion.div>
          </div>

          {/* Additional Values */}
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-12 border-t border-[#2B1B12]/10"
          >
            <div className="text-center">
              <div className="text-[#F28C13] mb-3">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h4 className="font-sans text-sm font-semibold tracking-[0.12em] text-[#2B1B12] uppercase mb-1.5">
                Fair Prices
              </h4>
              <p className="font-sans text-xs text-[#2B1B12]/70 leading-relaxed">
                Competitive rates for farmers
              </p>
            </div>

            <div className="text-center">
              <div className="text-[#F28C13] mb-3">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </div>
              <h4 className="font-sans text-sm font-semibold tracking-[0.12em] text-[#2B1B12] uppercase mb-1.5">
                Quality First
              </h4>
              <p className="font-sans text-xs text-[#2B1B12]/70 leading-relaxed">
                Excellence in every cup
              </p>
            </div>

            <div className="text-center">
              <div className="text-[#F28C13] mb-3">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="7" r="4" />
                  <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
                </svg>
              </div>
              <h4 className="font-sans text-sm font-semibold tracking-[0.12em] text-[#2B1B12] uppercase mb-1.5">
                Community
              </h4>
              <p className="font-sans text-xs text-[#2B1B12]/70 leading-relaxed">
                Farmer partnerships
              </p>
            </div>

            <div className="text-center">
              <div className="text-[#F28C13] mb-3">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h4 className="font-sans text-sm font-semibold tracking-[0.12em] text-[#2B1B12] uppercase mb-1.5">
                Global Reach
              </h4>
              <p className="font-sans text-xs text-[#2B1B12]/70 leading-relaxed">
                Local to international
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coffee Regions */}
      <section className="bg-[#EFE3D3] text-[#2B1B12] py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={fadeIn.transition}
            className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto"
          >
            <span className="block font-sans text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-6">
              WHERE WE SOURCE
            </span>

            <h2 className="font-['Playfair_Display',Georgia,serif] text-4xl sm:text-5xl lg:text-6xl text-[#2B1B12] font-normal leading-[1.08] tracking-tight">
              Three regions.<br />
              One mission.
            </h2>
          </motion.div>

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
                desc: 'From mountains rising 17,000m on Uganda western border. Partnered with Kabonero Peak Modern Farmers (3,000 farmers).',
                note: 'High-altitude'
              },
              {
                title: 'Lake Victoria',
                type: 'ROBUSTA COFFEE',
                desc: 'Premium Robusta from northern lake shores. Working with BUNJAKKO Modern Farm (1,500 farmers).',
                note: 'Full-bodied'
              }
            ].map((region, index) => (
              <motion.div
                key={index}
                initial={fadeIn.initial}
                whileInView={fadeIn.whileInView}
                viewport={fadeIn.viewport}
                transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                className="bg-[#FFF4E6] p-8 rounded-sm space-y-4"
              >
                <span className="block font-sans text-xs font-bold tracking-[0.2em] text-[#F28C13] uppercase">
                  {region.type}
                </span>
                <h3 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl text-[#2B1B12] font-normal leading-tight">
                  {region.title}
                </h3>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#2B1B12] leading-[1.65] antialiased">
                  {region.desc}
                </p>
                <p className="font-sans text-xs text-[#F28C13] font-semibold uppercase tracking-wide">
                  {region.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bean to Cup */}
      <section className="bg-[#FFF4E6] text-[#2B1B12] py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={fadeIn.viewport}
              transition={fadeIn.transition}
              className="order-2 md:order-1"
            >
              <div className="overflow-hidden rounded-sm bg-[#EFE3D3] aspect-[4/3] w-full">
                <img 
                  src={coffeeSplash} 
                  alt="Coffee beans" 
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={fadeIn.viewport}
              transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
              className="order-1 md:order-2 space-y-8"
            >
              <div>
                <span className="block font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-6">
                  OUR PROCESS
                </span>

                <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl lg:text-5xl text-[#2B1B12] font-normal leading-[1.12] tracking-tight mb-6">
                  From bean<br />to cup.
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F28C13] text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-sans text-sm font-semibold tracking-[0.12em] text-[#2B1B12] uppercase mb-1">
                      Farm Selection
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-[#2B1B12] leading-relaxed antialiased">
                      Hand-picked from high-altitude farms across Uganda best coffee regions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F28C13] text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-sans text-sm font-semibold tracking-[0.12em] text-[#2B1B12] uppercase mb-1">
                      Roasting
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-[#2B1B12] leading-relaxed antialiased">
                      Carefully roasted to bring out each variety unique flavors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F28C13] text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-sans text-sm font-semibold tracking-[0.12em] text-[#2B1B12] uppercase mb-1">
                      Quality Control
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-[#2B1B12] leading-relaxed antialiased">
                      Multiple checks ensure consistency in every batch.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coffee Moment */}
      <section className="bg-[#2B1B12] text-[#FFF4E6] py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={fadeIn.viewport}
              transition={fadeIn.transition}
              className="space-y-8"
            >
              <div>
                <span className="block font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-6">
                  OUR PHILOSOPHY
                </span>

                <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl lg:text-5xl text-[#FFF4E6] font-normal leading-[1.12] tracking-tight mb-6">
                  Take a<br />moment.
                </h2>

                <p className="font-sans text-base sm:text-lg text-[#FFF4E6]/90 font-normal leading-[1.7] mb-8 antialiased">
                  In today busy world, L Oven Coffee is where you can slow down. Whether you are meeting 
                  friends, working, or just taking a break - we are here for you.
                </p>

                <div className="space-y-4 font-sans text-[15px] sm:text-base text-[#FFF4E6] leading-relaxed antialiased">
                  <p className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F28C13] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span>Every cup is made fresh</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F28C13] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span>Comfortable, welcoming space</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F28C13] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span>A place to connect</span>
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={fadeIn.viewport}
              transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
            >
              <div className="overflow-hidden rounded-sm bg-[#1a120d] aspect-[4/3] w-full">
                <img 
                  src={calmCoffee} 
                  alt="Coffee moment" 
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coffee Types */}
      <section className="bg-[#FFF4E6] text-[#2B1B12] py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={fadeIn.transition}
            className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto"
          >
            <span className="block font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-6">
              PREMIUM SELECTION
            </span>

            <h2 className="font-['Playfair_Display',Georgia,serif] text-4xl sm:text-5xl lg:text-6xl text-[#2B1B12] font-normal leading-[1.12] tracking-tight mb-6">
              Our coffee.
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#2B1B12]/70 leading-relaxed max-w-xl mx-auto">
              Three distinct varieties, each carefully selected from Uganda finest growing regions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-16">
            {[
              {
                title: 'ARABICA',
                region: 'Mt. Elgon and Mt. Rwenzori',
                altitude: '1,600m - 2,000m',
                features: ['Fruity and floral notes', 'Smooth, clean taste', 'Medium acidity'],
                badge: '100% Organic',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
                  </svg>
                )
              },
              {
                title: 'ROBUSTA',
                region: 'Lake Victoria Basin',
                altitude: '900m - 1,200m',
                features: ['Full-bodied flavor', 'Higher caffeine content', 'Chocolate and earthy notes'],
                badge: 'Bold & Rich',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                )
              },
              {
                title: 'BLENDED',
                region: 'Our Signature Mix',
                altitude: 'Multi-Origin',
                features: ['Balanced flavor profile', 'Perfect crema formation', 'Versatile for any brew'],
                badge: 'House Favorite',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                )
              }
            ].map((coffee, index) => (
              <motion.div
                key={index}
                initial={fadeIn.initial}
                whileInView={fadeIn.whileInView}
                viewport={fadeIn.viewport}
                transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                className="bg-white border border-[#2B1B12]/10 p-8 rounded-sm space-y-6 hover:border-[#F28C13]/30 transition-colors duration-300 group"
              >
                {/* Icon & Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#F28C13]/10 text-[#F28C13] flex items-center justify-center group-hover:bg-[#F28C13] group-hover:text-white transition-colors duration-300">
                    {coffee.icon}
                  </div>
                  <span className="inline-block font-sans text-[10px] font-bold tracking-[0.15em] text-[#F28C13] uppercase bg-[#F28C13]/10 px-3 py-1.5 rounded-full">
                    {coffee.badge}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl text-[#2B1B12] font-normal mb-2">
                    {coffee.title}
                  </h3>
                  <span className="block font-sans text-xs font-semibold tracking-[0.15em] text-[#F28C13] uppercase">
                    {coffee.region}
                  </span>
                </div>

                {/* Altitude Badge */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#2B1B12]/5">
                  <svg className="w-4 h-4 text-[#2B1B12]/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                  </svg>
                  <span className="font-sans text-xs text-[#2B1B12]/60 uppercase tracking-wide">
                    Altitude: {coffee.altitude}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 font-sans text-[14px] sm:text-[15px] text-[#2B1B12] leading-relaxed antialiased">
                  {coffee.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-[#F28C13] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Coffee Stats */}
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={fadeIn.transition}
            className="bg-[#EFE3D3] rounded-sm p-8 sm:p-10 mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl font-normal text-[#2B1B12] mb-2">
                  100%
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#2B1B12]/70 uppercase tracking-wide">
                  Single Origin
                </p>
              </div>
              <div>
                <div className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl font-normal text-[#2B1B12] mb-2">
                  Fresh
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#2B1B12]/70 uppercase tracking-wide">
                  Roasted Daily
                </p>
              </div>
              <div>
                <div className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl font-normal text-[#2B1B12] mb-2">
                  3
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#2B1B12]/70 uppercase tracking-wide">
                  Growing Regions
                </p>
              </div>
              <div>
                <div className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl font-normal text-[#2B1B12] mb-2">
                  Direct
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#2B1B12]/70 uppercase tracking-wide">
                  From Farmers
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={fadeIn.transition}
            className="text-center"
          >
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#F28C13] text-white font-sans font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase rounded-sm hover:bg-[#2B1B12] transition-colors duration-200 group"
            >
              <span>SEE FULL MENU</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-[#EFE3D3] text-[#2B1B12] py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={fadeIn.viewport}
              transition={fadeIn.transition}
            >
              <div className="overflow-hidden rounded-sm bg-[#d9cbb8] aspect-[4/3] w-full">
                <img 
                  src={coffeeImage} 
                  alt="Fresh coffee" 
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={fadeIn.viewport}
              transition={{ ...fadeIn.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
              className="space-y-8"
            >
              <div>
                <span className="block font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-6">
                  WHAT TO EXPECT
                </span>

                <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl lg:text-5xl text-[#2B1B12] font-normal leading-[1.12] tracking-tight mb-6">
                  Fresh daily.
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F28C13] text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2v2.343M14 2v2.343M8.5 7.5h7v7h-7z" />
                      <path d="M8.5 14.5v2a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-2" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-sans text-sm font-semibold tracking-[0.12em] text-[#2B1B12] uppercase mb-1">
                      Fresh Daily
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-[#2B1B12] leading-relaxed antialiased">
                      Every cup is made to order, right in front of you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F28C13] text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="9" cy="7" r="4" />
                      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                      <path d="m16 11 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-sans text-sm font-semibold tracking-[0.12em] text-[#2B1B12] uppercase mb-1">
                      Expert Baristas
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-[#2B1B12] leading-relaxed antialiased">
                      Our team knows coffee and they are happy to help you find what you like.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F28C13] text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-sans text-sm font-semibold tracking-[0.12em] text-[#2B1B12] uppercase mb-1">
                      Ethical Sourcing
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-[#2B1B12] leading-relaxed antialiased">
                      Every purchase supports Ugandan farmers directly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#F28C13] text-[#FFF4E6] py-20 sm:py-24 lg:py-28">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-4xl text-center">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.whileInView}
            viewport={fadeIn.viewport}
            transition={fadeIn.transition}
            className="space-y-8"
          >
            <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight">
              Visit us.
            </h2>
            <p className="font-sans text-base sm:text-lg md:text-xl text-[#FFF4E6]/90 max-w-2xl mx-auto">
              Come try our coffee. Dine-in, takeaway, or delivery - we are ready to serve you.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#FFF4E6] text-[#2B1B12] font-sans font-semibold text-xs sm:text-[13px] tracking-[0.16em] uppercase rounded transition-colors duration-150 hover:bg-white"
              >
                VIEW MENU
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#FFF4E6] text-[#FFF4E6] font-sans font-semibold text-xs sm:text-[13px] tracking-[0.16em] uppercase rounded transition-colors duration-150 hover:bg-[#FFF4E6] hover:text-[#F28C13]"
              >
                FIND US
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;