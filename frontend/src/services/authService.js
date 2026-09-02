import api from './api';

export const authService = {
  // Register new user
  async register(data) {
    const response = await api.post('/v1/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Login
  async login(credentials) {
    const response = await api.post('/v1/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Logout
  async logout() {
    try {
      await api.post('/v1/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  // Get current user profile
  async getCurrentUser() {
    const response = await api.get('/v1/auth/me');
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
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
