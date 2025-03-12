// src/app/page.tsx
'use client';

import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/products/ProductGrid';

export default function Home() {
  const { products, categories, loading } = useProducts();
  
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-indigo-700 rounded-xl text-white py-16 px-8 mb-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Quality Products Direct from Producers
          </h1>
          <p className="mt-6 text-xl max-w-prose mx-auto">
            Find the best products at competitive prices, delivered directly to your door.
          </p>
          <div className="mt-10 flex justify-center">
            <Link 
              href="/products"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-white text-indigo-700 hover:bg-indigo-50"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-indigo-600 hover:text-indigo-500">
            View all
          </Link>
        </div>
        <ProductGrid products={featuredProducts} loading={loading} />
      </div>
      
      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.idProdutoCategoria}
              href={`/products?category=${category.idProdutoCategoria}`}
              className="group bg-gray-100 rounded-lg p-6 hover:bg-indigo-50 transition-colors duration-200"
            >
              <div className="font-medium text-gray-900 group-hover:text-indigo-600">
                {category.descricao}
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Quality Products</h3>
            <p className="mt-2 text-gray-600">
              We carefully select only the best products from trusted producers.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Competitive Prices</h3>
            <p className="mt-2 text-gray-600">
              Direct from producers to you, without unnecessary middlemen.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Fast Delivery</h3>
            <p className="mt-2 text-gray-600">
              Quick and reliable shipping to your doorstep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}