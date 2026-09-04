/**
 * L'Oven Currency & Monetary Presentation Utility
 *
 * Central source of truth for currency presentation across the customer experience.
 * Separates customer-facing presentation from underlying business calculations.
 */

// Controls whether client-approved production pricing has been migrated and finalized.
// When false: customer-facing price tags show "Price to be confirmed" rather than exposing
// unapproved template numbers or guessing currency conversions.
// When true: displays finalized UGX amounts (e.g., "UGX 16,000").
export const PRICING_FINALIZED = true;

export const isPricingFinalized = () => PRICING_FINALIZED;

/**
 * Format a numeric monetary amount for customer presentation.
 *
 * @param {number|string} amount - Raw numeric value from data layer
 * @param {Object} options
 * @param {boolean} [options.allowUnfinalized=true] - If true and PRICING_FINALIZED is false, returns placeholder text
 * @param {string} [options.unfinalizedText='Price to be confirmed'] - Custom placeholder text
 * @returns {string} Clean formatted currency string
 */
export const formatCurrency = (amount, options = {}) => {
  const {
    allowUnfinalized = true,
    unfinalizedText = 'Price to be confirmed',
  } = options;

  if (allowUnfinalized && !PRICING_FINALIZED) {
    return unfinalizedText;
  }

  if (amount === undefined || amount === null || amount === '') {
    return '';
  }

  const num = typeof amount === 'number' ? amount : parseFloat(amount);
  if (isNaN(num)) {
    return String(amount);
  }

  // Final UGX currency formatting (standard integer format with thousands separators)
  return `UGX ${Math.round(num).toLocaleString('en-US')}`;
};

/**
 * Convenience helper specifically for product cards / editorial displays.
 * In unfinalized mode, returns a clean editorial note such as 'Price to be confirmed'.
 */
export const formatProductPrice = (price) => {
  return formatCurrency(price, {
    allowUnfinalized: true,
    unfinalizedText: 'Price to be confirmed',
  });
};

/**
 * Internal helper for development / admin inspection where raw template values are displayed.
 */
export const formatDevelopmentAmount = (amount) => {
  const num = typeof amount === 'number' ? amount : parseFloat(amount);
  if (isNaN(num)) return String(amount);
  return `$${num.toFixed(2)}`;
};

export default {
  PRICING_FINALIZED,
  isPricingFinalized,
  formatCurrency,
  formatProductPrice,
  formatDevelopmentAmount,
};
