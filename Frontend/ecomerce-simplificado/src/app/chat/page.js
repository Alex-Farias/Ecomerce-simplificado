// src/app/chat/page.js (updated)
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CrudLayout from '@/components/layout/CrudLayout';
import { chatService, userService } from '@/services/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
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
        
        // Fetch chats
        const chatsData = await chatService.getAll();
        setChats(chatsData || []);
        
        // Fetch chat messages
        const messagesData = await chatService.getChatHistory();
        setChatMessages(messagesData || []);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching chats:', err);
        setError('Erro ao carregar chats. Por favor, tente novamente.');
        setChats([]);
        setChatMessages([]);
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

  if (chats.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Nenhuma conversa encontrada</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Não existem conversas cadastradas no sistema.</p>
        <Link 
          href="/chat/novo" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Iniciar Conversa
        </Link>
      </div>
    );
  }

  return (
    <CrudLayout title="Chats" createPath="/chat/novo">
      {/* Table content... */}
    </CrudLayout>
  );
}