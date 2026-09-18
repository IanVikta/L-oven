import { useState, useEffect, useRef } from 'react';
import { adminService } from '../../services/adminService';
import Loading from '../../components/common/Loading';
import { formatCurrency } from '../../utils/currency';

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products' | 'reports'

  // --- ORDERS STREAM STATE ---
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orderFilter, setOrderFilter] = useState('all');
  const [prevPendingCount, setPrevPendingCount] = useState(0);
  const [newOrderAlert, setNewOrderAlert] = useState(false);

  // Default category fallback options
  const DEFAULT_CATEGORIES = [
    { id: 1, name: 'Coffees' },
    { id: 2, name: 'Roasts' },
    { id: 3, name: 'Ice Creams' },
    { id: 4, name: 'Cocktails' },
    { id: 5, name: 'Snacks' },
    { id: 6, name: 'Bakery' },
  ];

  // --- PRODUCTS MANAGER STATE ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Product Modal State (Add / Edit)
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null for create, product obj for edit
  const [productForm, setProductForm] = useState({
    name: '',
    category_id: '',
    price: '',
    prep_time_mins: '10',
    description: '',
    image_url: '',
    is_available: true
  });
  const [formSaving, setFormSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select or drop a valid image file (PNG, JPG, WEBP, GIF).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }

    setUploadingImage(true);
    try {
      // First try uploading to backend server
      const res = await adminService.uploadImage(file);
      if (res.url) {
        setProductForm((prev) => ({ ...prev, image_url: res.url }));
      }
    } catch (e) {
      console.warn('Backend image upload endpoint fallback to Data URL:', e);
      // Fallback: Read as base64 Data URL so drag and drop works 100% offline or if upload fails
      const reader = new FileReader();
      reader.onload = (evt) => {
        setProductForm((prev) => ({ ...prev, image_url: evt.target.result }));
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadFile(e.target.files[0]);
    }
  };

  // --- REPORTS STATE ---
  const [salesReport, setSalesReport] = useState(null);
  const [loadingReports, setLoadingReports] = useState(false);

  // Auto-poll orders every 8 seconds
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 8000);
    return () => clearInterval(interval);
  }, [orderFilter]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Load products & categories when switching to products tab
  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
      fetchCategories();
    } else if (activeTab === 'reports') {
      fetchReports();
    }
  }, [activeTab]);

  // ----------------------------------------------------
  // ORDERS STREAM FUNCTIONS
  // ----------------------------------------------------
  const fetchOrders = async () => {
    try {
      const params = {};
      if (orderFilter !== 'all') {
        params.status = orderFilter;
      }
      const res = await adminService.getAdminOrders(params);
      const fetchedOrders = res.orders || [];
      
      const pendingCount = fetchedOrders.filter(o => o.status === 'pending').length;
      if (prevPendingCount > 0 && pendingCount > prevPendingCount) {
        setNewOrderAlert(true);
        setTimeout(() => setNewOrderAlert(false), 5000);
      }
      setPrevPendingCount(pendingCount);
      setOrders(fetchedOrders);
    } catch (e) {
      console.error('Failed to fetch admin orders:', e);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (e) {
      console.error('Order status update failed:', e);
      alert(e.response?.data?.message || 'Failed to update status.');
    }
  };

  // ----------------------------------------------------
  // PRODUCTS & PRICES FUNCTIONS
  // ----------------------------------------------------
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await adminService.getAdminProducts();
      setProducts(res.products || []);
    } catch (e) {
      console.error('Failed to fetch products:', e);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await adminService.getCategories();
      const fetched = res.categories || res.data || [];
      if (fetched.length > 0) {
        setCategories(fetched);
      } else {
        setCategories(DEFAULT_CATEGORIES);
      }
    } catch (e) {
      console.error('Failed to fetch categories:', e);
      setCategories(DEFAULT_CATEGORIES);
    }
  };

  const handleToggleAvailability = async (id) => {
    try {
      await adminService.toggleAvailability(id);
      fetchProducts();
    } catch (e) {
      alert('Failed to update product availability.');
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category_id: categories[0]?.id || '1',
      price: '',
      prep_time_mins: '10',
      description: '',
      image_url: '',
      is_available: true
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name || '',
      category_id: prod.category_id || prod.category?.id || categories[0]?.id || '1',
      price: prod.price || '',
      prep_time_mins: prod.prep_time_mins || '10',
      description: prod.description || '',
      image_url: prod.image_url || '',
      is_available: prod.is_available ?? true
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setFormSaving(true);
    try {
      const payload = {
        name: productForm.name,
        category_id: parseInt(productForm.category_id),
        price: parseFloat(productForm.price),
        prep_time_mins: parseInt(productForm.prep_time_mins),
        description: productForm.description,
        image_url: productForm.image_url,
        is_available: productForm.is_available
      };

      if (editingProduct) {
        await adminService.updateProduct(editingProduct.id, payload);
      } else {
        await adminService.createProduct(payload);
      }

      setShowProductModal(false);
      fetchProducts();
    } catch (e) {
      console.error('Error saving product:', e);
      alert(e.response?.data?.message || 'Failed to save product details.');
    } finally {
      setFormSaving(false);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from the menu?`)) return;
    try {
      await adminService.deleteProduct(id);
      fetchProducts();
    } catch (e) {
      alert('Failed to delete product.');
    }
  };

  // ----------------------------------------------------
  // REPORTS FUNCTIONS
  // ----------------------------------------------------
  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      const res = await adminService.getSalesReport();
      const analytics = res.analytics || res.data || res;
      setSalesReport(analytics);
    } catch (e) {
      console.error('Failed to fetch sales report:', e);
    } finally {
      setLoadingReports(false);
    }
  };

  // Status badge colors
  const statusBadgeColor = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
    preparing: 'bg-orange-100 text-orange-800 border-orange-300',
    ready: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    out_for_delivery: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    completed: 'bg-gray-100 text-gray-800 border-gray-300',
    cancelled: 'bg-red-100 text-red-800 border-red-300',
  };

  // Filtered products list
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category_id?.toString() === selectedCategory || p.category?.id?.toString() === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="bg-cream-100 min-h-screen pb-16 text-brown-900">
      
      {/* Top Banner Header */}
      <div className="bg-brown-900 text-cream-100 py-6 border-b border-brown-800 shadow-md">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500 font-bold text-lg">⚙️</span>
              <h1 className="text-2xl font-display font-bold tracking-tight">L’Oven Admin &amp; Kitchen Portal</h1>
            </div>
            <p className="text-xs text-cream-100/70 mt-0.5">
              Live Order Fulfillment • Menu &amp; Pricing Management • Realtime Operations
            </p>
          </div>

          {/* Tab Selection Navigation */}
          <div className="flex bg-brown-950 p-1 rounded-xl border border-amber-900/40">
            <button
              onClick={() => setActiveTab('orders')}
              className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'orders' ? 'bg-orange-600 text-white shadow-md' : 'text-cream-100/70 hover:text-white'
              }`}
            >
              <span>🔔 Orders Stream</span>
              {pendingOrdersCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full animate-pulse">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'products' ? 'bg-orange-600 text-white shadow-md' : 'text-cream-100/70 hover:text-white'
              }`}
            >
              <span>🍰 Menu &amp; Prices</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'reports' ? 'bg-orange-600 text-white shadow-md' : 'text-cream-100/70 hover:text-white'
              }`}
            >
              <span>📊 Sales Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* New Incoming Order Audio/Visual Banner Notification */}
      {newOrderAlert && (
        <div className="bg-orange-600 text-white p-3 text-center text-xs font-bold animate-bounce shadow-lg flex items-center justify-center gap-2">
          <span>🚨 NEW ORDER ARRIVED!</span>
          <button onClick={() => { setActiveTab('orders'); setOrderFilter('pending'); }} className="underline ml-2 cursor-pointer">
            View Order Queue →
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-7xl pt-8">

        {/* ========================================================================= */}
        {/* TAB 1: LIVE ORDERS STREAM */}
        {/* ========================================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-amber-200/80">
              <div>
                <h2 className="text-xl font-display font-bold text-brown-900">
                  Kitchen &amp; Barista Live Queue
                </h2>
                <p className="text-xs text-brown-600">Auto-refreshes every 8 seconds</p>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {['all', 'pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      orderFilter === st
                        ? 'bg-brown-900 text-white shadow-xs'
                        : 'bg-cream-100 text-brown-700 hover:bg-amber-200/60'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {loadingOrders ? (
              <Loading />
            ) : orders.length === 0 ? (
              <div className="bg-white p-16 rounded-3xl text-center shadow-xs border border-amber-200/60 text-brown-600 space-y-2">
                <span className="text-3xl">☕</span>
                <h3 className="text-lg font-bold text-brown-900">No Orders in Queue</h3>
                <p className="text-xs max-w-md mx-auto">
                  There are currently no orders matching the "{orderFilter}" filter. New customer checkout orders will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-6 shadow-md border border-amber-200/80 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
                  >
                    <div>
                      {/* Order Header */}
                      <div className="flex justify-between items-start pb-3 border-b border-amber-100">
                        <div>
                          <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
                            {order.fulfilment_type ? order.fulfilment_type.replace('_', ' ') : 'Order'}
                          </span>
                          <h3 className="text-2xl font-display font-bold text-brown-900">
                            #{order.order_number}
                          </h3>
                          <span className="text-[11px] text-brown-500 font-medium">
                            Received: {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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

                      {/* Delivery / Table Customer Details */}
                      <div className="mt-3 bg-amber-50/70 p-3 rounded-xl text-xs space-y-1 border border-amber-200/80 text-brown-900">
                        {order.delivery ? (
                          <div>
                            <span className="font-bold text-orange-700 uppercase tracking-wider block text-[10px]">🛵 Delivery Location</span>
                            <div className="font-bold">{order.delivery.recipient_name} • {order.delivery.recipient_phone}</div>
                            <div className="text-brown-700 font-light">{order.delivery.street_address}, Kitende</div>
                          </div>
                        ) : order.dine_in ? (
                          <div>
                            <span className="font-bold text-orange-700 uppercase tracking-wider block text-[10px]">🪑 Dine In Table</span>
                            <div className="font-bold">Table #{order.dine_in.table_number} ({order.dine_in.guest_count} Guests)</div>
                          </div>
                        ) : order.takeaway ? (
                          <div>
                            <span className="font-bold text-orange-700 uppercase tracking-wider block text-[10px]">🛍️ Takeaway</span>
                            <div>{order.takeaway.vehicle_description || 'Counter Pickup'}</div>
                          </div>
                        ) : (
                          <div>
                            <span className="font-bold text-orange-700 uppercase tracking-wider block text-[10px]">👤 Customer Info</span>
                            <div>Guest Order</div>
                          </div>
                        )}
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2 mt-4">
                        {order.items &&
                          order.items.map((item) => (
                            <div key={item.id} className="text-xs bg-cream-50 p-3 rounded-xl border border-amber-100">
                              <div className="flex justify-between font-bold text-brown-900">
                                <span>
                                  {item.quantity}x {item.product_name} {item.variant_name && `(${item.variant_name})`}
                                </span>
                                <span>{formatCurrency(item.line_total)}</span>
                              </div>
                              {item.options && item.options.length > 0 && (
                                <div className="text-[11px] text-orange-700 mt-1 font-medium">
                                  + {item.options.map((o) => o.item).join(', ')}
                                </div>
                              )}
                              {item.item_notes && (
                                <div className="text-[11px] text-red-600 font-medium italic mt-1">
                                  Note: "{item.item_notes}"
                                </div>
                              )}
                            </div>
                          ))}
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center pt-3 text-sm font-bold text-brown-900 border-t border-amber-100 mt-3">
                        <span>Total Payable:</span>
                        <span className="text-orange-600 text-base">{formatCurrency(order.total_amount)}</span>
                      </div>
                    </div>

                    {/* Status Action Buttons */}
                    <div className="pt-3 border-t border-amber-100 flex flex-wrap gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'confirmed')}
                          className="btn bg-blue-600 hover:bg-blue-700 text-white text-xs py-2.5 px-3 flex-1 font-bold cursor-pointer"
                        >
                          Confirm Order
                        </button>
                      )}

                      {order.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'preparing')}
                          className="btn bg-orange-600 hover:bg-orange-700 text-white text-xs py-2.5 px-3 flex-1 font-bold cursor-pointer"
                        >
                          Start Preparing ☕
                        </button>
                      )}

                      {order.status === 'preparing' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'ready')}
                          className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2.5 px-3 flex-1 font-bold cursor-pointer"
                        >
                          Mark Ready 🔔
                        </button>
                      )}

                      {order.status === 'ready' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'completed')}
                          className="btn bg-brown-900 hover:bg-brown-800 text-white text-xs py-2.5 px-3 flex-1 font-bold cursor-pointer"
                        >
                          Complete Order 🎉
                        </button>
                      )}

                      {order.status !== 'completed' && order.status !== 'cancelled' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'cancelled')}
                          className="btn bg-red-100 text-red-700 hover:bg-red-200 text-xs py-2.5 px-3 font-bold cursor-pointer"
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
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MENU & PRICE MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-amber-200/80">
              <div>
                <h2 className="text-xl font-display font-bold text-brown-900">
                  Menu &amp; Price Manager
                </h2>
                <p className="text-xs text-brown-600">Update item prices, availability, or add new delicacies</p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="bg-brown-900 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>+ Add New Product</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-amber-200/70 shadow-xs">
              <input
                type="text"
                placeholder="Search menu items by name..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="input text-xs py-2.5 px-4 rounded-xl border-amber-200 flex-1 focus:border-brown-900"
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select text-xs py-2.5 px-4 rounded-xl border-amber-200 bg-white text-brown-900 font-semibold cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id.toString()}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Products Table */}
            {loadingProducts ? (
              <Loading />
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center shadow-xs border border-amber-200/60 text-brown-600">
                <p className="text-base font-bold text-brown-900 mb-1">No Menu Items Found</p>
                <p className="text-xs">Try clearing your search query or category filter.</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border border-amber-200/80 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-brown-900">
                    <thead className="bg-cream-100 text-brown-900 font-bold uppercase tracking-wider text-[11px] border-b border-amber-200">
                      <tr>
                        <th className="p-4">Item Details</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price (UGX)</th>
                        <th className="p-4">Prep Time</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100">
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-amber-50/40 transition-colors">
                          
                          {/* Item Info & Image */}
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {prod.image_url ? (
                                <img
                                  src={prod.image_url}
                                  alt={prod.name}
                                  className="w-10 h-10 rounded-xl object-cover border border-amber-200 shrink-0"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-xl bg-amber-100 text-brown-900 flex items-center justify-center font-bold text-base shrink-0">
                                  ☕
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-brown-900 text-sm">{prod.name}</div>
                                {prod.description && (
                                  <div className="text-[11px] text-brown-500 line-clamp-1 font-light max-w-xs">
                                    {prod.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="p-4 font-bold text-orange-700 uppercase text-[11px]">
                            {prod.category?.name || 'Menu'}
                          </td>

                          {/* Price */}
                          <td className="p-4 font-extrabold text-brown-900 text-sm">
                            {formatCurrency(prod.price)}
                          </td>

                          {/* Prep Time */}
                          <td className="p-4 text-brown-700 font-medium">
                            {prod.prep_time_mins || 10} mins
                          </td>

                          {/* Availability Status */}
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider border ${
                                prod.is_available
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : 'bg-red-50 text-red-800 border-red-200'
                              }`}
                            >
                              {prod.is_available ? 'Available' : 'Sold Out'}
                            </span>
                          </td>

                          {/* Action Buttons */}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Edit Price / Item */}
                              <button
                                onClick={() => handleOpenEditProduct(prod)}
                                className="px-3 py-1.5 bg-cream-100 hover:bg-amber-200/80 text-brown-900 font-bold text-[11px] rounded-lg border border-amber-300/70 transition-all cursor-pointer"
                                title="Edit Item & Price"
                              >
                                ✏️ Edit
                              </button>

                              {/* Toggle Stock */}
                              <button
                                onClick={() => handleToggleAvailability(prod.id)}
                                className={`px-3 py-1.5 font-bold text-[11px] rounded-lg transition-all cursor-pointer ${
                                  prod.is_available
                                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                                }`}
                              >
                                {prod.is_available ? 'Mark Sold Out' : 'Mark Available'}
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[11px] rounded-lg border border-red-200 transition-all cursor-pointer"
                                title="Delete Product"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SALES REPORTS */}
        {/* ========================================================================= */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-amber-200/80">
              <h2 className="text-xl font-display font-bold text-brown-900">
                Sales &amp; Performance Analytics
              </h2>
              <p className="text-xs text-brown-600">Overview of completed orders and revenue performance</p>
            </div>

            {loadingReports ? (
              <Loading />
            ) : salesReport ? (
              <div className="space-y-6">
                
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-200/80 space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Total Revenue</span>
                    <div className="text-3xl font-display font-bold text-brown-900">
                      {formatCurrency(salesReport.total_revenue ?? salesReport.summary?.total_revenue ?? 0)}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-200/80 space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Completed Orders</span>
                    <div className="text-3xl font-display font-bold text-brown-900">
                      {salesReport.completed_orders ?? salesReport.summary?.completed_orders ?? 0}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-200/80 space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Average Ticket</span>
                    <div className="text-3xl font-display font-bold text-brown-900">
                      {formatCurrency(salesReport.average_order_value ?? salesReport.summary?.average_order_value ?? 0)}
                    </div>
                  </div>
                </div>

                {/* Top Selling Items Table */}
                {(salesReport.top_products || salesReport.top_selling_products) && (salesReport.top_products || salesReport.top_selling_products).length > 0 && (
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-200/80 space-y-4">
                    <h3 className="text-lg font-display font-bold text-brown-900">Top Performing Items</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-cream-100 text-brown-900 font-bold uppercase text-[11px]">
                          <tr>
                            <th className="p-3">Product Name</th>
                            <th className="p-3">Units Sold</th>
                            <th className="p-3 text-right">Revenue Generated</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-100">
                          {(salesReport.top_products || salesReport.top_selling_products).map((item, idx) => (
                            <tr key={idx} className="hover:bg-amber-50/40">
                              <td className="p-3 font-bold text-brown-900">{item.product_name}</td>
                              <td className="p-3 text-brown-700">{item.total_sold ?? item.total_quantity ?? 0} units</td>
                              <td className="p-3 text-right font-extrabold text-orange-600">
                                {formatCurrency(item.total_revenue)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-3xl text-center border border-amber-200/60 text-brown-600">
                <p className="text-base font-bold">No Sales Data Available</p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* PRODUCT ADD / EDIT MODAL */}
      {/* ========================================================================= */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-brown-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-amber-200 space-y-5 animate-scale-up">
            
            <div className="flex justify-between items-center border-b border-amber-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  {editingProduct ? 'Update Item & Pricing' : 'Add New Menu Item'}
                </span>
                <h3 className="text-2xl font-display font-bold text-brown-900">
                  {editingProduct ? editingProduct.name : 'Create Delicacy'}
                </h3>
              </div>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-brown-400 hover:text-brown-900 font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-brown-900 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Vanilla Bean Latte, Cinnamon Croissant"
                  className="input text-xs py-3 px-4 rounded-xl border-amber-200 w-full"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brown-900 mb-1">Category *</label>
                  <select
                    required
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="select text-xs py-3 px-3 rounded-xl border-amber-200 w-full bg-white font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brown-900 mb-1">Price (UGX) *</label>
                  <input
                    type="number"
                    step="500"
                    min="0"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="15000"
                    className="input text-xs py-3 px-4 rounded-xl border-amber-200 w-full font-bold"
                  />
                </div>
              </div>

              {/* Prep Time & Image URL */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brown-900 mb-1">Prep Time (Mins)</label>
                  <input
                    type="number"
                    min="1"
                    value={productForm.prep_time_mins}
                    onChange={(e) => setProductForm({ ...productForm, prep_time_mins: e.target.value })}
                    className="input text-xs py-3 px-4 rounded-xl border-amber-200 w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brown-900 mb-1">Stock Availability</label>
                  <select
                    value={productForm.is_available ? '1' : '0'}
                    onChange={(e) => setProductForm({ ...productForm, is_available: e.target.value === '1' })}
                    className="select text-xs py-3 px-3 rounded-xl border-amber-200 w-full bg-white font-semibold"
                  >
                    <option value="1">Available</option>
                    <option value="0">Sold Out</option>
                  </select>
                </div>
              </div>

              {/* Drag & Drop Image Uploader */}
              <div>
                <label className="block text-xs font-bold text-brown-900 mb-1">
                  Product Image (Drag &amp; Drop or Upload)
                </label>
                
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                  onDrop={handleImageDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                    isDragging
                      ? 'border-orange-500 bg-orange-50/80 scale-[1.01]'
                      : productForm.image_url
                      ? 'border-emerald-300 bg-emerald-50/30'
                      : 'border-amber-200/90 bg-cream-50/60 hover:border-orange-400 hover:bg-amber-50/50'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {uploadingImage ? (
                    <div className="flex items-center gap-2 py-3 text-xs font-bold text-orange-600">
                      <svg className="animate-spin h-5 w-5 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Uploading Image...</span>
                    </div>
                  ) : productForm.image_url ? (
                    <div className="relative group w-full flex items-center justify-between p-2 bg-white rounded-xl border border-amber-200">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={productForm.image_url}
                          alt="Product Preview"
                          className="w-12 h-12 object-cover rounded-lg border border-amber-200 shrink-0"
                        />
                        <div className="text-left text-xs truncate">
                          <span className="font-bold text-emerald-800 block">✓ Image Selected</span>
                          <span className="text-[10px] text-brown-500 truncate block max-w-[220px]">{productForm.image_url}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProductForm({ ...productForm, image_url: '' });
                        }}
                        className="text-xs text-red-600 font-bold px-2.5 py-1 hover:bg-red-50 rounded-lg cursor-pointer shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="py-2 space-y-1">
                      <div className="text-2xl">📸</div>
                      <div className="text-xs font-bold text-brown-900">
                        Drag &amp; Drop product image here, or <span className="text-orange-600 underline">browse file</span>
                      </div>
                      <div className="text-[10px] text-brown-500">
                        Supports PNG, JPG, WEBP, GIF (Max 5MB)
                      </div>
                    </div>
                  )}
                </div>

                {/* Optional Direct URL Fallback */}
                <div className="mt-2">
                  <input
                    type="text"
                    value={productForm.image_url}
                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                    placeholder="Or paste external image URL (https://...)"
                    className="input text-[11px] py-2 px-3 rounded-lg border-amber-200/80 w-full text-brown-700 placeholder:text-brown-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-brown-900 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Rich aromatic espresso paired with creamy steamed milk..."
                  className="input text-xs py-3 px-4 rounded-xl border-amber-200 w-full"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="btn bg-cream-100 text-brown-900 text-xs py-3 px-5 flex-1 font-bold rounded-xl border border-amber-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSaving}
                  className="btn bg-brown-900 hover:bg-orange-600 text-white text-xs py-3 px-5 flex-1 font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
                >
                  {formSaving ? 'Saving...' : editingProduct ? 'Save Price & Item' : 'Add Item to Menu'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPortal;
