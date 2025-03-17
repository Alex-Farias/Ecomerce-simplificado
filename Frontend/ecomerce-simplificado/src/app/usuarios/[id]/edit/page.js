// src/app/usuarios/new/page.js or src/app/usuarios/[id]/edit/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormLayout from '@/components/layout/FormLayout';

export default function UsuarioFormPage({ params }) {
  const router = useRouter();
  const isEditing = params?.id;
  
  const [isLoading, setIsLoading] = useState(false);
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
    perfil: '1', // Default to Cliente
    ativo: true
  });

  const [perfis, setPerfis] = useState([
    { id: 1, descricao: 'Cliente' },
    { id: 2, descricao: 'Vendedor' },
    { id: 3, descricao: 'Administrador' }
  ]);

  useEffect(() => {
    if (isEditing) {
      // Fetch user data if in edit mode
      setIsLoading(true);
      
      // Simulating API fetch
      setTimeout(() => {
        // Mock data for demo
        setFormData({
          nome: 'João Silva',
          email: 'joao@example.com',
          senha: '',
          confirmarSenha: '',
          tipoPessoa: 'PF',
          cpf: '123.456.789-00',
          cnpj: '',
          telefone: '(11) 5555-5555',
          celular: '(11) 99999-8888',
          rua: 'Rua das Flores',
          numeroRua: '123',
          perfil: '1',
          ativo: true
        });
        setIsLoading(false);
      }, 500);
    }
  }, [isEditing]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      setIsLoading(false);
      return;
    }
    
    // Simulating API call
    console.log('Form data to submit:', formData);
    
    setTimeout(() => {
      setIsLoading(false);
      router.push('/usuarios');
    }, 1000);
  };

  return (
    <FormLayout 
      title={isEditing ? 'Editar Usuário' : 'Novo Usuário'} 
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha{!isEditing && '*'}</label>
          <input 
            type="password" 
            name="senha" 
            value={formData.senha}
            onChange={handleChange}
            required={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {isEditing && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Deixe em branco para manter a senha atual</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmar Senha{!isEditing && '*'}</label>
          <input 
            type="password" 
            name="confirmarSenha" 
            value={formData.confirmarSenha}
            onChange={handleChange}
            required={!isEditing}
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
            {perfis.map(perfil => (
              <option key={perfil.id} value={perfil.id}>{perfil.descricao}</option>
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