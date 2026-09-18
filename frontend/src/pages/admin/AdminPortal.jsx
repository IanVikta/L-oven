import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import Loading from '../../components/common/Loading';
import { formatCurrency } from '../../utils/currency';
import { getProductImage } from '../../utils/productImages';
import logo from '../../assets/logo.png';

const AdminPortal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialTab = () => {
    if (location.pathname.includes('/products')) return 'products';
    if (location.pathname.includes('/reports')) return 'reports';
    return 'orders';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab); // 'orders' | 'products' | 'reports'

  useEffect(() => {
    if (location.pathname.includes('/products')) {
      setActiveTab('products');
    } else if (location.pathname.includes('/reports')) {
      setActiveTab('reports');
    } else if (location.pathname === '/admin' || location.pathname.includes('/orders')) {
      setActiveTab('orders');
    }
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'orders') navigate('/admin');
    else if (tab === 'products') navigate('/admin/products');
    else if (tab === 'reports') navigate('/admin/reports');
  };

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
    const firstCatId = categories && categories.length > 0 ? String(categories[0].id) : '1';
    setProductForm({
      name: '',
      category_id: firstCatId,
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
    let resolvedCatId = prod.category_id || prod.category?.id;
    if (!resolvedCatId && prod.category?.name && categories.length > 0) {
      const match = categories.find(c => c.name.toLowerCase() === prod.category.name.toLowerCase());
      if (match) resolvedCatId = match.id;
    }
    if (!resolvedCatId) {
      resolvedCatId = categories[0]?.id || 1;
    }

    setProductForm({
      name: prod.name || '',
      category_id: String(resolvedCatId),
      price: prod.price !== undefined && prod.price !== null ? String(prod.price) : '',
      prep_time_mins: prod.prep_time_mins !== undefined && prod.prep_time_mins !== null ? String(prod.prep_time_mins) : '10',
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
      const parsedCatId = parseInt(productForm.category_id, 10) || (categories[0]?.id ? parseInt(categories[0].id, 10) : 1);
      const parsedPrice = parseFloat(productForm.price);
      const parsedPrepTime = parseInt(productForm.prep_time_mins, 10) || 10;

      const payload = {
        name: productForm.name.trim(),
        category_id: parsedCatId,
        price: isNaN(parsedPrice) ? 0 : parsedPrice,
        prep_time_mins: parsedPrepTime,
        description: productForm.description || '',
        image_url: productForm.image_url || null,
        is_available: Boolean(productForm.is_available)
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
      const serverMsg = e.response?.data?.errors 
        ? Object.values(e.response.data.errors).flat().join('\n') 
        : (e.response?.data?.message || 'Failed to save product details.');
      alert(serverMsg);
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

  // Clean Architectural Status Badges (Sharp edges, hairline borders)
  const statusBadgeColor = {
    pending: 'bg-amber-50 text-amber-900 border-amber-300/80',
    confirmed: 'bg-blue-50 text-blue-900 border-blue-300/80',
    preparing: 'bg-orange-50 text-orange-900 border-orange-300/80',
    ready: 'bg-emerald-50 text-emerald-900 border-emerald-300/80',
    out_for_delivery: 'bg-indigo-50 text-indigo-900 border-indigo-300/80',
    completed: 'bg-[#FAF5EE] text-[#5A4538] border-[#2B1B12]/20',
    cancelled: 'bg-rose-50 text-rose-800 border-rose-300/80',
  };

  // Filtered products list
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category_id?.toString() === selectedCategory || p.category?.id?.toString() === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="bg-[#FAF5EE] text-[#2B1B12] min-h-screen pb-20">
      
      {/* 1. Operations Header & Utility Bar (Espresso Background with Clean Hairlines) */}
      <header className="bg-[#2B1B12] text-[#FFF4E6] border-b border-[#2B1B12]/20 shadow-sm sticky top-0 z-30">
        {/* Top utility row: Logo, Console Title & Back to Website button */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Link to="/" className="group flex items-center transition-opacity hover:opacity-90" title="Return to Main Website">
              <img src={logo} alt="L'Oven" className="h-10 sm:h-12 w-auto object-contain brightness-105" />
            </Link>
            <div className="h-8 w-[1px] bg-white/20 hidden sm:block"></div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#F28C13] uppercase">
                  OPERATIONS CONSOLE
                </span>
                <div className="w-5 h-[1px] bg-[#F28C13]"></div>
              </div>
              <h1 className="font-['Lora',serif] text-lg sm:text-xl font-normal text-[#FFF4E6] tracking-tight">
                L'Oven Kitchen &amp; Operations
              </h1>
            </div>
          </div>

          {/* Dedicated Back to Website Button */}
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 px-4 py-2.5 border border-white/25 bg-black/30 hover:bg-[#FFF4E6] hover:text-[#2B1B12] hover:border-[#FFF4E6] text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-200 rounded-none cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Website</span>
          </Link>
        </div>

        {/* Operational Tabs and Status row */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          {/* Tab Selection Navigation (Architectural, Sharp Edges, No Curves) */}
          <div className="flex flex-wrap border border-white/15 bg-black/25 p-1 rounded-none w-full md:w-auto">
            <button
              type="button"
              onClick={() => handleTabChange('orders')}
              className={`flex-1 md:flex-initial px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer flex items-center justify-center gap-2.5 rounded-none ${
                activeTab === 'orders'
                  ? 'bg-[#FFF4E6] text-[#2B1B12]'
                  : 'text-[#FFF4E6]/75 hover:text-[#FFF4E6] hover:bg-white/5'
              }`}
            >
              <span>Orders Queue</span>
              {pendingOrdersCount > 0 && (
                <span className="bg-[#C8681A] text-white text-[10px] font-bold px-1.5 py-0.5 tracking-wider rounded-none">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('products')}
              className={`flex-1 md:flex-initial px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer flex items-center justify-center gap-2 rounded-none ${
                activeTab === 'products'
                  ? 'bg-[#FFF4E6] text-[#2B1B12]'
                  : 'text-[#FFF4E6]/75 hover:text-[#FFF4E6] hover:bg-white/5'
              }`}
            >
              <span>Menu &amp; Pricing</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('reports')}
              className={`flex-1 md:flex-initial px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer flex items-center justify-center gap-2 rounded-none ${
                activeTab === 'reports'
                  ? 'bg-[#FFF4E6] text-[#2B1B12]'
                  : 'text-[#FFF4E6]/75 hover:text-[#FFF4E6] hover:bg-white/5'
              }`}
            >
              <span>Sales Reports</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2.5 text-xs text-[#FFF4E6]/70 font-light">
            <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse"></span>
            <span>Live Kitchen Polling (8s)</span>
          </div>
        </div>
      </header>

      {/* New Incoming Order Audio/Visual Banner Notification */}
      {newOrderAlert && (
        <div className="bg-[#2B1B12] text-[#FFF4E6] border-b border-[#C8681A] py-3 px-5 text-xs shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-none bg-[#F28C13] animate-ping"></span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#F28C13]">
                New Incoming Order
              </span>
              <span className="text-[#FFF4E6]/80 text-xs hidden sm:inline">
                — A guest just placed a new order.
              </span>
            </div>
            <button
              type="button"
              onClick={() => { handleTabChange('orders'); setOrderFilter('pending'); }}
              className="underline text-xs font-semibold text-[#F28C13] hover:text-[#FFF4E6] transition-colors cursor-pointer uppercase tracking-wider"
            >
              View Pending Queue →
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-8">

        {/* ========================================================================= */}
        {/* TAB 1: LIVE ORDERS STREAM */}
        {/* ========================================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Orders Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 border border-[#2B1B12]/15 shadow-2xs rounded-none">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase">
                    KITCHEN &amp; BARISTA STREAM
                  </span>
                  <div className="w-6 h-[1px] bg-[#C8681A]"></div>
                </div>
                <h2 className="font-['Lora',serif] text-2xl font-normal text-[#2B1B12]">
                  Live Order Queue
                </h2>
                <p className="text-xs text-[#5A4538] font-light mt-0.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-none bg-emerald-600 animate-pulse"></span>
                  Auto-refreshed live every 8 seconds
                </p>
              </div>

              {/* Status Filter Buttons (Sharp Rectangles) */}
              <div className="flex flex-wrap gap-1.5">
                {['all', 'pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer border rounded-none ${
                      orderFilter === st
                        ? 'bg-[#2B1B12] text-[#FFF4E6] border-[#2B1B12]'
                        : 'bg-[#FAF5EE] text-[#2B1B12] border-[#2B1B12]/15 hover:border-[#C8681A]'
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
              <div className="bg-white p-14 text-center border border-[#2B1B12]/15 shadow-2xs text-[#5A4538] space-y-3 rounded-none">
                <div className="w-10 h-10 border border-[#2B1B12]/20 flex items-center justify-center mx-auto text-[#C8681A] text-lg rounded-none">
                  ☕
                </div>
                <h3 className="font-['Lora',serif] text-xl text-[#2B1B12] font-normal">No Orders in Queue</h3>
                <p className="text-xs max-w-md mx-auto leading-relaxed">
                  There are currently no orders matching the "{orderFilter}" filter. Customer checkout orders will arrive here automatically.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white p-6 border border-[#2B1B12]/15 shadow-2xs rounded-none flex flex-col justify-between space-y-4 hover:border-[#2B1B12]/30 transition-all"
                  >
                    <div>
                      {/* Order Header */}
                      <div className="flex justify-between items-start pb-3 border-b border-[#2B1B12]/10">
                        <div>
                          <span className="text-[10px] font-bold text-[#C8681A] uppercase tracking-[0.2em] block mb-0.5">
                            {order.fulfilment_type ? order.fulfilment_type.replace('_', ' ') : 'Order'}
                          </span>
                          <h3 className="font-['Lora',serif] text-2xl font-normal text-[#2B1B12]">
                            #{order.order_number}
                          </h3>
                          <span className="text-[11px] text-[#7A695E] font-light">
                            Received: {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <span
                          className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-none ${
                            statusBadgeColor[order.status] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Delivery / Table Customer Details */}
                      <div className="mt-3 bg-[#FAF5EE] p-3.5 border border-[#2B1B12]/10 text-xs space-y-1 text-[#2B1B12] rounded-none">
                        {order.delivery ? (
                          <div>
                            <span className="font-bold text-[#C8681A] uppercase tracking-[0.18em] block text-[10px]">
                              DELIVERY DESTINATION
                            </span>
                            <div className="font-medium">{order.delivery.recipient_name} • {order.delivery.recipient_phone}</div>
                            <div className="text-[#5A4538] font-light">{order.delivery.street_address}, Kitende</div>
                          </div>
                        ) : order.dine_in ? (
                          <div>
                            <span className="font-bold text-[#C8681A] uppercase tracking-[0.18em] block text-[10px]">
                              DINE-IN TABLE
                            </span>
                            <div className="font-medium">Table #{order.dine_in.table_number} ({order.dine_in.guest_count} Guests)</div>
                          </div>
                        ) : order.takeaway ? (
                          <div>
                            <span className="font-bold text-[#C8681A] uppercase tracking-[0.18em] block text-[10px]">
                              TAKEAWAY DISPATCH
                            </span>
                            <div>{order.takeaway.vehicle_description || 'Counter Pickup'}</div>
                          </div>
                        ) : (
                          <div>
                            <span className="font-bold text-[#C8681A] uppercase tracking-[0.18em] block text-[10px]">
                              GUEST ORDER
                            </span>
                            <div>Direct Roastery Checkout</div>
                          </div>
                        )}
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2 mt-4">
                        {order.items &&
                          order.items.map((item) => (
                            <div key={item.id} className="text-xs bg-[#FAF5EE] p-3 border border-[#2B1B12]/10 rounded-none">
                              <div className="flex justify-between font-semibold text-[#2B1B12]">
                                <span>
                                  <span className="text-[#C8681A] font-bold mr-1">{item.quantity}×</span>
                                  {item.product_name} {item.variant_name && `(${item.variant_name})`}
                                </span>
                                <span>{formatCurrency(item.line_total)}</span>
                              </div>
                              {item.options && item.options.length > 0 && (
                                <div className="text-[11px] text-[#C8681A] mt-1 font-medium">
                                  + {item.options.map((o) => o.item).join(', ')}
                                </div>
                              )}
                              {item.item_notes && (
                                <div className="text-[11px] text-rose-700 font-medium italic mt-1">
                                  Note: "{item.item_notes}"
                                </div>
                              )}
                            </div>
                          ))}
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center pt-3 text-sm font-semibold text-[#2B1B12] border-t border-[#2B1B12]/10 mt-3">
                        <span>Total Payable:</span>
                        <span className="text-[#C8681A] text-base font-bold">{formatCurrency(order.total_amount)}</span>
                      </div>
                    </div>

                    {/* Status Action Buttons (Sharp Rectangles) */}
                    <div className="pt-3 border-t border-[#2B1B12]/10 flex flex-wrap gap-2">
                      {order.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(order.id, 'confirmed')}
                          className="bg-[#2B1B12] hover:bg-[#C8681A] text-[#FFF4E6] text-xs py-2.5 px-3.5 flex-1 font-semibold uppercase tracking-[0.16em] cursor-pointer transition-colors rounded-none"
                        >
                          Confirm Order
                        </button>
                      )}

                      {order.status === 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(order.id, 'preparing')}
                          className="bg-[#C8681A] hover:bg-[#A35212] text-white text-xs py-2.5 px-3.5 flex-1 font-semibold uppercase tracking-[0.16em] cursor-pointer transition-colors rounded-none"
                        >
                          Start Preparing
                        </button>
                      )}

                      {order.status === 'preparing' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(order.id, 'ready')}
                          className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs py-2.5 px-3.5 flex-1 font-semibold uppercase tracking-[0.16em] cursor-pointer transition-colors rounded-none"
                        >
                          Mark Ready
                        </button>
                      )}

                      {order.status === 'ready' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(order.id, 'completed')}
                          className="bg-[#2B1B12] hover:bg-black text-[#FFF4E6] text-xs py-2.5 px-3.5 flex-1 font-semibold uppercase tracking-[0.16em] cursor-pointer transition-colors rounded-none"
                        >
                          Complete Order
                        </button>
                      )}

                      {order.status !== 'completed' && order.status !== 'cancelled' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(order.id, 'cancelled')}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs py-2.5 px-3 font-semibold uppercase tracking-[0.16em] cursor-pointer transition-colors rounded-none"
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 border border-[#2B1B12]/15 shadow-2xs rounded-none">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase">
                    MENU ARCHITECTURE
                  </span>
                  <div className="w-6 h-[1px] bg-[#C8681A]"></div>
                </div>
                <h2 className="font-['Lora',serif] text-2xl font-normal text-[#2B1B12]">
                  Menu &amp; Price Manager
                </h2>
                <p className="text-xs text-[#5A4538] font-light">
                  Update item prices, daily availability, or introduce seasonal roasts
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddProduct}
                className="bg-[#2B1B12] hover:bg-[#C8681A] text-[#FFF4E6] text-xs font-semibold uppercase tracking-[0.2em] py-3 px-5 transition-colors cursor-pointer flex items-center gap-2 rounded-none"
              >
                <span>+ ADD NEW PRODUCT</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 border border-[#2B1B12]/15 shadow-2xs rounded-none">
              <input
                type="text"
                placeholder="Search menu items by title..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full text-xs py-2.5 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] placeholder:text-[#9C8270] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors flex-1 rounded-none"
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs py-2.5 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] font-medium focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors cursor-pointer sm:w-56 rounded-none"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id.toString()}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Products Table (Sharp Architectural Grid) */}
            {loadingProducts ? (
              <Loading />
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white p-14 text-center border border-[#2B1B12]/15 shadow-2xs text-[#5A4538] rounded-none">
                <p className="font-['Lora',serif] text-lg text-[#2B1B12] mb-1">No Menu Items Found</p>
                <p className="text-xs font-light">Try clearing your search query or category filter.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#2B1B12]/15 shadow-2xs overflow-hidden rounded-none">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#2B1B12]">
                    <thead className="bg-[#FAF5EE] text-[#2B1B12] font-semibold uppercase tracking-[0.18em] text-[10px] border-b border-[#2B1B12]/15">
                      <tr>
                        <th className="p-4">Item Details</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price (UGX)</th>
                        <th className="p-4">Prep Time</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2B1B12]/10">
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-[#FAF5EE]/50 transition-colors">
                          
                          {/* Item Info & Image */}
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={getProductImage(prod)}
                                alt={prod.name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80';
                                }}
                                className="w-12 h-12 border border-[#2B1B12]/15 object-cover shrink-0 rounded-none bg-[#FAF5EE]"
                              />
                              <div>
                                <div className="font-['Lora',serif] font-normal text-[#2B1B12] text-sm">{prod.name}</div>
                                {prod.description && (
                                  <div className="text-[11px] text-[#5A4538] line-clamp-1 font-light max-w-xs mt-0.5">
                                    {prod.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="p-4 font-semibold text-[#C8681A] uppercase tracking-wider text-[11px]">
                            {prod.category?.name || 'Menu'}
                          </td>

                          {/* Price */}
                          <td className="p-4 font-bold text-[#2B1B12] text-sm">
                            {formatCurrency(prod.price)}
                          </td>

                          {/* Prep Time */}
                          <td className="p-4 text-[#5A4538] font-light">
                            {prod.prep_time_mins || 10} mins
                          </td>

                          {/* Availability Status */}
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 font-bold text-[10px] uppercase tracking-wider border rounded-none ${
                                prod.is_available
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-rose-50 text-rose-800 border-rose-300'
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
                                type="button"
                                onClick={() => handleOpenEditProduct(prod)}
                                className="px-3 py-1.5 bg-[#FAF5EE] hover:bg-[#EFE8DD] text-[#2B1B12] font-medium text-xs border border-[#2B1B12]/20 transition-colors cursor-pointer rounded-none"
                                title="Edit Item & Price"
                              >
                                Edit
                              </button>

                              {/* Toggle Stock */}
                              <button
                                type="button"
                                onClick={() => handleToggleAvailability(prod.id)}
                                className={`px-3 py-1.5 font-semibold text-xs border transition-colors cursor-pointer rounded-none ${
                                  prod.is_available
                                    ? 'bg-[#FAF5EE] hover:bg-rose-50 text-[#7A695E] hover:text-rose-800 border-[#2B1B12]/20'
                                    : 'bg-emerald-800 hover:bg-emerald-900 text-white border-emerald-800'
                                }`}
                              >
                                {prod.is_available ? 'Mark Sold Out' : 'Mark Available'}
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs border border-rose-200 transition-colors cursor-pointer rounded-none"
                                title="Delete Product"
                              >
                                Delete
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
        {/* TAB 3: SALES REPORTS (Zero Curves, Pristine Editorial Cards) */}
        {/* ========================================================================= */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            
            {/* Header Toolbar */}
            <div className="bg-white p-6 border border-[#2B1B12]/15 shadow-2xs rounded-none">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase">
                  OPERATIONAL PERFORMANCE
                </span>
                <div className="w-6 h-[1px] bg-[#C8681A]"></div>
              </div>
              <h2 className="font-['Lora',serif] text-2xl sm:text-3xl font-normal text-[#2B1B12]">
                Sales &amp; Performance Analytics
              </h2>
              <p className="text-xs text-[#5A4538] font-light mt-0.5">
                Overview of completed guest orders and roastery revenue performance
              </p>
            </div>

            {loadingReports ? (
              <Loading />
            ) : salesReport ? (
              <div className="space-y-6">
                
                {/* Metric Summary Cards (Completely Uncurved, Sharp Hairlines) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  
                  {/* Revenue Card */}
                  <div className="bg-white p-6 border border-[#2B1B12]/15 shadow-2xs rounded-none space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C8681A] block">
                      TOTAL REVENUE
                    </span>
                    <div className="font-['Lora',serif] text-3xl sm:text-4xl font-normal text-[#2B1B12] tracking-tight">
                      {formatCurrency(salesReport.total_revenue ?? salesReport.summary?.total_revenue ?? 0)}
                    </div>
                  </div>

                  {/* Completed Orders Card */}
                  <div className="bg-white p-6 border border-[#2B1B12]/15 shadow-2xs rounded-none space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C8681A] block">
                      COMPLETED ORDERS
                    </span>
                    <div className="font-['Lora',serif] text-3xl sm:text-4xl font-normal text-[#2B1B12] tracking-tight">
                      {salesReport.completed_orders ?? salesReport.summary?.completed_orders ?? 0}
                    </div>
                  </div>

                  {/* Average Ticket Card */}
                  <div className="bg-white p-6 border border-[#2B1B12]/15 shadow-2xs rounded-none space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C8681A] block">
                      AVERAGE TICKET
                    </span>
                    <div className="font-['Lora',serif] text-3xl sm:text-4xl font-normal text-[#2B1B12] tracking-tight">
                      {formatCurrency(salesReport.average_order_value ?? salesReport.summary?.average_order_value ?? 0)}
                    </div>
                  </div>
                </div>

                {/* Top Selling Items Table (Sharp Hairline Grid) */}
                {(salesReport.top_products || salesReport.top_selling_products) && (salesReport.top_products || salesReport.top_selling_products).length > 0 && (
                  <div className="bg-white p-6 border border-[#2B1B12]/15 shadow-2xs rounded-none space-y-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#C8681A] uppercase">
                        POPULAR DELICACIES
                      </span>
                      <div className="w-6 h-[1px] bg-[#C8681A]"></div>
                    </div>
                    <h3 className="font-['Lora',serif] text-xl font-normal text-[#2B1B12]">
                      Top Performing Items
                    </h3>
                    <div className="overflow-x-auto border border-[#2B1B12]/15 rounded-none">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#FAF5EE] text-[#2B1B12] font-semibold uppercase tracking-[0.18em] text-[10px] border-b border-[#2B1B12]/15">
                          <tr>
                            <th className="p-3.5">Product Name</th>
                            <th className="p-3.5">Units Sold</th>
                            <th className="p-3.5 text-right">Revenue Generated</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2B1B12]/10">
                          {(salesReport.top_products || salesReport.top_selling_products).map((item, idx) => (
                            <tr key={idx} className="hover:bg-[#FAF5EE]/50 transition-colors">
                              <td className="p-3.5 font-['Lora',serif] text-sm text-[#2B1B12]">{item.product_name}</td>
                              <td className="p-3.5 text-[#5A4538] font-light">{item.total_sold ?? item.total_quantity ?? 0} units</td>
                              <td className="p-3.5 text-right font-bold text-[#C8681A]">
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
              <div className="bg-white p-14 text-center border border-[#2B1B12]/15 shadow-2xs text-[#5A4538] rounded-none">
                <p className="font-['Lora',serif] text-lg text-[#2B1B12]">No Sales Data Available</p>
              </div>
            )}
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* PRODUCT ADD / EDIT MODAL (Architectural, Sharp Edges, No Curves) */}
      {/* ========================================================================= */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-[#2B1B12]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#2B1B12]/20 space-y-5 rounded-none animate-scale-up">
            
            <div className="flex justify-between items-start border-b border-[#2B1B12]/10 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8681A] block mb-1">
                  {editingProduct ? 'UPDATE ITEM & PRICING' : 'NEW DELICACY ENTRY'}
                </span>
                <h3 className="font-['Lora',serif] text-2xl font-normal text-[#2B1B12]">
                  {editingProduct ? editingProduct.name : 'Create Menu Delicacy'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="text-[#7A695E] hover:text-[#2B1B12] font-light text-2xl cursor-pointer transition-colors leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              {/* Product Name */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                  Product Name <span className="text-[#C8681A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Vanilla Bean Latte, Cinnamon Croissant"
                  className="w-full text-xs py-2.5 sm:py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                    Category <span className="text-[#C8681A]">*</span>
                  </label>
                  <select
                    required
                    value={String(productForm.category_id || categories[0]?.id || '1')}
                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="w-full text-xs py-2.5 sm:py-3 px-3 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] font-medium focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={String(c.id)}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                    Price (UGX) <span className="text-[#C8681A]">*</span>
                  </label>
                  <input
                    type="number"
                    step="500"
                    min="0"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="15000"
                    className="w-full text-xs py-2.5 sm:py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] font-bold focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none"
                  />
                </div>
              </div>

              {/* Prep Time & Stock Availability */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                    Prep Time (Mins)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={productForm.prep_time_mins}
                    onChange={(e) => setProductForm({ ...productForm, prep_time_mins: e.target.value })}
                    className="w-full text-xs py-2.5 sm:py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                    Stock Availability
                  </label>
                  <select
                    value={productForm.is_available ? '1' : '0'}
                    onChange={(e) => setProductForm({ ...productForm, is_available: e.target.value === '1' })}
                    className="w-full text-xs py-2.5 sm:py-3 px-3 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] font-medium focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none cursor-pointer"
                  >
                    <option value="1">Available</option>
                    <option value="0">Sold Out</option>
                  </select>
                </div>
              </div>

              {/* Drag & Drop Image Uploader (Sharp Hairline Zone) */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                  Product Image (Drag &amp; Drop or Upload)
                </label>
                
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                  onDrop={handleImageDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 rounded-none ${
                    isDragging
                      ? 'border-[#C8681A] bg-[#C8681A]/10'
                      : productForm.image_url
                      ? 'border-emerald-400 bg-emerald-50/40'
                      : 'border-[#2B1B12]/20 bg-[#FAF5EE] hover:border-[#C8681A]'
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
                    <div className="flex items-center gap-2 py-3 text-xs font-semibold text-[#C8681A]">
                      <svg className="animate-spin h-4 w-4 text-[#C8681A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Uploading Image...</span>
                    </div>
                  ) : productForm.image_url ? (
                    <div className="relative group w-full flex items-center justify-between p-2 bg-white border border-[#2B1B12]/15 rounded-none">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={productForm.image_url}
                          alt="Product Preview"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80';
                          }}
                          className="w-12 h-12 object-cover border border-[#2B1B12]/15 shrink-0 rounded-none bg-[#FAF5EE]"
                        />
                        <div className="text-left text-xs truncate">
                          <span className="font-semibold text-emerald-800 block">✓ Image Selected</span>
                          <span className="text-[10px] text-[#7A695E] truncate block max-w-[220px]">{productForm.image_url}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProductForm({ ...productForm, image_url: '' });
                        }}
                        className="text-xs text-rose-700 font-semibold px-2.5 py-1 hover:bg-rose-50 cursor-pointer shrink-0 rounded-none"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="py-2 space-y-1">
                      <div className="text-xl">📸</div>
                      <div className="text-xs font-semibold text-[#2B1B12]">
                        Drag &amp; Drop image here, or <span className="text-[#C8681A] underline">browse file</span>
                      </div>
                      <div className="text-[10px] text-[#7A695E]">
                        Supports PNG, JPG, WEBP, GIF (Max 5MB)
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct URL Fallback */}
                <div className="mt-2">
                  <input
                    type="text"
                    value={productForm.image_url}
                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                    placeholder="Or paste image URL (https://...)"
                    className="w-full text-[11px] py-2 px-3 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] placeholder:text-[#9C8270] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1B12] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Rich aromatic espresso paired with creamy steamed milk..."
                  className="w-full text-xs py-2.5 sm:py-3 px-3.5 bg-[#FAF5EE] border border-[#2B1B12]/20 text-[#2B1B12] placeholder:text-[#9C8270] focus:bg-white focus:outline-none focus:border-[#C8681A] transition-colors rounded-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 py-3 px-5 text-xs font-semibold uppercase tracking-[0.18em] bg-[#FAF5EE] hover:bg-[#EFE8DD] text-[#2B1B12] border border-[#2B1B12]/20 cursor-pointer transition-colors rounded-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSaving}
                  className="flex-1 py-3 px-5 text-xs font-semibold uppercase tracking-[0.18em] bg-[#2B1B12] hover:bg-[#C8681A] text-[#FFF4E6] cursor-pointer transition-colors disabled:opacity-50 rounded-none shadow-xs"
                >
                  {formSaving ? 'Saving...' : editingProduct ? 'Save Delicacy' : 'Add to Menu'}
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
