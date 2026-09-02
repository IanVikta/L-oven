import api from './api';

export const adminService = {
  // Live Kitchen/Barista Order Stream
  async getAdminOrders(params = {}) {
    const response = await api.get('/v1/admin/orders', { params });
    return response.data;
  },

  // Advance or change order status
  async updateOrderStatus(orderId, status, notes = '') {
    const response = await api.patch(`/v1/admin/orders/${orderId}/status`, { status, notes });
    return response.data;
  },

  // Product Inventory List
  async getAdminProducts() {
    const response = await api.get('/v1/admin/products');
    return response.data;
  },

  // Toggle Stock Availability
  async toggleAvailability(productId) {
    const response = await api.patch(`/v1/admin/products/${productId}/availability`);
    return response.data;
  },

  // Create Product
  async createProduct(productData) {
    const response = await api.post('/v1/admin/products', productData);
    return response.data;
  },

  // Sales Analytics Report
  async getSalesReport() {
    const response = await api.get('/v1/admin/reports/sales');
    return response.data;
  },
};
