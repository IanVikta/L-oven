import { useState, useEffect } from 'react';
import AOS from 'aos';

// High-End Coffee Assets
import goldenHourCoffee from '../assets/coffee high end/Golden Hour Magic_ a Perfect Shot of Coffee Art 🍫☕📸.jpg';
import italianCoffee from '../assets/coffee high end/Italian coffee.jpg';
import cozyCoffee from '../assets/coffee high end/Cozy Coffee Experience_ Specialty Coffee Beans  Warm Ambiance.jpg';
import roasteryBeans from '../assets/coffee high end/130956301659872151.jpg';

const INQUIRY_CATEGORIES = [
  { id: 'general', label: 'General Inquiry', placeholder: 'Ask us anything about our roastery, café menu, or story...' },
  { id: 'reservation', label: 'Table Booking', placeholder: 'Specify date, time, and number of guests for your table...' },
  { id: 'catering', label: 'Event Catering', placeholder: 'Tell us about your event, headcount, and pastry preferences...' },
  { id: 'wholesale', label: 'Wholesale Beans', placeholder: 'Inquire about bulk specialty beans for your cafe or office...' },
  { id: 'feedback', label: 'Feedback', placeholder: 'Share your dining or delivery experience with our baristas...' },
];

const FAQS = [
  {
    question: 'Do I need a reservation for morning coffee or breakfast?',
    answer: 'Walk-ins are always warmly welcomed! For groups of 6 or more during peak weekend brunch hours (9:00 AM - 1:00 PM), we recommend placing a table booking 24 hours in advance.'
  },
  {
    question: 'Can L\'Oven cater private corporate events or weddings?',
    answer: 'Yes! We offer full-service mobile espresso bar catering and artisanal pastry spreads. Contact our events coordinator via the form above with your event date and estimated head count.'
  },
  {
    question: 'Are vegan and gluten-friendly options available?',
    answer: 'Absolutely. We bake daily oat-flour pastries, almond croissants, and offer oat, almond, and soy milk for all specialty espresso drinks at no extra charge.'
  },
  {
    question: 'Do you offer fresh coffee bean deliveries?',
    answer: 'We roast micro-batches twice weekly. You can purchase whole beans or custom-ground bags directly at our Kololo café or order online for sameday Kampala delivery.'
  }
];

const Contact = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [preferredContact, setPreferredContact] = useState('email');
  const [openFaq, setOpenFaq] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Compute live café status (Open vs Closed)
  const getCafeStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    let openTime = 6 * 60 + 30; // 6:30 AM
    let closeTime = 21 * 60; // 9:00 PM

    if (day === 6) {
      openTime = 7 * 60; // 7:00 AM
      closeTime = 22 * 60; // 10:00 PM
    } else if (day === 0) {
      openTime = 7 * 60 + 30; // 7:30 AM
      closeTime = 20 * 60; // 8:00 PM
    }

    if (currentTime >= openTime && currentTime < closeTime) {
      return { isOpen: true, text: 'Open Now • Baristas Serving Fresh Brews' };
    }
    return { isOpen: false, text: 'Closed Now • Opens Tomorrow at 6:30 AM' };
  };

  const status = getCafeStatus();

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    const catObj = INQUIRY_CATEGORIES.find(c => c.id === catId);
    if (catObj && !formData.subject) {
      setFormData(prev => ({ ...prev, subject: catObj.label.replace(/^[^\s]+\s/, '') }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const currentCategoryObj = INQUIRY_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="bg-cream-100 min-h-screen py-10 md:py-16 text-brown-900 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-6xl space-y-16">

        {/* Magazine Editorial Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-4 pb-4">

          {/* Hero Left Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left" data-aos="fade-right" data-aos-duration="800">


            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brown-900 leading-[1.1] tracking-tight">
              Where Every Conversation Begins with{' '}
              <span className="italic font-serif text-orange-600 block sm:inline">
                Artisanal Hospitality.
              </span>
            </h1>

            <p className="text-sm md:text-base text-brown-700/90 max-w-xl font-light leading-relaxed">
              Whether reserving a quiet corner in our sunlit gardens, arranging mobile barista catering for your event, or inquiring about our weekly Ethiopian micro-roasts—our front-of-house team is at your service.
            </p>

            {/* Clean Key Metadata Row */}

          </div>

          {/* Hero Right Image Showcase (5 cols) */}
          <div className="lg:col-span-5 relative" data-aos="fade-left" data-aos-duration="800">
            {/* Soft Ambient Background Glow */}
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-amber-300/20 rounded-full filter blur-3xl pointer-events-none"></div>

            {/* Clean Architectural Photo Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200/80 group aspect-[4/5] max-h-[460px]">
              <img
                src={goldenHourCoffee}
                alt="Signature High-End Coffee Art"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-950/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>

        </div>

        {/* Main 2-Column Section with Atmospheric Coffee Background Container */}
        <div className="relative p-4 sm:p-6 lg:p-8 rounded-[2.5rem] overflow-hidden border border-amber-900/20 shadow-xl">
          {/* Background Image & Warm Overlay Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src={roasteryBeans}
              alt="Artisanal Roastery Background"
              className="w-full h-full object-cover object-center transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a]/80 via-[#2a170e]/70 to-[#120905]/80 backdrop-blur-[2px]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">

            {/* Left Column: Combined Hours & Contact Lines Sidebar - Sticky on scroll (5 cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 self-start bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-amber-200/70 space-y-6 z-20" data-aos="fade-right" data-aos-duration="800">

              {/* Operating Hours Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                    Opening Hours
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${status.isOpen ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80' : 'bg-rose-50 text-rose-800 border border-rose-200/80'}`}>
                    {status.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>

                <p className="text-xs text-brown-600 font-medium">{status.text}</p>

                <div className="bg-cream-100/70 p-4 rounded-2xl border border-amber-100/80 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-brown-700">
                    <span>Monday – Friday</span>
                    <span className="font-bold text-brown-900">6:30 AM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-brown-700">
                    <span>Saturday</span>
                    <span className="font-bold text-brown-900">7:00 AM – 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-brown-700">
                    <span>Sunday</span>
                    <span className="font-bold text-brown-900">7:30 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-amber-100/80" />

              {/* Direct Contact Lines Section */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block">
                  Direct Contact
                </span>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-brown-900 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-brown-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brown-900">Flagship Café</h4>
                    <p className="text-xs text-brown-700 mt-0.5">Plot 14 Acacia Avenue, Kololo</p>
                    <p className="text-[11px] text-brown-500">Kampala, Uganda</p>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-brown-900 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-brown-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-brown-900">Phone &amp; WhatsApp</h4>
                      <a href="tel:+256770123456" className="text-xs text-brown-900 hover:text-orange-600 font-semibold block transition-colors">
                        +256 770 123 456
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('+256770123456', 'phone')}
                    className="text-[11px] font-semibold text-brown-600 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    {copiedField === 'phone' ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-brown-900 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-brown-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-brown-900">Email Concierge</h4>
                      <a href="mailto:hello@loven.coffee" className="text-xs text-brown-900 hover:text-orange-600 font-semibold block transition-colors">
                        hello@loven.coffee
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('hello@loven.coffee', 'email')}
                    className="text-[11px] font-semibold text-brown-600 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    {copiedField === 'email' ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Redesigned Classic Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl shadow-md border border-amber-200/70 space-y-6" data-aos="fade-left" data-aos-duration="800">

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-orange-600">Send a Note</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-brown-900 mt-1">
                  How Can We Help You Today?
                </h2>
                <p className="text-xs text-brown-600 mt-1">
                  Fill out the form below and our team will get back to you promptly.
                </p>
              </div>

              {/* Interactive Form or Success State */}
              {submitted ? (
                <div className="bg-amber-50/60 border border-amber-200 p-8 rounded-3xl text-center space-y-4 shadow-xs animate-fade-in">
                  <div className="w-14 h-14 bg-brown-900 text-white rounded-full flex items-center justify-center text-2xl mx-auto shadow-sm">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-600">Hospitality Desk</span>
                    <h3 className="text-2xl font-display font-bold text-brown-900">Message Sent Successfully</h3>
                  </div>
                  <p className="text-xs text-brown-700 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-brown-900">{formData.name || 'Friend'}</strong>! Our team will review your {currentCategoryObj?.label} request and respond to <span className="text-brown-900 font-semibold">{formData.email}</span> within 2 to 4 business hours.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={handleResetForm}
                      className="btn btn-secondary text-xs py-2.5 px-6 shadow-xs cursor-pointer"
                    >
                      ← Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brown-900 mb-1.5">
                        Full Name <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jane Austen"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input text-xs py-3.5 px-4 rounded-xl border-amber-200/80 focus:border-brown-900 focus:ring-2 focus:ring-amber-900/10 placeholder:text-brown-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brown-900 mb-1.5">
                        Email Address <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input text-xs py-3.5 px-4 rounded-xl border-amber-200/80 focus:border-brown-900 focus:ring-2 focus:ring-amber-900/10 placeholder:text-brown-400"
                      />
                    </div>
                  </div>

                  {/* Phone & Contact Preference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brown-900 mb-1.5">
                        Phone / WhatsApp <span className="text-brown-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+256 700 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input text-xs py-3.5 px-4 rounded-xl border-amber-200/80 focus:border-brown-900 focus:ring-2 focus:ring-amber-900/10 placeholder:text-brown-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brown-900 mb-1.5">
                        Preferred Reply Method
                      </label>
                      <div className="flex bg-cream-100 p-1 rounded-xl border border-amber-200/80">
                        {['email', 'phone', 'whatsapp'].map(method => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPreferredContact(method)}
                            className={`flex-1 text-[11px] font-semibold py-2 rounded-lg capitalize transition-all cursor-pointer ${preferredContact === method
                              ? 'bg-brown-900 text-white shadow-xs'
                              : 'text-brown-600 hover:text-brown-900'
                              }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-brown-900 mb-1.5">
                      Subject / Topic <span className="text-orange-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Table reservation for 4, Wholesale pricing inquiry..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="input text-xs py-3.5 px-4 rounded-xl border-amber-200/80 focus:border-brown-900 focus:ring-2 focus:ring-amber-900/10 placeholder:text-brown-400"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-brown-900 mb-1.5">
                      Your Message <span className="text-orange-600">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={currentCategoryObj?.placeholder || 'Tell us how we can serve you better...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input text-xs py-3.5 px-4 rounded-xl border-amber-200/80 focus:border-brown-900 focus:ring-2 focus:ring-amber-900/10 placeholder:text-brown-400 leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs font-bold uppercase tracking-wider bg-brown-900 hover:bg-orange-600 text-white rounded-xl transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <span className="text-sm">→</span>
                  </button>

                  <p className="text-xs text-center text-brown-500 font-normal pt-1">
                    We respect your privacy. Your details are kept strictly confidential.
                  </p>

                </form>
              )}

            </div>

          </div>
        </div>

        {/* Secondary Visual Strip: Roastery Craft & Coffee Wallpaper */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl border border-amber-200/60 relative overflow-hidden" data-aos="fade-up" data-aos-duration="800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
                The Flagship Experience
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-brown-900 leading-snug tracking-tight">
                Visit Us in Person for Freshly Baked Croissants &amp; Espresso
              </h2>

              <p className="text-sm sm:text-base text-brown-700/90 leading-relaxed font-light">
                Step into a warm ambiance filled with the rich aroma of micro-roasted Ethiopian coffee beans and classic butter pastries. Complimentary high-speed Wi-Fi and quiet nooks make L'Oven your perfect remote workspace or morning rendezvous spot.
              </p>

              <div className="pt-2">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brown-900 text-white hover:bg-orange-600 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span>Get Directions</span>
                  <span className="text-sm">→</span>
                </a>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 relative h-[260px] sm:h-[300px] rounded-2xl overflow-hidden shadow-lg border border-amber-100 shrink-0">
              <img
                src={cozyCoffee}
                alt="Warm Coffee Ambiance"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>

        {/* Interactive FAQ Accordion Section */}
        <div className="space-y-8" data-aos="fade-up" data-aos-duration="800">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">Quick Answers</span>
            <h2 className="text-3xl font-display font-bold text-brown-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-brown-600">
              Got a quick question about reservations, catering, or bean roasting? Here is what guests ask us most often.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs ${isOpen ? 'border-orange-400 ring-2 ring-orange-500/10' : 'border-amber-100 hover:border-amber-200'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-brown-900">
                      {faq.question}
                    </span>
                    <span className={`w-7 h-7 rounded-full bg-amber-50 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-orange-600 text-white' : ''}`}>
                      ↓
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-brown-700 leading-relaxed border-t border-amber-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;

