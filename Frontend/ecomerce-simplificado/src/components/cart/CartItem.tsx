import { CartItem as CartItemType } from '@/types/cart';
import { Product } from '@/types/product';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

interface CartItemProps {
  item: CartItemType & { product: Product };
}

export default function CartItem({ item }: CartItemProps) {
  const { updateItem, removeItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [quantity, setQuantity] = useState(item.produtoQuantidade);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleUpdate = async () => {
    if (quantity === item.produtoQuantidade) return;
    
    setIsUpdating(true);
    try {
      await updateItem(item.idCarrinhoItem, quantity, item.selecionado);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeItem(item.idCarrinhoItem);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleToggleSelect = async () => {
    setIsUpdating(true);
    try {
      await updateItem(item.idCarrinhoItem, item.produtoQuantidade, !item.selecionado);
    } finally {
      setIsUpdating(false);
    }
  };

  const subtotal = quantity * item.product.preco;

  return (
    <div className="flex items-center py-6 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={item.selecionado}
          onChange={handleToggleSelect}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        
        <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
          {/* Placeholder for product image */}
          <div className="h-full flex items-center justify-center">
            <span className="text-gray-400 text-xs">Product Image</span>
          </div>
        </div>
      </div>

      <div className="ml-4 flex-1">
        <h3 className="text-lg font-medium text-gray-900">{item.product.titulo}</h3>
        <p className="mt-1 text-sm text-gray-500">R$ {item.product.preco.toFixed(2)} / {item.product.unidade}</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex border border-gray-300 rounded-md">
          <button
            type="button"
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleUpdate}
            className="w-12 text-center border-x border-gray-300 py-1 focus:outline-none"
          />
          <button
            type="button"
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        <div className="text-right min-w-[100px]">
          <p className="text-lg font-medium text-gray-900">R$ {subtotal.toFixed(2)}</p>
        </div>

        <button
          type="button"
          onClick={handleRemove}
          disabled={isRemoving}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}