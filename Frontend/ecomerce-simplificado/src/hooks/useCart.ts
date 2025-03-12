'use client';

// src/hooks/useCart.ts
import { useState, useEffect } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem } from '@/lib/api';
import { Cart, CartItem } from '@/types/cart';
import { useAuth } from '@/lib/auth';
import { Product } from '@/types/product';

interface CartWithProducts extends Omit<Cart, 'items'> {
  items: (CartItem & { product: Product })[];
  total: number;
  totalItems: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartWithProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const cartData = await getCart();
      setCart(cartData);
      setError(null);
    } catch (err) {
      setError('Error fetching cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addItem = async (productId: number, quantity: number = 1) => {
    try {
      await addToCart(productId, quantity);
      fetchCart();
    } catch (err) {
      setError('Error adding item to cart');
      console.error(err);
    }
  };

  const updateItem = async (cartItemId: number, quantity: number, selected: boolean) => {
    try {
      await updateCartItem(cartItemId, quantity, selected);
      fetchCart();
    } catch (err) {
      setError('Error updating cart item');
      console.error(err);
    }
  };

  const removeItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      fetchCart();
    } catch (err) {
      setError('Error removing cart item');
      console.error(err);
    }
  };

  const clearCart = async () => {
    if (cart?.items) {
      try {
        for (const item of cart.items) {
          await removeCartItem(item.idCarrinhoItem);
        }
        fetchCart();
      } catch (err) {
        setError('Error clearing cart');
        console.error(err);
      }
    }
  };

  return {
    cart,
    loading,
    error,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
  };
};