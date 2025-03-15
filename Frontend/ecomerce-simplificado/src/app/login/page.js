'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/auth-context'
import { toast } from 'react-hot-toast'

const LoginPage = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.senha) {
      toast.error('Por favor, preencha todos os campos')
      return
    }
    
    try {
      setLoading(true)
      const { success, error } = await login(formData.email, formData.senha)
      
      if (success) {
        toast.success('Login realizado com sucesso!')
        router.push('/')
      } else {
        toast.error(error || 'Credenciais inválidas')
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err)
      toast.error('Ocorreu um erro ao tentar fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Entre com suas credenciais para acessar sua conta
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="seu@email.com"
              />
            </div>

            <div className="form-group">
              <div className="flex items-center justify-between">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <input
                id="senha"
                name="senha"
                type="password"
                autoComplete="current-password"
                required
                value={formData.senha}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary w-full py-2"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  Ou continue com
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="btn btn-outline w-full py-2 flex items-center justify-center"
              >
                Google
              </button>
              <button
                type="button"
                className="btn btn-outline w-full py-2 flex items-center justify-center"
              >
                Facebook
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Não tem uma conta?{' '}
              <Link
                href="/register"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage