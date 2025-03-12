'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import ProductDetails from '@/components/products/ProductDetails';
import { Product } from '@/types/product';

export default function ProductDetailPage() {
  const params = useParams();
  const { getProduct, categories } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const id = parseInt(params.id as string);
        const data = await getProduct(id);
        if (data) {
          setProduct(data);
          setError(null);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error loading product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, getProduct]);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.idProdutoCategoria === categoryId);
    return category ? category.descricao : '';
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Product not found'}</h2>
        <p className="text-gray-600">The product you are looking for might have been removed or is temporarily unavailable.</p>
      </div>
    );
  }

  return (
    <div>
      <ProductDetails 
        product={product} 
        category={product.produtoCategoria ? getCategoryName(product.produtoCategoria) : undefined} 
      />
    </div>
  );
}