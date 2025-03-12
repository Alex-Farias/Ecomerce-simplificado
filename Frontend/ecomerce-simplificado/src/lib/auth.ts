// src/lib/auth.ts
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';
import { login as apiLogin, logout as apiLogout, register as apiRegister } from './api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create initial default context
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        if (typeof window === 'undefined') {
          setLoading(false);
          return;
        }
        
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        const res = await fetch(`${apiUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!res.ok) {
          throw new Error('Not authenticated');
        }
        
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Auth check error:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await apiLogin(email, password);
      setUser(data.user);
      router.push('/');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const handleRegister = async (userData: any) => {
    try {
      const data = await apiRegister(userData);
      setUser(data.user);
      router.push('/');
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const handleLogout = () => {
    apiLogout();
    setUser(null);
    router.push('/');
  };

  // Create the context value object
  const contextValue = {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!user,
  };

  // Return the provider with the context value
  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  );
};

export default AuthProvider;