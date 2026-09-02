import api from './api';

export const reviewService = {
  // Fetch product ratings and customer reviews
  async getProductReviews(productId) {
    const response = await api.get(`/v1/products/${productId}/reviews`);
    return response.data;
  },

  // Submit product rating and review
  async submitReview(productId, rating, comment) {
    const response = await api.post(`/v1/products/${productId}/reviews`, { rating, comment });
    return response.data;
  },
};
