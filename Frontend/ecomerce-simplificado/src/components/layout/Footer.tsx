// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 pt-12 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Us</h3>
            <p className="mb-4">
              We provide high-quality products directly from producers to consumers, eliminating unnecessary middlemen.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=1" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=2" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/products?category=3" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Home & Furniture
                </Link>
              </li>
              <li>
                <Link href="/products?category=4" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Beauty & Health
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  View All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mt-0.5 mr-2 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span>123 Commerce St, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span>contact@ecommerce.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Subscribe to our newsletter</h3>
              <p className="text-sm mb-4 md:mb-0">Get the latest updates, offers and special announcements.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <form className="sm:flex">
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email" 
                  className="w-full px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <button 
                  type="submit" 
                  className="mt-3 w-full px-5 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-center">
          <p>© {currentYear} ECommerce. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}