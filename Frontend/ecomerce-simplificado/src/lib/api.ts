// src/lib/api.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_ROUTES } from './api-routes';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/account?session=expired';
      }
    }
    return Promise.reject(error);
  }
);

// Generic API functions with error handling
const apiService = {
  // Generic GET request
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await api.get(url, config);
      return response.data;
    } catch (error) {
      console.error(`GET request to ${url} failed:`, error);
      throw error;
    }
  },

  // Generic POST request
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`POST request to ${url} failed:`, error);
      throw error;
    }
  },

  // Generic PUT request
  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`PUT request to ${url} failed:`, error);
      throw error;
    }
  },

  // Generic DELETE request
  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await api.delete(url, config);
      return response.data;
    } catch (error) {
      console.error(`DELETE request to ${url} failed:`, error);
      throw error;
    }
  },
};

// Auth service functions
export const login = async (email: string, password: string) => {
  const response = await apiService.post(API_ROUTES.AUTH.LOGIN, { email, senha: password });
  if (response.token) {
    localStorage.setItem('token', response.token);
  }
  return response;
};

export const register = async (userData: any) => {
  return await apiService.post(API_ROUTES.USER.CREATE, userData);
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Product service functions
export const getProducts = async () => {
  return await apiService.get(API_ROUTES.PRODUCT.READ_ALL);
};

export const getProductById = async (id: number) => {
  return await apiService.get(API_ROUTES.PRODUCT.READ(id));
};

export const getProductCategories = async () => {
  return await apiService.get(API_ROUTES.PRODUCT_CATEGORY.READ_ALL);
};

export const createProduct = async (product: any) => {
  return await apiService.post(API_ROUTES.PRODUCT.CREATE, product);
};

export const updateProduct = async (product: any) => {
  return await apiService.put(API_ROUTES.PRODUCT.UPDATE, product);
};

export const deleteProduct = async (id: number) => {
  return await apiService.delete(API_ROUTES.PRODUCT.DELETE(id));
};

// Cart service functions
export const getCart = async () => {
  return await apiService.get(API_ROUTES.CART.READ_ALL);
};

export const addToCart = async (productId: number, quantity: number) => {
  return await apiService.post(API_ROUTES.CART_ITEM.CREATE, { 
    produto: productId, 
    produtoQuantidade: quantity,
    selecionado: true
  });
};

export const updateCartItem = async (cartItemId: number, quantity: number, selected: boolean) => {
  return await apiService.put(API_ROUTES.CART_ITEM.UPDATE, {
    idCarrinhoItem: cartItemId,
    produtoQuantidade: quantity,
    selecionado: selected
  });
};

export const removeCartItem = async (cartItemId: number) => {
  return await apiService.delete(API_ROUTES.CART_ITEM.DELETE(cartItemId));
};

// Order service functions
export const createOrder = async () => {
  return await apiService.post(API_ROUTES.ORDER.CREATE);
};

export const getOrders = async () => {
  return await apiService.get(API_ROUTES.ORDER.READ_ALL);
};

export const getOrderById = async (id: number) => {
  return await apiService.get(API_ROUTES.ORDER.READ(id));
};

export const getOrderHistory = async (orderId: number) => {
  return await apiService.get(API_ROUTES.ORDER_HISTORY.READ(orderId));
};

// Chat service functions
export const getChats = async () => {
  return await apiService.get(API_ROUTES.CHAT.READ_ALL);
};

export const getChatById = async (id: number) => {
  return await apiService.get(API_ROUTES.CHAT.READ(id));
};

export const getChatHistory = async (chatId: number) => {
  return await apiService.get(API_ROUTES.CHAT_HISTORY.READ_ALL);
};

export const sendChatMessage = async (chatId: number, message: string) => {
  return await apiService.post(API_ROUTES.CHAT_HISTORY.CREATE, {
    batePapo: chatId,
    mensagem: message,
  });
};

export default api;