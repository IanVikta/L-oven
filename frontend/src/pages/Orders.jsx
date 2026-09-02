import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/common/Loading';

const Orders = () => {
  const [searchParams] = useSearchParams();
  const newOrderNumber = searchParams.get('new_order');

  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [activeTracking, setActiveTracking] = useState(null);
  const [searchOrderNum, setSearchOrderNum] = useState(newOrderNumber || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (newOrderNumber) {
      handleTrackOrder(newOrderNumber);
    } else if (isAuthenticated()) {
      fetchOrderHistory();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchOrderHistory = async () => {
    setLoading(true);
    try {
      const res = await orderService.getOrders();
      setOrders(res.orders || []);
      if (res.orders && res.orders.length > 0 && !activeTracking) {
        setActiveTracking(res.orders[0]);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = async (orderNumToTrack) => {
    const targetNum = orderNumToTrack || searchOrderNum.trim();
    if (!targetNum) return;

    setLoading(true);
    setError('');
    try {
      const res = await orderService.trackOrder(targetNum);
      setActiveTracking(res.order);
    } catch (err) {
      console.error('Order tracking error:', err);
      setError('Order not found. Please check your order number.');
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = [
    { key: 'pending', label: 'Order Received', icon: '📝' },
    { key: 'confirmed', label: 'Confirmed', icon: '✅' },
    { key: 'preparing', label: 'In Kitchen / Bar', icon: '☕' },
    { key: 'ready', label: 'Ready', icon: '🔔' },
    { key: 'completed', label: 'Completed', icon: '🎉' },
  ];

  const getStepIndex = (status) => {
    if (status === 'out_for_delivery') return 3;
    const idx = statusSteps.findIndex((s) => s.key === status);
    return idx !== -1 ? idx : 0;
  };

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-brown-900 mb-8 text-center">
          Live Order Status & History
        </h1>

        {/* Order Number Tracker Search */}
        <div className="max-w-md mx-auto mb-10 bg-white p-4 rounded-2xl shadow-sm border border-amber-100 flex gap-2">
          <input
            type="text"
            placeholder="Enter Order # (e.g. LOV-20260902-123)"
            value={searchOrderNum}
            onChange={(e) => setSearchOrderNum(e.target.value)}
            className="input text-sm flex-1"
          />
          <button
            onClick={() => handleTrackOrder()}
            className="btn btn-primary text-xs px-4"
          >
            Track
          </button>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Live Order Tracker */}
            <div className="lg:col-span-2">
              {activeTracking ? (
                <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 space-y-6">
                  <div className="flex flex-wrap justify-between items-center gap-2 pb-4 border-b border-amber-100">
                    <div>
                      <span className="text-xs text-brown-500 font-semibold">Live Tracker</span>
                      <h2 className="text-2xl font-display font-bold text-brown-900">
                        #{activeTracking.order_number}
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full uppercase">
                        {activeTracking.fulfilment_type.replace('_', ' ')}
                      </span>
                      <div className="text-xs text-brown-500 mt-1">
                        Total: ${activeTracking.total_amount.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Status Progress Stepper */}
                  <div>
                    <h3 className="text-sm font-bold text-brown-900 mb-4">Progress Tracker</h3>
                    <div className="relative flex items-center justify-between">
                      {/* Step Line */}
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
                      <div
                        className="absolute top-1/2 left-0 h-1 bg-orange-500 -translate-y-1/2 transition-all duration-500 z-0"
                        style={{
                          width: `${(getStepIndex(activeTracking.status) / (statusSteps.length - 1)) * 100}%`,
                        }}
                      />

                      {statusSteps.map((step, idx) => {
                        const currentIdx = getStepIndex(activeTracking.status);
                        const isDone = idx <= currentIdx;

                        return (
                          <div key={step.key} className="relative z-10 flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                isDone
                                  ? 'bg-orange-500 text-white shadow-md scale-110'
                                  : 'bg-gray-100 text-gray-400 border border-gray-300'
                              }`}
                            >
                              {step.icon}
                            </div>
                            <span
                              className={`text-[11px] mt-2 font-semibold text-center ${
                                isDone ? 'text-brown-900' : 'text-gray-400'
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Item Breakdown */}
                  <div className="pt-4 border-t border-amber-100">
                    <h3 className="text-sm font-bold text-brown-900 mb-3">Items in this order</h3>
                    <div className="space-y-2">
                      {activeTracking.items &&
                        activeTracking.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center text-xs p-2 bg-cream-50 rounded-lg"
                          >
                            <div>
                              <span className="font-bold text-brown-900">{item.quantity}x</span>{' '}
                              {item.product_name} {item.variant_name && `(${item.variant_name})`}
                              {item.options && item.options.length > 0 && (
                                <div className="text-[10px] text-brown-600">
                                  {item.options.map((o) => `${o.group}: ${o.item}`).join(', ')}
                                </div>
                              )}
                            </div>
                            <span className="font-bold text-brown-900">
                              ${item.line_total.toFixed(2)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow border border-amber-100 text-center text-brown-600">
                  <p className="text-lg font-semibold mb-2">No Order Selected</p>
                  <p className="text-xs">
                    Enter an order number above or select from your history to track progress.
                  </p>
                </div>
              )}
            </div>

            {/* Past Orders History List */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 h-fit space-y-4">
              <h2 className="text-xl font-display font-bold text-brown-900 pb-3 border-b border-amber-100">
                Order History
              </h2>

              {orders.length === 0 ? (
                <p className="text-xs text-brown-500 text-center py-4">No past orders found.</p>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      onClick={() => setActiveTracking(ord)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        activeTracking?.id === ord.id
                          ? 'border-orange-500 bg-orange-50/50 shadow-sm'
                          : 'border-gray-100 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between font-bold text-brown-900 mb-1">
                        <span>#{ord.order_number}</span>
                        <span className="text-orange-600">${ord.total_amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-brown-600">
                        <span className="capitalize">{ord.fulfilment_type.replace('_', ' ')}</span>
                        <span className="font-semibold text-brown-800 uppercase">{ord.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
