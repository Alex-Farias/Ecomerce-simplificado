// src/components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/hooks/useCart';
import ThemeSwitch from '../ui/ThemeSwitch';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if page is scrolled for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full bg-white dark:bg-gray-900 transition-all duration-300 ${
        isScrolled ? 'shadow-md dark:shadow-gray-800/30' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="ml-2 flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">ECommerce</span>
            </Link>
          </div>

          {/* Desktop Logo (hidden on mobile) */}
          <div className="hidden md:flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">ECommerce</span>
            </Link>
          </div>

          {/* Desktop Navigation - centered (hidden on mobile) */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/products' || pathname?.startsWith('/products/') 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              Products
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  href="/orders" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === '/orders' || pathname?.startsWith('/orders/') 
                      ? 'text-indigo-600 dark:text-indigo-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  Orders
                </Link>
                <Link 
                  href="/chat" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === '/chat' || pathname?.startsWith('/chat/') 
                      ? 'text-indigo-600 dark:text-indigo-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  Chat
                </Link>
              </>
            )}
          </nav>

          {/* Search, Cart, Theme, Login/Account */}
          <div className="flex items-center space-x-4">
            {/* Search - Full on desktop, icon on mobile */}
            <div className="hidden md:block relative w-64">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search size={18} className="text-gray-500 dark:text-gray-400" />
                </div>
              </form>
            </div>

            {/* Search button on mobile */}
            <button 
              onClick={() => {
                const searchDialog = document.getElementById('mobile-search');
                if (searchDialog) {
                  searchDialog.classList.toggle('hidden');
                  const input = searchDialog.querySelector('input');
                  if (input) input.focus();
                }
              }}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              <Search size={22} />
            </button>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} />
              {cart && cart.items && cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.items.reduce((acc, item) => acc + item.produtoQuantidade, 0)}
                </span>
              )}
            </Link>

            {/* Theme Switch */}
            <ThemeSwitch />

            {/* Account */}
            {isAuthenticated ? (
              <div className="relative group">
                <button 
                  className="flex items-center space-x-2 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  aria-label="Account"
                >
                  <User size={22} />
                  <span className="text-sm font-medium hidden lg:inline-block">{user?.nome?.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link 
                    href="/account" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Account
                  </Link>
                  <Link 
                    href="/orders" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/account" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar (hidden by default) */}
      <div id="mobile-search" className="md:hidden bg-white dark:bg-gray-900 p-4 hidden shadow-inner">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search size={18} className="text-gray-500 dark:text-gray-400" />
          </div>
        </form>
      </div>

      {/* Mobile menu (hidden by default) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-xl">
          {/* Nav links */}
          <nav className="px-4 pt-2 pb-4 space-y-1 border-b border-gray-200 dark:border-gray-800">
            <Link 
              href="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === '/' 
                  ? 'text-indigo-600 dark:text-indigo-400 bg-gray-50 dark:bg-gray-800' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === '/products' || pathname?.startsWith('/products/') 
                  ? 'text-indigo-600 dark:text-indigo-400 bg-gray-50 dark:bg-gray-800' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  href="/orders" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === '/orders' || pathname?.startsWith('/orders/') 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-gray-50 dark:bg-gray-800' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link 
                  href="/chat" 
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === '/chat' || pathname?.startsWith('/chat/') 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-gray-50 dark:bg-gray-800' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Chat
                </Link>
              </>
            )}
          </nav>
          
          {/* Account */}
          <div className="px-4 py-4">
            {isAuthenticated ? (
              <div className="space-y-1">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.nome}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <Link 
                  href="/account" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/account" 
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}