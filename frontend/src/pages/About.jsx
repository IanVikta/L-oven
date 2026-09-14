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
import todayCoffeeBanner from '../assets/story/today_coffee_banner.jpg';

// Human Side / Our People Assets
import farmerPortrait from '../assets/people/farmer_portrait.jpg';
import coffeeGrowerWoman from '../assets/people/coffee_grower_woman.jpg';
import baristaCraft from '../assets/people/barista_craft.jpg';
import farmingCommunity from '../assets/people/farming_community.jpg';
import handsCherries from '../assets/people/hands_cherries.jpg';
import ctaEditorialCup from '../assets/story/cta_editorial_cup.jpg';

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
      {/* Hero Section - Editorial Human-Designed Aesthetic */}
      <section className="relative w-full bg-[#2B1B12] overflow-hidden">
        {/* Full-width Real Photography Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={coffeeArt} 
            alt="Artisanal Crafted Coffee" 
            className="w-full h-full object-cover object-right sm:object-center"
          />
          {/* Solid deep espresso brown overlay - subtle, no gradients */}
          <div className="absolute inset-0 bg-[#2B1B12] opacity-40 pointer-events-none"></div>
        </div>

        {/* Content Container - Left Aligned, Editorial Spacing */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="min-h-[85vh] lg:min-h-[90vh] flex items-center py-20 sm:py-24 lg:py-32">
            <div className="max-w-xl lg:max-w-2xl text-left" data-aos="fade-up" data-aos-duration="900">
              
              {/* Eyebrow Label */}
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#F28C13] uppercase mb-5 sm:mb-6">
                OUR STORY
              </p>

              {/* Main Heading */}
              <h1 className="font-['Lora',serif] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.08] sm:leading-[1.04] tracking-tight text-[#FFF4E6] mb-6 sm:mb-8">
                From Kilimanjaro<br />
                to Your Cup.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg md:text-xl text-[#FFF4E6]/85 font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
                Where East African altitude meets Italian attitude. A journey of passion from volcanic slopes to perfectly crafted espresso.
              </p>

              {/* CTA Link */}
              <div className="pt-1">
                <a 
                  href="#our-story" 
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#F28C13] uppercase border-b border-[#F28C13] pb-1 hover:text-[#f8a846] hover:border-[#f8a846] transition-colors duration-200"
                >
                  <span>DISCOVER OUR JOURNEY</span>
                  <span aria-hidden="true" className="text-base leading-none">→</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Main Storytelling Section - Editorial Coffee Journal */}
      <section id="our-story" className="bg-[#F7F2EA] text-[#24160E] scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 pt-16 sm:pt-24 pb-10 sm:pb-14">
          
          {/* Section Introduction */}
          <div className="max-w-xl text-left mb-16 sm:mb-24">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C8681A] uppercase mb-4">
              OUR STORY
            </p>
            <h2 className="font-['Lora',serif] text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] text-[#24160E] mb-6">
              Every Cup Has<br />a Beginning.
            </h2>
            <p className="text-xs sm:text-[14px] leading-[1.7] text-[#4A3B32] font-normal max-w-lg">
              From the volcanic slopes of Kilimanjaro to the precision of Italian craft, our journey is one of people, place and an unwavering commitment to exceptional coffee.
            </p>
          </div>

          {/* Chapter 01 — The Roots */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-14 items-center mb-16 sm:mb-24">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-[#C8681A] tracking-wider">01</span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#C8681A] uppercase">THE ROOTS</span>
              </div>
              <h3 className="font-['Lora',serif] text-2xl sm:text-3xl lg:text-[34px] font-normal leading-[1.15] text-[#24160E] mb-5">
                Born on the Slopes<br />of Kilimanjaro.
              </h3>
              <div className="space-y-4 text-xs sm:text-[13.5px] leading-[1.75] text-[#4A3B32] font-normal">
                <p>
                  High in the fertile volcanic soils of Mount Kilimanjaro, coffee thrives in perfect harmony with nature. The rich mineral-dense soil, cool mountain air and high altitude create beans of extraordinary character — vibrant, complex and full of life.
                </p>
                <p>
                  Here, generational farmers tend to their land with care, passing down a deep respect for the earth and its bounty.
                </p>
              </div>
            </div>
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img 
                src={kilimanjaroCoffee} 
                alt="Born on the Slopes of Kilimanjaro" 
                className="w-full h-full object-cover object-center rounded-none block" 
              />
            </div>
          </div>

          {/* Photographic Breathing Moment */}
          <div className="w-full h-[220px] sm:h-[320px] md:h-[380px] overflow-hidden mb-16 sm:mb-24">
            <img 
              src={africanPlantation} 
              alt="Mount Kilimanjaro Coffee Landscape" 
              className="w-full h-full object-cover object-center rounded-none block" 
            />
          </div>

          {/* Chapter 02 — The Spark */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-14 items-center mb-16 sm:mb-24">
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img 
                src={baristaItaly} 
                alt="An Italian Epiphany" 
                className="w-full h-full object-cover object-center rounded-none block" 
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-[#C8681A] tracking-wider">02</span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#C8681A] uppercase">THE SPARK</span>
              </div>
              <h3 className="font-['Lora',serif] text-2xl sm:text-3xl lg:text-[34px] font-normal leading-[1.15] text-[#24160E] mb-5">
                An Italian Epiphany.
              </h3>
              <div className="space-y-4 text-xs sm:text-[13.5px] leading-[1.75] text-[#4A3B32] font-normal">
                <p>
                  The soul of our shop was forged in Italy. Our Founder and CEO always appreciated a good cup of coffee, but it wasn't until a trip to a small, bustling cafe in Italy that he truly understood its power.
                </p>
                <p>
                  That moment of discovery — the rich aroma, the perfect balance, the sense of connection — became the spark behind L'OVEN.
                </p>
              </div>
            </div>
          </div>

          {/* Chapter 03 — The Craft */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-[#C8681A] tracking-wider">03</span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#C8681A] uppercase">THE CRAFT</span>
              </div>
              <h3 className="font-['Lora',serif] text-2xl sm:text-3xl lg:text-[34px] font-normal leading-[1.15] text-[#24160E] mb-5">
                Beyond the Bean.
              </h3>
              <div className="space-y-4 text-xs sm:text-[13.5px] leading-[1.75] text-[#4A3B32] font-normal">
                <p>
                  Today, that same passion drives everything we do. We work with skilled roasters, master the art of extraction and craft every cup with intention — blending East African beans with Italian expertise to create a coffee experience that's both bold and refined.
                </p>
                <p>
                  It's not just coffee. It's a craft.
                </p>
              </div>
            </div>
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img 
                src={coffeeRoasting} 
                alt="Beyond the Bean - Roasting Craft" 
                className="w-full h-full object-cover object-center rounded-none block" 
              />
            </div>
          </div>

        </div>

        {/* Final Conclusion Section — Today (Integrated full-bleed banner with background image) */}
        <div className="relative w-full bg-[#1E120B] text-[#FFF4E6] overflow-hidden">
          {/* Coffee cup background image anchored to the right */}
          <div 
            className="absolute inset-y-0 right-0 w-full sm:w-3/5 lg:w-1/2 bg-no-repeat bg-cover bg-center sm:bg-right pointer-events-none"
            style={{ backgroundImage: `url(${todayCoffeeBanner})` }}
          >
            {/* Seamless gradient overlay blending image left edge into #1E120B background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E120B] via-[#1E120B]/60 sm:via-[#1E120B]/20 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-18 lg:py-20">
            <div className="max-w-md sm:max-w-lg">
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C8681A] uppercase mb-4">
                TODAY
              </p>
              <h3 className="font-['Lora',serif] text-2xl sm:text-3xl lg:text-[34px] font-normal leading-[1.2] text-[#FFF4E6] mb-4 sm:mb-5">
                A Sanctuary Where<br />
                Passion Meets Perfection.
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[1.75] text-[#FFF4E6]/85 font-normal max-w-md">
                From our roots in East Africa to our home in Italy, L'OVEN is more than a coffee brand — it's a celebration of culture, craftsmanship and the people who make it possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Manifesto: Purpose, Mission, Vision & Values - Editorial Manifesto */}
      <section className="bg-[#FAF5EE] text-[#2B1B12] py-20 sm:py-28 lg:py-32 scroll-mt-20">
        <div className="max-w-[1160px] mx-auto px-6 sm:px-10 lg:px-12">
          
          {/* ========================================================================= */}
          {/* SECTION 1 — PURPOSE                                                       */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-24 sm:mb-32">
            
            {/* Left: Purpose Copy */}
            <div className="lg:col-span-6" data-aos="fade-up">
              <span className="block text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#F28C13] uppercase mb-4">
                OUR PURPOSE
              </span>
              <h2 className="font-['Lora',serif] text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] text-[#2B1B12] mb-6 tracking-tight">
                More Than a Cup.
              </h2>
              <p className="text-sm sm:text-base text-[#5A4538] font-light leading-relaxed max-w-md">
                We exist to create meaningful coffee experiences that connect people, culture and place — from the volcanic slopes of Kilimanjaro to your everyday ritual.
              </p>
            </div>

            {/* Right: Authentic Origin Photography */}
            <div className="lg:col-span-6" data-aos="fade-up" data-aos-delay="100">
              <div className="w-full h-[300px] sm:h-[380px] overflow-hidden bg-[#EFE8DD]">
                <img 
                  src={coffeeCherries} 
                  alt="Hands holding freshly harvested coffee cherries at origin" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* SECTION 2 — MISSION AND VISION                                            */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 mb-24 sm:mb-32">
            
            {/* Left: Mission */}
            <div className="lg:pr-12 xl:pr-16 lg:border-r lg:border-[#2B1B12]/15" data-aos="fade-up">
              <span className="block text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#F28C13] uppercase mb-4">
                MISSION
              </span>
              <h3 className="font-['Lora',serif] text-2xl sm:text-3xl lg:text-[32px] font-normal leading-[1.2] text-[#2B1B12] mb-5 tracking-tight">
                To meticulously source, roast and brew the finest East African coffee.
              </h3>
              <p className="text-sm sm:text-base text-[#5A4538] font-light leading-relaxed max-w-lg">
                We bring together authentic Italian craftsmanship and local community spirit to create something worth returning to — in every cup.
              </p>
            </div>

            {/* Right: Vision */}
            <div className="lg:pl-12 xl:pl-16" data-aos="fade-up" data-aos-delay="100">
              <span className="block text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#F28C13] uppercase mb-4">
                VISION
              </span>
              <h3 className="font-['Lora',serif] text-2xl sm:text-3xl lg:text-[32px] font-normal leading-[1.2] text-[#2B1B12] mb-5 tracking-tight">
                To redefine the local café culture by becoming the ultimate destination for coffee enthusiasts and casual lovers alike.
              </h3>
              <p className="text-sm sm:text-base text-[#5A4538] font-light leading-relaxed max-w-lg">
                We aim to be a global benchmark for quality, community and innovation in coffee — a place where great coffee brings people together.
              </p>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* SECTION 3 — WHAT WE BELIEVE IN                                            */}
          {/* ========================================================================= */}
          <div className="border-t border-[#2B1B12]/15 pt-16 sm:pt-20" data-aos="fade-up">
            <span className="block text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#F28C13] uppercase mb-10 sm:mb-12">
              WHAT WE BELIEVE IN
            </span>

            {/* 2x2 Editorial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Value 01 */}
              <div className="pb-10 sm:pb-12 md:pr-10 lg:pr-14 md:border-r md:border-b border-[#2B1B12]/15">
                <div className="flex items-start gap-4">
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F28C13] select-none pt-0.5">
                    01
                  </span>
                  <div>
                    <h4 className="font-['Lora',serif] text-lg sm:text-xl font-medium tracking-wide text-[#2B1B12] uppercase mb-2">
                      ARTISANAL EXCELLENCE
                    </h4>
                    <p className="text-sm text-[#5A4538] font-light leading-relaxed">
                      Precision in every roast.<br />
                      Intention in every cup.
                    </p>
                  </div>
                </div>
              </div>

              {/* Value 02 */}
              <div className="py-10 md:py-0 pb-10 sm:pb-12 md:pl-10 lg:pl-14 border-t md:border-t-0 border-b border-[#2B1B12]/15">
                <div className="flex items-start gap-4">
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F28C13] select-none pt-0.5">
                    02
                  </span>
                  <div>
                    <h4 className="font-['Lora',serif] text-lg sm:text-xl font-medium tracking-wide text-[#2B1B12] uppercase mb-2">
                      SUSTAINABLE PARTNERSHIPS
                    </h4>
                    <p className="text-sm text-[#5A4538] font-light leading-relaxed">
                      Growing alongside the people<br />
                      who grow our coffee.
                    </p>
                  </div>
                </div>
              </div>

              {/* Value 03 */}
              <div className="py-10 sm:py-12 md:pr-10 lg:pr-14 md:border-r border-[#2B1B12]/15 border-b md:border-b-0">
                <div className="flex items-start gap-4">
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F28C13] select-none pt-0.5">
                    03
                  </span>
                  <div>
                    <h4 className="font-['Lora',serif] text-lg sm:text-xl font-medium tracking-wide text-[#2B1B12] uppercase mb-2">
                      COMMUNITY CONNECTION
                    </h4>
                    <p className="text-sm text-[#5A4538] font-light leading-relaxed">
                      Coffee is better when<br />
                      it's shared.
                    </p>
                  </div>
                </div>
              </div>

              {/* Value 04 */}
              <div className="pt-10 sm:pt-12 md:pl-10 lg:pl-14">
                <div className="flex items-start gap-4">
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F28C13] select-none pt-0.5">
                    04
                  </span>
                  <div>
                    <h4 className="font-['Lora',serif] text-lg sm:text-xl font-medium tracking-wide text-[#2B1B12] uppercase mb-2">
                      AUTHENTICITY
                    </h4>
                    <p className="text-sm text-[#5A4538] font-light leading-relaxed">
                      Real beans.<br />
                      Real people.<br />
                      Real stories.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Our Process / The Journey of Great Coffee - Single Art-Directed Editorial Collage */}
      <section id="bean-to-cup" className="bg-[#FAF5EE] text-[#2B1B12] py-20 sm:py-28 lg:py-36 scroll-mt-20 overflow-hidden">
        <div className="max-w-[1160px] mx-auto px-6 sm:px-10 lg:px-12">

          {/* ========================================================================= */}
          {/* ROW 1: HEADER & STAGE 01 (SELECTIVE HARVESTING)                           */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20 sm:mb-28 lg:mb-32">
            
            {/* Left Column: Section Header & Stage 01 Story */}
            <div className="lg:col-span-6 flex flex-col justify-between" data-aos="fade-up">
              {/* Header Intro */}
              <div className="mb-12 sm:mb-16">
                <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C8681A] uppercase mb-4">
                  OUR PROCESS
                </p>
                <h2 className="font-['Lora',serif] text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] text-[#2B1B12] mb-6 tracking-tight">
                  The Journey<br />
                  of Great Coffee.
                </h2>
                <p className="text-sm sm:text-base text-[#5A4538] font-light leading-relaxed max-w-md">
                  Four stages. One philosophy. From the volcanic slopes of Kilimanjaro to your cup, every step is a commitment to quality, people and place.
                </p>
              </div>

              {/* Stage 01: Selective Harvesting */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <span className="font-['Lora',serif] text-4xl sm:text-5xl font-normal text-[#C8681A] leading-none select-none">
                    01
                  </span>
                  <div className="pt-0.5 border-l border-[#C8681A]/40 pl-4">
                    <span className="block text-[11px] font-bold tracking-[0.22em] text-[#C8681A] uppercase mb-1.5">
                      HARVEST
                    </span>
                    <h3 className="font-['Lora',serif] text-2xl sm:text-[28px] font-medium text-[#2B1B12] leading-tight mb-3">
                      Selective Harvesting
                    </h3>
                    <p className="text-sm text-[#5A4538] font-light leading-relaxed max-w-sm">
                      Only the ripest cherries are hand-picked from the volcanic slopes of Kilimanjaro, ensuring exceptional flavour and quality from the very beginning.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Top Phrase + Stage 01 Photo Collage */}
            <div className="lg:col-span-6 flex flex-col items-end" data-aos="fade-up" data-aos-delay="100">
              {/* Subtle top-right editorial print phrase */}
              <div className="text-right mb-6 sm:mb-8 pr-2">
                <p className="text-[11px] sm:text-xs text-[#7A695E] leading-relaxed font-sans tracking-wider">
                  Same land.<br />
                  Same care.<br />
                  A better cup.
                </p>
              </div>

              {/* Photo Collage: Tall portrait harvesting + overlapping tilted branch photo */}
              <div className="relative w-full max-w-[420px] self-center lg:self-end">
                {/* Connecting subtle curved vector line across behind image */}
                <svg className="hidden md:block absolute -left-20 top-1/3 w-28 h-32 text-[#C8681A]/30 pointer-events-none z-0" viewBox="0 0 100 120" fill="none">
                  <path d="M5 110 C 20 60, 60 40, 95 10" stroke="currentColor" strokeWidth="1" />
                </svg>

                {/* Primary Tall Portrait Image: Hands picking cherries over basket */}
                <div className="relative z-10 w-full sm:w-[340px] md:w-[360px] h-[400px] sm:h-[460px] overflow-hidden shadow-sm bg-[#EFE8DD]">
                  <img 
                    src={coffeeCherries} 
                    alt="Selective coffee harvesting by hand" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Overlapping Angled Photo (White photo frame / print aesthetic) */}
                <div className="absolute -bottom-6 -right-2 sm:-right-6 w-[170px] sm:w-[210px] h-[190px] sm:h-[230px] p-2 bg-white shadow-xl rotate-3 sm:rotate-6 z-20">
                  <div className="w-full h-full overflow-hidden bg-[#EFE8DD]">
                    <img 
                      src={kilimanjaroCoffee} 
                      alt="Kilimanjaro ripe coffee cherries on branch" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* ROW 2: STAGE 02 (PRECISION ROASTING)                                      */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-24 sm:mb-32 lg:mb-36">
            
            {/* Left/Center: Large Wide Roasting Anchor Photograph */}
            <div className="lg:col-span-7" data-aos="fade-up">
              <div className="w-full h-[260px] sm:h-[340px] md:h-[380px] overflow-hidden shadow-sm bg-[#EFE8DD]">
                <img 
                  src={coffeeRoasting} 
                  alt="Precision coffee roasting machine cooling drum" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Stage 02 Roasting Story */}
            <div className="lg:col-span-5 lg:pl-4" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-start gap-4">
                <span className="font-['Lora',serif] text-4xl sm:text-5xl font-normal text-[#C8681A] leading-none select-none">
                  02
                </span>
                <div className="pt-0.5 border-l border-[#C8681A]/40 pl-4">
                  <span className="block text-[11px] font-bold tracking-[0.22em] text-[#C8681A] uppercase mb-1.5">
                    ROASTING
                  </span>
                  <h3 className="font-['Lora',serif] text-2xl sm:text-[28px] font-medium text-[#2B1B12] leading-tight mb-3">
                    Precision Roasting
                  </h3>
                  <p className="text-sm text-[#5A4538] font-light leading-relaxed max-w-sm">
                    We roast our beans in small batches using authentic Italian techniques, unlocking their full aroma, balance and depth. Temperature, time and experience come together in perfect harmony.
                  </p>
                </div>
              </div>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* ROW 3: STAGE 03 (EXPERT EXTRACTION)                                       */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-24 sm:mb-32 lg:mb-36">
            
            {/* Left: Stage 03 Extraction Story */}
            <div className="lg:col-span-5 order-2 lg:order-1" data-aos="fade-up">
              <div className="flex items-start gap-4">
                <span className="font-['Lora',serif] text-4xl sm:text-5xl font-normal text-[#C8681A] leading-none select-none">
                  03
                </span>
                <div className="pt-0.5 border-l border-[#C8681A]/40 pl-4">
                  <span className="block text-[11px] font-bold tracking-[0.22em] text-[#C8681A] uppercase mb-1.5">
                    EXTRACTION
                  </span>
                  <h3 className="font-['Lora',serif] text-2xl sm:text-[28px] font-medium text-[#2B1B12] leading-tight mb-3">
                    Expert Extraction
                  </h3>
                  <p className="text-sm text-[#5A4538] font-light leading-relaxed max-w-sm">
                    Our baristas are trained in the rigorous Italian tradition, meticulously calibrating the grind, tamping pressure and water temperature to pull a flawless, crema-rich shot every single time.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Close-up Extraction Photo + Overlapping Latte Art Photo */}
            <div className="lg:col-span-7 order-1 lg:order-2" data-aos="fade-up" data-aos-delay="100">
              <div className="relative w-full max-w-[480px] mx-auto lg:ml-auto">
                {/* Main Extraction Image: Portafilter streaming espresso */}
                <div className="relative z-10 w-full sm:w-[360px] md:w-[400px] h-[260px] sm:h-[300px] overflow-hidden shadow-sm bg-[#EFE8DD]">
                  <img 
                    src={baristaItaly} 
                    alt="Espresso extraction from bottomless portafilter" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Overlapping Angled Photo (Cup of Latte Art) */}
                <div className="absolute -bottom-8 -right-2 sm:-right-4 w-[170px] sm:w-[200px] h-[170px] sm:h-[200px] p-2 bg-white shadow-xl -rotate-2 sm:-rotate-3 z-20">
                  <div className="w-full h-full overflow-hidden bg-[#EFE8DD]">
                    <img 
                      src={latteArt} 
                      alt="Artisanal Latte Art" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* ROW 4: STAGE 04 (CREATIVE FORMULATION)                                    */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Beautiful Coffee Beverage Photo */}
            <div className="lg:col-span-6" data-aos="fade-up">
              <div className="w-full max-w-[460px] h-[260px] sm:h-[320px] overflow-hidden shadow-sm bg-[#EFE8DD]">
                <img 
                  src={coffeeTable} 
                  alt="Crafted signature coffee beverage on rustic wood" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Stage 04 Story + Editorial Handwritten Script Sign-off */}
            <div className="lg:col-span-6 lg:pl-4" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-start gap-4 mb-10 sm:mb-12">
                <span className="font-['Lora',serif] text-4xl sm:text-5xl font-normal text-[#C8681A] leading-none select-none">
                  04
                </span>
                <div className="pt-0.5 border-l border-[#C8681A]/40 pl-4">
                  <span className="block text-[11px] font-bold tracking-[0.22em] text-[#C8681A] uppercase mb-1.5">
                    CREATIVE FORMULATION
                  </span>
                  <h3 className="font-['Lora',serif] text-2xl sm:text-[28px] font-medium text-[#2B1B12] leading-tight mb-3">
                    More Than Just Coffee.
                  </h3>
                  <p className="text-sm text-[#5A4538] font-light leading-relaxed max-w-md">
                    We craft distinctive blends and seasonal beverages that bring out the best in every bean. From classic espressos to innovative creations, our drinks are designed to inspire, surprise and bring people together.
                  </p>
                </div>
              </div>

              {/* Handwritten signature accent in bottom-right */}
              <div className="text-right pr-4 sm:pr-8">
                <div className="inline-block transform -rotate-3 sm:-rotate-4 text-right select-none">
                  <p className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#5A4538] leading-tight">
                    Good coffee<br />
                    brings people<br />
                    together.
                  </p>
                  <svg className="w-24 sm:w-28 h-2 text-[#C8681A] ml-auto mt-1 opacity-70" viewBox="0 0 100 8" fill="none">
                    <path d="M2 5C28 2 72 2 98 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Our People / The Human Side - Editorial Composition (Option C + Option B Design Language) */}
      <section id="our-people" className="bg-[#FAF5EE] text-[#2B1B12] py-20 sm:py-28 lg:py-32 scroll-mt-20 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-10">

          {/* ========================================================================= */}
          {/* DESKTOP VIEW: ASYMMETRICAL ART-DIRECTED EDITORIAL POSTER SPREAD           */}
          {/* ========================================================================= */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-8 xl:gap-10 items-start">
              
              {/* Left Column (3 cols): Vertical Slogan + Farmer Portrait + L'OVEN Signature */}
              <div className="col-span-3 flex flex-col justify-between" style={{ minHeight: '530px' }} data-aos="fade-up">
                <div className="flex items-start gap-3.5">
                  {/* Stacked Vertical Accent Slogan */}
                  <div className="text-[10px] font-bold tracking-[0.24em] text-[#C8681A] uppercase space-y-1.5 select-none pt-4 flex-shrink-0 leading-tight">
                    <div>REAL</div>
                    <div>PEOPLE.</div>
                    <div>GREATER</div>
                    <div>IMPACT.</div>
                  </div>

                  {/* Large Vertical Farmer Portrait */}
                  <div className="w-full h-[450px] overflow-hidden bg-[#EFE8DD] shadow-sm">
                    <img 
                      src={farmerPortrait} 
                      alt="Coffee farmer with basket of harvested cherries" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Bottom Left Signature Detail */}
                <div className="pt-6">
                  <span className="text-[10px] font-semibold tracking-[0.22em] text-[#7A695E] uppercase select-none">
                    L'OVEN — SPECIALTY COFFEE &amp; MORE
                  </span>
                </div>
              </div>

              {/* Right Area (9 cols): Asymmetrical Two-Row Editorial Composition */}
              <div className="col-span-9 flex flex-col justify-between" style={{ minHeight: '530px' }} data-aos="fade-up" data-aos-delay="100">
                
                {/* Top Row: Heading/Intro | Woman Grower | Barista | Statement 01 */}
                <div className="grid grid-cols-12 gap-6 items-start">
                  
                  {/* Section Heading & Introductory Narrative */}
                  <div className="col-span-4 pr-3">
                    <p className="text-[11px] font-semibold tracking-[0.25em] text-[#C8681A] uppercase mb-3">
                      OUR PEOPLE
                    </p>
                    <h2 className="font-['Lora',serif] text-3xl xl:text-4xl font-normal leading-[1.12] text-[#2B1B12] mb-4 tracking-tight">
                      Real People.<br />
                      Greater Impact.
                    </h2>
                    <p className="text-xs xl:text-sm text-[#5A4538] font-light leading-relaxed">
                      From the farmers who grow our beans to the baristas who craft your cup, we're united by a shared passion for better coffee and brighter futures.
                    </p>
                  </div>

                  {/* Medium Landscape Image: Woman Coffee Grower */}
                  <div className="col-span-3">
                    <div className="w-full h-[180px] overflow-hidden bg-[#EFE8DD] shadow-sm">
                      <img 
                        src={coffeeGrowerWoman} 
                        alt="Coffee grower carefully picking ripe cherries" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Medium Landscape Image: Craft Barista in L'OVEN Apron */}
                  <div className="col-span-3">
                    <div className="w-full h-[180px] overflow-hidden bg-[#EFE8DD] shadow-sm">
                      <img 
                        src={baristaCraft} 
                        alt="Barista pouring artisanal latte art" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Text Statement 01: Stronger Communities */}
                  <div className="col-span-2 pl-1">
                    <span className="block text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase mb-1.5 leading-tight">
                      STRONGER<br />COMMUNITIES
                    </span>
                    <div className="w-7 h-[1px] bg-[#C8681A] mb-2.5"></div>
                    <p className="text-[11px] text-[#5A4538] font-light leading-relaxed">
                      We work directly with farming communities, supporting fair trade, sustainable practices and long-term growth.
                    </p>
                  </div>

                </div>

                {/* Bottom Row: Editorial Quote | Community Landscape | Hands Detail | Statement 02 */}
                <div className="grid grid-cols-12 gap-6 items-center pt-8">
                  
                  {/* Subtle Editorial Quote under Heading */}
                  <div className="col-span-4 pr-4">
                    <p className="font-['Lora',serif] italic text-base xl:text-lg text-[#2B1B12]/85 leading-snug">
                      “Great coffee<br />
                      brings people<br />
                      together.”
                    </p>
                  </div>

                  {/* Wide Landscape Image: Farming Community in Mountain Valley */}
                  <div className="col-span-4">
                    <div className="w-full h-[160px] overflow-hidden bg-[#EFE8DD] shadow-sm">
                      <img 
                        src={farmingCommunity} 
                        alt="Coffee farming community looking across mountain plantation" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Detail Photo: Weathered Hands with Fresh Cherries */}
                  <div className="col-span-2">
                    <div className="w-full h-[160px] overflow-hidden bg-[#EFE8DD] shadow-sm">
                      <img 
                        src={handsCherries} 
                        alt="Hands cupping freshly harvested coffee cherries" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Text Statement 02: A Brighter Tomorrow */}
                  <div className="col-span-2 pl-1">
                    <span className="block text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase mb-1.5 leading-tight">
                      A BRIGHTER<br />TOMORROW
                    </span>
                    <div className="w-7 h-[1px] bg-[#C8681A] mb-2.5"></div>
                    <p className="text-[11px] text-[#5A4538] font-light leading-relaxed">
                      Better livelihoods. Healthier communities. A more sustainable coffee future.
                    </p>
                  </div>

                </div>

                {/* Bottom Footer Detail: Connecting Hairline + Sign-off */}
                <div className="pt-8 flex justify-end items-center">
                  <div className="w-32 xl:w-44 h-[1px] bg-[#7A695E]/30 mr-4"></div>
                  <span className="text-[10px] font-semibold tracking-[0.22em] text-[#7A695E] uppercase select-none">
                    GOOD COFFEE. GREATER TOGETHER.
                  </span>
                </div>

              </div>

            </div>
          </div>


          {/* ========================================================================= */}
          {/* MOBILE / TABLET VIEW: NATURAL EDITORIAL DOCUMENTARY SEQUENCE              */}
          {/* ========================================================================= */}
          <div className="lg:hidden space-y-10">
            
            {/* 1. OUR PEOPLE Label & 2. Main Heading & 3. Supporting Copy */}
            <div data-aos="fade-up">
              <p className="text-[11px] font-semibold tracking-[0.25em] text-[#C8681A] uppercase mb-3">
                OUR PEOPLE
              </p>
              <h2 className="font-['Lora',serif] text-3xl sm:text-4xl font-normal leading-[1.12] text-[#2B1B12] mb-4 tracking-tight">
                Real People.<br />
                Greater Impact.
              </h2>
              <p className="text-sm text-[#5A4538] font-light leading-relaxed max-w-lg">
                From the farmers who grow our beans to the baristas who craft your cup, we're united by a shared passion for better coffee and brighter futures.
              </p>
            </div>

            {/* 4. Large Farmer Image with Stacked Accent */}
            <div className="relative" data-aos="fade-up">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase">
                  REAL PEOPLE. GREATER IMPACT.
                </span>
                <div className="flex-1 h-[1px] bg-[#C8681A]/30"></div>
              </div>
              <div className="w-full h-[360px] sm:h-[420px] overflow-hidden bg-[#EFE8DD] shadow-sm">
                <img 
                  src={farmerPortrait} 
                  alt="Coffee farmer with basket of harvested cherries" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* 5. Community Statement (STRONGER COMMUNITIES) */}
            <div className="max-w-md" data-aos="fade-up">
              <span className="block text-[11px] font-bold tracking-[0.2em] text-[#C8681A] uppercase mb-1.5">
                STRONGER COMMUNITIES
              </span>
              <div className="w-8 h-[1px] bg-[#C8681A] mb-3"></div>
              <p className="text-sm text-[#5A4538] font-light leading-relaxed">
                We work directly with farming communities, supporting fair trade, sustainable practices and long-term growth.
              </p>
            </div>

            {/* 6. Coffee Harvesting Image (Woman Grower) & 7. Barista Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-aos="fade-up">
              <div className="w-full h-[220px] sm:h-[240px] overflow-hidden bg-[#EFE8DD] shadow-sm">
                <img 
                  src={coffeeGrowerWoman} 
                  alt="Coffee grower picking ripe cherries" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="w-full h-[220px] sm:h-[240px] overflow-hidden bg-[#EFE8DD] shadow-sm">
                <img 
                  src={baristaCraft} 
                  alt="Barista pouring artisanal latte art" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* 8. Editorial Quote */}
            <div className="text-center py-4" data-aos="fade-up">
              <p className="font-['Lora',serif] italic text-xl sm:text-2xl text-[#2B1B12] leading-snug">
                “Great coffee brings people together.”
              </p>
            </div>

            {/* 9. Community/Farm Landscape */}
            <div className="w-full h-[220px] sm:h-[260px] overflow-hidden bg-[#EFE8DD] shadow-sm" data-aos="fade-up">
              <img 
                src={farmingCommunity} 
                alt="Coffee farming community looking across mountain plantation" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* 10. Brighter Tomorrow Statement & 11. Hands Holding Coffee Cherries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center" data-aos="fade-up">
              <div>
                <span className="block text-[11px] font-bold tracking-[0.2em] text-[#C8681A] uppercase mb-1.5">
                  A BRIGHTER TOMORROW
                </span>
                <div className="w-8 h-[1px] bg-[#C8681A] mb-3"></div>
                <p className="text-sm text-[#5A4538] font-light leading-relaxed">
                  Better livelihoods. Healthier communities. A more sustainable coffee future.
                </p>
              </div>
              <div className="w-full h-[180px] sm:h-[200px] overflow-hidden bg-[#EFE8DD] shadow-sm">
                <img 
                  src={handsCherries} 
                  alt="Hands cupping freshly harvested coffee cherries" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* 12. L'OVEN Signature & Footer Details */}
            <div className="pt-6 border-t border-[#7A695E]/20 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left" data-aos="fade-up">
              <span className="text-[10px] font-semibold tracking-[0.22em] text-[#7A695E] uppercase">
                L'OVEN — SPECIALTY COFFEE &amp; MORE
              </span>
              <span className="text-[10px] font-semibold tracking-[0.22em] text-[#7A695E] uppercase">
                GOOD COFFEE. GREATER TOGETHER.
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* The Editorial Invitation - Option A Final CTA */}
      <section className="bg-[#FAF5EE] text-[#2B1B12] py-20 sm:py-28 lg:py-36 border-t border-[#2B1B12]/10 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Typography & Actions (~40%) */}
            <div className="lg:col-span-5 flex flex-col justify-between" data-aos="fade-up">
              
              {/* Eyebrow Label with subtle horizontal line */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#F28C13] uppercase">
                  YOUR NEXT CUP
                </span>
                <div className="w-8 sm:w-10 h-[1px] bg-[#F28C13]"></div>
              </div>

              {/* Main Heading: Two lines, prominent editorial scale */}
              <h2 className="font-['Lora',serif] text-5xl sm:text-6xl lg:text-[72px] font-normal leading-[1.04] text-[#2B1B12] mb-6 sm:mb-8 tracking-tight">
                Starts<br />
                Here.
              </h2>

              {/* Supporting Copy */}
              <div className="text-sm sm:text-base text-[#5A4538] font-light leading-relaxed mb-8 sm:mb-10 max-w-sm">
                <p className="mb-2">The story continues at L'OVEN.</p>
                <p>Come in. Take your time.<br />Experience coffee differently.</p>
              </div>

              {/* Primary Action: Editorial Text Link */}
              <div className="mb-5">
                <Link 
                  to="/menu" 
                  className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-[0.22em] text-[#F28C13] uppercase transition-colors duration-200 hover:text-[#d35400]"
                >
                  <span>EXPLORE OUR MENU</span>
                  <span className="text-base transform group-hover:translate-x-1.5 transition-transform duration-200">→</span>
                </Link>
                <div className="w-44 h-[1px] bg-[#F28C13]/60 mt-1"></div>
              </div>

              {/* Secondary Action: Subtle Editorial Text Link */}
              <div className="mb-12 sm:mb-16 lg:mb-20">
                <Link 
                  to="/contact" 
                  className="group inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#2B1B12] uppercase transition-colors duration-200 hover:text-[#F28C13]"
                >
                  <span>FIND US</span>
                  <span className="text-sm transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
                <div className="w-20 h-[1px] bg-[#2B1B12]/25 mt-1"></div>
              </div>

              {/* Brand Signature at Bottom-Left */}
              <div className="flex items-center gap-3 select-none pt-2">
                <span className="font-['Lora',serif] text-base sm:text-lg font-medium tracking-wider text-[#F28C13]">
                  L'OVEN
                </span>
                <div className="w-[1px] h-3.5 bg-[#F28C13]"></div>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#2B1B12] uppercase">
                  SPECIALTY COFFEE &amp; MORE
                </span>
              </div>

            </div>

            {/* Right Side: Immersive Coffee Photography (~60%) */}
            <div className="lg:col-span-7" data-aos="fade-up" data-aos-delay="100">
              <div className="w-full h-[360px] sm:h-[460px] lg:h-[540px] overflow-hidden bg-[#EFE8DD] shadow-sm">
                <img 
                  src={ctaEditorialCup} 
                  alt="L'OVEN specialty coffee with latte art on rustic wood" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
