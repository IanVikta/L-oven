import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import Loading from '../../components/common/Loading';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Polling every 10 seconds
    return () => clearInterval(interval);
  }, [selectedFilter]);

  const fetchOrders = async () => {
    try {
      const params = {};
      if (selectedFilter !== 'all') {
        params.status = selectedFilter;
      }
      const res = await adminService.getAdminOrders(params);
      setOrders(res.orders || []);
    } catch (e) {
      console.error('Failed to fetch admin orders:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (e) {
      alert('Failed to update status. Ensure you are logged in as admin/staff.');
    }
  };

  const statusBadgeColor = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
    preparing: 'bg-orange-100 text-orange-800 border-orange-300',
    ready: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    out_for_delivery: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    completed: 'bg-gray-100 text-gray-800 border-gray-300',
    cancelled: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className="bg-cream-100 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-brown-900">
              Kitchen & Barista Order Stream
            </h1>
            <p className="text-xs text-brown-600">
              Live order processing queue (Auto-refreshes every 10s)
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'confirmed', 'preparing', 'ready', 'completed'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedFilter(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedFilter === st
                    ? 'bg-brown-900 text-white shadow'
                    : 'bg-white text-brown-800 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center shadow border border-amber-100 text-brown-600">
            <p className="text-lg font-bold mb-1">No Orders Found</p>
            <p className="text-xs">There are no orders matching the selected status filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 flex flex-col justify-between"
              >
                <div>
                  {/* Order Header */}
                  <div className="flex justify-between items-start pb-3 border-b border-amber-100 mb-4">
                    <div>
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                        {order.fulfilment_type.replace('_', ' ')}
                      </span>
                      <h3 className="text-xl font-display font-bold text-brown-900">
                        #{order.order_number}
                      </h3>
                      <span className="text-[11px] text-brown-500">
                        Placed: {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${
                        statusBadgeColor[order.status] || 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Fulfilment Extra Details */}
                  {order.dine_in && (
                    <div className="mb-3 bg-amber-50 p-2.5 rounded-lg text-xs font-semibold text-brown-800 border border-amber-200">
                      🪑 Table: {order.dine_in.table_number} ({order.dine_in.guest_count} Guests)
                    </div>
                  )}

                  {order.takeaway && (
                    <div className="mb-3 bg-amber-50 p-2.5 rounded-lg text-xs font-semibold text-brown-800 border border-amber-200">
                      🛍️ Takeaway {order.takeaway.vehicle_description && `— Vehicle: ${order.takeaway.vehicle_description}`}
                    </div>
                  )}

                  {order.delivery && (
                    <div className="mb-3 bg-amber-50 p-2.5 rounded-lg text-xs font-semibold text-brown-800 border border-amber-200">
                      🛵 Delivery to {order.delivery.recipient_name} ({order.delivery.recipient_phone}) — {order.delivery.street_address}
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="space-y-2 mb-4">
                    {order.items &&
                      order.items.map((item) => (
                        <div key={item.id} className="text-xs bg-cream-50 p-2.5 rounded-lg">
                          <div className="flex justify-between font-bold text-brown-900">
                            <span>
                              {item.quantity}x {item.product_name} {item.variant_name && `(${item.variant_name})`}
                            </span>
                            <span>${item.line_total.toFixed(2)}</span>
                          </div>
                          {item.options && item.options.length > 0 && (
                            <div className="text-[11px] text-orange-700 mt-1 font-medium">
                              + {item.options.map((o) => o.item).join(', ')}
                            </div>
                          )}
                          {item.item_notes && (
                            <div className="text-[11px] text-red-600 italic mt-0.5">
                              Note: "{item.item_notes}"
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="pt-4 border-t border-amber-100 flex flex-wrap gap-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'confirmed')}
                      className="btn bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 flex-1"
                    >
                      Confirm Order
                    </button>
                  )}

                  {order.status === 'confirmed' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'preparing')}
                      className="btn bg-orange-600 hover:bg-orange-700 text-white text-xs py-2 px-3 flex-1"
                    >
                      Start Preparing ☕
                    </button>
                  )}

                  {order.status === 'preparing' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'ready')}
                      className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 px-3 flex-1"
                    >
                      Mark Ready 🔔
                    </button>
                  )}

                  {order.status === 'ready' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'completed')}
                      className="btn bg-brown-900 hover:bg-brown-800 text-white text-xs py-2 px-3 flex-1"
                    >
                      Complete & Archive 🎉
                    </button>
                  )}

                  {order.status !== 'completed' && order.status !== 'cancelled' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'cancelled')}
                      className="btn bg-red-100 text-red-700 hover:bg-red-200 text-xs py-2 px-3"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
