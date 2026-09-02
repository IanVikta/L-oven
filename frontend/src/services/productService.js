import api from './api';

export const productService = {
  // Get all active categories
  async getCategories() {
    const response = await api.get('/v1/categories');
    return response.data;
  },

  // Get all products (with optional category, featured, search filters)
  async getProducts(params = {}) {
    const response = await api.get('/v1/products', { params });
    return response.data;
  },

  // Get single product detail by slug
  async getProduct(slug) {
    const response = await api.get(`/v1/products/${slug}`);
    return response.data;
  },

  // Get featured products
  async getFeaturedProducts() {
    const response = await api.get('/v1/products', { params: { featured: 1 } });
    return response.data;
  },

  // Search products
  async searchProducts(query) {
    const response = await api.get('/v1/products', { params: { search: query } });
    return response.data;
  },
};
