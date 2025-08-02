"use client"

import { X, LogIn, User, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"

export default function MobileMenu({ isOpen, onClose, navLinks, isActiveLink }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Navigation Links */}
          <div className="space-y-4">
            {navLinks.map((nav, idx) => (
              <Link
                key={idx}
                to={nav.path}
                onClick={onClose}
                className={`block py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  isActiveLink(nav.path)
                    ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400 border-l-4 border-purple-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {nav.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="space-y-2 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link to="/login" onClick={onClose}>
              <button
                className={`w-full flex items-center space-x-3 py-3 px-4 mb-4 rounded-xl font-medium transition-all duration-300 ${
                  isActiveLink("/login")
                    ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            </Link>

            <Link to="/register" onClick={onClose}>
              <button
                className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  isActiveLink("/register")
                    ? "bg-gradient-to-r from-purple-700 to-pink-700 text-white shadow-lg"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                }`}
              >
                <User className="w-5 h-5" />
                <span>Register</span>
              </button>
            </Link>
          </div>

          {/* Cart */}
          <div className="pt-4">
            <button className="w-full flex items-center space-x-3 py-3 px-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  3
                </span>
              </div>
              <span>Shopping Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
