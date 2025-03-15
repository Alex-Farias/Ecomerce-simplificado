// src/context/cart-context.js
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './auth-context'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  // Buscar carrinho do usuário quando ele estiver logado
  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      // Se não tiver usuário, tenta carregar do localStorage
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    }
  }, [user])

  // Salvar carrinho no localStorage quando atualizar
  useEffect(() => {
    if (cart.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  // Buscar carrinho do servidor
  const fetchCart = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      // Simulando uma resposta
      const cartData = {
        items: [],
        total: 0
      }
      
      setCart(cartData)
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error)
    } finally {
      setLoading(false)
    }
  }

  // Adicionar item ao carrinho
  const addToCart = async (product, quantity = 1) => {
    setLoading(true)
    
    try {
      // Verificar se o produto já está no carrinho
      const existingItemIndex = cart.items.findIndex(
        item => item.produto === product.idProduto
      )
      
      let newItems = [...cart.items]
      
      if (existingItemIndex >= 0) {
        // Atualizar quantidade se já existe
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          produtoQuantidade: newItems[existingItemIndex].produtoQuantidade + quantity
        }
      } else {
        // Adicionar novo item
        newItems.push({
          produto: product.idProduto,
          produtoQuantidade: quantity,
          selecionado: true,
          // Adicionando dados do produto para exibição
          produtoInfo: {
            titulo: product.titulo,
            preco: product.preco,
            imagem: product.imagem || '/images/product-placeholder.png'
          }
        })
      }
      
      // Calcular novo total
      const total = newItems.reduce((sum, item) => {
        return sum + (item.produtoInfo.preco * item.produtoQuantidade)
      }, 0)
      
      const newCart = { items: newItems, total }
      
      setCart(newCart)
      return { success: true }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
      return { success: false, error: 'Erro ao adicionar ao carrinho' }
    } finally {
      setLoading(false)
    }
  }

  // Atualizar quantidade de um item
  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      return removeItem(productId)
    }
    
    setLoading(true)
    
    try {
      const newItems = cart.items.map(item => {
        if (item.produto === productId) {
          return { ...item, produtoQuantidade: quantity }
        }
        return item
      })
      
      const total = newItems.reduce((sum, item) => {
        return sum + (item.produtoInfo.preco * item.produtoQuantidade)
      }, 0)
      
      const newCart = { items: newItems, total }
      
      setCart(newCart)
      return { success: true }
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error)
      return { success: false, error: 'Erro ao atualizar quantidade' }
    } finally {
      setLoading(false)
    }
  }

  // Remover item do carrinho
  const removeItem = async (productId) => {
    setLoading(true)
    
    try {
      const newItems = cart.items.filter(item => item.produto !== productId)
      
      const total = newItems.reduce((sum, item) => {
        return sum + (item.produtoInfo.preco * item.produtoQuantidade)
      }, 0)
      
      const newCart = { items: newItems, total }
      
      setCart(newCart)
      return { success: true }
    } catch (error) {
      console.error('Erro ao remover item:', error)
      return { success: false, error: 'Erro ao remover item' }
    } finally {
      setLoading(false)
    }
  }

  // Limpar o carrinho
  const clearCart = async () => {
    setLoading(true)
    
    try {
      setCart({ items: [], total: 0 })
      localStorage.removeItem('cart')
      
      return { success: true }
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error)
      return { success: false, error: 'Erro ao limpar carrinho' }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    itemCount: cart.items.reduce((count, item) => count + item.produtoQuantidade, 0)
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Hook personalizado para facilitar o uso do contexto
export const useCart = () => {
  return useContext(CartContext)
}