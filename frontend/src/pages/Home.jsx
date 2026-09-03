import { useState, useEffect } from 'react';
import AOS from 'aos';

import { productService } from '../services/productService';
import ProductModal from '../components/products/ProductModal';
import Hero from '../components/home/Hero';
import FeaturedMenu from '../components/home/FeaturedMenu';
import OurCraft from '../components/home/OurCraft';
import Fulfilment from '../components/home/Fulfilment';
import BackToTop from '../components/common/BackToTop';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Recalculate offsets on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.getProducts();
        if (!isCancelled) {
          const products = res?.products || [];
          setFeaturedProducts(products.slice(0, 6));
          setError(null);
        }
      } catch (e) {
        console.error('Failed to fetch featured products:', e);
        if (!isCancelled) {
          setError('Unable to load today\'s favourites.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
          // Recalculate positions after content expands
          setTimeout(() => {
            AOS.refreshHard();
          }, 150);
        }
      }
    };

    fetchFeaturedProducts();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getProducts();
      const products = res?.products || [];
      setFeaturedProducts(products.slice(0, 6));
      setError(null);
    } catch (e) {
      console.error('Failed to retry fetch featured products:', e);
      setError('Unable to load today\'s favourites.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        AOS.refreshHard();
      }, 150);
    }
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="relative overflow-x-clip">
      {/* Hero Section */}
      <Hero />

      {/* Featured Menu — Animate on scroll (waits for scroll) */}
      <div data-aos="fade-up" data-aos-duration="800" data-aos-offset="140">
        <FeaturedMenu
          products={featuredProducts}
          loading={loading}
          error={error}
          onSelectProduct={handleOpenModal}
          onRetry={handleRetry}
        />
      </div>

      {/* Our Craft Section — Animate on scroll (waits for scroll) */}
      <div data-aos="fade-up" data-aos-duration="800" data-aos-offset="140">
        <OurCraft />
      </div>

      {/* Fulfilment Section — Animate on scroll (waits for scroll) */}
      <div data-aos="fade-up" data-aos-duration="800" data-aos-offset="140">
        <Fulfilment />
      </div>

      {/* Product Customization Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Home;
