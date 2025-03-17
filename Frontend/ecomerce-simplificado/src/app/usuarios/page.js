// src/app/usuarios/page.js (updated)
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CrudLayout from '@/components/layout/CrudLayout';
import { userService } from '@/services/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfiles, setUserProfiles] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        // Fetch user profiles first to map profile IDs to names
        const profilesData = await userService.getUserProfiles();
        const profilesMap = {};
        profilesData.forEach(profile => {
          profilesMap[profile.idPerfil] = profile.descricao;
        });
        setUserProfiles(profilesMap);
        
        // Fetch users
        const data = await userService.getAll();
        setUsuarios(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Erro ao carregar usuários. Por favor, tente novamente.');
        setUsuarios([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Get user type (PF or PJ)
  const getUserType = (usuario) => {
    return usuario.cpf && usuario.cpf.trim() !== '' ? 'PF' : 'PJ';
  };

  // Get user document (CPF or CNPJ)
  const getUserDocument = (usuario) => {
    return (usuario.cpf && usuario.cpf.trim() !== '') ? usuario.cpf : 
           (usuario.cnpj && usuario.cnpj.trim() !== '') ? usuario.cnpj : '-';
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await userService.delete(id);
        setUsuarios(usuarios.filter(user => user.idUsuario !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Erro ao excluir usuário. Por favor, tente novamente.');
      }
    }
  };

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

  if (usuarios.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Nenhum usuário encontrado</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Não existem usuários cadastrados no sistema.</p>
        <Link 
          href="/usuarios/novo" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Cadastrar Usuário
        </Link>
      </div>
    );
  }

  return (
    <CrudLayout title="Usuários" createPath="/usuarios/novo">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tipo</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Documento</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Celular</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Perfil</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {usuarios.map((usuario) => (
              <tr key={usuario.idUsuario}>
                {/* Row content as before */}
                {/* ... */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CrudLayout>
  );
}