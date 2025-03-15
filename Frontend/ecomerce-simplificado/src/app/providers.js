'use client'

import { ThemeProvider } from 'next-themes'
import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/auth-context'
import { CartProvider } from '@/context/cart-context'

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SWRConfig 
        value={{
          fetcher: (url) => fetch(url).then(res => res.json()),
          revalidateOnFocus: false,
        }}
      >
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-center" />
            {children}
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </ThemeProvider>
  )
}