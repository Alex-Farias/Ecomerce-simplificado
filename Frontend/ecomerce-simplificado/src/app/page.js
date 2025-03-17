// src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import ProductGrid from '@/components/product/ProductGrid';

// Mock data (you'll replace this with actual API calls)
const mockProducts = [
  {
    id: 1,
    title: 'Smartphone XYZ',
    description: 'Um smartphone potente com câmera incrível e bateria de longa duração.',
    price: 1299.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=Smartphone',
  },
  {
    id: 2,
    title: 'Notebook Ultra',
    description: 'Notebook leve e potente para trabalho e entretenimento.',
    price: 3499.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=Notebook',
  },
  {
    id: 3,
    title: 'Fones de Ouvido Wireless',
    description: 'Fones com cancelamento de ruído e qualidade de áudio superior.',
    price: 299.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=Fones',
  },
  {
    id: 4,
    title: 'Smartwatch Fitness',
    description: 'Monitore sua saúde e exercícios com este relógio inteligente.',
    price: 499.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=Smartwatch',
  },
  {
    id: 5,
    title: 'Câmera DSLR Pro',
    description: 'Capture momentos perfeitos com esta câmera profissional.',
    price: 2899.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=Camera',
  },
  {
    id: 6,
    title: 'Tablet Premium',
    description: 'Tablet com tela retina e processador de última geração.',
    price: 1899.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=Tablet',
  },
  {
    id: 7,
    title: 'Console de Games',
    description: 'A última geração em consoles de videogame.',
    price: 3999.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=Console',
  },
  {
    id: 8,
    title: 'Monitor Ultrawide',
    description: 'Monitor curvo para uma experiência imersiva de uso.',
    price: 1599.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=Monitor',
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchProducts = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/products/featured');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setFeaturedProducts(mockProducts);
          setIsLoading(false);
        }, 500); // Simulate network delay
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto">
      <section className="mb-12">
        <div className="relative rounded-xl overflow-hidden h-72 md:h-96 mb-8">
          <img 
            src="https://via.placeholder.com/1200x400?text=Promotion" 
            alt="Promoção principal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-8">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">Ofertas Especiais</h1>
            <p className="text-white text-lg mb-6 max-w-md">Encontre os melhores produtos pelos melhores preços.</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg w-fit">
              Ver Ofertas
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Produtos em Destaque</h2>
          <a href="/products" className="text-indigo-600 dark:text-indigo-400 hover:underline">Ver todos</a>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md h-80 animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-700 h-40 w-full"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid products={featuredProducts} />
        )}
      </section>

      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-6 flex items-center">
            <div className="mr-4 text-indigo-600 dark:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Entrega Grátis</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Para compras acima de R$200</p>
            </div>
          </div>
          
          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-6 flex items-center">
            <div className="mr-4 text-indigo-600 dark:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Compra Segura</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Proteção para suas transações</p>
            </div>
          </div>
          
          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-6 flex items-center">
            <div className="mr-4 text-indigo-600 dark:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Devolução Fácil</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">30 dias para trocar ou devolver</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Categorias Populares</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/category/electronics" className="block relative rounded-lg overflow-hidden h-32 group">
            <img 
              src="https://via.placeholder.com/300x200?text=Electronics" 
              alt="Eletrônicos" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h3 className="text-white text-lg font-medium">Eletrônicos</h3>
            </div>
          </a>
          <a href="/category/fashion" className="block relative rounded-lg overflow-hidden h-32 group">
            <img 
              src="https://via.placeholder.com/300x200?text=Fashion" 
              alt="Moda" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h3 className="text-white text-lg font-medium">Moda</h3>
            </div>
          </a>
          <a href="/category/home" className="block relative rounded-lg overflow-hidden h-32 group">
            <img 
              src="https://via.placeholder.com/300x200?text=Home" 
              alt="Casa" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h3 className="text-white text-lg font-medium">Casa & Jardim</h3>
            </div>
          </a>
          <a href="/category/sports" className="block relative rounded-lg overflow-hidden h-32 group">
            <img 
              src="https://via.placeholder.com/300x200?text=Sports" 
              alt="Esportes" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h3 className="text-white text-lg font-medium">Esportes</h3>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}