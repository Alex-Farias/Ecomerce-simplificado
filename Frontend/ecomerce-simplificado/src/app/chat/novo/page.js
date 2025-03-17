// src/app/chat/novo/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormLayout from '@/components/layout/FormLayout';
import { chatService, userService } from '@/services/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function NovoChatPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    usuario1: '',
    usuario2: '',
    descricao: '',
    ativo: true
  });

  useEffect(() => {
    // Fetch users
    async function fetchUsers() {
      try {
        const usersData = await userService.getAll();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoadingUsers(false);
      }
    }

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (formData.usuario1 === formData.usuario2) {
      alert('Os usuários não podem ser os mesmos!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Map formData to API expected format
      const chatData = {
        usuario1: parseInt(formData.usuario1, 10),
        usuario2: parseInt(formData.usuario2, 10),
        descricao: formData.descricao,
        ativo: formData.ativo
      };
      
      await chatService.create(chatData);
      router.push('/chat');
    } catch (error) {
      console.error('Error creating chat:', error);
      alert('Erro ao criar chat. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingUsers) {
    return (
      <div className="flex justify-center items-center p-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <FormLayout 
      title="Novo Chat" 
      backPath="/chat"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Informações do Chat</h3>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Usuário 1*</label>
          <select 
            name="usuario1" 
            value={formData.usuario1}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Selecione um usuário</option>
            {users.map(user => (
              <option key={user.idUsuario} value={user.idUsuario}>
                {user.nome}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Usuário 2*</label>
          <select 
            name="usuario2" 
            value={formData.usuario2}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Selecione um usuário</option>
            {users.map(user => (
              <option key={user.idUsuario} value={user.idUsuario}>
                {user.nome}
              </option>
            ))}
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição*</label>
          <textarea 
            name="descricao" 
            value={formData.descricao}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <div className="flex items-center h-full">
            <input 
              type="checkbox" 
              id="ativo" 
              name="ativo" 
              checked={formData.ativo}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="ativo" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Chat Ativo</label>
          </div>
        </div>
      </div>
    </FormLayout>
  );
}