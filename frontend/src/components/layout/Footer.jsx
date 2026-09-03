import { useState } from 'react';
import { Link } from 'react-router-dom';

// Authentic café photography from project assets
import darkCafeBg from '../../assets/cand_dark_coffee.jpg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      aria-label="Footer"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-offset="140"
      className="w-full relative bg-[#160C07] text-[#FFF4E6] overflow-hidden selection:bg-[#F28C13] selection:text-white"
    >
      {/* Authentic Café Atmosphere Background Photograph with 70% Dark Brown Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none z-0"
      >
        <img
          src={darkCafeBg}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#160C07]/75" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24">
        {/* TOP ROW: Brand on Left, Navigation on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 sm:mb-20">
          {/* Brand Identity Area (~45%) */}
          <div className="lg:col-span-6 xl:col-span-5 text-left">
            <span className="block font-sans text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#F28C13] uppercase mb-3">
              COFFEE &amp; BAKERY
            </span>

            <h2 className="font-['Playfair_Display',Georgia,serif] text-5xl sm:text-6xl lg:text-7xl text-[#FFF4E6] font-normal tracking-tight leading-none mb-3">
              L'OVEN
            </h2>

            <p className="font-['Playfair_Display',Georgia,serif] text-xl sm:text-2xl text-[#FFF4E6]/90 italic font-normal tracking-wide mb-5">
              Made fresh. Served with care.
            </p>

            {/* Fine Orange Rule with Wheat Flourish */}
            <div className="flex items-center gap-3 w-full max-w-xs">
              <div className="h-[1px] bg-[#F28C13]/40 flex-1" />
              {/* Subtle Wheat Motif SVG */}
              <svg
                className="w-5 h-5 text-[#F28C13] opacity-80 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M12 2v20M8 5c1 1 2.5 1.5 4 1.5M16 5c-1 1-2.5 1.5-4 1.5M7 9c1.2 1 3 1.5 5 1.5M17 9c-1.2 1-3 1.5-5 1.5M6 13c1.5 1 3.5 1.5 6 1.5M18 13c-1.5 1-3.5 1.5-6 1.5M8 17c1 1 2.5 1.2 4 1.2M16 17c-1 1-2.5 1.2-4 1.2" />
              </svg>
              <div className="h-[1px] bg-[#F28C13]/40 flex-1" />
            </div>
          </div>

          {/* Navigation Columns on Right (~55%) */}
          <div className="lg:col-span-6 xl:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 text-left">
            {/* EXPLORE */}
            <div>
              <h3 className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-5">
                EXPLORE
              </h3>
              <ul className="space-y-2.5 font-sans text-sm text-[#FFF4E6]/75">
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#F28C13] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/menu"
                    className="hover:text-[#F28C13] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#F28C13] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#F28C13] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-5">
                QUICK LINKS
              </h3>
              <ul className="space-y-2.5 font-sans text-sm text-[#FFF4E6]/75">
                <li>
                  <Link
                    to="/menu"
                    className="hover:text-[#F28C13] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
                  >
                    Takeaway
                  </Link>
                </li>
                <li>
                  <Link
                    to="/menu"
                    className="hover:text-[#F28C13] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
                  >
                    Dine-in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#F28C13] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
                  >
                    Catering
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#F28C13] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
                  >
                    Wholesale
                  </Link>
                </li>
              </ul>
            </div>

            {/* FOLLOW US */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-4 sm:mb-5">
                FOLLOW US
              </h3>
              <div className="flex items-center gap-3">
                {/* Instagram Circle Outline */}
                <a
                  href="#instagram"
                  aria-label="Follow L'Oven on Instagram"
                  className="w-9 h-9 rounded-full border border-[#F28C13]/50 flex items-center justify-center text-[#FFF4E6] hover:border-[#F28C13] hover:text-[#F28C13] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="1.5" />
                    <path
                      d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                      strokeWidth="1.5"
                    />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </a>

                {/* Facebook Circle Outline */}
                <a
                  href="#facebook"
                  aria-label="Follow L'Oven on Facebook"
                  className="w-9 h-9 rounded-full border border-[#F28C13]/50 flex items-center justify-center text-[#FFF4E6] hover:border-[#F28C13] hover:text-[#F28C13] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F28C13]"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.83-.14-2.8 0-4.67 1.7-4.67 4.8v2.7H7v4h3v9h4v-9z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: Visit / Hours / Contact on Left, Newsletter Box on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 sm:mb-20 pt-10 border-t border-[#FFF4E6]/10">
          {/* Information Blocks (Visit, Hours, Contact) (~60%) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            {/* VISIT US */}
            <div className="flex items-start gap-3.5">
              <div
                aria-hidden="true"
                className="w-9 h-9 rounded-full border border-[#F28C13]/50 flex items-center justify-center text-[#F28C13] flex-shrink-0 mt-0.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 21c-4.5-5.5-7-9.5-7-13a7 7 0 1114 0c0 3.5-2.5 7.5-7 13z"
                  />
                  <circle cx="12" cy="8" r="2.5" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-1">
                  VISIT US
                </h4>
                <p className="font-sans text-xs text-[#FFF4E6]/75 leading-relaxed">
                  Plot 14 Acacia Avenue<br />
                  Kololo, Kampala
                </p>
              </div>
            </div>

            {/* HOURS */}
            <div className="flex items-start gap-3.5">
              <div
                aria-hidden="true"
                className="w-9 h-9 rounded-full border border-[#F28C13]/50 flex items-center justify-center text-[#F28C13] flex-shrink-0 mt-0.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 7v5l3 2"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-1">
                  HOURS
                </h4>
                <p className="font-sans text-xs text-[#FFF4E6]/75 leading-relaxed">
                  Mon – Fri: 6:30 – 21:00<br />
                  Sat – Sun: 7:00 – 22:00
                </p>
              </div>
            </div>

            {/* CONTACT */}
            <div className="flex items-start gap-3.5">
              <div
                aria-hidden="true"
                className="w-9 h-9 rounded-full border border-[#F28C13]/50 flex items-center justify-center text-[#F28C13] flex-shrink-0 mt-0.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#F28C13] uppercase mb-1">
                  CONTACT
                </h4>
                <p className="font-sans text-xs text-[#FFF4E6]/75 leading-relaxed">
                  +256 770 123 456<br />
                  hello@loven.coffee
                </p>
              </div>
            </div>
          </div>

          {/* STAY IN THE LOOP Newsletter Box (~40%) */}
          <div className="lg:col-span-5">
            <div className="relative border border-[#F28C13]/35 rounded-xl px-6 py-6 sm:px-7 sm:py-7 bg-[#160C07]/70 text-center">
              {/* Envelope Badge at Top Center of Border */}
              <div
                aria-hidden="true"
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#160C07] px-2.5 py-0.5 border border-[#F28C13]/40 rounded-full flex items-center justify-center text-[#F28C13]"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" strokeWidth="1.5" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                  />
                </svg>
              </div>

              <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#F28C13] uppercase mb-1.5 pt-1">
                STAY IN THE LOOP
              </h4>

              <p className="font-sans text-xs text-[#FFF4E6]/75 leading-relaxed mb-4 max-w-xs mx-auto">
                Be the first to know about new bakes, specials and cozy stories.
              </p>

              {subscribed ? (
                <p className="text-xs font-sans text-[#F28C13] tracking-wide py-2">
                  Thank you for joining our morning circle.
                </p>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex items-center bg-black/35 border border-[#FFF4E6]/15 rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-[#F28C13]/60 transition-colors"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    aria-label="Email address for newsletter"
                    className="bg-transparent text-xs text-[#FFF4E6] placeholder-[#FFF4E6]/40 focus:outline-none w-full pr-2"
                  />
                  <button
                    type="submit"
                    aria-label="Submit newsletter subscription"
                    className="w-7 h-7 rounded-full bg-[#F28C13] text-[#160C07] flex items-center justify-center text-sm font-bold hover:bg-[#ff9c26] transition-colors duration-150 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Central Wheat Motif with Border + Copyright & Legal */}
        <div className="relative pt-6 border-t border-[#FFF4E6]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#FFF4E6]/55">
          {/* Centered Wheat Accent sitting directly on the divider */}
          <div
            aria-hidden="true"
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#160C07] px-3 text-[#F28C13] opacity-80"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2v20M8 5c1 1 2.5 1.5 4 1.5M16 5c-1 1-2.5 1.5-4 1.5M7 9c1.2 1 3 1.5 5 1.5M17 9c-1.2 1-3 1.5-5 1.5" />
            </svg>
          </div>

          <p>© 2026 L'OVEN</p>

          <div className="flex items-center gap-3 sm:gap-4 tracking-wider uppercase text-[11px]">
            <a
              href="#privacy"
              className="hover:text-[#FFF4E6] transition-colors duration-150"
            >
              PRIVACY
            </a>
            <span className="text-[#FFF4E6]/25">|</span>
            <a
              href="#terms"
              className="hover:text-[#FFF4E6] transition-colors duration-150"
            >
              TERMS
            </a>
            <span className="text-[#FFF4E6]/25">|</span>
            <a
              href="#cookies"
              className="hover:text-[#FFF4E6] transition-colors duration-150"
            >
              COOKIES
            </a>
            <span className="text-[#FFF4E6]/25">|</span>
            <a
              href="#sitemap"
              className="hover:text-[#FFF4E6] transition-colors duration-150"
            >
              SITE MAP
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
