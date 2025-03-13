// src/components/layout/Sidebar.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { 
  Home, 
  ShoppingBag, 
  User, 
  ShoppingCart, 
  MessageCircle, 
  Package,
  Settings,
  LayoutDashboard,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  
  const isAdmin = user?.usuarioPerfil === 1; // Assuming 1 is admin profile
  
  const mainLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Products', icon: ShoppingBag },
  ];
  
  const authLinks = [
    { href: '/cart', label: 'Cart', icon: ShoppingCart },
    { href: '/orders', label: 'Orders', icon: Package },
    { href: '/chat', label: 'Chat', icon: MessageCircle },
    { href: '/account', label: 'Account', icon: User },
  ];
  
  const adminLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];
  
  const renderNavLink = (href: string, label: string, Icon: React.ElementType) => {
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);
    
    return (
      <Link
        href={href}
        className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
          isActive
            ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
        }`}
      >
        <Icon
          size={20}
          className={`${
            isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
          } ${collapsed ? '' : 'mr-3'} transition-colors`}
        />
        <span className={`font-medium truncate ${collapsed ? 'w-0 overflow-hidden opacity-0' : 'opacity-100'} transition-all duration-200`}>
          {label}
        </span>
        {isActive && !collapsed && (
          <ChevronRight className="ml-auto text-indigo-600 dark:text-indigo-400" size={16} />
        )}
      </Link>
    );
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className={`h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed top-0 left-0 overflow-y-auto z-30 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className={`p-6 flex ${collapsed ? 'justify-center' : 'justify-between'} items-center`}>
        {!collapsed && (
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">ECommerce</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">E</span>
          </Link>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ChevronRight className={`transform transition-transform ${collapsed ? 'rotate-180' : ''}`} size={18} />
        </button>
      </div>
      
      <div className="px-4 pb-6">
        <nav className="space-y-1">
          <div className="pt-4 pb-2">
            {!collapsed && (
              <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Main
              </p>
            )}
            {collapsed && (
              <div className="h-5"></div> // Spacer
            )}
          </div>
          {mainLinks.map((link) => (
            <div key={link.href}>
              {renderNavLink(link.href, link.label, link.icon)}
            </div>
          ))}

          {isAuthenticated && (
            <>
              <div className="pt-4 pb-2">
                {!collapsed && (
                  <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Account
                  </p>
                )}
                {collapsed && (
                  <div className="h-5"></div> // Spacer
                )}
              </div>
              {authLinks.map((link) => (
                <div key={link.href}>
                  {renderNavLink(link.href, link.label, link.icon)}
                </div>
              ))}
            </>
          )}
          
          {isAuthenticated && isAdmin && (
            <>
              <div className="pt-4 pb-2">
                {!collapsed && (
                  <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Administration
                  </p>
                )}
                {collapsed && (
                  <div className="h-5"></div> // Spacer
                )}
              </div>
              {adminLinks.map((link) => (
                <div key={link.href}>
                  {renderNavLink(link.href, link.label, link.icon)}
                </div>
              ))}
            </>
          )}
        </nav>
      </div>
      
      {isAuthenticated && (
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800 ${
          collapsed ? 'flex justify-center' : ''
        }`}>
          {!collapsed ? (
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <User size={20} />
              </div>
              <div className="ml-3 truncate flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.nome}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-1.5 rounded-md text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      )}
    </aside>
  );
}