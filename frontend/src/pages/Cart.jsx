import { Link, useNavigate } from 'react';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const taxAmount = cartTotal * 0.08; // 8% Tax

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
            <Link to="/menu" className="btn btn-primary w-full py-3">
              Explore Our Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brown-900">
            Your Order Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-xs text-red-600 hover:text-red-800 font-semibold underline"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm border border-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-display font-bold text-brown-900">
                      {item.name}
                    </h3>
                    {item.variant_name && (
                      <span className="bg-amber-100 text-brown-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.variant_name}
                      </span>
                    )}
                  </div>

                  {/* Selected Options Pills */}
                  {item.options && item.options.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.options.map((opt, idx) => (
                        <span
                          key={idx}
                          className="bg-cream-200 text-brown-800 text-[11px] px-2 py-0.5 rounded"
                        >
                          {opt.groupName}: <strong className="font-semibold">{opt.name}</strong>
                          {opt.priceModifier > 0 && ` (+$${opt.priceModifier.toFixed(2)})`}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.item_notes && (
                    <p className="text-xs text-orange-600 italic mt-1.5">
                      Note: "{item.item_notes}"
                    </p>
                  )}

                  <div className="text-xs text-brown-500 mt-2">
                    Unit Price: ${item.unitPrice.toFixed(2)}
                  </div>
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="px-2.5 py-1 text-brown-700 hover:bg-gray-100 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-brown-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="px-2.5 py-1 text-brown-700 hover:bg-gray-100 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-brown-900">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-[11px] text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 h-fit">
            <h2 className="text-xl font-display font-bold text-brown-900 mb-4 pb-3 border-b border-amber-100">
              Summary
            </h2>

            <div className="space-y-3 text-sm text-brown-700 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="text-xs text-brown-500">
                * Delivery fee will be calculated at checkout based on fulfilment type.
              </div>
              <div className="pt-3 border-t border-amber-100 flex justify-between text-lg font-bold text-brown-900">
                <span>Total</span>
                <span className="text-orange-600">${(cartTotal + taxAmount).toFixed(2)}</span>
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
