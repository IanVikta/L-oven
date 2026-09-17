import croissantDisplay from '../assets/candidate1.jpg';
import croissantItem from '../assets/cand_croissant2.jpg';
import signatureLatteImg from '../assets/coffee high end/254171972718602478.jpg';
import flatWhiteImg from '../assets/coffee high end/Coffe.jpg';
import coffeeTripleImg from '../assets/coffee high end/COFFEE.jpg';
import avocadoToastImg from '../assets/cand_c2.jpg';
import defaultFallback from '../assets/cand_croissant_cup.jpg';

const FALLBACK_BY_SLUG = {
  'almond-chocolate-pain-au-chocolat': croissantDisplay,
  'butter-croissant': croissantItem,
  'flat-white': flatWhiteImg,
  'loven-signature-latte': signatureLatteImg,
  'sourdough-avocado-toast': avocadoToastImg,
  'vanilla-cold-brew': coffeeTripleImg,
};

/**
 * Resolves product image with a strict fallback chain:
 * 1. Backend image_url
 * 2. Backend image
 * 3. Approved L'Oven photographic asset matched by slug
 * 4. Approved L'Oven photographic asset matched by category
 * 5. Neutral editorial default fallback
 */
export const getProductImage = (product) => {
  if (product?.image_url) return product.image_url;
  if (product?.image) return product.image;
  if (product?.slug && FALLBACK_BY_SLUG[product.slug]) {
    return FALLBACK_BY_SLUG[product.slug];
  }
  const catSlug = product?.category?.slug || '';
  if (catSlug.includes('bakery') || catSlug.includes('pastr')) return croissantDisplay;
  if (catSlug.includes('cold') || catSlug.includes('drink')) return coffeeTripleImg;
  if (catSlug.includes('espresso') || catSlug.includes('coffee')) return signatureLatteImg;
  if (catSlug.includes('sandwich') || catSlug.includes('toast')) return avocadoToastImg;
  return defaultFallback;
};

export default getProductImage;

