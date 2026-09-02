import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brown-900 text-cream-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-display font-bold mb-4">
              <span className="text-orange">L'</span>
              <span className="text-white">OVEN</span>
            </div>
            <p className="text-sm text-cream-200">
              Good Coffee. Great Moments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/menu" className="hover:text-orange transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/orders" className="hover:text-orange transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-orange transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-cream-200">
              <li>Kampala, Uganda</li>
              <li>Phone: +256 XXX XXX XXX</li>
              <li>Email: hello@loven.coffee</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brown-700 mt-8 pt-8 text-center text-sm text-cream-300">
          <p>&copy; {currentYear} L'Oven Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
