import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/menu', label: 'MENU' },
    { to: '/about', label: 'OUR STORY' },
    { to: '/contact', label: 'CONTACT' },
  ];

  // Handle escape key to close mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className="bg-[#2B1B12] text-[#FFF4E6] sticky top-0 z-50 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Brand / Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl md:text-[26px] font-['Playfair_Display',Georgia,serif] font-medium tracking-[0.18em] text-[#FFF4E6] hover:text-[#FFFFFF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
            >
              L'OVEN
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10 lg:space-x-14">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-xs lg:text-[13px] font-sans font-medium tracking-[0.18em] transition-colors duration-150 focus:outline-none focus-visible:text-[#F28C13] ${
                    isActive
                      ? 'text-[#F28C13]'
                      : 'text-[#FFF4E6] hover:text-[#F28C13]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Right Area (Divider + Cart) */}
          <div className="hidden md:flex items-center">
            <div
              className="h-5 w-px bg-[#FFF4E6]/25 mx-6 lg:mx-8"
              aria-hidden="true"
            />
            <Link
              to="/cart"
              aria-label={`Shopping cart with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              className="relative p-1.5 text-[#FFF4E6] hover:text-[#F28C13] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-[#F28C13] text-white text-[10px] font-sans font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none"
                  aria-hidden="true"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Right Controls (Cart + Menu Toggle) */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link
              to="/cart"
              aria-label={`Shopping cart with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              className="relative p-1.5 text-[#FFF4E6] hover:text-[#F28C13] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-[#F28C13] text-white text-[10px] font-sans font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none"
                  aria-hidden="true"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-1.5 text-[#FFF4E6] hover:text-[#F28C13] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Card */}
        {isMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-[#2B1B12]/80 backdrop-blur-md border border-[#FFF4E6]/15 rounded-xl p-5 shadow-lg transition-all duration-200"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-xs font-sans font-medium tracking-[0.18em] py-2 transition-colors duration-150 focus:outline-none focus-visible:text-[#F28C13] ${
                      isActive
                        ? 'text-[#F28C13]'
                        : 'text-[#FFF4E6] hover:text-[#F28C13]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
