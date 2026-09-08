/**
 * L'Oven Currency & Monetary Presentation Utility
 *
 * Official Business Currency: UGANDAN SHILLINGS (UGX) ONLY.
 *
 * Central source of truth for currency presentation across the customer experience.
 * There is no multi-currency conversion, USD support, or exchange-rate API.
 */

// Controls whether official client-approved production pricing has been finalized.
// When false: customer-facing price tags show "Price to be confirmed" rather than exposing
// unapproved template numbers or guessing currency conversions.
// When true: displays finalized UGX amounts (e.g., "UGX 16,000").
export const PRICING_FINALIZED =
  import.meta.env?.VITE_PRICING_FINALIZED !== undefined
    ? import.meta.env.VITE_PRICING_FINALIZED === 'true'
    : true;

export const isPricingFinalized = () => PRICING_FINALIZED;

/**
 * Format a numeric monetary amount for customer presentation in UGX.
 *
 * @param {number|string} amount - Raw numeric value in UGX
 * @param {Object} options
 * @param {boolean} [options.allowUnfinalized=true] - If true and PRICING_FINALIZED is false, returns placeholder text
 * @param {string} [options.unfinalizedText='Price to be confirmed'] - Custom placeholder text
 * @returns {string} Clean formatted UGX string (e.g., "UGX 16,000") or unfinalized placeholder
 */
export const formatCurrency = (amount, options = {}) => {
  const {
    allowUnfinalized = true,
    unfinalizedText = 'Price to be confirmed',
  } = options;

  if (allowUnfinalized && !isPricingFinalized()) {
    return unfinalizedText;
  }

  if (amount === undefined || amount === null || amount === '') {
    return '';
  }

  const num = typeof amount === 'number' ? amount : parseFloat(amount);
  if (isNaN(num)) {
    return String(amount);
  }

  // Official UGX formatting: whole integer with standard thousands separator
  return `UGX ${Math.round(num).toLocaleString('en-US')}`;
};

/**
 * Convenience helper for product cards / catalog listings.
 * In unfinalized mode, returns a clean editorial note: 'Price to be confirmed'.
 */
export const formatProductPrice = (price) => {
  return formatCurrency(price, {
    allowUnfinalized: true,
    unfinalizedText: 'Price to be confirmed',
  });
};

/**
 * Formats variant and option price modifiers.
 * In unfinalized mode, returns empty string so placeholder dollar numbers are never displayed.
 */
export const formatModifierPrice = (modifier) => {
  if (!isPricingFinalized()) {
    return '';
  }

  const num = parseFloat(modifier) || 0;
  if (num > 0) {
    return `+ ${formatCurrency(num, { allowUnfinalized: false })}`;
  }
  if (num < 0) {
    return `- ${formatCurrency(Math.abs(num), { allowUnfinalized: false })}`;
  }
  return 'Standard';
};

export default {
  PRICING_FINALIZED,
  isPricingFinalized,
  formatCurrency,
  formatProductPrice,
  formatModifierPrice,
};
