import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from '../common/BackToTop';
import { updateSEO } from '../../utils/seo';

const Layout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 140,
      easing: 'ease-out-cubic',
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  useEffect(() => {
    updateSEO(location.pathname);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <BackToTop />}
    </div>
  );
};

export default Layout;


