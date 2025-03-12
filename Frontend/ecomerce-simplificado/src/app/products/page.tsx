'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/products/ProductGrid';
import { Filter, X } from 'lucide-react';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const { products, categories, loading, filterByCategory, searchProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category) {
      setSelectedCategory(parseInt(category));
    }
    
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  useEffect(() => {
    let result = products;
    
    if (selectedCategory) {
      result = filterByCategory(selectedCategory);
    }
    
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, filterByCategory, searchProducts]);

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Products</h1>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow md:max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <button
            onClick={toggleFilters}
            className="md:hidden inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter size={16} className="mr-2" />
            Filters
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
        {/* Filters */}
        <div className={`md:block md:w-64 ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Clear all
                </button>
              )}
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="category-all"
                    name="category"
                    type="radio"
                    checked={selectedCategory === null}
                    onChange={() => handleCategoryChange(null)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="category-all" className="ml-3 text-sm text-gray-700">
                    All Categories
                  </label>
                </div>
                
                {categories.map((category) => (
                  <div key={category.idProdutoCategoria} className="flex items-center">
                    <input
                      id={`category-${category.idProdutoCategoria}`}
                      name="category"
                      type="radio"
                      checked={selectedCategory === category.idProdutoCategoria}
                      onChange={() => handleCategoryChange(category.idProdutoCategoria)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label 
                      htmlFor={`category-${category.idProdutoCategoria}`} 
                      className="ml-3 text-sm text-gray-700"
                    >
                      {category.descricao}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {filteredProducts.length} products found
            </p>
          </div>
          
          <ProductGrid products={filteredProducts} loading={loading} />
        </div>
      </div>
    </div>
  );
}