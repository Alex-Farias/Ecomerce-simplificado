// src/app/account/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Login schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Registration schema
const registerSchema = z.object({
  nome: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  senha: z.string().min(6, 'Password must be at least 6 characters'),
  confirmarSenha: z.string().min(6, 'Password must be at least 6 characters'),
  rua: z.string().min(2, 'Street must be at least 2 characters'),
  numeroRua: z.string().transform(val => parseInt(val)),
  celular: z.string().min(10, 'Mobile number must be at least 10 characters'),
  telefone: z.string().optional(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  usuarioPerfil: z.number().default(1), // Default to basic user profile
  ativo: z.boolean().default(true),
}).refine(data => data.senha === data.confirmarSenha, {
  message: "Passwords don't match",
  path: ["confirmarSenha"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AccountPage() {
  const { user, login, register: registerUser } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const router = useRouter();
  
  // Login form
  const { 
    register: loginRegister, 
    handleSubmit: handleLoginSubmit, 
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  
  // Register form
  const { 
    register: registerFormRegister, 
    handleSubmit: handleRegisterSubmit, 
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting } 
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  
  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      router.push('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  // If user is logged in, show account details
  if (user) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Account Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg">{user.nome}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg">{user.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="text-lg">{user.celular}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-lg">{user.telefone || '-'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">CPF</p>
                <p className="text-lg">{user.cpf || '-'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">CNPJ</p>
                <p className="text-lg">{user.cnpj || '-'}</p>
              </div>
            </div>
            
            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Street</p>
                <p className="text-lg">{user.rua}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Number</p>
                <p className="text-lg">{user.numeroRua}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        {/* Order History */}
        <div className="mt-8">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Order History</h2>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <p className="text-gray-500">No orders yet.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // If not logged in, show login/register form
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-6 py-3 w-1/2 font-medium text-sm ${
                activeTab === 'login'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`px-6 py-3 w-1/2 font-medium text-sm ${
                activeTab === 'register'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...loginRegister('email')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {loginErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{loginErrors.email.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...loginRegister('password')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {loginErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{loginErrors.password.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoginSubmitting}
                className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoginSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="nome"
                    type="text"
                    {...registerFormRegister('nome')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {registerErrors.nome && (
                    <p className="mt-1 text-sm text-red-600">{registerErrors.nome.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...registerFormRegister('email')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {registerErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{registerErrors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="senha"
                    type="password"
                    {...registerFormRegister('senha')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {registerErrors.senha && (
                    <p className="mt-1 text-sm text-red-600">{registerErrors.senha.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmarSenha"
                    type="password"
                    {...registerFormRegister('confirmarSenha')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {registerErrors.confirmarSenha && (
                    <p className="mt-1 text-sm text-red-600">{registerErrors.confirmarSenha.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="rua" className="block text-sm font-medium text-gray-700 mb-1">
                    Street
                  </label>
                  <input
                    id="rua"
                    type="text"
                    {...registerFormRegister('rua')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {registerErrors.rua && (
                    <p className="mt-1 text-sm text-red-600">{registerErrors.rua.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="numeroRua" className="block text-sm font-medium text-gray-700 mb-1">
                    Number
                  </label>
                  <input
                    id="numeroRua"
                    type="number"
                    {...registerFormRegister('numeroRua')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {registerErrors.numeroRua && (
                    <p className="mt-1 text-sm text-red-600">{registerErrors.numeroRua.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="celular" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile (required)
                  </label>
                  <input
                    id="celular"
                    type="tel"
                    {...registerFormRegister('celular')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {registerErrors.celular && (
                    <p className="mt-1 text-sm text-red-600">{registerErrors.celular.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (optional)
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    {...registerFormRegister('telefone')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {registerErrors.telefone && (
                    <p className="mt-1 text-sm text-red-600">{registerErrors.telefone.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                    CPF (optional)
                  </label>
                  <input
                    id="cpf"
                    type="text"
                    {...registerFormRegister('cpf')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {registerErrors.cpf && (
                    <p className="mt-1 text-sm text-red-600">{registerErrors.cpf.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-1">
                    CNPJ (optional)
                  </label>
                  <input
                    id="cnpj"
                    type="text"
                    {...registerFormRegister('cnpj')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {registerErrors.cnpj && (
                    <p className="mt-1 text-sm text-red-600">{registerErrors.cnpj.message}</p>
                  )}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isRegisterSubmitting}
                className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isRegisterSubmitting ? 'Creating Account...' : 'Register'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}