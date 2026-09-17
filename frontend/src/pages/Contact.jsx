import { useState, useEffect } from 'react';
import AOS from 'aos';
import { sendContactMessage } from '../services/contactService';

// Authentic High-End Coffee Assets
import goldenHourCoffee from '../assets/coffee high end/Golden Hour Magic_ a Perfect Shot of Coffee Art 🍫☕📸.jpg';
import cozyCoffee from '../assets/coffee high end/Cozy Coffee Experience_ Specialty Coffee Beans  Warm Ambiance.jpg';

const INQUIRY_CATEGORIES = [
  { id: 'general', label: 'General Inquiry' },
  { id: 'reservation', label: 'Table Booking' },
  { id: 'catering', label: 'Event Catering' },
  { id: 'wholesale', label: 'Wholesale Beans' },
  { id: 'feedback', label: 'Guest Feedback' },
];

const FAQS = [
  {
    question: 'Do I need a reservation for morning coffee or breakfast?',
    answer: 'Walk-ins are always warmly welcomed! For groups of 6 or more during peak weekend brunch hours (9:00 AM - 1:00 PM), we recommend placing a table booking 24 hours in advance.'
  },
  {
    question: 'Can L\'Oven cater private corporate events or weddings?',
    answer: 'Yes! We offer full-service mobile espresso bar catering and artisanal pastry spreads. Contact our events coordinator via the form with your event date and estimated head count.'
  },
  {
    question: 'Are vegan and gluten-friendly options available?',
    answer: 'Absolutely. We bake daily oat-flour pastries, almond croissants, and offer oat, almond, and soy milk for all specialty espresso drinks at no extra charge.'
  },
  {
    question: 'Do you offer fresh coffee bean deliveries?',
    answer: 'We roast micro-batches twice weekly. You can purchase whole beans or custom-ground bags directly at our Kitende café or order online for same-day delivery.'
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
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out',
    });

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
    <div className="bg-[#FAF5EE] text-[#2B1B12] min-h-screen overflow-x-clip">
      
      {/* 1. Hero Section - Editorial Human-Designed Aesthetic (Matches Our Story) */}
      <section className="relative w-full bg-[#2B1B12] overflow-hidden">
        {/* Full-width Photography Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={goldenHourCoffee} 
            alt="Artisanal Crafted Coffee at L'Oven" 
            className="w-full h-full object-cover object-center"
          />
          {/* Deep espresso overlay matching About.jsx */}
          <div className="absolute inset-0 bg-[#2B1B12] opacity-45 pointer-events-none"></div>
        </div>

        {/* Content Container - Editorial Typography & Left Alignment */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="min-h-[70vh] sm:min-h-[76vh] flex items-center py-16 sm:py-24 lg:py-28">
            <div className="max-w-xl lg:max-w-2xl text-left" data-aos="fade-up" data-aos-duration="900">
              
              {/* Eyebrow Label with subtle horizontal accent */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#F28C13] uppercase">
                  GET IN TOUCH
                </p>
                <div className="w-8 sm:w-10 h-[1px] bg-[#F28C13]"></div>
              </div>

              {/* Main Heading */}
              <h1 className="font-['Lora',serif] text-[34px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight text-[#FFF4E6] mb-5 sm:mb-8">
                Start a<br />
                Conversation.
              </h1>

              {/* Supporting Text */}
              <p className="text-[15px] sm:text-lg text-[#FFF4E6]/85 font-light leading-relaxed max-w-xl mb-7 sm:mb-10">
                Where every conversation begins with artisanal hospitality. Whether reserving a table, arranging event catering, or inquiring about our weekly micro-roasts—we are at your service.
              </p>

              {/* CTA Link */}
              <div className="pt-1">
                <a 
                  href="#contact-section" 
                  className="inline-flex items-center gap-2.5 py-1.5 text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#F28C13] uppercase border-b border-[#F28C13] hover:text-[#f8a846] hover:border-[#f8a846] transition-colors duration-200"
                >
                  <span>CONNECT WITH US</span>
                  <span aria-hidden="true" className="text-base leading-none">↓</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Editorial Contact Section - Clean Two-Column Journal Layout */}
      <section id="contact-section" className="bg-[#FAF5EE] text-[#2B1B12] py-16 sm:py-24 lg:py-32 scroll-mt-16">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column (lg:col-span-5): Concierge, Hours & Direct Lines */}
            <div className="lg:col-span-5 space-y-10 text-left" data-aos="fade-up">
              
              {/* Section Header */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C8681A] uppercase">
                    HOSPITALITY DESK
                  </p>
                  <div className="w-8 h-[1px] bg-[#C8681A]"></div>
                </div>
                <h2 className="font-['Lora',serif] text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.12] text-[#2B1B12] mb-4 tracking-tight">
                  Artisan Hospitality,<br />Seven Days a Week.
                </h2>
                <p className="text-sm text-[#5A4538] font-light leading-relaxed max-w-md">
                  Step into our sunlit roastery or connect directly with our front-of-house team. We take pride in responding promptly and warmly to every guest.
                </p>
              </div>

              {/* Chapter 01 — Opening Hours */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2B1B12]/15">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#C8681A] tracking-wider">01</span>
                    <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#C8681A] uppercase">
                      OPENING HOURS
                    </span>
                  </div>

                  {/* Dynamic Status Indicator */}
                  <div 
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase ${
                      status.isOpen 
                        ? 'text-emerald-800 bg-emerald-50/80 border border-emerald-300/60' 
                        : 'text-[#7A6050] bg-[#EFE8DD] border border-[#2B1B12]/15'
                    }`}
                    aria-live="polite"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-[#9C8270]'}`}></span>
                    <span>{status.label}</span>
                  </div>
                </div>

                <p className="text-xs text-[#7A695E] mb-3 font-light">
                  {status.detail}
                </p>

                {/* Scannable Schedule with Clean Hairlines */}
                <div className="space-y-2 text-xs">
                  <div className={`flex justify-between items-center py-1.5 px-2 border-b border-[#2B1B12]/10 ${
                    status.currentDay >= 1 && status.currentDay <= 5 ? 'font-semibold text-[#2B1B12] bg-[#F7F2EA]' : 'text-[#5A4538]'
                  }`}>
                    <span className="flex items-center gap-2">
                      Monday – Friday
                      {status.currentDay >= 1 && status.currentDay <= 5 && (
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#C8681A]">Today</span>
                      )}
                    </span>
                    <span>6:30 AM – 9:00 PM</span>
                  </div>

                  <div className={`flex justify-between items-center py-1.5 px-2 border-b border-[#2B1B12]/10 ${
                    status.currentDay === 6 ? 'font-semibold text-[#2B1B12] bg-[#F7F2EA]' : 'text-[#5A4538]'
                  }`}>
                    <span className="flex items-center gap-2">
                      Saturday
                      {status.currentDay === 6 && (
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#C8681A]">Today</span>
                      )}
                    </span>
                    <span>7:00 AM – 10:00 PM</span>
                  </div>

                  <div className={`flex justify-between items-center py-1.5 px-2 border-b border-[#2B1B12]/10 ${
                    status.currentDay === 0 ? 'font-semibold text-[#2B1B12] bg-[#F7F2EA]' : 'text-[#5A4538]'
                  }`}>
                    <span className="flex items-center gap-2">
                      Sunday
                      {status.currentDay === 0 && (
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#C8681A]">Today</span>
                      )}
                    </span>
                    <span>7:30 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Chapter 02 — Direct Concierge Lines */}
              <div>
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-[#2B1B12]/15">
                  <span className="text-xs font-semibold text-[#C8681A] tracking-wider">02</span>
                  <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#C8681A] uppercase">
                    DIRECT CONTACT
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-start justify-between gap-4 py-2 border-b border-[#2B1B12]/10">
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase block mb-0.5">
                        FLAGSHIP CAFÉ
                      </span>
                      <p className="text-xs text-[#2B1B12] font-medium">Entebbe Road, Kitende, Uganda</p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Kitende,Uganda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-[#C8681A] hover:text-[#9E6438] underline underline-offset-4 transition-colors shrink-0"
                    >
                      Get Directions ↗
                    </a>
                  </div>

                  {/* Phone & WhatsApp */}
                  <div className="flex items-start justify-between gap-4 py-2 border-b border-[#2B1B12]/10">
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase block mb-0.5">
                        PHONE &amp; WHATSAPP
                      </span>
                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        <a 
                          href="tel:+256770123456" 
                          className="font-medium text-[#2B1B12] hover:text-[#C8681A] transition-colors"
                        >
                          +256 770 123 456
                        </a>
                        <span className="text-[#C8681A]/40">•</span>
                        <a
                          href="https://wa.me/256770123456?text=Hello%20L%27Oven%20Coffee%2C%20I%20have%20an%20inquiry"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C8681A] font-semibold hover:underline"
                        >
                          WhatsApp Chat ↗
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('+256770123456', 'phone')}
                      className="text-[11px] font-medium text-[#7A695E] hover:text-[#2B1B12] transition-colors shrink-0 cursor-pointer pt-0.5"
                    >
                      {copiedField === 'phone' ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>

                  {/* Email Concierge */}
                  <div className="flex items-start justify-between gap-4 py-2 border-b border-[#2B1B12]/10">
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase block mb-0.5">
                        EMAIL CONCIERGE
                      </span>
                      <a 
                        href="mailto:lovencoffee2@gmail.com" 
                        className="text-xs font-medium text-[#2B1B12] hover:text-[#C8681A] transition-colors block truncate"
                      >
                        lovencoffee2@gmail.com
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('lovencoffee2@gmail.com', 'email')}
                      className="text-[11px] font-medium text-[#7A695E] hover:text-[#2B1B12] transition-colors shrink-0 cursor-pointer pt-0.5"
                    >
                      {copiedField === 'email' ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Editorial Quote & Signature at Bottom */}
              <div className="pt-4 border-t border-[#2B1B12]/15">
                <p className="font-['Lora',serif] italic text-base sm:text-lg text-[#2B1B12]/85 leading-snug mb-3">
                  “Great coffee brings people together.”
                </p>
                <div className="flex items-center gap-3 select-none">
                  <span className="font-['Lora',serif] text-sm font-medium tracking-wider text-[#C8681A]">
                    L'OVEN
                  </span>
                  <div className="w-[1px] h-3 bg-[#C8681A]"></div>
                  <span className="text-[10px] font-semibold tracking-[0.22em] text-[#7A695E] uppercase">
                    SPECIALTY COFFEE &amp; MORE
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column (lg:col-span-7): Clean Editorial Contact Form */}
            <div className="lg:col-span-7 bg-[#FFFFFF] p-6 sm:p-10 lg:p-12 border border-[#2B1B12]/15 shadow-2xs text-left" data-aos="fade-up" data-aos-delay="100">
              
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C8681A] uppercase">
                    SEND A NOTE
                  </p>
                  <div className="w-8 h-[1px] bg-[#C8681A]"></div>
                </div>
                <h3 className="font-['Lora',serif] text-2xl sm:text-3xl lg:text-[34px] font-normal leading-[1.15] text-[#2B1B12] mb-3">
                  How Can We Help You Today?
                </h3>
                <p className="text-xs sm:text-[13.5px] leading-[1.75] text-[#5A4538] font-normal">
                  Fill out the form below and our team will get back to you promptly.
                </p>
              </div>

              {/* Topic Pills */}
              <div className="mb-6">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#7A695E] uppercase block mb-2">
                  SELECT A TOPIC
                </span>
                <div className="flex flex-wrap gap-2">
                  {INQUIRY_CATEGORIES.map(cat => {
                    const isSelected = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`text-xs px-3 py-1.5 transition-colors cursor-pointer border ${
                          isSelected
                            ? 'bg-[#2B1B12] text-[#FFF4E6] border-[#2B1B12]'
                            : 'bg-[#FAF5EE] text-[#2B1B12] border-[#2B1B12]/20 hover:border-[#C8681A]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form or Inline Confirmation */}
              {formStatus === 'success' ? (
                <div 
                  className="bg-[#FAF5EE] border border-[#2B1B12]/15 p-8 sm:p-10 text-center space-y-4"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-12 h-12 rounded-full bg-[#2B1B12] text-[#FFF4E6] flex items-center justify-center text-xl mx-auto">
                    ✓
                  </div>
                  <h4 className="font-['Lora',serif] text-2xl text-[#2B1B12] font-normal">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5A4538] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#2B1B12]">{formData.name || 'Friend'}</strong>. Our hospitality desk has received your note regarding <span className="font-semibold text-[#2B1B12]">{formData.subject}</span> and will respond to <span className="font-semibold text-[#2B1B12]">{formData.email}</span> shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#C8681A] uppercase border-b border-[#C8681A] pb-0.5 hover:text-[#2B1B12] hover:border-[#2B1B12] transition-colors cursor-pointer"
                    >
                      <span>← SEND ANOTHER MESSAGE</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                        Full Name <span className="text-[#C8681A]">*</span>
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
                        className={`w-full text-xs py-3 px-3.5 bg-[#FAF5EE] border text-[#2B1B12] placeholder:text-[#9C8270] focus:bg-white focus:outline-none transition-colors ${
                          errors.name 
                            ? 'border-rose-500' 
                            : 'border-[#2B1B12]/20 focus:border-[#C8681A]'
                        }`}
                      />
                      {errors.name && (
                        <span id="contact-name-error" role="alert" className="text-[11px] text-rose-700 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                        Email Address <span className="text-[#C8681A]">*</span>
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
                        className={`w-full text-xs py-3 px-3.5 bg-[#FAF5EE] border text-[#2B1B12] placeholder:text-[#9C8270] focus:bg-white focus:outline-none transition-colors ${
                          errors.email 
                            ? 'border-rose-500' 
                            : 'border-[#2B1B12]/20 focus:border-[#C8681A]'
                        }`}
                      />
                      {errors.email && (
                        <span id="contact-email-error" role="alert" className="text-[11px] text-rose-700 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Preferred Reply Method */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                        Phone / WhatsApp <span className="text-[#7A695E] font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+256 700 000 000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full text-xs py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] placeholder:text-[#9C8270] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors"
                      />
                    </div>

                    <div>
                      <span id="contact-reply-label" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                        Preferred Reply
                      </span>
                      <div 
                        role="radiogroup" 
                        aria-labelledby="contact-reply-label"
                        className="flex border border-[#2B1B12]/20 p-0.5 bg-[#FAF5EE]"
                      >
                        {[
                          { id: 'email', label: 'Email' },
                          { id: 'phone', label: 'Phone' },
                          { id: 'whatsapp', label: 'WhatsApp' }
                        ].map(item => {
                          const isSelected = preferredContact === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setPreferredContact(item.id)}
                              className={`flex-1 text-[11px] font-medium py-2 transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#2B1B12] text-[#FFF4E6]'
                                  : 'text-[#5A4538] hover:text-[#2B1B12]'
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                      Subject / Topic <span className="text-[#C8681A]">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="e.g. Table reservation for 4, Wholesale pricing inquiry..."
                      value={formData.subject}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      className={`w-full text-xs py-3 px-3.5 bg-[#FAF5EE] border text-[#2B1B12] placeholder:text-[#9C8270] focus:bg-white focus:outline-none transition-colors ${
                        errors.subject 
                          ? 'border-rose-500' 
                          : 'border-[#2B1B12]/20 focus:border-[#C8681A]'
                      }`}
                    />
                    {errors.subject && (
                      <span id="contact-subject-error" role="alert" className="text-[11px] text-rose-700 mt-1 block">
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                      Your Message <span className="text-[#C8681A]">*</span>
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
                      className={`w-full min-h-[140px] resize-y text-xs py-3 px-3.5 bg-[#FAF5EE] border text-[#2B1B12] placeholder:text-[#9C8270] leading-relaxed focus:bg-white focus:outline-none transition-colors ${
                        errors.message 
                          ? 'border-rose-500' 
                          : 'border-[#2B1B12]/20 focus:border-[#C8681A]'
                      }`}
                    />
                    {errors.message && (
                      <span id="contact-message-error" role="alert" className="text-[11px] text-rose-700 mt-1 block">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Inline API Error Alert */}
                  {formStatus === 'error' && (
                    <div 
                      role="alert" 
                      aria-live="assertive"
                      className="p-3.5 bg-rose-50 border border-rose-300 text-rose-900 text-xs"
                    >
                      <p className="font-semibold mb-0.5">Unable to deliver message</p>
                      <p className="text-[11px] text-rose-800">
                        {apiError || 'Something went wrong while sending your message. Please try again or contact us directly.'}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="group w-full py-4 px-6 text-xs font-bold uppercase tracking-[0.22em] bg-[#2B1B12] hover:bg-[#C8681A] disabled:bg-[#7A695E] text-[#FFF4E6] transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-[#FFF4E6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>SENDING...</span>
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
                  </div>

                  <p className="text-[11px] text-[#7A695E] text-center font-light pt-1">
                    We respect your privacy. Your details are kept strictly confidential.
                  </p>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* 3. The Flagship Experience Section - Editorial Narrative & Photography (Matches Our Story Chapter 03 / Section 1) */}
      <section className="bg-[#F7F2EA] text-[#2B1B12] py-16 sm:py-24 lg:py-28 border-t border-[#2B1B12]/15">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Left: Narrative */}
            <div className="lg:col-span-6 space-y-4 text-left" data-aos="fade-up">
              <div className="flex items-center gap-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C8681A] uppercase">
                  THE FLAGSHIP ROASTERY
                </span>
                <div className="w-8 h-[1px] bg-[#C8681A]"></div>
              </div>

              <h2 className="font-['Lora',serif] text-3xl sm:text-4xl lg:text-[46px] font-normal leading-[1.12] text-[#2B1B12] tracking-tight">
                Visit Us in Person for<br />
                Artisan Bakes &amp; Espresso.
              </h2>

              <p className="text-sm sm:text-base text-[#5A4538] font-light leading-relaxed">
                Step into a warm ambiance filled with the aroma of micro-roasted Ethiopian coffee beans and classic butter pastries. Complimentary high-speed Wi-Fi and quiet garden corners make L'Oven your morning rendezvous spot or remote workspace.
              </p>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Kitende,Uganda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 py-1 text-xs sm:text-sm font-bold tracking-[0.22em] text-[#C8681A] uppercase transition-colors duration-200 hover:text-[#2B1B12]"
                >
                  <span>GET DIRECTIONS ON GOOGLE MAPS</span>
                  <span className="text-base transform group-hover:translate-x-1.5 transition-transform duration-200">→</span>
                </a>
                <div className="w-56 h-[1px] bg-[#C8681A]/60 mt-0.5"></div>
              </div>
            </div>

            {/* Right: Authentic Photograph Frame */}
            <div className="lg:col-span-6" data-aos="fade-up" data-aos-delay="100">
              <div className="w-full h-[260px] sm:h-[340px] md:h-[400px] overflow-hidden bg-[#EFE8DD] shadow-sm">
                <img
                  src={cozyCoffee}
                  alt="L'Oven warm café atmosphere in Kitende"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Minimalist FAQ Section - Hairline Editorial Accordion (Matches Our Story Manifesto) */}
      <section className="bg-[#FAF5EE] text-[#2B1B12] py-16 sm:py-24 lg:py-28 border-t border-[#2B1B12]/15">
        <div className="max-w-[1040px] mx-auto px-5 sm:px-8 lg:px-12 text-left">
          
          <div className="max-w-xl mb-10 sm:mb-14" data-aos="fade-up">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C8681A] uppercase">
                QUICK ANSWERS
              </span>
              <div className="w-8 h-[1px] bg-[#C8681A]"></div>
            </div>
            <h2 className="font-['Lora',serif] text-3xl sm:text-4xl lg:text-[42px] font-normal leading-tight text-[#2B1B12] mb-3 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#5A4538] font-light leading-relaxed">
              Everything you need to know about reservations, catering, and our roasting schedules.
            </p>
          </div>

          {/* Clean Hairline Accordion List */}
          <div className="border-t border-[#2B1B12]/15" data-aos="fade-up">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-[#2B1B12]/15 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left py-5 sm:py-6 flex items-center justify-between gap-6 cursor-pointer focus:outline-none"
                  >
                    <span className="font-['Lora',serif] text-base sm:text-lg font-medium text-[#2B1B12]">
                      {faq.question}
                    </span>
                    <span className="text-sm font-light text-[#C8681A] transition-transform duration-200">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-6 text-xs sm:text-[13.5px] leading-[1.75] text-[#5A4538] font-normal max-w-2xl">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
