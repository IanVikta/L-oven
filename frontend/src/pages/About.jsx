import { motion } from 'framer-motion';
import bakeryStory from '../assets/bakery_story.jpg';
import heroBanner from '../assets/hero_banner.jpg';
import coffeeSplash from '../assets/coffee_splash.jpg';
import coffeeImage from '../assets/coffee.jpg';
import calmCoffee from '../assets/calm-coffee.jpg';

// Enhanced Icon Components with gradient fills
const CoffeeIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MenuIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ClockIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const GlobeIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FireIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
  </svg>
);

const LeafIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const MountainIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.057-3L8 12l5 6 1-7 4 5h2" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 20h18" />
  </svg>
);

const WaterIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
);

const HeartIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const AwardIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true }
  };

  return (
    <div className="bg-gradient-to-b from-cream-100 via-white to-cream-50 min-h-screen">
      {/* Hero Section - World-Class Premium Design */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            src={heroBanner} 
            alt="L'Oven Coffee Experience" 
            className="w-full h-full object-cover brightness-75"
          />
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 via-transparent to-black/20"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 z-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-orange-500 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-amber-500 rounded-full blur-[120px]"
          />
        </div>
        
        {/* Hero Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Premium Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-full shadow-2xl">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                  <span className="text-orange-400 font-bold text-sm tracking-wider uppercase">Premium Ugandan Coffee</span>
                </div>
                <div className="w-px h-5 bg-white/30"></div>
                <span className="text-white font-semibold text-sm">Since 2019</span>
                <div className="w-px h-5 bg-white/30"></div>
                <span className="text-white font-semibold text-sm">Kampala</span>
              </div>
            </motion.div>
            
            {/* Main Headline - Bold & Impactful */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="space-y-2"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-none tracking-tight" 
                  style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>
                Where Every Cup
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="relative inline-block"
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-none tracking-tight"
                  style={{ 
                    background: 'linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #f97316 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 60px rgba(251,146,60,0.5)',
                    filter: 'drop-shadow(0 4px 20px rgba(251,146,60,0.4))'
                  }}>
                Tells a Story
              </h2>
              {/* Decorative underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.4, duration: 1 }}
                className="absolute -bottom-4 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full mx-auto"
                style={{ boxShadow: '0 0 20px rgba(251,146,60,0.6)' }}
              />
            </motion.div>
            
            {/* Compelling Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="pt-8 pb-6"
            >
              <p className="text-xl sm:text-2xl md:text-3xl text-white/95 max-w-4xl mx-auto leading-relaxed font-light"
                 style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}>
                At L'Oven Coffee, we believe in the <span className="font-semibold text-orange-300">transformative power</span> of exceptional coffee.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-orange-200 font-medium mt-4 max-w-3xl mx-auto"
                 style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}>
                From 15,300+ passionate farmers to your cup
              </p>
            </motion.div>
            
            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4"
            >
              <motion.a
                href="/menu"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:from-orange-600 hover:via-orange-700 hover:to-orange-600 text-white font-bold text-lg px-14 py-6 rounded-2xl transition-all duration-300 shadow-[0_10px_40px_rgba(251,146,60,0.4)] hover:shadow-[0_15px_50px_rgba(251,146,60,0.6)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Our Menu
                  <motion.svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700" />
              </motion.a>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-white/10 hover:bg-white backdrop-blur-xl border-2 border-white/40 hover:border-white text-white hover:text-gray-900 font-bold text-lg px-14 py-6 rounded-2xl transition-all duration-300 shadow-2xl"
              >
                <span className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Visit Us Today
                </span>
              </motion.a>
            </motion.div>
            
            {/* Key Stats - Premium Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12"
            >
              {[
                { 
                  value: '15,300+', 
                  label: 'Coffee Farmers',
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )
                },
                { 
                  value: '3 Regions', 
                  label: 'Growing Areas',
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  value: '100%', 
                  label: 'Farmer Owned',
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl border border-white/20 hover:border-orange-400/60 p-8 rounded-3xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/30"
                >
                  <div className="text-orange-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-white/90 font-semibold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
          </div>
        </div>
        
        {/* Scroll Indicator - Elegant */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: 2
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 z-20"
        >
          <span className="text-xs uppercase tracking-widest font-semibold">Scroll to Explore</span>
          <motion.svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
        
        {/* Premium Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg className="w-full h-24 md:h-32 fill-white drop-shadow-2xl" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".3"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
        
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 max-w-7xl space-y-32">
        
        {/* Our Story Section */}
        <motion.div {...fadeInUp} className="relative">
          {/* Decorative background elements */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-4xl mx-auto text-center space-y-8 bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-orange-100">
            <div className="inline-block">
              <div className="w-20 h-20 mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg">
                <CoffeeIcon />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Our Story
            </h2>
            
            <div className="text-lg text-gray-800 leading-relaxed space-y-6 text-left">
              <p className="pl-6 border-l-4 border-orange-400">
                L'Oven Coffee is a coffee shop that started on a small scale as office coffee espresso. 
                The directors started with a small cluster of individuals who mostly were bankers and 
                insurers whom we used to serve on a daily basis in their respective offices.
              </p>
              <p>
                Following their existence, we continued serving them day in and day out, who further 
                kept referring their colleagues for similar products. This demand broadened, and 
                eventually, up to <strong className="text-orange-600">70% of the customers</strong> were already taking L'Oven coffee. This growing 
                demand led to the phasing out of cash payment to a contract structure.
              </p>
              <p className="pl-6 border-l-4 border-amber-400">
                In <strong className="text-gray-900">August 2019</strong>, the organization was legally registered as a private 
                company limited by shares. Currently, the organization is owned by <strong className="text-gray-900">ten members</strong> who 
                are also coffee entrepreneurs and farmers. The strategy is to ensure more coffee farmers 
                buy shares into the organization.
              </p>
              <p className="text-center italic text-gray-700 pt-4">
                "L'Oven Coffee's passion is to market high-quality coffees. Our focus on innovation has 
                been the driving force, combined with a mature awareness of what we need to do to improve 
                our market, our society, and our world."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '15,300+', label: 'Smallholder Farmers', Icon: GlobeIcon, gradient: 'from-blue-500 to-cyan-500' },
            { number: '3 Regions', label: 'Coffee Growing Areas', Icon: MountainIcon, gradient: 'from-green-500 to-emerald-500' },
            { number: 'Since 2019', label: 'Legally Registered', Icon: AwardIcon, gradient: 'from-orange-500 to-amber-500' },
            { number: '100%', label: 'Farmer Owned', Icon: HeartIcon, gradient: 'from-rose-500 to-pink-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 text-center transition-all duration-300 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Icon with gradient */}
              <div className="relative">
                <div className={`w-16 h-16 mx-auto mb-4 p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <stat.Icon />
                </div>
                <div className="text-4xl font-display font-bold bg-gradient-to-br bg-clip-text text-transparent from-gray-800 to-gray-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} className="inline-block mb-4">
              <span className="text-sm font-bold uppercase tracking-widest text-orange-600 bg-orange-100 px-4 py-2 rounded-full">
                Purpose & Direction
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6">
              Our Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="group relative bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Decorative circle */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-300/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative">
                <div className="w-16 h-16 mb-6 p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                  <FireIcon />
                </div>
                <h3 className="text-3xl font-display font-bold mb-6 text-orange-700">Our Vision</h3>
                <p className="text-lg leading-relaxed text-gray-800">
                  To market smallholder farmers' coffee beans and empower them to market value-added 
                  coffee at competitive prices both nationally and internationally.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="group relative bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-300 p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Decorative circle */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-gray-300/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative">
                <div className="w-16 h-16 mb-6 p-3 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                  <AwardIcon />
                </div>
                <h3 className="text-3xl font-display font-bold mb-6 text-gray-800">Our Mission</h3>
                <p className="text-lg leading-relaxed text-gray-800">
                  To be a leading coffee shop marketing farmer-owned coffees by maintaining exceptional 
                  quality, offering excellent prices, thus improving livelihoods in the communities.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: MountainIcon,
                title: 'Mt. Elgon Belt',
                subtitle: 'Arabica Coffee',
                description: 'Sourced from Mt. Elgon\'s volcanic soils at altitudes of 1,600m-2,000m. Our partnerships with Kabeywa United Coffee Farmers Association (5,800 farmers) and Bufumbo Organic Farmers Association (5,000+ farmers) ensure premium Arabica beans with rich mineral content, grown organically without fertilizers.',
                gradient: 'from-emerald-500 to-teal-500',
                bgColor: 'from-emerald-50 to-teal-50'
              },
              {
                Icon: FireIcon,
                title: 'Mt. Rwenzori Belt',
                subtitle: 'Drugar Coffee',
                description: 'From the Rwenzori mountain range on Uganda\'s western border, rising nearly 17,000m above sea level. We work with Kabonero Peak Modern Farmers Association (3,000 farmers) to bring you Drugar (Dry Uganda Arabica) from these perfect high-altitude growing conditions.',
                gradient: 'from-orange-500 to-red-500',
                bgColor: 'from-orange-50 to-red-50'
              },
              {
                Icon: WaterIcon,
                title: 'Lake Victoria Shores',
                subtitle: 'Robusta Coffee',
                description: 'Premium Robusta coffee from the northern shores of Lake Victoria, where coffee once grew wild. Our partnership with BUNJAKKO Modern Farm Limited represents 1,500 passionate smallholder farmers who cultivate top-quality Robusta with exceptional care and attention to detail.',
                gradient: 'from-blue-500 to-cyan-500',
                bgColor: 'from-blue-50 to-cyan-50'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`group relative bg-gradient-to-br ${value.bgColor} p-10 rounded-3xl shadow-xl hover:shadow-2xl border-2 border-white/50 transition-all duration-300 overflow-hidden`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className={`w-16 h-16 mb-6 p-3 rounded-2xl bg-gradient-to-br ${value.gradient} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <value.Icon />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm font-semibold text-orange-600 mb-5 uppercase tracking-wide">{value.subtitle}</p>
                  <p className="text-gray-800 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bean to Cup Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Image Side - Left with rounded corners */}
            <div className="relative h-[500px] md:h-[650px] overflow-hidden group rounded-3xl shadow-2xl">
              <motion.img
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                src={coffeeSplash}
                alt="Coffee Bean to Cup Journey"
                className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-2xl"
              >
                <div className="text-3xl font-display font-bold text-orange-600">Premium</div>
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Quality Guaranteed</div>
              </motion.div>
            </div>
            
            {/* Content Side - Right */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="inline-block">
                  <span className="text-sm font-bold uppercase tracking-widest text-orange-600 bg-orange-100 px-4 py-2 rounded-full">
                    Our Process
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
                  From Bean to Cup,
                  <span className="block text-orange-600 mt-2">Excellence Every Step</span>
                </h2>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our journey begins at the source—working directly with over 15,300 smallholder farmers 
                  across Uganda's premier coffee-growing regions. Every bean is carefully selected, 
                  processed, and roasted to perfection.
                </p>
                
                <div className="space-y-4 pt-4">
                  {[
                    { 
                      title: 'Farm Selection', 
                      desc: 'Hand-picked from the finest high-altitude farms',
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      )
                    },
                    { 
                      title: 'Perfect Roasting', 
                      desc: 'Expertly roasted to bring out unique flavors',
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        </svg>
                      )
                    },
                    { 
                      title: 'Quality Control', 
                      desc: 'Multiple checks ensure consistency and excellence',
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      )
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg text-white">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
          </div>
        </motion.div>

        {/* Calm Coffee Moment Section - NEW */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Content Side - Left */}
            <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="inline-block">
                  <span className="text-sm font-bold uppercase tracking-widest text-orange-600 bg-orange-100 px-4 py-2 rounded-full">
                    Our Philosophy
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
                  A Moment of Calm
                  <span className="block text-orange-600 mt-2">In Every Cup</span>
                </h2>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  In today's fast-paced world, L'Oven Coffee offers more than just a beverage. 
                  We create spaces and moments where you can pause, breathe, and savor life's 
                  simple pleasures. Every cup is an invitation to slow down and reconnect.
                </p>
                
                <div className="space-y-4 pt-4">
                  {[
                    { 
                      title: 'Mindful Brewing', 
                      desc: 'Each cup crafted with intention and care',
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      )
                    },
                    { 
                      title: 'Peaceful Ambiance', 
                      desc: 'Cozy spaces designed for comfort and relaxation',
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      )
                    },
                    { 
                      title: 'Community Connection', 
                      desc: 'A gathering place for friends and conversations',
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg text-white">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="pt-6">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Visit Our Café
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
            
            {/* Image Side - Right with rounded corners */}
            <div className="relative h-[500px] md:h-[650px] overflow-hidden group rounded-3xl shadow-2xl order-1 md:order-2">
              <img
                src={calmCoffee}
                alt="Calm Coffee Moment at L'Oven"
                className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/40 to-transparent"></div>
              
              {/* Floating badge on image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl"
              >
                <div className="text-3xl font-display font-bold text-orange-600">Relax</div>
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">& Enjoy</div>
              </motion.div>
            </div>
            
          </div>
        </motion.div>

        {/* Menu Highlights */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} className="inline-block mb-4">
              <span className="text-sm font-bold uppercase tracking-widest text-orange-600 bg-orange-100 px-4 py-2 rounded-full">
                Premium Selection
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6">
              Our Coffee Selection
            </h2>
            <p className="text-lg text-gray-700">
              Choose from our premium selection of Arabica, Robusta, or expertly crafted blended coffees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'ARABICA',
                subtitle: 'Mt. Elgon & Mt. Rwenzori',
                items: ['High-altitude grown (1,600m-2,000m)', 'Volcanic soil minerals', 'Fruity and floral notes', 'Smooth, refined taste'],
                icon: MountainIcon,
                gradient: 'from-amber-500 to-orange-500',
                bgGradient: 'from-amber-50 via-orange-50 to-amber-50',
                accentColor: 'text-amber-700',
                borderColor: 'border-amber-200'
              },
              {
                title: 'ROBUSTA',
                subtitle: 'Lake Victoria Shores',
                items: ['Rich, full-bodied flavor', 'Higher caffeine content', 'Chocolate undertones', 'Strong and bold'],
                icon: WaterIcon,
                gradient: 'from-stone-600 to-slate-800',
                bgGradient: 'from-stone-50 via-slate-50 to-stone-50',
                accentColor: 'text-stone-800',
                borderColor: 'border-stone-300'
              },
              {
                title: 'BLENDED',
                subtitle: 'Best of Both Worlds',
                items: ['Balanced flavor profile', 'Perfect crema', 'Versatile for any brew method', 'Consistently excellent'],
                icon: CoffeeIcon,
                gradient: 'from-orange-600 to-rose-600',
                bgGradient: 'from-orange-50 via-rose-50 to-orange-50',
                accentColor: 'text-orange-700',
                borderColor: 'border-orange-200'
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className={`group relative bg-gradient-to-br ${category.bgGradient} border-2 ${category.borderColor} p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden`}
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Decorative circle */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${category.gradient} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 mb-6 p-3 rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                    <category.icon />
                  </div>
                  
                  <h3 className={`text-3xl font-display font-bold mb-2 ${category.accentColor}`}>{category.title}</h3>
                  <p className={`text-sm font-semibold mb-6 ${category.accentColor} opacity-80 uppercase tracking-wide`}>{category.subtitle}</p>
                  
                  <ul className="space-y-3">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${category.accentColor}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coffee Experience Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Image Side - Left with rounded corners */}
            <div className="relative h-[500px] md:h-[650px] overflow-hidden group rounded-3xl shadow-2xl order-2 md:order-1">
              <motion.img
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                src={coffeeImage}
                alt="L'Oven Coffee Experience"
                className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              
              {/* Floating Badge on Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-2xl"
              >
                <div className="text-3xl font-display font-bold text-orange-600">Fresh Daily</div>
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Peak Flavor Guaranteed</div>
              </motion.div>
            </div>
            
            {/* Content Side - Right */}
            <div className="p-8 md:p-12 flex flex-col justify-center order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="inline-block">
                  <span className="text-sm font-bold uppercase tracking-widest text-orange-600 bg-orange-100 px-4 py-2 rounded-full">
                    Experience Excellence
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
                  Crafted With Passion,
                  <span className="block text-orange-600 mt-2">Served With Love</span>
                </h2>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Step into L'Oven Coffee and experience the perfect blend of tradition and innovation. 
                  Every cup is a testament to our commitment to quality and our love for the craft.
                </p>
                
                <div className="grid grid-cols-2 gap-5 pt-6">
                  {[
                    { 
                      title: 'Expert Baristas', 
                      desc: 'Trained to perfection',
                      icon: (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )
                    },
                    { 
                      title: 'Premium Beans', 
                      desc: 'Ethically sourced',
                      icon: (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      )
                    },
                    { 
                      title: 'Award Winning', 
                      desc: 'Recognized excellence',
                      icon: (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      )
                    },
                    { 
                      title: 'Made Fresh', 
                      desc: 'Order by order',
                      icon: (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="group bg-orange-50/50 p-5 rounded-2xl hover:bg-orange-50 hover:shadow-md transition-all duration-300 border border-orange-100"
                    >
                      <div className="text-orange-600 mb-3 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 text-base mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                  <a
                    href="/menu"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    See Full Menu
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-orange-50 border-2 border-orange-200 hover:border-orange-400 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Find Us
                  </a>
                </div>
              </motion.div>
            </div>
            
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          {...fadeInUp}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600"></div>
          
          {/* Animated background patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative p-16 text-center text-white space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <div className="w-20 h-20 mx-auto mb-6 p-4 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 shadow-2xl">
                <CoffeeIcon />
              </div>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold drop-shadow-lg">
              Your Perfect Coffee Moment Awaits
            </h2>
            <p className="text-xl text-white/95 max-w-2xl mx-auto leading-relaxed">
              Whether you're joining us in-store, grabbing takeaway, or ordering delivery, 
              we're ready to serve you the best coffee experience in Kampala.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <motion.a
                href="/menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-orange-600 font-bold px-12 py-5 rounded-full hover:bg-cream-100 transition-all shadow-2xl hover:shadow-orange-900/50 transform hover:-translate-y-1"
              >
                Explore Our Menu
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-transparent border-2 border-white text-white font-bold px-12 py-5 rounded-full hover:bg-white hover:text-orange-600 transition-all backdrop-blur-sm"
              >
                Visit Us Today
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
