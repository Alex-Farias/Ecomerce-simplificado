// src/components/product/ProductCard.js
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative pb-[56.25%]">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{product.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-1">{product.description}</p>
          <div className="mt-auto">
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}