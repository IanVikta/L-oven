import croissant1 from '../assets/cand_croissant1.jpg';
import croissant2 from '../assets/cand_croissant2.jpg';
import latteArt from '../assets/cand_latte_art.jpg';
import coffeeArt from '../assets/cand_coffee_art.jpg';
import toastImg from '../assets/cand_pastry_coffee.jpg';
import coldBrewImg from '../assets/cand_table_coffee1.jpg';
import defaultFallback from '../assets/cand_croissant_cup.jpg';

const FALLBACK_BY_SLUG = {
  'almond-chocolate-pain-au-chocolat': croissant1,
  'butter-croissant': croissant2,
  'flat-white': coffeeArt,
  'loven-signature-latte': latteArt,
  'sourdough-avocado-toast': toastImg,
  'vanilla-cold-brew': coldBrewImg,
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
  if (catSlug.includes('bakery') || catSlug.includes('pastr')) return croissant1;
  if (catSlug.includes('espresso') || catSlug.includes('coffee')) return latteArt;
  if (catSlug.includes('cold') || catSlug.includes('drink')) return coldBrewImg;
  return defaultFallback;
};

export default getProductImage;
