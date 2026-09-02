import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();

  const isStaffOrAdmin = user && ['admin', 'barista', 'kitchen', 'driver'].includes(user.role);

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/menu', label: 'MENU' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <nav className="bg-brown text-white sticky top-0 z-40 shadow-lg border-b border-amber-900/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-display font-bold">
              <span className="text-orange">L'</span>
              <span className="text-white">OVEN</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-xs font-bold tracking-wider hover:text-orange transition-colors ${
                    isActive ? 'text-orange' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {isStaffOrAdmin && (
              <div className="flex items-center space-x-4 pl-4 border-l border-amber-900/50 text-xs font-bold text-orange-400">
                <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')}>
                  KITCHEN
                </NavLink>
                <NavLink to="/admin/products" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')}>
                  STOCK
                </NavLink>
                <NavLink to="/admin/reports" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')}>
                  REPORTS
                </NavLink>
              </div>
            )}
          </div>

          {/* Right Side - Cart & Auth */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-1">
              <svg
                className="w-6 h-6 hover:text-orange transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-orange text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/orders"
                  className="text-xs font-bold hover:text-orange transition-colors"
                >
                  MY ORDERS
                </Link>
                <Link
                  to="/profile"
                  className="text-xs font-bold bg-orange-500/20 text-orange-400 px-3 py-1.5 rounded-full border border-orange-500/30 hover:bg-orange-500 hover:text-white transition-all"
                >
                  PROFILE ({user?.loyalty?.current_points || 0} PTS)
                </Link>
                <button
                  onClick={logout}
                  className="text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block text-xs font-bold bg-orange text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition-all"
              >
                SIGN IN
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-amber-900/50 pb-4"
            >
              <div className="py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-xs font-bold tracking-wider hover:text-orange py-1"
                  >
                    {link.label}
                  </Link>
                ))}

                {isStaffOrAdmin && (
                  <div className="pt-2 border-t border-amber-900/50 space-y-2">
                    <span className="text-[10px] font-bold text-orange-400 uppercase">Staff Dashboard</span>
                    <Link to="/admin/orders" onClick={() => setIsMenuOpen(false)} className="block text-xs font-bold py-1">
                      Kitchen Stream
                    </Link>
                    <Link to="/admin/products" onClick={() => setIsMenuOpen(false)} className="block text-xs font-bold py-1">
                      Stock Manager
                    </Link>
                    <Link to="/admin/reports" onClick={() => setIsMenuOpen(false)} className="block text-xs font-bold py-1">
                      Sales Reports
                    </Link>
                  </div>
                )}

                <div className="pt-2 border-t border-amber-900/50">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block text-xs font-bold py-1">
                        My Orders
                      </Link>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block text-xs font-bold py-1 text-orange-400">
                        Profile & Loyalty Points
                      </Link>
                      <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block text-xs font-bold text-red-400 py-1 text-left w-full">
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-xs font-bold text-orange-400 py-1">
                      Sign In / Register
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
