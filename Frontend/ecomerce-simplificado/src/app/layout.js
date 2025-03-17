// src/app/layout.js
'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-4">
              {children}
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}