import { Product } from '@/types/product';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  category?: string;
}

export default function ProductDetails({ product, category }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addItem(product.idProduto, quantity);
    } finally {
      setIsAdding(false);
    }
  };

  // Extract description from JSON if needed
  let description = "No description available";
  if (typeof product.descricao === 'string') {
    description = product.descricao;
  } else if (product.descricao && typeof product.descricao === 'object') {
    description = product.descricao.longDescription || product.descricao.toString();
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2">
          {/* Placeholder for product image */}
          <div className="h-64 md:h-96 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Product Image</span>
          </div>
        </div>
        <div className="p-6 md:w-1/2">
          <div className="flex justify-between items-start">
            <div>
              {category && (
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  {category}
                </span>
              )}
              <h1 className="text-2xl font-bold text-gray-900 mt-2">{product.titulo}</h1>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                <Heart size={20} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">R$ {product.preco.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">Per {product.unidade}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <div className="mt-2 text-gray-600">
              <p>{description}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mr-4">
                Quantity
              </label>
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
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
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
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex items-center">
              <p className="text-sm text-gray-500">
                Seller: {product.usuario}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}