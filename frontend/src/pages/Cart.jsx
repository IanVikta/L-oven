import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { couponService } from '../services/couponService';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponError('');
    setCouponLoading(true);

    try {
      const res = await couponService.validateCoupon(couponCode.trim(), cartTotal);
      setAppliedCoupon(res.coupon);
    } catch (err) {
      setAppliedCoupon(null);
      setCouponError(err.response?.data?.message || 'Invalid promo code');
    } finally {
      setCouponLoading(false);
    }
  };

  const discountAmount = appliedCoupon ? appliedCoupon.discount_amount : 0.00;
  const totalAmount = Math.max(0, cartTotal - discountAmount);

  if (cartItems.length === 0) {
    return (
      <div className="bg-cream-100 min-h-screen py-16">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-amber-100">
            <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              🛒
            </div>
            <h2 className="text-2xl font-display font-bold text-brown-900 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-brown-700 text-sm mb-6">
              Looks like you haven't added any coffees, drinks, or pastries yet.
            </p>
            <button onClick={() => navigate('/menu')} className="btn btn-primary">
              Browse Menu →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-brown-900 mb-8">
          Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Item List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.cartKey}
                className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-amber-100"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl font-bold">
                      ☕
                    </div>
                  )}

                  <div>
                    <h3 className="font-display font-bold text-brown-900 text-base">
                      {item.name}
                    </h3>
                    {item.variant_name && (
                      <div className="text-xs text-orange-700 font-medium">
                        Size: {item.variant_name}
                      </div>
                    )}
                    {item.options && item.options.length > 0 && (
                      <div className="text-xs text-brown-500 mt-0.5">
                        Options:{' '}
                        {item.options
                          .map((o) => `${o.name} (+$${o.price_modifier.toFixed(2)})`)
                          .join(', ')}
                      </div>
                    )}
                    {item.item_notes && (
                      <div className="text-xs italic text-brown-400 mt-0.5">
                        Note: "{item.item_notes}"
                      </div>
                    )}
                    <div className="text-xs font-semibold text-brown-700 mt-1">
                      Unit Price: ${item.unitPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                  <div className="flex items-center border border-gray-300 rounded-lg bg-cream-50">
                    <button
                      onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                      className="px-2.5 py-1 text-brown-700 hover:bg-gray-200 rounded-l-lg font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-brown-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                      className="px-2.5 py-1 text-brown-700 hover:bg-gray-200 rounded-r-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-brown-900 text-base">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartKey)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={clearCart}
                className="text-xs text-red-600 hover:underline font-semibold"
              >
                Clear Entire Cart
              </button>
              <button
                onClick={() => navigate('/menu')}
                className="text-xs text-orange-600 hover:underline font-semibold"
              >
                + Add More Items
              </button>
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 h-fit space-y-6">
            <h2 className="text-xl font-display font-bold text-brown-900 pb-3 border-b border-amber-100">
              Order Summary
            </h2>

            {/* Promo Code Box */}
            <div>
              <label className="block text-xs font-bold text-brown-700 mb-1">
                Have a Promo Code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. LOVEN10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="input text-xs uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponLoading || !couponCode.trim()}
                  className="btn btn-secondary text-xs px-3 py-2 shrink-0"
                >
                  {couponLoading ? '...' : 'Apply'}
                </button>
              </div>

              {appliedCoupon && (
                <div className="text-xs text-emerald-600 mt-2 font-semibold flex justify-between items-center bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  <span>✓ Promo applied: {appliedCoupon.code}</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              {couponError && (
                <div className="text-xs text-red-600 mt-1 font-medium">{couponError}</div>
              )}
            </div>

            <div className="space-y-3 text-sm text-brown-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="text-xs text-brown-500">
                * Delivery fee will be calculated at checkout based on fulfilment type.
              </div>
              <div className="pt-3 border-t border-amber-100 flex justify-between text-lg font-bold text-brown-900">
                <span>Total</span>
                <span className="text-orange-600">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary w-full py-3 font-semibold shadow-lg"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
