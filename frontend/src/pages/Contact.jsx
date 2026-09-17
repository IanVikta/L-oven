import { useState, useEffect } from 'react';
import AOS from 'aos';
import { sendContactMessage } from '../services/contactService';

// High-End Coffee Assets
import goldenHourCoffee from '../assets/coffee high end/Golden Hour Magic_ a Perfect Shot of Coffee Art 🍫☕📸.jpg';
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
    answer: 'We roast micro-batches twice weekly. You can purchase whole beans or custom-ground bags directly at our Kitende café or order online for sameday delivery.'
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
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Compute live café status (Open vs Closed) based on actual current time
  const getCafeStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 1-5 is Mon-Fri, 6 is Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    let openTime = 6 * 60 + 30; // 6:30 AM
    let closeTime = 21 * 60; // 9:00 PM
    let closeFormatted = '9:00 PM';

    if (day === 6) {
      openTime = 7 * 60; // 7:00 AM
      closeTime = 22 * 60; // 10:00 PM
      closeFormatted = '10:00 PM';
    } else if (day === 0) {
      openTime = 7 * 60 + 30; // 7:30 AM
      closeTime = 20 * 60; // 8:00 PM
      closeFormatted = '8:00 PM';
    }

    const isOpen = currentTime >= openTime && currentTime < closeTime;

    if (isOpen) {
      return {
        isOpen: true,
        label: 'Open Now',
        detail: `Closes tonight at ${closeFormatted}`,
        currentDay: day
      };
    }

    let nextOpenText = 'Opens tomorrow at 6:30 AM';
    if (currentTime < openTime) {
      const openFormatted = day === 6 ? '7:00 AM' : day === 0 ? '7:30 AM' : '6:30 AM';
      nextOpenText = `Opens today at ${openFormatted}`;
    } else {
      const tomorrow = (day + 1) % 7;
      const tomorrowOpen = tomorrow === 6 ? '7:00 AM' : tomorrow === 0 ? '7:30 AM' : '6:30 AM';
      nextOpenText = `Opens tomorrow at ${tomorrowOpen}`;
    }

    return {
      isOpen: false,
      label: 'Closed Now',
      detail: nextOpenText,
      currentDay: day
    };
  };

  const status = getCafeStatus();

  const handleCopy = (text, fieldName) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
      }).catch(() => {
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
      });
    } else {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter a valid email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message must be at least 10 characters.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    const catObj = INQUIRY_CATEGORIES.find(c => c.id === catId);
    if (catObj) {
      const isDefaultSubject = !formData.subject || INQUIRY_CATEGORIES.some(c => c.label === formData.subject);
      if (isDefaultSubject) {
        setFormData(prev => ({ ...prev, subject: catObj.label }));
        if (errors.subject) {
          setErrors(prev => ({ ...prev, subject: null }));
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setFormStatus('submitting');
    setApiError(null);

    try {
      const messageBody = preferredContact
        ? `${formData.message.trim()}\n\n[Preferred Reply Method: ${preferredContact.charAt(0).toUpperCase() + preferredContact.slice(1)}]`
        : formData.message.trim();

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject: formData.subject.trim(),
        category: activeCategory,
        message: messageBody,
        preferred_reply_method: preferredContact
      };

      const res = await sendContactMessage(payload);
      if (res && res.success) {
        setFormStatus('success');
      } else {
        setApiError(res?.message || 'Something went wrong while sending your message. Please try again or contact us directly.');
        setFormStatus('error');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      const msg = err.response?.data?.message || 'Something went wrong while sending your message. Please try again or contact us directly.';
      setApiError(msg);
      setFormStatus('error');
    }
  };

  const handleResetForm = () => {
    setFormStatus('idle');
    setApiError(null);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="bg-cream-100 min-h-screen py-10 md:py-16 text-brown-900 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-6xl space-y-16">

        {/* Magazine Editorial Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-4 pb-4">

          {/* Hero Left Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left" data-aos="fade-right" data-aos-duration="800">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 block">
              Direct Inquiries &amp; Table Bookings
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brown-900 leading-[1.1] tracking-tight">
              Where Every Conversation Begins with{' '}
              <span className="italic font-serif text-orange-600 block sm:inline">
                Artisanal Hospitality.
              </span>
            </h1>

            <p className="text-sm md:text-base text-brown-700/90 max-w-xl font-light leading-relaxed">
              Whether reserving a quiet corner in our sunlit gardens, arranging mobile barista catering for your event, or inquiring about our weekly Ethiopian micro-roasts—our front-of-house team is at your service.
            </p>
          </div>

          {/* Hero Right Image Showcase (5 cols) */}
          <div className="lg:col-span-5 relative" data-aos="fade-left" data-aos-duration="800">
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-amber-300/20 rounded-full filter blur-3xl pointer-events-none"></div>

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
        <section aria-labelledby="contact-section-title" className="relative rounded-[24px] overflow-hidden border border-[#E8DFD5]/50 shadow-2xl">
          {/* Atmospheric Background Image & Deep Espresso Warm Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={roasteryBeans}
              alt="Artisanal Roastery Background"
              className="w-full h-full object-cover object-center transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#17110D]/90 via-[#20140E]/85 to-[#17110D]/92 backdrop-blur-[1px]"></div>
          </div>

          <div className="relative z-10 p-4 sm:p-6 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

              {/* Left Column: Concierge Information & Hours (~40% on desktop) */}
              <div 
                className="lg:col-span-5 bg-[#FCFAF7] p-6 sm:p-8 rounded-2xl border border-[#E8DFD5] shadow-sm flex flex-col justify-between space-y-8" 
                data-aos="fade-right" 
                data-aos-duration="700"
              >
                {/* Header & Opening Hours */}
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-3 border-b border-[#E8DFD5]/70 pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C45D26] block mb-1">
                        Est. 2021 • Kitende
                      </span>
                      <h2 className="text-xl sm:text-2xl font-display font-bold text-[#17110D]">
                        Opening Hours
                      </h2>
                    </div>
                    {/* Dynamic Status Badge */}
                    <div 
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                        status.isOpen 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                          : 'bg-[#F4ECE1] text-[#7A6050] border border-[#E0D4C5]'
                      }`}
                      aria-live="polite"
                    >
                      <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-[#9C8270]'}`}></span>
                      <span>{status.label}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#5C483A] font-medium flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C45D26]"></span>
                    {status.detail}
                  </p>

                  {/* Schedule Timetable */}
                  <div className="bg-[#F7F2EB]/60 rounded-xl p-4 border border-[#E8DFD5]/80 space-y-2.5 text-xs">
                    {/* Monday - Friday */}
                    <div className={`flex justify-between items-center py-1.5 px-2 rounded-lg transition-colors ${
                      status.currentDay >= 1 && status.currentDay <= 5 
                        ? 'bg-[#FFFFFF] font-bold text-[#17110D] shadow-xs' 
                        : 'text-[#5C483A]'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span>Monday – Friday</span>
                        {status.currentDay >= 1 && status.currentDay <= 5 && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#C45D26]/10 text-[#C45D26]">
                            Today
                          </span>
                        )}
                      </div>
                      <span className="text-[#17110D] font-semibold">6:30 AM – 9:00 PM</span>
                    </div>

                    {/* Saturday */}
                    <div className={`flex justify-between items-center py-1.5 px-2 rounded-lg transition-colors ${
                      status.currentDay === 6 
                        ? 'bg-[#FFFFFF] font-bold text-[#17110D] shadow-xs' 
                        : 'text-[#5C483A]'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span>Saturday</span>
                        {status.currentDay === 6 && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#C45D26]/10 text-[#C45D26]">
                            Today
                          </span>
                        )}
                      </div>
                      <span className="text-[#17110D] font-semibold">7:00 AM – 10:00 PM</span>
                    </div>

                    {/* Sunday */}
                    <div className={`flex justify-between items-center py-1.5 px-2 rounded-lg transition-colors ${
                      status.currentDay === 0 
                        ? 'bg-[#FFFFFF] font-bold text-[#17110D] shadow-xs' 
                        : 'text-[#5C483A]'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span>Sunday</span>
                        {status.currentDay === 0 && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#C45D26]/10 text-[#C45D26]">
                            Today
                          </span>
                        )}
                      </div>
                      <span className="text-[#17110D] font-semibold">7:30 AM – 8:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Subtle Divider */}
                <div className="border-t border-[#E8DFD5]/80 my-2"></div>

                {/* Direct Contact Lines */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C45D26]">
                      Direct Contact
                    </span>
                    <span className="text-[11px] text-[#8C7A6E]">Kitende Concierge</span>
                  </div>

                  {/* Flagship Location */}
                  <div className="group flex items-start gap-3.5 p-2.5 -mx-2.5 rounded-xl transition-colors hover:bg-[#F4ECE1]/40">
                    <div className="w-9 h-9 rounded-xl bg-[#F4ECE1] text-[#17110D] flex items-center justify-center shrink-0 mt-0.5 border border-[#E8DFD5]">
                      <svg className="w-4 h-4 text-[#17110D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-xs font-bold text-[#17110D]">Flagship Café</h3>
                        <a 
                          href="https://maps.google.com/?q=Kitende,Uganda" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-[#C45D26] hover:text-[#9E6438] transition-colors inline-flex items-center gap-0.5"
                        >
                          <span>Get Directions</span>
                          <span>↗</span>
                        </a>
                      </div>
                      <p className="text-xs text-[#5C483A] mt-0.5">Entebbe Road, Kitende</p>
                      <p className="text-[11px] text-[#8C7A6E]">Uganda</p>
                    </div>
                  </div>

                  {/* Phone & WhatsApp */}
                  <div className="group flex items-start justify-between gap-3 p-2.5 -mx-2.5 rounded-xl transition-colors hover:bg-[#F4ECE1]/40">
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#F4ECE1] text-[#17110D] flex items-center justify-center shrink-0 mt-0.5 border border-[#E8DFD5]">
                        <svg className="w-4 h-4 text-[#17110D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-[#17110D]">Phone &amp; WhatsApp</h3>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <a 
                            href="tel:+256770123456" 
                            className="text-xs font-semibold text-[#17110D] hover:text-[#C45D26] transition-colors"
                          >
                            +256 770 123 456
                          </a>
                          <span className="text-[#C45D26]/40">•</span>
                          <a
                            href="https://wa.me/256770123456?text=Hello%20L%27Oven%20Coffee%2C%20I%20have%20an%20inquiry"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-semibold text-[#C45D26] hover:underline"
                            title="Chat on WhatsApp"
                          >
                            WhatsApp Chat
                          </a>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('+256770123456', 'phone')}
                      className="text-[11px] font-semibold text-[#7A6050] hover:text-[#C45D26] px-2.5 py-1 rounded-md border border-[#E8DFD5] hover:border-[#C45D26] bg-[#FFFFFF] transition-all shrink-0 cursor-pointer"
                      aria-label="Copy phone number"
                    >
                      {copiedField === 'phone' ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>

                  {/* Email Concierge */}
                  <div className="group flex items-start justify-between gap-3 p-2.5 -mx-2.5 rounded-xl transition-colors hover:bg-[#F4ECE1]/40">
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#F4ECE1] text-[#17110D] flex items-center justify-center shrink-0 mt-0.5 border border-[#E8DFD5]">
                        <svg className="w-4 h-4 text-[#17110D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-[#17110D]">Email Concierge</h3>
                        <a 
                          href="mailto:lovencoffee2@gmail.com" 
                          className="text-xs font-semibold text-[#17110D] hover:text-[#C45D26] block mt-0.5 transition-colors truncate"
                        >
                          lovencoffee2@gmail.com
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('lovencoffee2@gmail.com', 'email')}
                      className="text-[11px] font-semibold text-[#7A6050] hover:text-[#C45D26] px-2.5 py-1 rounded-md border border-[#E8DFD5] hover:border-[#C45D26] bg-[#FFFFFF] transition-all shrink-0 cursor-pointer"
                      aria-label="Copy email address"
                    >
                      {copiedField === 'email' ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Response SLA assurance footnote */}
                <div className="pt-2 text-[11px] text-[#8C7A6E] flex items-center gap-1.5 border-t border-[#E8DFD5]/70">
                  <svg className="w-3.5 h-3.5 text-[#C45D26] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Typical response time: under 2 hours during roastery hours.</span>
                </div>
              </div>

              {/* Right Column: Contact Form (~60% on desktop) */}
              <div 
                className="lg:col-span-7 bg-[#FFFFFF] p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#E8DFD5] shadow-xl space-y-6"
                data-aos="fade-left" 
                data-aos-duration="700"
              >
                {/* Header */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C45D26] block">
                    Send a Note
                  </span>
                  <h2 id="contact-section-title" className="text-2xl sm:text-3xl font-display font-bold text-[#17110D] tracking-tight">
                    How Can We Help You Today?
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C483A] leading-relaxed">
                    Fill out the form below and our team will get back to you promptly.
                  </p>
                </div>

                {/* Topic Pills */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6E] block">
                    Select a Topic
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_CATEGORIES.map(cat => {
                      const isSelected = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategorySelect(cat.id)}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 cursor-pointer border ${
                            isSelected
                              ? 'bg-[#17110D] text-[#FCFAF7] border-[#17110D] shadow-xs'
                              : 'bg-[#FCFAF7] text-[#4A3528] border-[#E8DFD5] hover:border-[#C45D26] hover:text-[#17110D]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive Form or Success State */}
                {formStatus === 'success' ? (
                  <div 
                    className="bg-[#FCFAF7] border border-[#E8DFD5] p-8 sm:p-10 rounded-2xl text-center space-y-5 shadow-xs"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="w-14 h-14 bg-[#17110D] text-[#FCFAF7] rounded-full flex items-center justify-center text-2xl mx-auto shadow-md">
                      ✓
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C45D26]">
                        Hospitality Desk
                      </span>
                      <h3 className="text-2xl font-display font-bold text-[#17110D]">
                        Message Sent Successfully
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5C483A] max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out, <strong className="text-[#17110D]">{formData.name || 'Friend'}</strong>. Our team has received your note regarding <span className="text-[#17110D] font-semibold">{formData.subject || 'your inquiry'}</span> and will get back to you shortly via your preferred reply method.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#17110D] text-[#FCFAF7] hover:bg-[#2C1B12] transition-colors cursor-pointer shadow-sm"
                      >
                        <span>← Send Another Message</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Row 1: Full Name & Email Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-bold text-[#17110D] mb-1.5">
                          Full Name <span className="text-[#C45D26]">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="e.g. Jane Austen"
                          value={formData.name}
                          onChange={handleInputChange}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                          className={`w-full text-xs py-3.5 px-4 rounded-[14px] bg-[#FCFAF7] border transition-all duration-200 text-[#17110D] placeholder:text-[#9C8270] focus:outline-none ${
                            errors.name 
                              ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15' 
                              : 'border-[#E8DFD5] focus:border-[#C45D26] focus:ring-2 focus:ring-[#C45D26]/15 focus:bg-white'
                          }`}
                        />
                        {errors.name && (
                          <span id="contact-name-error" role="alert" className="text-[11px] text-rose-600 font-medium mt-1 block">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold text-[#17110D] mb-1.5">
                          Email Address <span className="text-[#C45D26]">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="jane@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                          className={`w-full text-xs py-3.5 px-4 rounded-[14px] bg-[#FCFAF7] border transition-all duration-200 text-[#17110D] placeholder:text-[#9C8270] focus:outline-none ${
                            errors.email 
                              ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15' 
                              : 'border-[#E8DFD5] focus:border-[#C45D26] focus:ring-2 focus:ring-[#C45D26]/15 focus:bg-white'
                          }`}
                        />
                        {errors.email && (
                          <span id="contact-email-error" role="alert" className="text-[11px] text-rose-600 font-medium mt-1 block">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone / WhatsApp & Preferred Reply Method */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-bold text-[#17110D] mb-1.5">
                          Phone / WhatsApp <span className="text-[#8C7A6E] font-normal">(Optional)</span>
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+256 700 000 000"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full text-xs py-3.5 px-4 rounded-[14px] bg-[#FCFAF7] border border-[#E8DFD5] transition-all duration-200 text-[#17110D] placeholder:text-[#9C8270] focus:outline-none focus:border-[#C45D26] focus:ring-2 focus:ring-[#C45D26]/15 focus:bg-white"
                        />
                      </div>

                      <div>
                        <span id="contact-reply-method-label" className="block text-xs font-bold text-[#17110D] mb-1.5">
                          Preferred Reply Method
                        </span>
                        <div 
                          role="radiogroup" 
                          aria-labelledby="contact-reply-method-label"
                          className="flex bg-[#FCFAF7] p-1 rounded-[14px] border border-[#E8DFD5]"
                        >
                          {[
                            { id: 'email', label: 'Email', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                            { id: 'phone', label: 'Phone', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                            { id: 'whatsapp', label: 'WhatsApp', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' }
                          ].map(item => {
                            const isSelected = preferredContact === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                role="radio"
                                aria-checked={isSelected}
                                onClick={() => setPreferredContact(item.id)}
                                className={`flex-1 inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold py-2.5 rounded-xl transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#17110D] text-[#FCFAF7] shadow-xs'
                                    : 'text-[#5C483A] hover:text-[#17110D]'
                                }`}
                              >
                                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                </svg>
                                <span>{item.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Subject / Topic */}
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold text-[#17110D] mb-1.5">
                        Subject / Topic <span className="text-[#C45D26]">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="e.g. Table reservation, wholesale inquiry, event catering..."
                        value={formData.subject}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                        className={`w-full text-xs py-3.5 px-4 rounded-[14px] bg-[#FCFAF7] border transition-all duration-200 text-[#17110D] placeholder:text-[#9C8270] focus:outline-none ${
                          errors.subject 
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15' 
                            : 'border-[#E8DFD5] focus:border-[#C45D26] focus:ring-2 focus:ring-[#C45D26]/15 focus:bg-white'
                        }`}
                      />
                      {errors.subject && (
                        <span id="contact-subject-error" role="alert" className="text-[11px] text-rose-600 font-medium mt-1 block">
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Row 4: Your Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold text-[#17110D] mb-1.5">
                        Your Message <span className="text-[#C45D26]">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us how we can help..."
                        value={formData.message}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        className={`w-full min-h-[140px] resize-y text-xs py-3.5 px-4 rounded-[14px] bg-[#FCFAF7] border transition-all duration-200 text-[#17110D] placeholder:text-[#9C8270] leading-relaxed focus:outline-none ${
                          errors.message 
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15' 
                            : 'border-[#E8DFD5] focus:border-[#C45D26] focus:ring-2 focus:ring-[#C45D26]/15 focus:bg-white'
                        }`}
                      />
                      {errors.message && (
                        <span id="contact-message-error" role="alert" className="text-[11px] text-rose-600 font-medium mt-1 block">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Inline API Error Feedback */}
                    {formStatus === 'error' && (
                      <div 
                        role="alert" 
                        aria-live="assertive"
                        className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-3"
                      >
                        <svg className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div className="space-y-0.5">
                          <p className="font-bold">Message could not be delivered</p>
                          <p className="text-[11px] text-rose-700">
                            {apiError || 'Something went wrong while sending your message. Please try again or contact us directly.'}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="group w-full py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#17110D] hover:bg-[#2C1B12] active:bg-[#0F0A07] disabled:bg-[#8C7A6E] text-[#FCFAF7] rounded-[14px] transition-all duration-300 shadow-md cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-[#FCFAF7]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <span className="transition-transform duration-200 group-hover:translate-x-1.5 inline-block">
                            →
                          </span>
                        </>
                      )}
                    </button>

                    {/* Privacy Reassurance Note */}
                    <div className="flex items-center justify-center gap-1.5 pt-1 text-center text-[11px] text-[#7D6859]">
                      <svg className="w-3.5 h-3.5 text-[#C45D26] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>We respect your privacy. Your details are kept strictly confidential.</span>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

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
                  href="https://maps.google.com/?q=Kitende,Uganda"
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
