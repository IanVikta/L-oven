import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { couponService } from '../services/couponService';
import { isPricingFinalized, formatCurrency } from '../utils/currency';

// High-end approved photography from frontend/src/assets/coffee high end/
import emptyCartHero from '../assets/coffee high end/Golden Hour Magic_ a Perfect Shot of Coffee Art 🍫☕📸.jpg';
import latteArtThumb from '../assets/coffee high end/130956301659872151.jpg';
import flatWhiteThumb from '../assets/coffee high end/254171972718602478.jpg';
import espressoThumb from '../assets/coffee high end/Italian coffee.jpg';
import coldBrewThumb from '../assets/coffee high end/Cozy Coffee Experience_ Specialty Coffee Beans  Warm Ambiance.jpg';
import defaultCoffeeThumb from '../assets/coffee high end/Coffe.jpg';

/**
 * Resolves high-resolution thumbnail strictly from the approved coffee high end collection
 */
const getItemThumbnail = (item) => {
  if (item?.image_url) return item.image_url;
  const name = (item?.name || '').toLowerCase();
  const slug = (item?.slug || '').toLowerCase();

  if (name.includes('flat white') || slug.includes('flat-white')) {
    return flatWhiteThumb;
  }
  if (
    name.includes('latte') ||
    slug.includes('latte') ||
    name.includes('cappuccino') ||
    slug.includes('cappuccino')
  ) {
    return latteArtThumb;
  }
  if (name.includes('espresso') || slug.includes('espresso')) {
    return espressoThumb;
  }
  if (
    name.includes('cold') ||
    name.includes('brew') ||
    slug.includes('cold-brew')
  ) {
    return coldBrewThumb;
  }
  return defaultCoffeeThumb;
};

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);

  // Delivery fee handling
  const deliveryFee = isPricingFinalized() ? 3000 : 0;
  const discountAmount = appliedCoupon ? appliedCoupon.discount_amount : 0;
  const calculatedTotal = isPricingFinalized()
    ? Math.max(0, cartTotal + deliveryFee - discountAmount)
    : 0;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponError('');
    setCouponLoading(true);

    try {
      const res = await couponService.validateCoupon(
        couponCode.trim(),
        cartTotal
      );
      setAppliedCoupon(res.coupon);
    } catch (err) {
      setAppliedCoupon(null);
      setCouponError(err.response?.data?.message || 'Invalid promo code');
    } finally {
      setCouponLoading(false);
    }
  };

  /* ==========================================================================
     OPTION 1: EMPTY CART VIEW
     ========================================================================== */
  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-[calc(100vh-80px)] flex flex-col justify-between py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="w-5 h-[2px] bg-[#F28C13]"
                  aria-hidden="true"
                ></span>
                <span className="text-[11px] sm:text-xs tracking-[0.22em] uppercase font-semibold text-[#2B1B12]/80">
                  YOUR ORDER
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.12] text-[#2B1B12] mb-6">
                Nothing here yet.
              </h1>

              {/* Supporting Copy */}
              <p className="font-sans text-base sm:text-lg text-[#2B1B12]/70 max-w-lg mb-8 leading-relaxed">
                Your next coffee and something freshly baked are waiting.
              </p>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => navigate('/menu')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#F28C13] hover:bg-[#d97706] text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase rounded transition-colors duration-150 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2]"
              >
                <span>EXPLORE THE MENU</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* Right Photography Column */}
            <div className="lg:col-span-5 w-full">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-[#2B1B12]/10 shadow-sm bg-[#EFE9DF]">
                <img
                  src={emptyCartHero}
                  alt="Artisanal L'Oven coffee with delicate heart latte art and morning sunlight"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Supporting Editorial Statements Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-[#2B1B12]/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Statement 1 */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#2B1B12]/5 text-[#2B1B12] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v18m-6-6l6 6 6-6M9 6a3 3 0 116 0 3 3 0 01-6 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-[#2B1B12]">
                  PREMIUM INGREDIENTS
                </p>
                <p className="text-xs text-[#2B1B12]/60 mt-0.5">
                  Quality you can taste
                </p>
              </div>
            </div>

            {/* Statement 2 */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#2B1B12]/5 text-[#2B1B12] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V3m0 0a9.004 9.004 0 018.716 6.747M12 3a9.004 9.004 0 00-8.716 6.747"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-[#2B1B12]">
                  FRESHLY BAKED
                </p>
                <p className="text-xs text-[#2B1B12]/60 mt-0.5">
                  Every day, always
                </p>
              </div>
            </div>

            {/* Statement 3 */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#2B1B12]/5 text-[#2B1B12] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 1v3m4-3v3m4-3v3"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-[#2B1B12]">
                  GREAT COFFEE
                </p>
                <p className="text-xs text-[#2B1B12]/60 mt-0.5">
                  For every moment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================================
     OPTION 2: POPULATED CART WITH ITEMS
     ========================================================================== */
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2.5 mb-2">
            <span
              className="w-5 h-[2px] bg-[#F28C13]"
              aria-hidden="true"
            ></span>
            <span className="text-[11px] sm:text-xs tracking-[0.22em] uppercase font-semibold text-[#2B1B12]/80">
              YOUR ORDER
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-[#2B1B12]/10 pb-5">
            <h1 className="font-display font-normal text-3xl sm:text-4xl text-[#2B1B12]">
              Cart
            </h1>
            <Link
              to="/menu"
              className="text-xs sm:text-sm font-sans text-[#2B1B12]/75 hover:text-[#F28C13] transition-colors inline-flex items-center gap-1.5 font-medium"
            >
              <span>Continue Shopping</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Main Grid: Products Table + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Product List */}
          <div className="lg:col-span-8">
            {/* Desktop Table Column Headers */}
            <div className="hidden sm:grid sm:grid-cols-12 text-[11px] tracking-[0.18em] uppercase text-[#2B1B12]/50 font-semibold border-b border-[#2B1B12]/10 pb-3">
              <div className="col-span-7">ITEM</div>
              <div className="col-span-3 text-center">QUANTITY</div>
              <div className="col-span-2 text-right">PRICE</div>
            </div>

            {/* Products Rows */}
            <div className="divide-y divide-[#2B1B12]/10">
              {cartItems.map((item, index) => {
                const thumbnail = getItemThumbnail(item);
                const lineTotal = item.unitPrice * item.quantity;

                return (
                  <div
                    key={item.cartKey || index}
                    className="py-5 sm:py-6 flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-4"
                  >
                    {/* Item Information */}
                    <div className="sm:col-span-7 flex items-start gap-4">
                      {/* Product Thumbnail */}
                      <img
                        src={thumbnail}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#2B1B12]/10 flex-shrink-0 bg-[#EFE9DF]"
                      />

                      <div className="flex-grow min-w-0 pr-2">
                        <h2 className="font-display font-medium text-base sm:text-lg text-[#2B1B12] leading-snug truncate">
                          {item.name}
                        </h2>

                        {/* Variant */}
                        {item.variant_name && (
                          <p className="text-xs text-[#2B1B12]/60 mt-0.5">
                            {item.variant_name}
                          </p>
                        )}

                        {/* Selected Options */}
                        {item.options && item.options.length > 0 && (
                          <p className="text-xs text-[#2B1B12]/60 mt-0.5">
                            {item.options
                              .map((opt) =>
                                isPricingFinalized() && opt.price_modifier > 0
                                  ? `+ ${opt.name}`
                                  : opt.name
                              )
                              .join(', ')}
                          </p>
                        )}

                        {/* Optional Notes */}
                        {item.item_notes && (
                          <p className="text-xs italic text-[#2B1B12]/50 mt-1">
                            Note: "{item.item_notes}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="sm:col-span-3 flex items-center justify-between sm:justify-center gap-3">
                      {/* Minimalist Quantity Control: [ - 1 + ] */}
                      <div className="inline-flex items-center border border-[#2B1B12]/20 rounded bg-[#FAF7F2] overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          aria-label={`Decrease quantity for ${item.name}`}
                          className="w-8 h-8 flex items-center justify-center text-sm text-[#2B1B12]/70 hover:text-[#2B1B12] hover:bg-[#2B1B12]/5 transition-colors focus:outline-none focus-visible:bg-[#2B1B12]/10"
                        >
                          −
                        </button>
                        <span
                          className="w-8 text-center text-xs font-semibold text-[#2B1B12] select-none"
                          aria-label={`Quantity: ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          aria-label={`Increase quantity for ${item.name}`}
                          className="w-8 h-8 flex items-center justify-center text-sm text-[#2B1B12]/70 hover:text-[#2B1B12] hover:bg-[#2B1B12]/5 transition-colors focus:outline-none focus-visible:bg-[#2B1B12]/10"
                        >
                          +
                        </button>
                      </div>

                      {/* Understated Trash/Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(index)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="text-[#2B1B12]/40 hover:text-red-700 transition-colors p-1.5 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-red-500"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Line Price */}
                    <div className="sm:col-span-2 text-right flex sm:block items-center justify-between pt-1 sm:pt-0">
                      <span className="sm:hidden text-xs text-[#2B1B12]/50 font-medium uppercase tracking-wider">
                        Price
                      </span>
                      <span className="font-sans font-semibold text-sm sm:text-base text-[#2B1B12]">
                        {formatCurrency(lineTotal, {
                          allowUnfinalized: true,
                          unfinalizedText: 'Price to be confirmed',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#2B1B12]/10">
              <Link
                to="/menu"
                className="text-xs font-medium text-[#2B1B12]/70 hover:text-[#F28C13] transition-colors inline-flex items-center gap-1.5"
              >
                <span aria-hidden="true">←</span>
                <span>Continue Shopping</span>
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-[#2B1B12]/50 hover:text-red-600 transition-colors font-medium"
              >
                Clear Entire Cart
              </button>
            </div>

            {/* Unfinalized Pricing Warning Banner */}
            {!isPricingFinalized() && (
              <div className="mt-8 p-4 rounded-lg bg-[#FFF4E6] border border-[#F28C13]/30 flex items-center gap-3 text-xs sm:text-sm text-[#2B1B12]/85">
                <svg
                  className="w-5 h-5 text-[#F28C13] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M12 16v-4m0-4h.01" />
                </svg>
                <span>
                  Ordering is temporarily unavailable while menu pricing is being finalized.
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-[#FAF7F2] border border-[#2B1B12]/15 rounded-xl p-6 sm:p-7 shadow-[0_2px_8px_rgba(43,27,18,0.04)]">
              <h2 className="text-xs tracking-[0.2em] font-bold text-[#2B1B12] uppercase mb-6 pb-3 border-b border-[#2B1B12]/10">
                ORDER SUMMARY
              </h2>

              {/* Subtotal */}
              <div className="space-y-3.5 text-sm">
                <div className="flex items-center justify-between text-[#2B1B12]/80">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2B1B12]">
                    {formatCurrency(cartTotal, {
                      allowUnfinalized: true,
                      unfinalizedText: 'Price to be confirmed',
                    })}
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex items-center justify-between text-[#2B1B12]/80">
                  <span>Delivery</span>
                  <span className="font-semibold text-[#2B1B12]">
                    {isPricingFinalized()
                      ? formatCurrency(deliveryFee, { allowUnfinalized: false })
                      : 'To be confirmed'}
                  </span>
                </div>

                {/* Promo Code Discount if applied */}
                {appliedCoupon && isPricingFinalized() && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>
                      -{formatCurrency(discountAmount, { allowUnfinalized: false })}
                    </span>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-[#2B1B12]/15 pt-4 mt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display font-medium text-lg text-[#2B1B12]">
                      Total
                    </span>
                    <span className="font-display font-bold text-xl sm:text-2xl text-[#2B1B12]">
                      {isPricingFinalized()
                        ? formatCurrency(calculatedTotal, { allowUnfinalized: false })
                        : 'To be confirmed'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Optional Minimalist Promo Code Toggle */}
              <div className="mt-6 pt-4 border-t border-[#2B1B12]/10">
                {!showPromoInput && !appliedCoupon && (
                  <button
                    type="button"
                    onClick={() => setShowPromoInput(true)}
                    className="text-xs text-[#2B1B12]/60 hover:text-[#F28C13] transition-colors font-medium flex items-center gap-1"
                  >
                    <span>+ Have a promo code?</span>
                  </button>
                )}

                {showPromoInput && !appliedCoupon && (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-grow px-3 py-1.5 text-xs uppercase bg-white border border-[#2B1B12]/20 rounded focus:outline-none focus:border-[#F28C13]"
                      />
                      <button
                        type="submit"
                        disabled={couponLoading || !couponCode.trim()}
                        className="px-3 py-1.5 bg-[#2B1B12] text-white text-xs font-medium rounded hover:bg-[#3d271a] disabled:opacity-50 transition-colors"
                      >
                        {couponLoading ? '...' : 'Apply'}
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-red-600 font-medium">
                        {couponError}
                      </p>
                    )}
                  </form>
                )}

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded border border-emerald-200">
                    <span>✓ Code applied: {appliedCoupon.code}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponCode('');
                      }}
                      className="text-red-500 hover:underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                disabled={!isPricingFinalized()}
                className={`w-full py-4 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded transition-all duration-150 mt-6 flex items-center justify-center gap-2 ${
                  !isPricingFinalized()
                    ? 'bg-[#2B1B12]/10 text-[#2B1B12]/40 cursor-not-allowed border border-[#2B1B12]/10'
                    : 'bg-[#F28C13] hover:bg-[#d97706] text-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C13]'
                }`}
              >
                <span>PROCEED TO CHECKOUT</span>
                <span aria-hidden="true">→</span>
              </button>

              {/* Secure Checkout Trust Note */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#2B1B12]/50 mt-3.5">
                <svg
                  className="w-3.5 h-3.5 text-[#2B1B12]/50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
