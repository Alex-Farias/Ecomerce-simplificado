'use client';

import { Product } from '@/types/product';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      await addItem(product.idProduto, 1);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link 
      href={`/products/${product.idProduto}`}
      className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200">
        {/* Placeholder for product image */}
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Product Image</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.titulo}</h3>
        <p className="mt-1 text-xs text-gray-500 truncate">
          {typeof product.descricao === 'string' 
            ? product.descricao 
            : product.descricao?.shortDescription || 'No description available'}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            R$ {product.preco.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <span>Unit: {product.unidade}</span>
        </div>
      </div>
    </Link>
  );
}