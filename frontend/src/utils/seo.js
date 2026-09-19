/**
 * L'Oven SEO & Metadata Engine
 * Dynamically synchronizes document title, description, Open Graph,
 * Twitter cards, and canonical links per route.
 */

export const ROUTE_SEO = {
  '/': {
    title: "L'Oven Coffee & Bakery — Artisanal Specialty Coffee & Viennoiserie",
    description: "Handcrafted espresso, single-origin African roasts, and authentic French viennoiserie in Kampala. Order online for table service, curbside takeaway, or doorstep delivery.",
    keywords: "L'Oven coffee, specialty coffee Kampala, artisanal bakery, French croissants, espresso bar, cold brew, single origin coffee roaster, Kampala cafe delivery",
  },
  '/menu': {
    title: "Artisanal Menu & Roasts | L'Oven Coffee & Bakery",
    description: "Explore our specialty roasts, single-origin pour-overs, handcrafted espresso, cold brews, and freshly baked viennoiserie. Customized to your preference.",
    keywords: "coffee menu, espresso drinks, French croissants, artisanal bakery menu, cold brew, Kampala breakfast",
  },
  '/about': {
    title: "Our Heritage & Roastery Story | L'Oven Coffee & Bakery",
    description: "Discover the craftsmanship behind L'Oven Coffee. Ethical sourcing from East African smallholder farmers, micro-batch roasting, and authentic French baking traditions.",
    keywords: "coffee roastery story, ethical coffee sourcing, African coffee farmers, artisanal baking heritage, Kampala roastery",
  },
  '/contact': {
    title: "Contact & Table Reservations | L'Oven Coffee & Bakery",
    description: "Reserve your cafe table, inquire about event catering or wholesale beans, or send our roastery team a note. We would love to hear from you.",
    keywords: "reserve table Kampala cafe, event catering coffee, wholesale coffee beans, contact L'Oven, cafe directions",
  },
  '/cart': {
    title: "Your Selections | L'Oven Coffee & Bakery",
    description: "Review your chosen specialty coffees and handcrafted French pastries before placing your order.",
    keywords: "coffee cart, online order, pastry selection",
  },
  '/checkout': {
    title: "Secure Checkout & Order | L'Oven Coffee & Bakery",
    description: "Complete your order with flexible dine-in, takeaway, or direct delivery options and secure payments.",
    keywords: "checkout, mobile money payment, card payment, cafe order delivery",
  },
  '/orders': {
    title: "Track Your Order | L'Oven Coffee & Bakery",
    description: "Live real-time order tracking and barista preparation status for your L'Oven selections.",
    keywords: "track order, barista preparation stream, delivery tracking",
  },
  '/login': {
    title: "Guest & Member Login | L'Oven Coffee",
    description: "Sign in to access your L'Oven Coffee loyalty rewards, saved delivery addresses, and past orders.",
    keywords: "coffee loyalty login, member account",
  },
  '/register': {
    title: "Join the Roastery Community | L'Oven Coffee",
    description: "Create your L'Oven account to start earning loyalty rewards on every roast and pastry.",
    keywords: "register, loyalty points, roastery member",
  },
  '/profile': {
    title: "Member Profile & Loyalty | L'Oven Coffee",
    description: "Manage your member profile, track roastery loyalty points, and redeem rewards.",
    keywords: "loyalty rewards, coffee profile",
  },
};

export const updateSEO = (pathname) => {
  if (typeof document === 'undefined') return;

  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath.startsWith('/admin')) {
    document.title = "Kitchen & Operations Console | L'Oven Operations";
    return;
  }

  const seoData = ROUTE_SEO[cleanPath] || ROUTE_SEO['/'];

  // 1. Update Title
  document.title = seoData.title;

  // 2. Update Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = seoData.description;

  // 3. Update Keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.content = seoData.keywords;

  // 4. Update OpenGraph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = seoData.title;

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = seoData.description;

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.content = window.location.href;

  // 5. Update Twitter
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.content = seoData.title;

  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.content = seoData.description;

  // 6. Update Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = window.location.origin + (cleanPath === '/' ? '' : cleanPath);
};
