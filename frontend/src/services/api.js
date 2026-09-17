import axios from 'axios';

const defaultBaseURL = typeof window !== 'undefined' && window.location.hostname
  ? `http://${window.location.hostname}:8000/api`
  : 'http://localhost:8000/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultBaseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // For Laravel Sanctum CSRF cookie
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally and fallback between port 8000/8001
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Auto-fallback between port 8000 and 8001 on network error
    if (
      (!error.response || error.code === 'ERR_NETWORK') &&
      originalRequest &&
      !originalRequest._portRetried
    ) {
      originalRequest._portRetried = true;
      const currentURL = originalRequest.baseURL || api.defaults.baseURL || '';

      let nextBaseURL = null;
      if (currentURL.includes(':8000')) {
        nextBaseURL = currentURL.replace(':8000', ':8001');
      } else if (currentURL.includes(':8001')) {
        nextBaseURL = currentURL.replace(':8001', ':8000');
      }

      if (nextBaseURL) {
        api.defaults.baseURL = nextBaseURL;
        originalRequest.baseURL = nextBaseURL;
        return axios(originalRequest);
      }
    }

    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
