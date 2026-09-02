import api from './api';

export const couponService = {
  // Validate promo coupon code
  async validateCoupon(code, subtotal) {
    const response = await api.post('/v1/coupons/validate', { code, subtotal });
    return response.data;
  },
};
