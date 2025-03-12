import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { CartItem as CartItemType } from '@/types/cart';
import { Product } from '@/types/product';
import { createOrder } from '@/lib/api';

interface CartSummaryProps {
  items: (CartItemType & { product: Product })[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const { clearCart } = useCart();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Filter selected items
  const selectedItems = items.filter(item => item.selecionado);
  
  // Calculate subtotal
  const subtotal = selectedItems.reduce(
    (total, item) => total + item.produtoQuantidade * item.product.preco,
    0
  );
  
  // Assume shipping is free over R$100, otherwise R$10
  const shipping = subtotal > 100 ? 0 : 10;
  
  // Total including shipping
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (selectedItems.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const order = await createOrder();
      router.push('/checkout');
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      
      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal ({selectedItems.length} items)</p>
          <p className="text-gray-900 font-medium">R$ {subtotal.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between">
          <p className="text-gray-600">Shipping</p>
          <p className="text-gray-900 font-medium">
            {shipping === 0 ? 'Free' : `R$ ${shipping.toFixed(2)}`}
          </p>
        </div>
        
        <div className="border-t border-gray-200 pt-4 flex justify-between">
          <p className="text-lg font-medium text-gray-900">Total</p>
          <p className="text-xl font-bold text-gray-900">R$ {total.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={isCheckingOut || selectedItems.length === 0}
          className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {isCheckingOut ? 'Processing...' : 'Checkout'}
        </button>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-500 mt-2">
          {selectedItems.length === 0 
            ? 'No items selected for checkout' 
            : 'Shipping and taxes calculated at checkout'}
        </p>
      </div>
    </div>
  );
}