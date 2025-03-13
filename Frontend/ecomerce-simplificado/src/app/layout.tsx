// src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <Providers>
          <div className="flex min-h-screen">
            {/* Sidebar for desktop */}
            <div className="hidden md:block">
              <Sidebar />
            </div>
            
            <div className="flex-1 flex flex-col md:ml-16 lg:ml-64 transition-all duration-300">
              {/* Header */}
              <Header />
              
              {/* Main content */}
              <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto w-full">
                  {children}
                </div>
              </main>
              
              {/* Footer */}
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}