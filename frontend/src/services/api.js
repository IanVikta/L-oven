import axios from 'axios';

const PRIMARY_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const FALLBACK_URL = import.meta.env.VITE_API_FALLBACK_URL || 'http://localhost:8001/api';

// Dynamic default based on hostname
const defaultBaseURL = typeof window !== 'undefined' && window.location.hostname
  ? `http://${window.location.hostname}:8000/api`
  : PRIMARY_URL;

// Clear any cached wrong port from localStorage
if (typeof window !== 'undefined') {
  const cached = localStorage.getItem('active_api_url');
  if (cached && cached.includes(':8001')) {
    localStorage.removeItem('active_api_url');
  }
}

// Currently active base URL (persisted in session/memory)
let activeBaseUrl = localStorage.getItem('active_api_url') || defaultBaseURL;

const api = axios.create({
  baseURL: activeBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // For Laravel Sanctum CSRF cookie
});

// Create explicit instances for direct port targeting (8000 / 8001)
export const createPortInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export const api8000 = createPortInstance('http://localhost:8000/api');
export const api8001 = createPortInstance('http://localhost:8001/api');

// Request interceptor for main api instance
api.interceptors.request.use(
  (config) => {
    if (config.baseURL !== activeBaseUrl) {
      config.baseURL = activeBaseUrl;
    }

    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with automatic dual-port (8000 <-> 8001) failover
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    // Failover if network error OR if port 8000 returns 404 (e.g. another local app occupies 8000)
    const isNetworkError = !error.response;
    const isPort8000NotFound = error.response?.status === 404 && activeBaseUrl.includes(':8000');

    if ((isNetworkError || isPort8000NotFound) && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      const currentUrl = activeBaseUrl;
      const targetUrl = currentUrl.includes(':8000')
        ? currentUrl.replace(':8000', ':8001')
        : currentUrl.includes(':8001')
        ? currentUrl.replace(':8001', ':8000')
        : FALLBACK_URL;

      if (targetUrl !== currentUrl) {
        activeBaseUrl = targetUrl;
        localStorage.setItem('active_api_url', activeBaseUrl);
        api.defaults.baseURL = activeBaseUrl;
        originalRequest.baseURL = activeBaseUrl;

        try {
          return await api(originalRequest);
        } catch (retryError) {
          return Promise.reject(retryError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
