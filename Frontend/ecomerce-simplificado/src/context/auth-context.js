// src/context/auth-context.js
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Verificar se o usuário está logado ao carregar a página
  useEffect(() => {
    // Simulando a verificação do token armazenado
    const token = localStorage.getItem('token')
    if (token) {
      // Aqui você faria uma requisição para validar o token
      // Por enquanto, apenas simulamos pegando o usuário do localStorage
      const userData = JSON.parse(localStorage.getItem('user'))
      if (userData) {
        setUser(userData)
      }
    }
    setLoading(false)
  }, [])

  // Função de login
  const login = async (email, senha) => {
    try {
      // Aqui faríamos uma requisição POST para o endpoint de login
      // Simulando uma resposta de sucesso
      const usuarioSimulado = {
        idUsuario: 1,
        nome: 'Usuário Teste',
        email
      }
      
      // Armazenar token e usuário no localStorage
      localStorage.setItem('token', 'token-simulado')
      localStorage.setItem('user', JSON.stringify(usuarioSimulado))
      
      setUser(usuarioSimulado)
      return { success: true }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao fazer login'
      }
    }
  }

  // Função de logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/login')
  }

  // Função de registro
  const register = async (userData) => {
    try {
      // Simulando registro
      console.log('Dados de registro:', userData)
      return { success: true }
    } catch (error) {
      console.error('Erro ao registrar:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao registrar'
      }
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para facilitar o uso do contexto
export const useAuth = () => {
  return useContext(AuthContext)
}