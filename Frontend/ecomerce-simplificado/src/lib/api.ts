// src/lib/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products
export const getProducts = async () => {
  const response = await api.get('/produtos');
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

export const getProductCategories = async () => {
  const response = await api.get('/produtos/categorias');
  return response.data;
};

// Cart
export const getCart = async () => {
  const response = await api.get('/carrinho');
  return response.data;
};

export const addToCart = async (productId: number, quantity: number) => {
  const response = await api.post('/carrinho/itens', { 
    produto: productId, 
    produtoQuantidade: quantity,
    selecionado: true
  });
  return response.data;
};

export const updateCartItem = async (cartItemId: number, quantity: number, selected: boolean) => {
  const response = await api.put(`/carrinho/itens/${cartItemId}`, {
    produtoQuantidade: quantity,
    selecionado: selected
  });
  return response.data;
};

export const removeCartItem = async (cartItemId: number) => {
  const response = await api.delete(`/carrinho/itens/${cartItemId}`);
  return response.data;
};

// Orders
export const createOrder = async () => {
  const response = await api.post('/pedidos');
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/pedidos');
  return response.data;
};

export const getOrderById = async (id: number) => {
  const response = await api.get(`/pedidos/${id}`);
  return response.data;
};

// Auth
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, senha: password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const register = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export default api;