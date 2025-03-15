'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { 
  HomeIcon, 
  UserGroupIcon, 
  ShoppingBagIcon, 
  TagIcon,
  ShoppingCartIcon, 
  ChatBubbleLeftRightIcon, 
  ClipboardDocumentListIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

const Sidebar = ({ className }) => {
  const pathname = usePathname()
  const { user } = useAuth()
  const [expanded, setExpanded] = useState({
    usuario: false,
    produto: false,
    carrinho: false,
    pedido: false,
    chat: false
  })

  // Apenas administradores devem ter acesso completo
  const isAdmin = user?.usuarioPerfil === 1

  const toggleExpand = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <div className={`bg-white dark:bg-gray-900 h-full border-r ${className}`}>
      <div className="flex flex-col h-full py-4">
        <div className="px-3 py-2">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          
          <nav className="space-y-1">
            {/* Início */}
            <Link 
              href="/"
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                isActive('/') 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <HomeIcon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span>Início</span>
            </Link>

            {/* Produtos */}
            <div>
              <button
                onClick={() => toggleExpand('produto')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800`}
              >
                <div className="flex items-center">
                  <ShoppingBagIcon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span>Produtos</span>
                </div>
                <ChevronRightIcon 
                  className={`h-4 w-4 transition-transform ${expanded.produto ? 'rotate-90' : ''}`} 
                />
              </button>
              
              {expanded.produto && (
                <div className="pl-10 space-y-1 mt-1">
                  <Link 
                    href="/product"
                    className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive('/product') 
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    Ver Produtos
                  </Link>
                  
                  <Link 
                    href="/category"
                    className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive('/category') 
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    Categorias
                  </Link>
                  
                  {isAdmin && (
                    <>
                      <Link 
                        href="/(admin)/produto"
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive('/(admin)/produto') 
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        Gerenciar Produtos
                      </Link>
                      
                      <Link 
                        href="/(admin)/categoria"
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive('/(admin)/categoria') 
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        Gerenciar Categorias
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Carrinho */}
            <Link 
              href="/cart"
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                isActive('/cart') 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <ShoppingCartIcon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span>Meu Carrinho</span>
            </Link>

            {/* Pedidos */}
            <Link 
              href="/orders"
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                isActive('/orders') 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <ClipboardDocumentListIcon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span>Meus Pedidos</span>
            </Link>

            {/* Chat */}
            <Link 
              href="/chat"
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                isActive('/chat') 
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <ChatBubbleLeftRightIcon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span>Mensagens</span>
            </Link>

            {/* Seção de Administração */}
            {isAdmin && (
              <div className="pt-4 mt-4 border-t">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Administração
                </h3>
                
                {/* Usuários */}
                <div className="mt-2">
                  <button
                    onClick={() => toggleExpand('usuario')}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800`}
                  >
                    <div className="flex items-center">
                      <UserGroupIcon className="mr-3 h-5 w-5 flex-shrink-0" />
                      <span>Usuários</span>
                    </div>
                    <ChevronRightIcon 
                      className={`h-4 w-4 transition-transform ${expanded.usuario ? 'rotate-90' : ''}`} 
                    />
                  </button>
                  
                  {expanded.usuario && (
                    <div className="pl-10 space-y-1 mt-1">
                      <Link 
                        href="/(admin)/usuario"
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive('/(admin)/usuario') 
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        Gerenciar Usuários
                      </Link>
                      
                      <Link 
                        href="/(admin)/usuario/perfil"
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive('/(admin)/usuario/perfil') 
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        Perfis de Usuário
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* Pedidos (Admin) */}
                <Link 
                  href="/(admin)/pedido"
                  className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors mt-1 ${
                    isActive('/(admin)/pedido') 
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <ClipboardDocumentListIcon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span>Gerenciar Pedidos</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
        
        {/* Versão na parte inferior */}
        <div className="mt-auto px-3 py-2">
          <div className="px-3 py-2 text-xs text-gray-500">
            Versão 1.0.0
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar