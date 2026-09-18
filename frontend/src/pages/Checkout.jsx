import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { orderService } from '../services/orderService';
import { isPricingFinalized, formatCurrency } from '../utils/currency';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fulfilmentType, setFulfilmentType] = useState('dine_in'); // 'dine_in' | 'takeaway' | 'delivery'
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

    if (!isPricingFinalized()) {
      setError('Ordering is temporarily unavailable while menu pricing is being finalized.');
      return;
    }

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

  // Empty cart view - Clean Editorial aesthetic
  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FAF5EE] min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white border border-[#2B1B12]/15 p-8 sm:p-10 text-center shadow-2xs rounded-none space-y-5">
          <div className="w-14 h-14 mx-auto border border-[#2B1B12]/15 bg-[#FAF5EE] flex items-center justify-center text-2xl rounded-none">
            ☕
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase">
                BAG IS EMPTY
              </span>
            </div>
            <h2 className="font-['Lora',serif] text-2xl font-normal text-[#2B1B12]">
              No Selections in Cart
            </h2>
            <p className="text-xs text-[#5A4538] font-light mt-2 leading-relaxed">
              You haven't added any specialty coffee or freshly baked viennoiserie to your order yet.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/menu')}
            className="w-full py-3.5 bg-[#2B1B12] hover:bg-[#C8681A] text-[#FFF4E6] text-xs font-semibold uppercase tracking-[0.2em] transition-colors rounded-none cursor-pointer border border-[#2B1B12] hover:border-[#C8681A]"
          >
            Explore Menu &amp; Roasts →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF5EE] text-[#2B1B12] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#7A695E]">
          <Link to="/cart" className="hover:text-[#2B1B12] transition-colors flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-medium">
            <span>← Return to Cart</span>
          </Link>
          <span className="text-[#2B1B12]/30">/</span>
          <span className="uppercase tracking-wider text-[11px] text-[#C8681A] font-semibold">Checkout</span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-[1px] bg-[#C8681A]"></div>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#C8681A] uppercase">
              TABLE &amp; DOORSTEP SERVICE
            </span>
            <div className="w-8 h-[1px] bg-[#C8681A]"></div>
          </div>
          <h1 className="font-['Lora',serif] text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2B1B12] tracking-tight mb-3">
            Checkout &amp; Order
          </h1>
          <p className="text-xs sm:text-sm text-[#5A4538] font-light max-w-lg mx-auto">
            Review your artisanal roasts, confirm service details, and settle with secure payment.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-none">
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[11px] mb-1">
              <span>✕</span> Submission Error
            </div>
            <p>{error}</p>
          </div>
        )}

        {/* Pricing Unfinalized Notice */}
        {!isPricingFinalized() && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-none">
            <p className="font-bold uppercase tracking-wider text-[11px]">
              Ordering is temporarily unavailable while menu pricing is being finalized.
            </p>
            <p className="text-[11px] text-amber-700 mt-1">
              Please feel free to review your selections. Live orders will be enabled once official local pricing is published.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: FULFILMENT, KITCHEN NOTES & PAYMENT */}
          {/* ========================================================================= */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* STEP 1: FULFILMENT TYPE SELECTOR */}
            <div className="bg-white p-6 sm:p-8 border border-[#2B1B12]/15 shadow-2xs rounded-none space-y-5">
              <div className="flex items-center justify-between border-b border-[#2B1B12]/10 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase">
                    STEP 01
                  </span>
                  <div className="w-5 h-[1px] bg-[#C8681A]"></div>
                  <h2 className="font-['Lora',serif] text-xl sm:text-2xl font-normal text-[#2B1B12]">
                    Select Order Type
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {/* Dine-In Button */}
                <button
                  type="button"
                  onClick={() => setFulfilmentType('dine_in')}
                  className={`p-4 border text-center transition-all cursor-pointer rounded-none ${
                    fulfilmentType === 'dine_in'
                      ? 'bg-[#2B1B12] text-[#FFF4E6] border-[#2B1B12]'
                      : 'bg-[#FAF5EE] text-[#2B1B12] border-[#2B1B12]/20 hover:border-[#C8681A]'
                  }`}
                >
                  <span className="text-xl mb-1.5 block">🍽️</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] block">Dine-In</span>
                  <span className={`text-[10px] block mt-0.5 font-light ${fulfilmentType === 'dine_in' ? 'text-[#FFF4E6]/75' : 'text-[#7A695E]'}`}>
                    Table service
                  </span>
                </button>

                {/* Takeaway Button */}
                <button
                  type="button"
                  onClick={() => setFulfilmentType('takeaway')}
                  className={`p-4 border text-center transition-all cursor-pointer rounded-none ${
                    fulfilmentType === 'takeaway'
                      ? 'bg-[#2B1B12] text-[#FFF4E6] border-[#2B1B12]'
                      : 'bg-[#FAF5EE] text-[#2B1B12] border-[#2B1B12]/20 hover:border-[#C8681A]'
                  }`}
                >
                  <span className="text-xl mb-1.5 block">🛍️</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] block">Takeaway</span>
                  <span className={`text-[10px] block mt-0.5 font-light ${fulfilmentType === 'takeaway' ? 'text-[#FFF4E6]/75' : 'text-[#7A695E]'}`}>
                    Counter pickup
                  </span>
                </button>

                {/* Delivery Button */}
                <button
                  type="button"
                  onClick={() => setFulfilmentType('delivery')}
                  className={`p-4 border text-center transition-all cursor-pointer rounded-none ${
                    fulfilmentType === 'delivery'
                      ? 'bg-[#2B1B12] text-[#FFF4E6] border-[#2B1B12]'
                      : 'bg-[#FAF5EE] text-[#2B1B12] border-[#2B1B12]/20 hover:border-[#C8681A]'
                  }`}
                >
                  <span className="text-xl mb-1.5 block">🛵</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] block">Delivery</span>
                  <span className={`text-[10px] block mt-0.5 font-light ${fulfilmentType === 'delivery' ? 'text-[#FFF4E6]/75' : 'text-[#7A695E]'}`}>
                    Doorstep service
                  </span>
                </button>
              </div>

              {/* Fulfilment Conditional Fields */}
              <div className="pt-3 border-t border-[#2B1B12]/10">
                {/* 1A. Dine-In Fields */}
                {fulfilmentType === 'dine_in' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2B1B12] mb-1.5">
                        Table Number <span className="text-[#C8681A]">*</span>
                      </label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        required
                        className="w-full text-xs py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none"
                        placeholder="e.g. T-01, Patio Table 4"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2B1B12] mb-1.5">
                        Number of Diners <span className="text-[#C8681A]">*</span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        required
                        className="w-full text-xs py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none"
                      />
                    </div>
                  </div>
                )}

                {/* 1B. Takeaway Fields */}
                {fulfilmentType === 'takeaway' && (
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2B1B12] mb-1.5">
                      Vehicle / Arrival Description (Optional for Curbside)
                    </label>
                    <input
                      type="text"
                      value={vehicleDescription}
                      onChange={(e) => setVehicleDescription(e.target.value)}
                      className="w-full text-xs py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none"
                      placeholder="e.g. Silver Subaru, parked near main entrance"
                    />
                  </div>
                )}

                {/* 1C. Delivery Fields */}
                {fulfilmentType === 'delivery' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2B1B12] mb-1.5">
                          Recipient Name <span className="text-[#C8681A]">*</span>
                        </label>
                        <input
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          required
                          className="w-full text-xs py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2B1B12] mb-1.5">
                          Contact Phone <span className="text-[#C8681A]">*</span>
                        </label>
                        <input
                          type="tel"
                          value={recipientPhone}
                          onChange={(e) => setRecipientPhone(e.target.value)}
                          required
                          className="w-full text-xs py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none"
                          placeholder="+256 700 000000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2B1B12] mb-1.5">
                        Street Delivery Address <span className="text-[#C8681A]">*</span>
                      </label>
                      <textarea
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        required
                        rows={2}
                        className="w-full text-xs py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none"
                        placeholder="Plot number, Street name, Building/Apartment, Floor..."
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2B1B12] mb-1.5">
                        Gate / Delivery Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                        className="w-full text-xs py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none"
                        placeholder="Ring gate bell, leave at reception desk..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 2: KITCHEN & ORDER NOTES */}
            <div className="bg-white p-6 sm:p-8 border border-[#2B1B12]/15 shadow-2xs rounded-none space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#2B1B12]/10 pb-3.5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase">
                  STEP 02
                </span>
                <div className="w-5 h-[1px] bg-[#C8681A]"></div>
                <h2 className="font-['Lora',serif] text-xl sm:text-2xl font-normal text-[#2B1B12]">
                  Kitchen &amp; Barista Notes
                </h2>
              </div>
              <p className="text-xs text-[#5A4538] font-light">
                Specify any custom roasting preferences, milk substitutions, allergy alerts, or cutlery needs.
              </p>
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={3}
                className="w-full text-xs py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none placeholder:text-[#9C8270]"
                placeholder="e.g. Extra hot flat white, please pack cutlery for takeaway, nut allergy..."
              />
            </div>

            {/* STEP 3: PAYMENT METHOD */}
            <div className="bg-white p-6 sm:p-8 border border-[#2B1B12]/15 shadow-2xs rounded-none space-y-5">
              <div className="flex items-center gap-2.5 border-b border-[#2B1B12]/10 pb-3.5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase">
                  STEP 03
                </span>
                <div className="w-5 h-[1px] bg-[#C8681A]"></div>
                <h2 className="font-['Lora',serif] text-xl sm:text-2xl font-normal text-[#2B1B12]">
                  Payment Engine
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'cash',
                    title: 'Cash on Delivery / Pay at Counter',
                    subtitle: 'Settle in cash or mobile card terminal upon arrival or service',
                    icon: '💵',
                  },
                  {
                    id: 'mpesa',
                    title: 'Mobile Money (MTN / Airtel)',
                    subtitle: 'Instant secure prompt sent directly to your registered handset',
                    icon: '📱',
                  },
                ].map((method) => {
                  const isSelected = paymentMethod === method.id;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3.5 p-4 border transition-colors cursor-pointer rounded-none ${
                        isSelected
                          ? 'bg-[#FAF5EE] border-[#C8681A]'
                          : 'bg-white border-[#2B1B12]/15 hover:border-[#2B1B12]/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={isSelected}
                        onChange={() => setPaymentMethod(method.id)}
                        className="mt-0.5 accent-[#C8681A] cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{method.icon}</span>
                          <span className="text-xs font-semibold text-[#2B1B12] uppercase tracking-[0.14em]">
                            {method.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5A4538] font-light mt-0.5">
                          {method.subtitle}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: ARCHITECTURAL ORDER SUMMARY SIDEBAR */}
          {/* ========================================================================= */}
          <div className="bg-white border border-[#2B1B12]/15 shadow-2xs p-6 sm:p-8 rounded-none space-y-6 lg:sticky lg:top-24">
            
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase">
                  YOUR SELECTIONS
                </span>
                <div className="w-6 h-[1px] bg-[#C8681A]"></div>
              </div>
              <h2 className="font-['Lora',serif] text-2xl font-normal text-[#2B1B12] pb-3 border-b border-[#2B1B12]/15">
                Order Summary
              </h2>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs gap-3 pb-3 border-b border-[#2B1B12]/10 last:border-b-0 last:pb-0">
                  <div>
                    <div className="font-medium text-[#2B1B12]">
                      <span className="font-bold text-[#C8681A]">{item.quantity}×</span> {item.name}
                      {item.variant_name && <span className="text-[#7A695E] font-normal"> ({item.variant_name})</span>}
                    </div>
                    {item.options && item.options.length > 0 && (
                      <div className="text-[10px] text-[#7A695E] mt-0.5 font-light">
                        + {item.options.map((o) => o.name || o.item || o).join(', ')}
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-[#2B1B12] shrink-0">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="pt-4 border-t border-[#2B1B12]/15 space-y-2.5 text-xs text-[#5A4538]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#2B1B12]">{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Service Fee</span>
                <span className="font-semibold text-[#2B1B12]">
                  {isPricingFinalized()
                    ? fulfilmentType === 'delivery'
                      ? formatCurrency(deliveryFee, { allowUnfinalized: false })
                      : 'UGX 0'
                    : fulfilmentType === 'delivery'
                    ? 'To be confirmed'
                    : 'Free'}
                </span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="pt-4 border-t border-[#2B1B12]/15 flex justify-between items-baseline">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#7A695E] uppercase block">
                  GRAND TOTAL
                </span>
                <span className="font-['Lora',serif] text-[11px] text-[#7A695E] italic">
                  Taxes &amp; roastery fee included
                </span>
              </div>
              <span className="font-['Lora',serif] text-2xl sm:text-3xl font-normal text-[#C8681A] tracking-tight">
                {isPricingFinalized()
                  ? formatCurrency(grandTotal, { allowUnfinalized: false })
                  : 'To be confirmed'}
              </span>
            </div>

            {/* Loyalty Points Reminder */}
            {user && (
              <div className="bg-[#FAF5EE] border border-[#2B1B12]/15 p-3 rounded-none text-xs text-[#2B1B12] flex items-center gap-2">
                <span className="text-[#C8681A] font-bold text-sm">✦</span>
                <span className="text-[11px] leading-snug">You will earn <strong>L'Oven Loyalty Points</strong> on qualifying selections.</span>
              </div>
            )}

            {/* Submit Order Action Button (Solid, Architectural, Zero Curves & Zero Gradients) */}
            <button
              type="submit"
              disabled={submitting || !isPricingFinalized()}
              className={`w-full py-4 text-xs font-semibold uppercase tracking-[0.22em] rounded-none transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs ${
                !isPricingFinalized()
                  ? 'bg-[#FAF5EE] text-[#7A695E] border border-[#2B1B12]/20 cursor-not-allowed'
                : submitting
                  ? 'bg-[#2B1B12] text-[#FFF4E6] opacity-80 cursor-wait'
                  : 'bg-[#2B1B12] hover:bg-[#C8681A] text-[#FFF4E6] border border-[#2B1B12] hover:border-[#C8681A]'
              }`}
            >
              {!isPricingFinalized() ? (
                'Ordering Temporarily Unavailable'
              ) : submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Securing Order...</span>
                </>
              ) : (
                <span>Place Order Now →</span>
              )}
            </button>

            {/* Safe Checkout Badge */}
            <div className="pt-2 text-center text-[10px] text-[#7A695E] uppercase tracking-wider">
              <span>🔒 Encrypted Checkout • L'Oven Quality Guaranteed</span>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};

export default Checkout;
