import api from './api';

export const productService = {
  // Get all categories
  async getCategories() {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get all products (with optional filters)
  async getProducts(params = {}) {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get single product by ID
  async getProduct(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get featured products
  async getFeaturedProducts() {
    const response = await api.get('/products/featured');
    return response.data;
  },

  // Search products
  async searchProducts(query) {
    const response = await api.get('/products/search', { params: { q: query } });
    return response.data;
  },
};
