// src/app/pedidos/page.js (updated)
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CrudLayout from '@/components/layout/CrudLayout';
import { orderService, userService } from '@/services/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        
        // Fetch users to map user IDs to names
        const usersData = await userService.getAll();
        const usersMap = {};
        usersData.forEach(user => {
          usersMap[user.idUsuario] = user.nome;
        });
        setUsers(usersMap);
        
        // Fetch orders
        const ordersData = await orderService.getAll();
        setPedidos(ordersData || []);
        
        // Fetch order items
        const orderItemsData = await orderService.getOrderItems();
        setOrderItems(orderItemsData || []);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Erro ao carregar pedidos. Por favor, tente novamente.');
        setPedidos([]);
        setOrderItems([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Other functions...

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
        <p className="text-red-500 dark:text-red-400 text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Nenhum pedido encontrado</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Não existem pedidos cadastrados no sistema.</p>
        <Link 
          href="/pedidos/novo" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Criar Pedido
        </Link>
      </div>
    );
  }

  return (
    <CrudLayout title="Pedidos" createPath="/pedidos/novo">
      {/* Table content... */}
    </CrudLayout>
  );
}