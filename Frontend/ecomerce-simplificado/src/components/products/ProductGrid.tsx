// src/components/products/ProductGrid.tsx
'use client';

import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
              <div className="h-64"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-indigo-600 dark:text-indigo-400 mb-4" />
        <p className="text-gray-500 dark:text-gray-400">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.idProduto} product={product} />
      ))}
    </div>
  );
}