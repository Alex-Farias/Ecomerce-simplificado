'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/cart-context'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import ProductCard from '../ui/product-card'

const API_URL = 'http://localhost:3001'

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        
        // Aqui faríamos uma requisição para buscar os produtos em destaque
        // Em um ambiente real, você usaria a sua API
        // const response = await axios.get(`${API_URL}/product/read/featured`)
        
        // Simulando dados para demonstração
        const simulatedData = [
          {
            idProduto: 1,
            titulo: 'Smartphone XYZ',
            descricao: 'Um smartphone incrível com ótima câmera e bateria',
            preco: 1999.99,
            unidade: 'un',
            produtoCategoria: 1,
            imagem: '/images/product-placeholder.png'
          },
          {
            idProduto: 5,
            titulo: 'Fone de Ouvido',
            descricao: 'Fone com cancelamento de ruído',
            preco: 499.99,
            unidade: 'un',
            produtoCategoria: 1,
            imagem: '/images/product-placeholder.png'
          },
          {
            idProduto: 8,
            titulo: 'Relógio Inteligente',
            descricao: 'Monitore sua saúde e receba notificações',
            preco: 799.99,
            unidade: 'un',
            produtoCategoria: 1,
            imagem: '/images/product-placeholder.png'
          },
          {
            idProduto: 2,
            titulo: 'Notebook ABC',
            descricao: 'Notebook leve e potente para trabalho e lazer',
            preco: 3999.99,
            unidade: 'un',
            produtoCategoria: 1,
            imagem: '/images/product-placeholder.png'
          }
        ]
        
        setProducts(simulatedData)
      } catch (err) {
        console.error('Erro ao buscar produtos em destaque:', err)
        setError('Não foi possível carregar os produtos em destaque')
      } finally {
        setLoading(false)
      }
    }
    
    fetchFeaturedProducts()
  }, [])

  // Função para adicionar produto ao carrinho
  const handleAddToCart = async (product) => {
    try {
      const result = await addToCart(product, 1)
      if (result.success) {
        toast.success(`${product.titulo} adicionado ao carrinho!`)
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error('Erro ao adicionar ao carrinho')
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-200 dark:bg-gray-800 rounded-lg h-80"></div>
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

  if (products.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 dark:text-gray-400">Nenhum produto em destaque</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.idProduto}
          product={product}
          onAddToCart={() => handleAddToCart(product)}
        />
      ))}
    </div>
  )
}

export default FeaturedProducts