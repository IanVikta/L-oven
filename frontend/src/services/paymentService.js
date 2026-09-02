import api from './api';

export const paymentService = {
  // Initiate Mobile Money STK Push
  async initiatePayment(data) {
    const response = await api.post('/v1/payments/initiate', data);
    return response.data;
  },

  // Poll payment status by transaction reference
  async getPaymentStatus(reference) {
    const response = await api.get(`/v1/payments/${reference}/status`);
    return response.data;
  },
};
