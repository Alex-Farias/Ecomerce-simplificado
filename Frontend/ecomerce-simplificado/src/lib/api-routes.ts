// src/lib/api-routes.ts
/**
 * This service centralizes all API routes in one place
 * for easier management and updates
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Helper function to build URLs
const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

export const API_ROUTES = {
  // Authentication
  AUTH: {
    LOGIN: buildUrl('/auth/login'),
    REGISTER: buildUrl('/auth/register'),
    ME: buildUrl('/auth/me'),
  },
  
  // User endpoints
  USER: {
    CREATE: buildUrl('/user/create'),
    READ: (id: number | string) => buildUrl(`/user/read/${id}`),
    READ_ALL: buildUrl('/user/read/all'),
    UPDATE: buildUrl('/user/update'),
    DELETE: (id: number | string) => buildUrl(`/user/delete/${id}`),
  },
  
  // User Profile
  USER_PROFILE: {
    CREATE: buildUrl('/user/perfil/create'),
    READ: (id: number | string) => buildUrl(`/user/perfil/read/${id}`),
    READ_ALL: buildUrl('/user/perfil/read/all'),
    UPDATE: buildUrl('/user/perfil/update'),
    DELETE: (id: number | string) => buildUrl(`/user/perfil/delete/${id}`),
  },
  
  // Product endpoints
  PRODUCT: {
    CREATE: buildUrl('/product/create'),
    READ: (id: number | string) => buildUrl(`/product/read/${id}`),
    READ_ALL: buildUrl('/product/read/all'),
    UPDATE: buildUrl('/product/update'),
    DELETE: (id: number | string) => buildUrl(`/product/delete/${id}`),
  },
  
  // Product Category
  PRODUCT_CATEGORY: {
    CREATE: buildUrl('/product/category/create'),
    READ: (id: number | string) => buildUrl(`/product/category/read/${id}`),
    READ_ALL: buildUrl('/product/category/read/all'),
    UPDATE: buildUrl('/product/category/update'),
    DELETE: (id: number | string) => buildUrl(`/product/category/delete/${id}`),
  },
  
  // Cart endpoints
  CART: {
    CREATE: buildUrl('/cart/create'),
    READ: (id: number | string) => buildUrl(`/cart/read/${id}`),
    READ_ALL: buildUrl('/cart/read/all'),
    UPDATE: buildUrl('/cart/update'),
    DELETE: (id: number | string) => buildUrl(`/cart/delete/${id}`),
  },
  
  // Cart Item
  CART_ITEM: {
    CREATE: buildUrl('/cart/item/create'),
    READ: (id: number | string) => buildUrl(`/cart/item/read/${id}`),
    READ_ALL: buildUrl('/cart/item/read/all'),
    UPDATE: buildUrl('/cart/item/update'),
    DELETE: (id: number | string) => buildUrl(`/cart/item/delete/${id}`),
  },
  
  // Order endpoints
  ORDER: {
    CREATE: buildUrl('/order/create'),
    READ: (id: number | string) => buildUrl(`/order/read/${id}`),
    READ_ALL: buildUrl('/order/read/all'),
    UPDATE: buildUrl('/order/update'),
    DELETE: (id: number | string) => buildUrl(`/order/delete/${id}`),
  },
  
  // Order Item
  ORDER_ITEM: {
    CREATE: buildUrl('/order/item/create'),
    READ: (id: number | string) => buildUrl(`/order/item/read/${id}`),
    READ_ALL: buildUrl('/order/item/read/all'),
    UPDATE: buildUrl('/order/item/update'),
    DELETE: (id: number | string) => buildUrl(`/order/item/delete/${id}`),
  },
  
  // Order History
  ORDER_HISTORY: {
    CREATE: buildUrl('/order/history/create'),
    READ: (id: number | string) => buildUrl(`/order/history/read/${id}`),
    READ_ALL: buildUrl('/order/history/read/all'),
    UPDATE: buildUrl('/order/history/update'),
    DELETE: (id: number | string) => buildUrl(`/order/history/delete/${id}`),
  },
  
  // Chat endpoints
  CHAT: {
    CREATE: buildUrl('/chat/create'),
    READ: (id: number | string) => buildUrl(`/chat/read/${id}`),
    READ_ALL: buildUrl('/chat/read/all'),
    UPDATE: buildUrl('/chat/update'),
    DELETE: (id: number | string) => buildUrl(`/chat/delete/${id}`),
  },
  
  // Chat History
  CHAT_HISTORY: {
    CREATE: buildUrl('/chat/history/create'),
    READ: (id: number | string) => buildUrl(`/chat/history/read/${id}`),
    READ_ALL: buildUrl('/chat/history/read/all'),
    UPDATE: buildUrl('/chat/history/update'),
    DELETE: (id: number | string) => buildUrl(`/chat/history/delete/${id}`),
  },
};

export default API_ROUTES;