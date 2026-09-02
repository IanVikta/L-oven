import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import Loading from '../../components/common/Loading';

const AdminReports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await adminService.getSalesReport();
      setReport(res.analytics);
    } catch (e) {
      console.error('Failed to fetch sales report:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="bg-cream-100 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-brown-900">
            Sales & Revenue Analytics
          </h1>
          <p className="text-xs text-brown-600">Business performance metrics for L'Oven Coffee</p>
        </div>

        {report && (
          <div className="space-y-8">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
                <div className="text-xs font-bold text-brown-500 uppercase">Total Revenue</div>
                <div className="text-3xl font-display font-bold text-orange-600 mt-2">
                  ${report.total_revenue.toFixed(2)}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
                <div className="text-xs font-bold text-brown-500 uppercase">Total Orders</div>
                <div className="text-3xl font-display font-bold text-brown-900 mt-2">
                  {report.total_orders}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
                <div className="text-xs font-bold text-brown-500 uppercase">Avg Order Value</div>
                <div className="text-3xl font-display font-bold text-emerald-600 mt-2">
                  ${report.average_order_value.toFixed(2)}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
                <div className="text-xs font-bold text-brown-500 uppercase">Active Kitchen Orders</div>
                <div className="text-3xl font-display font-bold text-indigo-600 mt-2">
                  {report.pending_orders}
                </div>
              </div>
            </div>

            {/* Fulfilment & Top Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Fulfilment Breakdown */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
                <h2 className="text-xl font-display font-bold text-brown-900 mb-4 pb-2 border-b border-amber-100">
                  Revenue by Fulfilment Type
                </h2>
                <div className="space-y-4">
                  {report.fulfilment_breakdown &&
                    report.fulfilment_breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm p-3 bg-cream-50 rounded-xl">
                        <div>
                          <span className="font-bold text-brown-900 capitalize">
                            {item.fulfilment_type.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-brown-500 block">
                            {item.count} orders placed
                          </span>
                        </div>
                        <span className="text-base font-bold text-orange-600">
                          ${parseFloat(item.revenue || 0).toFixed(2)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Top 5 Best Selling Items */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
                <h2 className="text-xl font-display font-bold text-brown-900 mb-4 pb-2 border-b border-amber-100">
                  Top 5 Best Selling Items
                </h2>
                <div className="space-y-3">
                  {report.top_products &&
                    report.top_products.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm p-3 bg-cream-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-orange-100 text-orange-700 text-xs font-bold rounded-full flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="font-bold text-brown-900">{item.product_name}</div>
                            <div className="text-xs text-brown-500">{item.total_sold} units sold</div>
                          </div>
                        </div>
                        <span className="font-bold text-brown-900">
                          ${parseFloat(item.total_revenue || 0).toFixed(2)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
