// src/app/usuarios/novo/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormLayout from '@/components/layout/FormLayout';
import { userService } from '@/services/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function NovoUsuarioPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(true);
  const [perfis, setPerfis] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipoPessoa: 'PF',
    cpf: '',
    cnpj: '',
    telefone: '',
    celular: '',
    rua: '',
    numeroRua: '',
    perfil: '',
    ativo: true
  });

  useEffect(() => {
    // Fetch user profiles
    async function fetchProfiles() {
      try {
        const profiles = await userService.getUserProfiles();
        setPerfis(profiles);
        // Set default value for perfil if profiles are loaded
        if (profiles && profiles.length > 0) {
          setFormData(prev => ({
            ...prev,
            perfil: profiles[0].idPerfil
          }));
        }
      } catch (error) {
        console.error('Error fetching user profiles:', error);
      } finally {
        setIsLoadingProfiles(false);
      }
    }

    fetchProfiles();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTipoPessoaChange = (e) => {
    const tipoPessoa = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      tipoPessoa,
      cpf: tipoPessoa === 'PF' ? prevData.cpf : '',
      cnpj: tipoPessoa === 'PJ' ? prevData.cnpj : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Map formData to API expected format
      const userData = {
        nome: formData.nome,
        rua: formData.rua,
        numeroRua: parseInt(formData.numeroRua, 10),
        email: formData.email,
        senha: formData.senha,
        cpf: formData.tipoPessoa === 'PF' ? formData.cpf : '',
        cnpj: formData.tipoPessoa === 'PJ' ? formData.cnpj : '',
        telefone: formData.telefone,
        celular: formData.celular,
        perfil: parseInt(formData.perfil, 10),
        ativo: formData.ativo
      };
      
      await userService.create(userData);
      router.push('/usuarios');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Erro ao criar usuário. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProfiles) {
    return (
      <div className="flex justify-center items-center p-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <FormLayout 
      title="Novo Usuário" 
      backPath="/usuarios"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Informações Básicas</h3>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome*</label>
          <input 
            type="text" 
            name="nome" 
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email*</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha*</label>
          <input 
            type="password" 
            name="senha" 
            value={formData.senha}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmar Senha*</label>
          <input 
            type="password" 
            name="confirmarSenha" 
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 mt-4">Tipo de Pessoa</h3>
        </div>
        
        <div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="tipoPF" 
                name="tipoPessoa" 
                value="PF" 
                checked={formData.tipoPessoa === 'PF'}
                onChange={handleTipoPessoaChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
              />
              <label htmlFor="tipoPF" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Pessoa Física</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="tipoPJ" 
                name="tipoPessoa" 
                value="PJ" 
                checked={formData.tipoPessoa === 'PJ'}
                onChange={handleTipoPessoaChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
              />
              <label htmlFor="tipoPJ" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Pessoa Jurídica</label>
            </div>
          </div>
        </div>
        
        <div>
          {formData.tipoPessoa === 'PF' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CPF*</label>
              <input 
                type="text" 
                name="cpf" 
                value={formData.cpf}
                onChange={handleChange}
                required
                placeholder="000.000.000-00"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CNPJ*</label>
              <input 
                type="text" 
                name="cnpj" 
                value={formData.cnpj}
                onChange={handleChange}
                required
                placeholder="00.000.000/0000-00"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          )}
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 mt-4">Contato e Endereço</h3>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefone</label>
          <input 
            type="text" 
            name="telefone" 
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(00) 0000-0000"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Celular*</label>
          <input 
            type="text" 
            name="celular" 
            value={formData.celular}
            onChange={handleChange}
            required
            placeholder="(00) 00000-0000"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rua*</label>
          <input 
            type="text" 
            name="rua" 
            value={formData.rua}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número*</label>
          <input 
            type="number" 
            name="numeroRua" 
            value={formData.numeroRua}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 mt-4">Informações Adicionais</h3>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Perfil de Usuário*</label>
          <select 
            name="perfil" 
            value={formData.perfil}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Selecione um perfil</option>
            {perfis.map(perfil => (
              <option key={perfil.idPerfil} value={perfil.idPerfil}>
                {perfil.descricao}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <div className="flex items-center h-full pt-6">
            <input 
              type="checkbox" 
              id="ativo" 
              name="ativo" 
              checked={formData.ativo}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="ativo" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Usuário Ativo</label>
          </div>
        </div>
      </div>
    </FormLayout>
  );
}