import React from 'react'
import Sidebar from '@/components/layout/sidebar'
import ProductGrid from '@/components/sections/product-grid'
import CategoryList from '@/components/sections/category-list'
import FeaturedProducts from '@/components/sections/featured-products'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar className="hidden md:block w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16" />
      
      {/* Conteúdo Principal */}
      <div className="flex-1 max-w-full">
        {/* Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Ecomerce Simplificado</h1>
            <p className="text-lg mb-6">Encontre os melhores produtos com os melhores preços.</p>
            <Link
              href="/product"
              className="inline-block bg-white text-primary-700 px-5 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Ver todos os produtos
            </Link>
          </div>
        </div>
        
        {/* Conteúdo */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Seção de Categorias */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Categorias</h2>
              <Link
                href="/category"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              >
                Ver todas
              </Link>
            </div>
            <CategoryList />
          </section>
          
          {/* Produtos em Destaque */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Produtos em Destaque</h2>
              <Link
                href="/product"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              >
                Ver todos
              </Link>
            </div>
            <FeaturedProducts />
          </section>
          
          {/* Listagem de Produtos */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Todos os Produtos</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Ordenar por:</span>
                <select 
                  className="form-select text-sm rounded-md"
                  defaultValue="newest"
                >
                  <option value="newest">Mais Recentes</option>
                  <option value="price_asc">Menor Preço</option>
                  <option value="price_desc">Maior Preço</option>
                  <option value="name_asc">Nome (A-Z)</option>
                </select>
              </div>
            </div>
            <ProductGrid />
          </section>
        </div>
      </div>
    </div>
  )
}