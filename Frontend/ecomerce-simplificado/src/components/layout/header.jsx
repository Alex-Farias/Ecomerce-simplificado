'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useAuth } from '@/context/auth-context'
import { useCart } from '@/context/cart-context'
import { MoonIcon, SunIcon, ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Header = () => {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo e Botão do Menu Mobile */}
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Abrir menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            
            <Link href="/" className="ml-4 flex lg:ml-0">
              <span className="font-bold text-xl">Ecomerce Simplificado</span>
            </Link>
          </div>

          {/* Campo de Busca */}
          <div className="hidden md:block flex-1 mx-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="form-input w-full rounded-full py-2 px-4 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Ícones de Ação */}
          <div className="flex items-center space-x-4">
            {/* Botão do Tema */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {/* Ícone do Carrinho */}
            <Link href="/cart" className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <ShoppingCartIcon className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Perfil / Login */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <UserIcon className="h-5 w-5" />
                  <span className="hidden md:block text-sm">{user.nome}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 hidden group-hover:block">
                  <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                    Meu Perfil
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                    Meus Pedidos
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="form-input w-full rounded-md mb-3"
            />
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Início
            </Link>
            <Link
              href="/category"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Categorias
            </Link>
            <Link
              href="/cart"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Carrinho
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header