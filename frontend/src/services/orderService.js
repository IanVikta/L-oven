import api from './api';

export const orderService = {
  // Submit new order (supports guest and auth)
  async createOrder(orderData) {
    const response = await api.post('/v1/orders', orderData);
    return response.data;
  },

  // Get customer order history (auth required)
  async getOrders() {
    const response = await api.get('/v1/orders');
    return response.data;
  },

  // Track live order by order number
  async trackOrder(orderNumber) {
    const response = await api.get(`/v1/orders/track/${orderNumber}`);
    return response.data;
  },

  // Get redeemable rewards
  async getRewards() {
    const response = await api.get('/v1/loyalty/rewards');
    return response.data;
  },
};
