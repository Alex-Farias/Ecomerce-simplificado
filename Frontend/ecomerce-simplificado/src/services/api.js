// src/services/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Helper for making API requests
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  // Get token from localStorage if it exists
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }
    
    return response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// User services - based on your Postman collection
export const userService = {
  getAll: async () => {
    return fetchAPI('/user/read/all');
  },
  getById: async (id) => {
    return fetchAPI(`/user/read/${id}`);
  },
  create: async (user) => {
    return fetchAPI('/user/create', {
      method: 'POST',
      body: JSON.stringify({
        name: user.nome,
        street: user.rua,
        streetNumber: user.numeroRua,
        email: user.email,
        password: user.senha,
        cpf: user.cpf || "",
        cnpj: user.cnpj || "",
        telephone: user.telefone || "",
        cellPhone: user.celular,
        perfil: user.perfil,
        isActive: user.ativo
      }),
    });
  },
  update: async (user) => {
    return fetchAPI('/user/update', {
      method: 'PUT',
      body: JSON.stringify({
        id: user.id,
        name: user.nome,
        street: user.rua,
        streetNumber: user.numeroRua,
        email: user.email,
        password: user.senha,
        cpf: user.cpf || "",
        cnpj: user.cnpj || "",
        telephone: user.telefone || "",
        cellPhone: user.celular,
        perfil: user.perfil,
        isActive: user.ativo
      }),
    });
  },
  delete: async (id) => {
    return fetchAPI(`/user/delete/${id}`, {
      method: 'DELETE',
    });
  },
  // User profile services
  getUserProfiles: async () => {
    return fetchAPI('/user/perfil/read/all');
  },
  getUserProfileById: async (id) => {
    return fetchAPI(`/user/perfil/read/${id}`);
  }
};

// Order services - based on your Postman collection
export const orderService = {
  getAll: async () => {
    return fetchAPI('/order/read');
  },
  getById: async (id) => {
    return fetchAPI(`/order/read/${id}`);
  },
  create: async (order) => {
    return fetchAPI('/order/create', {
      method: 'POST',
      body: JSON.stringify({
        user: order.usuario
      }),
    });
  },
  update: async (order) => {
    return fetchAPI('/order/update', {
      method: 'PUT',
      body: JSON.stringify({
        id: order.id,
        user: order.usuario
      }),
    });
  },
  delete: async (id) => {
    return fetchAPI(`/order/delete/${id}`, {
      method: 'DELETE',
    });
  },
  // Order items services
  getOrderItems: async () => {
    return fetchAPI('/order/item/read/all');
  },
  getOrderItemById: async (id) => {
    return fetchAPI(`/order/item/read/${id}`);
  },
  createOrderItem: async (item) => {
    return fetchAPI('/order/item/create', {
      method: 'POST',
      body: JSON.stringify({
        order: item.pedido,
        product: item.produto,
        productQuantity: item.produtoQuantidade,
        isActive: item.ativo
      }),
    });
  },
  // Order history services
  getOrderHistory: async () => {
    return fetchAPI('/order/history/read/all');
  }
};

// Chat services - based on your Postman collection
export const chatService = {
  getAll: async () => {
    return fetchAPI('/chat/read');
  },
  getById: async (id) => {
    return fetchAPI(`/chat/read/${id}`);
  },
  create: async (chat) => {
    return fetchAPI('/chat/create', {
      method: 'POST',
      body: JSON.stringify({
        user1: chat.usuario1,
        user2: chat.usuario2,
        description: chat.descricao,
        isActive: chat.ativo
      }),
    });
  },
  update: async (chat) => {
    return fetchAPI('/chat/update', {
      method: 'PUT',
      body: JSON.stringify({
        id: chat.id,
        user1: chat.usuario1,
        user2: chat.usuario2,
        description: chat.descricao,
        isActive: chat.ativo
      }),
    });
  },
  delete: async (id) => {
    return fetchAPI(`/chat/delete/${id}`, {
      method: 'DELETE',
    });
  },
  // Chat messages services
  getChatHistory: async () => {
    return fetchAPI('/chat/history/read/all');
  },
  getChatHistoryById: async (id) => {
    return fetchAPI(`/chat/history/read/${id}`);
  },
  sendMessage: async (message) => {
    return fetchAPI('/chat/history/create', {
      method: 'POST',
      body: JSON.stringify({
        chat: message.batePapo,
        message: message.mensagem,
        response: message.resposta || null,
        favorite: message.favorita,
        midia: message.midia || null
      }),
    });
  }
};