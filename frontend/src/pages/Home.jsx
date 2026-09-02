import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-brown-900 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-brown-900 via-brown-800 to-brown-900 opacity-90"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-display font-bold mb-6"
            >
              Good Coffee.{' '}
              <span className="text-orange">Great Moments.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-cream-200 mb-8"
            >
              Experience the finest coffee, freshly baked treats, and warm hospitality at L'Oven Coffee.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/menu">
                <Button size="lg">Order Now</Button>
              </Link>
              <Link to="/menu">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-brown">
                  Explore Menu
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brown-900 mb-4">
              What We Offer
            </h2>
            <p className="text-brown-700 max-w-2xl mx-auto">
              From artisanal coffee to delicious treats, discover our carefully curated menu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Coffee', emoji: '☕', description: 'Premium coffee drinks' },
              { name: 'Bakery', emoji: '🥐', description: 'Fresh baked goods' },
              { name: 'Treats', emoji: '🍰', description: 'Delicious desserts' },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card card-hover p-8 text-center"
              >
                <div className="text-6xl mb-4">{category.emoji}</div>
                <h3 className="text-2xl font-display font-bold text-brown-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-brown-700 mb-4">{category.description}</p>
                <Link to="/menu" className="text-orange font-semibold hover:underline">
                  View Menu →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Browse our menu and place your order in just a few clicks.
          </p>
          <Link to="/menu">
            <Button variant="secondary" size="lg">
              Start Ordering
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
