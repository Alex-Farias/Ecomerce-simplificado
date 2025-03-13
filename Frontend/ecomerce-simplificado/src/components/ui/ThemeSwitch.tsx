// src/components/ui/ThemeSwitch.tsx
'use client';

import { useTheme } from '@/app/theme-provider';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch by only rendering once mounted
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <Sun 
          size={20} 
          className={`absolute top-0 left-0 transform transition-transform duration-300 ${
            theme === 'dark' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
          }`} 
        />
        <Moon 
          size={20} 
          className={`absolute top-0 left-0 transform transition-transform duration-300 ${
            theme === 'light' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
          }`} 
        />
      </div>
    </button>
  );
}