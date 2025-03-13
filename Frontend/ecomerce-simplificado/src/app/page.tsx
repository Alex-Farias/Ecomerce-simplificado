// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/products/ProductGrid';
import { ArrowRight, Check, DollarSign, Truck } from 'lucide-react';

export default function Home() {
  const { products, categories, loading, fetchProducts } = useProducts();
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-indigo-600 dark:bg-indigo-700 text-white">
        <div className="absolute inset-0 opacity-20 bg-pattern-dots"></div>
        <div className="relative z-10 py-16 px-8 md:py-24 md:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
              Quality Products Direct from Producers
            </h1>
            <p className="mt-6 text-xl max-w-prose mx-auto text-indigo-100">
              Find the best products at competitive prices, delivered directly to your door.
            </p>
            <div className="mt-10 flex justify-center">
              <Link 
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-white text-indigo-600 hover:bg-indigo-50 transition-colors shadow-md hover:shadow-lg"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Featured Products
          </h2>
          <Link 
            href="/products" 
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
          >
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                  <div className="h-48"></div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <p className="text-gray-500 dark:text-gray-400">No products found. Check back soon!</p>
          </div>
        ) : (
          <ProductGrid products={featuredProducts} loading={loading} />
        )}
      </div>
      
      {/* Categories */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.length === 0 ? (
            <>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg p-6">
                  <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              ))}
            </>
          ) : (
            <>
              {categories.map((category) => (
                <Link 
                  key={category.idProdutoCategoria}
                  href={`/products?category=${category.idProdutoCategoria}`}
                  className="group bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                >
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {category.descricao}
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Quality Products</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We carefully select only the best products from trusted producers.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
              <DollarSign className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Competitive Prices</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Direct from producers to you, without unnecessary middlemen.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Quick and reliable shipping to your doorstep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}