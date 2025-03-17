// src/app/pedidos/novo/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormLayout from '@/components/layout/FormLayout';
import { orderService, userService } from '@/services/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function NovoPedidoPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    usuario: ''
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
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      // Map formData to API expected format
      const orderData = {
        usuario: parseInt(formData.usuario, 10)
      };
      
      await orderService.create(orderData);
      router.push('/pedidos');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erro ao criar pedido. Por favor, tente novamente.');
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
      title="Novo Pedido" 
      backPath="/pedidos"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Informações do Pedido</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Crie um novo pedido selecionando o cliente. Após a criação, você poderá adicionar itens ao pedido.
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cliente*</label>
          <select 
            name="usuario" 
            value={formData.usuario}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Selecione um cliente</option>
            {users.map(user => (
              <option key={user.idUsuario} value={user.idUsuario}>
                {user.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
    </FormLayout>
  );
}