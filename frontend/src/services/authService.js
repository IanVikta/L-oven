import api from './api';

export const authService = {
  // Get CSRF cookie (required for Sanctum)
  async getCsrfCookie() {
    await api.get('/sanctum/csrf-cookie');
  },

  // Register new user
  async register(data) {
    await this.getCsrfCookie();
    const response = await api.post('/register', data);
    return response.data;
  },

  // Login
  async login(credentials) {
    await this.getCsrfCookie();
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Logout
  async logout() {
    try {
      await api.post('/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  // Get current user
  async getCurrentUser() {
    const response = await api.get('/user');
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },

  // Get stored user
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};
