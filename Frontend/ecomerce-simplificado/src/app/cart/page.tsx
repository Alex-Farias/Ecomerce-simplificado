'use client';

import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cart, loading, error } = useCart();

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded mb-4"></div>
        ))}
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Cart</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="md:flex md:space-x-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 md:mb-0">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <li key={item.idCarrinhoItem}>
                    <CartItem item={item} />
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft size={16} className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <CartSummary items={cart.items} />
        </div>
      </div>
    </div>
  );
}