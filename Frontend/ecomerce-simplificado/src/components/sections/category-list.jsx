'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TagIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

const API_URL = 'http://localhost:3001'

const CategoryList = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        
        // Aqui faríamos uma requisição para buscar as categorias
        // Em um ambiente real, você usaria a sua API
        // const response = await axios.get(`${API_URL}/product/category/read/all`)
        
        // Simulando dados para demonstração
        const simulatedData = [
          {
            idProdutoCategoria: 1,
            descricao: 'Eletrônicos',
            ativo: true,
            icon: '📱'
          },
          {
            idProdutoCategoria: 2,
            descricao: 'Moda',
            ativo: true,
            icon: '👕'
          },
          {
            idProdutoCategoria: 3,
            descricao: 'Casa e Cozinha',
            ativo: true,
            icon: '🏠'
          },
          {
            idProdutoCategoria: 4,
            descricao: 'Livros',
            ativo: true,
            icon: '📚'
          },
          {
            idProdutoCategoria: 5,
            descricao: 'Esportes',
            ativo: true,
            icon: '⚽'
          },
          {
            idProdutoCategoria: 6,
            descricao: 'Beleza e Saúde',
            ativo: true,
            icon: '💄'
          }
        ]
        
        setCategories(simulatedData)
      } catch (err) {
        console.error('Erro ao buscar categorias:', err)
        setError('Não foi possível carregar as categorias')
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-pulse">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-200 dark:bg-gray-800 rounded-lg h-24"></div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 dark:text-gray-400">Nenhuma categoria encontrada</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link 
          key={category.idProdutoCategoria}
          href={`/category/${category.idProdutoCategoria}`}
          className="flex flex-col items-center justify-center h-32 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <span className="text-4xl mb-2">{category.icon}</span>
          <span className="text-center font-medium">{category.descricao}</span>
        </Link>
      ))}
    </div>
  )
}

export default CategoryList