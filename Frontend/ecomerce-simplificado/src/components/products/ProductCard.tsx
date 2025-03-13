// src/components/products/ProductCard.tsx
'use client';

import { Product } from '@/types/product';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    try {
      await addItem(product.idProduto, 1);
      // Show a small success animation or feedback
      const button = e.currentTarget as HTMLButtonElement;
      button.classList.add('animate-success');
      setTimeout(() => {
        button.classList.remove('animate-success');
      }, 1000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Format price
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.preco);

  // Get short description
  const shortDescription = typeof product.descricao === 'string' 
    ? product.descricao.substring(0, 60) + (product.descricao.length > 60 ? '...' : '')
    : (product.descricao?.shortDescription || 'No description available');

  return (
    <Link 
      href={`/products/${product.idProduto}`}
      className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
    >
      <div className="relative">
        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md z-10 text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400" : ""} />
        </button>
        
        {/* Product image */}
        <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 dark:bg-gray-700 group-hover:opacity-90 transition-opacity">
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-gray-800">
            <span className="text-indigo-300 dark:text-indigo-600 text-lg font-medium">{product.titulo.substring(0, 1)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {/* Product title */}
        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {product.titulo}
        </h3>
        
        {/* Product description */}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
          {shortDescription}
        </p>
        
        {/* Price and add to cart */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {formattedPrice}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="p-2 rounded-full bg-indigo-600 dark:bg-indigo-700 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors shadow-sm hover:shadow"
            aria-label="Add to cart"
          >
            {isAdding ? (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <ShoppingCart size={16} />
            )}
          </button>
        </div>
        
        {/* Unit */}
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Unit: {product.unidade}</span>
        </div>
      </div>
    </Link>
  );
}