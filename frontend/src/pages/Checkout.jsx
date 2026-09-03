import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { orderService } from '../services/orderService';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fulfilmentType, setFulfilmentType] = useState('dine_in'); // dine_in, takeaway, delivery
  const [customerNotes, setCustomerNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Dine-in fields
  const [tableNumber, setTableNumber] = useState('T-01');
  const [guestCount, setGuestCount] = useState(1);

  // Takeaway fields
  const [vehicleDescription, setVehicleDescription] = useState('');

  // Delivery fields
  const [recipientName, setRecipientName] = useState(user?.name || '');
  const [recipientPhone, setRecipientPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState('');
  const [city] = useState('Kampala');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const deliveryFee = fulfilmentType === 'delivery' ? 3.00 : 0.00;
  const grandTotal = cartTotal + deliveryFee;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setError('');
    setSubmitting(true);

    try {
      // Map cart items for backend payload
      const itemsPayload = cartItems.map((item) => ({
        product_id: item.product_id,
        product_variant_id: item.product_variant_id,
        quantity: item.quantity,
        item_notes: item.item_notes,
        options: item.options ? item.options.map((o) => o.id) : [],
      }));

      const payload = {
        fulfilment_type: fulfilmentType,
        customer_notes: customerNotes,
        payment_method: paymentMethod,
        items: itemsPayload,
      };

      if (fulfilmentType === 'dine_in') {
        payload.table_number = tableNumber;
        payload.guest_count = parseInt(guestCount, 10);
      } else if (fulfilmentType === 'takeaway') {
        payload.vehicle_description = vehicleDescription;
      } else if (fulfilmentType === 'delivery') {
        payload.recipient_name = recipientName;
        payload.recipient_phone = recipientPhone;
        payload.street_address = streetAddress;
        payload.city = city;
        payload.delivery_instructions = deliveryInstructions;
      }

      const res = await orderService.createOrder(payload);
      clearCart();

      if (res.order?.order_number) {
        navigate(`/orders?new_order=${res.order.order_number}`);
      } else {
        navigate('/orders');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setError(
        err.response?.data?.message ||
          'Failed to submit order. Please check form fields and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-cream-100 min-h-screen py-16 text-center">
        <h2 className="text-2xl font-bold text-brown-900 mb-4">No items in cart</h2>
        <button onClick={() => navigate('/menu')} className="btn btn-primary">
          Return to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-brown-900 mb-8 text-center">
          Checkout & Order
        </h1>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Fulfilment Type Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
              <h2 className="text-xl font-display font-bold text-brown-900 mb-4">
                1. Select Order Type
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfilmentType('dine_in')}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    fulfilmentType === 'dine_in'
                      ? 'border-orange-500 bg-orange-50 text-brown-900 font-bold shadow'
                      : 'border-gray-200 text-brown-700 hover:border-amber-200'
                  }`}
                >
                  <div className="text-2xl mb-1">🍽️</div>
                  <div className="text-sm font-semibold">Dine-In</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfilmentType('takeaway')}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    fulfilmentType === 'takeaway'
                      ? 'border-orange-500 bg-orange-50 text-brown-900 font-bold shadow'
                      : 'border-gray-200 text-brown-700 hover:border-amber-200'
                  }`}
                >
                  <div className="text-2xl mb-1">🛍️</div>
                  <div className="text-sm font-semibold">Takeaway</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfilmentType('delivery')}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    fulfilmentType === 'delivery'
                      ? 'border-orange-500 bg-orange-50 text-brown-900 font-bold shadow'
                      : 'border-gray-200 text-brown-700 hover:border-amber-200'
                  }`}
                >
                  <div className="text-2xl mb-1">🛵</div>
                  <div className="text-sm font-semibold">Delivery</div>
                </button>
              </div>

              {/* Fulfilment Conditional Fields */}
              <div className="mt-6 pt-4 border-t border-amber-50">
                {fulfilmentType === 'dine_in' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brown-800 mb-1">
                        Table Number
                      </label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        required
                        className="input text-sm"
                        placeholder="e.g. Table 04"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brown-800 mb-1">
                        Number of Diners
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        required
                        className="input text-sm"
                      />
                    </div>
                  </div>
                )}

                {fulfilmentType === 'takeaway' && (
                  <div>
                    <label className="block text-xs font-bold text-brown-800 mb-1">
                      Vehicle / Arrival Description (Curbside optional)
                    </label>
                    <input
                      type="text"
                      value={vehicleDescription}
                      onChange={(e) => setVehicleDescription(e.target.value)}
                      className="input text-sm"
                      placeholder="e.g. Red Toyota Corolla, Hazing headlights"
                    />
                  </div>
                )}

                {fulfilmentType === 'delivery' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-brown-800 mb-1">
                          Recipient Name
                        </label>
                        <input
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          required
                          className="input text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brown-800 mb-1">
                          Recipient Phone
                        </label>
                        <input
                          type="tel"
                          value={recipientPhone}
                          onChange={(e) => setRecipientPhone(e.target.value)}
                          required
                          className="input text-sm"
                          placeholder="+256 700 000000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brown-800 mb-1">
                        Street Delivery Address
                      </label>
                      <textarea
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        required
                        rows={2}
                        className="input text-sm"
                        placeholder="Plot number, Street name, Building/Apartment..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brown-800 mb-1">
                        Gate / Delivery Instructions
                      </label>
                      <input
                        type="text"
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                        className="input text-sm"
                        placeholder="Ring gate bell, leave at security desk..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Customer & Kitchen Notes */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
              <h2 className="text-xl font-display font-bold text-brown-900 mb-3">
                2. Kitchen & Order Notes
              </h2>
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={2}
                className="input text-sm"
                placeholder="Any special allergy warnings, cutlery preferences..."
              />
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
              <h2 className="text-xl font-display font-bold text-brown-900 mb-4">
                3. Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="accent-orange-500"
                  />
                  <div>
                    <div className="text-sm font-bold text-brown-900">
                      Cash on Delivery / Pay at Counter
                    </div>
                    <div className="text-xs text-brown-500">Pay when your order is served</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="mpesa"
                    checked={paymentMethod === 'mpesa'}
                    onChange={() => setPaymentMethod('mpesa')}
                    className="accent-orange-500"
                  />
                  <div>
                    <div className="text-sm font-bold text-brown-900">
                      Mobile Money (MTN / Airtel)
                    </div>
                    <div className="text-xs text-brown-500">STK Push prompt to your phone</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-orange-500"
                  />
                  <div>
                    <div className="text-sm font-bold text-brown-900">Credit / Debit Card</div>
                    <div className="text-xs text-brown-500">Visa, Mastercard, American Express</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 h-fit space-y-6">
            <h2 className="text-xl font-display font-bold text-brown-900 pb-3 border-b border-amber-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-brown-700">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold">{item.quantity}x</span> {item.name}
                    {item.variant_name && ` (${item.variant_name})`}
                  </div>
                  <div className="font-bold">${(item.unitPrice * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-amber-100 space-y-2 text-sm text-brown-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-amber-100 flex justify-between text-xl font-bold text-brown-900">
                <span>Grand Total</span>
                <span className="text-orange-600">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {user && (
              <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl text-xs text-orange-800">
                🎉 You will earn <strong>{Math.floor(grandTotal)} Loyalty Points</strong> for this order!
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full py-3 text-base font-semibold shadow-lg justify-center"
            >
              {submitting ? 'Placing Order...' : 'Place Order Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
