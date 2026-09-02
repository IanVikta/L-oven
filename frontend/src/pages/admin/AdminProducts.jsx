import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import Loading from '../../components/common/Loading';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await adminService.getAdminProducts();
      setProducts(res.products || []);
    } catch (e) {
      console.error('Failed to fetch admin products:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (id) => {
    try {
      await adminService.toggleAvailability(id);
      fetchProducts();
    } catch (e) {
      alert('Failed to update stock availability.');
    }
  };

  return (
    <div className="bg-cream-100 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-brown-900">
              Product & Stock Manager
            </h1>
            <p className="text-xs text-brown-600">Manage coffee, drink, and bakery availability</p>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="bg-white rounded-2xl shadow-md border border-amber-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-brown-800">
                <thead className="bg-cream-200 text-brown-900 font-bold uppercase tracking-wider text-[11px] border-b border-amber-200">
                  <tr>
                    <th className="p-4">Item Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Prep Time</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-cream-50 transition-all">
                      <td className="p-4 font-bold text-brown-900">{product.name}</td>
                      <td className="p-4 font-medium text-orange-700">{product.category?.name}</td>
                      <td className="p-4 font-bold text-brown-900">${product.price.toFixed(2)}</td>
                      <td className="p-4">{product.prep_time_mins} mins</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                            product.is_available
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.is_available ? 'Available' : 'Sold Out'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleToggleAvailability(product.id)}
                          className={`btn text-[11px] py-1 px-3 ${
                            product.is_available
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {product.is_available ? 'Mark Sold Out' : 'Mark Available'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
