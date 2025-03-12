'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/hooks/useCart';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">ECommerce</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900">
                Products
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="ml-4 flex md:ml-6">
              <input
                type="text"
                placeholder="Search for products..."
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="ml-2 px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                <Search size={18} />
              </button>
            </form>

            <div className="ml-4 flow-root">
              <Link href="/cart" className="group -m-2 p-2 flex items-center">
                <ShoppingCart className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                {cart && cart.items && cart.items.length > 0 && (
                  <span className="ml-2 text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                    {cart.items.reduce((acc, item) => acc + item.produtoQuantidade, 0)}
                  </span>
                )}
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="ml-4 relative">
                <Link href="/account" className="flex items-center">
                  <User className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                  <span className="ml-2 text-sm text-gray-700">{user?.nome}</span>
                </Link>
                <button
                  onClick={logout}
                  className="ml-4 px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="ml-4 flex items-center">
                <Link href="/account" className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Login
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Products
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              <Link href="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Cart
                {cart && cart.items && cart.items.length > 0 && (
                  <span className="ml-2 text-sm font-medium text-indigo-600">
                    ({cart.items.reduce((acc, item) => acc + item.produtoQuantidade, 0)})
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/account" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    My Account
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-700 hover:text-red-900 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/account" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}