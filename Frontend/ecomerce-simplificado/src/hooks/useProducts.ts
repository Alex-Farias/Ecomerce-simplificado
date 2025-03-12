'use client';

// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { getProducts, getProductById, getProductCategories } from '@/lib/api';
import { Product, ProductCategory } from '@/types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Error fetching products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getProductCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const getProduct = async (id: number) => {
    try {
      return await getProductById(id);
    } catch (err) {
      console.error(`Error fetching product ${id}:`, err);
      return null;
    }
  };

  const filterByCategory = (categoryId: number) => {
    return products.filter(product => product.produtoCategoria === categoryId);
  };

  const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.titulo.toLowerCase().includes(lowercaseQuery) || 
      (typeof product.descricao === 'string' && product.descricao.toLowerCase().includes(lowercaseQuery))
    );
  };

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    getProduct,
    filterByCategory,
    searchProducts,
  };
};