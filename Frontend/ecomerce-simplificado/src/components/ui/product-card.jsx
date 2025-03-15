'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

const ProductCard = ({ product, onAddToCart }) => {
  const [isWishlist, setIsWishlist] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Formatação de preço para o formato brasileiro
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  // Limita a descrição para não ficar muito grande no card
  const truncateDescription = (desc) => {
    if (typeof desc === 'string') {
      return desc.length > 100 ? desc.substring(0, 97) + '...' : desc
    }
    // Se a descrição for um objeto JSON, tenta extrair um texto representativo
    if (typeof desc === 'object') {
      return desc.texto || desc.summary || 'Sem descrição disponível'
    }
    return 'Sem descrição disponível'
  }

  return (
    <div 
      className="card overflow-hidden transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Imagem do Produto */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Link href={`/product/${product.idProduto}`}>
          <div className="h-full w-full relative">
            {product.imagem ? (
              <Image
                src={product.imagem}
                alt={product.titulo}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                <span className="text-gray-400 dark:text-gray-500">
                  Sem imagem
                </span>
              </div>
            )}
          </div>
        </Link>
        
        {/* Botão de Wishlist */}
        <button
          onClick={() => setIsWishlist(!isWishlist)}
          className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-gray-900 shadow-sm transition-colors hover:text-red-500 dark:bg-gray-800 dark:text-gray-100"
          aria-label={isWishlist ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isWishlist ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {/* Conteúdo do Card */}
      <div className="p-4">
        <Link href={`/product/${product.idProduto}`}>
          <h3 className="text-base font-medium line-clamp-1 mb-1 hover:text-primary-600 dark:hover:text-primary-400">
            {product.titulo}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {truncateDescription(product.descricao)}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold">{formatPrice(product.preco)}</span>
          
          <button
            onClick={() => onAddToCart(product)}
            className="rounded-full bg-primary-600 p-2 text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard