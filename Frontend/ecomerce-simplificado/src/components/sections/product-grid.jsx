'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import ProductCard from '../ui/product-card'

const API_URL = 'http://localhost:3001'

const ProductGrid = ({ categoryId, limit }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        
        // Aqui faremos uma requisição para buscar os produtos
        // Em um ambiente real, você usaria a sua API
        // const response = await axios.get(`${API_URL}/product/read`)
        
        // Simulando dados de produtos para demonstração
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
            idProduto: 2,
            titulo: 'Notebook ABC',
            descricao: 'Notebook leve e potente para trabalho e lazer',
            preco: 3999.99,
            unidade: 'un',
            produtoCategoria: 1,
            imagem: '/images/product-placeholder.png'
          },
          {
            idProduto: 3,
            titulo: 'Tênis Esportivo',
            descricao: 'Tênis confortável para atividades físicas',
            preco: 299.99,
            unidade: 'par',
            produtoCategoria: 2,
            imagem: '/images/product-placeholder.png'
          },
          {
            idProduto: 4,
            titulo: 'Camiseta Casual',
            descricao: 'Camiseta de algodão confortável',
            preco: 79.99,
            unidade: 'un',
            produtoCategoria: 2,
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
            idProduto: 6,
            titulo: 'Cafeteira Elétrica',
            descricao: 'Cafeteira prática para o dia a dia',
            preco: 159.99,
            unidade: 'un',
            produtoCategoria: 3,
            imagem: '/images/product-placeholder.png'
          },
          {
            idProduto: 7,
            titulo: 'Livro de Programação',
            descricao: 'Aprenda a programar com este livro completo',
            preco: 89.99,
            unidade: 'un',
            produtoCategoria: 4,
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
          }
        ]
        
        // Filtrando por categoria se necessário
        let filteredProducts = simulatedData
        if (categoryId) {
          filteredProducts = simulatedData.filter(product => 
            product.produtoCategoria === parseInt(categoryId)
          )
        }
        
        // Limitando a quantidade se necessário
        if (limit) {
          filteredProducts = filteredProducts.slice(0, limit)
        }
        
        setProducts(filteredProducts)
      } catch (err) {
        console.error('Erro ao buscar produtos:', err)
        setError('Não foi possível carregar os produtos')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [categoryId, limit])

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-gray-200 dark:bg-gray-800 rounded-lg h-80"></div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchProducts} 
          className="mt-4 btn btn-primary px-4 py-2"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">Nenhum produto encontrado</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

export default ProductGrid