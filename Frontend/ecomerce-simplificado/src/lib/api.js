/**
 * Cliente de API para comunicação com o backend
 */

import axios from 'axios'

// URL base da API
const API_URL = 'http://localhost:3001'

// Instância do axios configurada com a URL base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para adicionar token de autenticação se disponível
api.interceptors.request.use(
  (config) => {
    // Verifica se está no browser antes de acessar localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * Objeto com métodos para cada entidade do sistema
 */
const apiClient = {
  // Usuários
  users: {
    getAll: () => api.get('/user/read/all'),
    getById: (id) => api.get(`/user/read/${id}`),
    create: (data) => api.post('/user/create', data),
    update: (data) => api.put('/user/update', data),
    delete: (id) => api.delete(`/user/delete/${id}`),
  },
  
  // Perfis de usuário
  userProfiles: {
    getAll: () => api.get('/user/perfil/read/all'),
    getById: (id) => api.get(`/user/perfil/read/${id}`),
    create: (data) => api.post('/user/perfil/create', data),
    update: (data) => api.put('/user/perfil/update', data),
    delete: (id) => api.delete(`/user/perfil/delete/${id}`),
  },
  
  // Produtos
  products: {
    getAll: () => api.get('/product/read'),
    getById: (id) => api.get(`/product/read/${id}`),
    create: (data) => api.post('/product/create', data),
    update: (data) => api.put('/product/update', data),
    delete: (id) => api.delete(`/product/delete/${id}`),
  },
  
  // Categorias de produtos
  categories: {
    getAll: () => api.get('/product/category/read/all'),
    getById: (id) => api.get(`/product/category/read/${id}`),
    create: (data) => api.post('/product/category/create', data),
    update: (data) => api.put('/product/category/update', data),
    delete: (id) => api.delete(`/product/category/delete/${id}`),
  },
  
  // Carrinho
  cart: {
    getAll: () => api.get('/cart/read'),
    getById: (id) => api.get(`/cart/read/${id}`),
    create: (data) => api.post('/cart/create', data),
    update: (data) => api.put('/cart/update', data),
    delete: (id) => api.delete(`/cart/delete/${id}`),
  },
  
  // Itens do carrinho
  cartItems: {
    getAll: () => api.get('/cart/item/read/all'),
    getById: (id) => api.get(`/cart/item/read/${id}`),
    create: (data) => api.post('/cart/item/create', data),
    update: (data) => api.put('/cart/item/update', data),
    delete: (id) => api.delete(`/cart/item/delete/${id}`),
  },
  
  // Pedidos
  orders: {
    getAll: () => api.get('/order/read'),
    getById: (id) => api.get(`/order/read/${id}`),
    create: (data) => api.post('/order/create', data),
    update: (data) => api.put('/order/update', data),
    delete: (id) => api.delete(`/order/delete/${id}`),
  },
  
  // Itens do pedido
  orderItems: {
    getAll: () => api.get('/order/item/read/all'),
    getById: (id) => api.get(`/order/item/read/${id}`),
    create: (data) => api.post('/order/item/create', data),
    update: (data) => api.put('/order/item/update', data),
    delete: (id) => api.delete(`/order/item/delete/${id}`),
  },
  
  // Histórico de pedidos
  orderHistory: {
    getAll: () => api.get('/order/history/read/all'),
    getById: (id) => api.get(`/order/history/read/${id}`),
    create: (data) => api.post('/order/history/create', data),
    update: (data) => api.put('/order/history/update', data),
    delete: (id) => api.delete(`/order/history/delete/${id}`),
  },
  
  // Chat
  chat: {
    getAll: () => api.get('/chat/read'),
    getById: (id) => api.get(`/chat/read/${id}`),
    create: (data) => api.post('/chat/create', data),
    update: (data) => api.put('/chat/update', data),
    delete: (id) => api.delete(`/chat/delete/${id}`),
  },
  
  // Histórico de chat
  chatHistory: {
    getAll: () => api.get('/chat/history/read/all'),
    getById: (id) => api.get(`/chat/history/read/${id}`),
    create: (data) => api.post('/chat/history/create', data),
    update: (data) => api.put('/chat/history/update', data),
    delete: (id) => api.delete(`/chat/history/delete/${id}`),
  },
  
  // Funções de autenticação (a implementar no backend)
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
    resetPassword: (token, newPassword) => 
      api.post('/auth/reset-password', { token, newPassword }),
  },
}

export default apiClient