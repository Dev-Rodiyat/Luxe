import { useState, useEffect } from "react"
import { ArrowLeft, Home, Search, Sparkles, AlertTriangle, RefreshCw } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Layout from "../layouts/Layout"

export default function NotFound() {
  const navigate = useNavigate()
  const [canGoBack, setCanGoBack] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if there's a previous page in history
    setCanGoBack(window.history.length > 1)
  }, [])

  const handleGoBack = () => {
    setIsLoading(true)
    if (canGoBack) {
      navigate(-1)
    } else {
      navigate("/")
    }
    // Reset loading state after navigation
    setTimeout(() => setIsLoading(false), 500)
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="pt-20 min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-4xl w-full text-center">
            {/* Floating Elements */}
            <div className="relative">
              <div className="absolute top-10 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl animate-pulse delay-300"></div>
              <div className="absolute top-32 right-20 w-16 h-16 bg-orange-300/20 rounded-full blur-lg animate-pulse delay-500"></div>

              {/* Main Content */}
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-gray-200/20 dark:border-gray-700/20">
                {/* 404 Illustration */}
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-6">
                    <AlertTriangle className="w-16 h-16 text-purple-600 dark:text-purple-400" />
                  </div>

                  {/* 404 Text */}
                  <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">
                    404
                  </div>
                </div>

                {/* Brand Logo */}
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Luxe
                  </span>
                </div>

                {/* Error Message */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Oops! Page Not Found
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  The page you're looking for seems to have wandered off into the fashion void. Don't worry, even the
                  best explorers sometimes take a wrong turn!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  {/* Smart Back Button */}
                  <button
                    onClick={handleGoBack}
                    disabled={isLoading}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <ArrowLeft className="w-5 h-5" />
                    )}
                    <span>{canGoBack ? "Go Back" : "Go Home"}</span>
                  </button>

                  {/* Home Button */}
                  <Link to="/">
                    <button className="flex items-center space-x-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                      <Home className="w-5 h-5" />
                      <span>Home Page</span>
                    </button>
                  </Link>

                  {/* Refresh Button */}
                  <button
                    onClick={handleRefresh}
                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Refresh</span>
                  </button>
                </div>

                {/* Quick Links */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Pages</h3>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/shop"
                      className="text-purple-600 hover:text-purple-500 font-medium hover:underline transition-colors"
                    >
                      Shop Collection
                    </Link>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <Link
                      to="/about"
                      className="text-purple-600 hover:text-purple-500 font-medium hover:underline transition-colors"
                    >
                      About Us
                    </Link>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <Link
                      to="/faqs"
                      className="text-purple-600 hover:text-purple-500 font-medium hover:underline transition-colors"
                    >
                      FAQs
                    </Link>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <Link
                      to="/login"
                      className="text-purple-600 hover:text-purple-500 font-medium hover:underline transition-colors"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>

                {/* Search Suggestion */}
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Search className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">Looking for something specific?</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Try searching our collection or browse our categories to find what you're looking for.
                  </p>
                </div>

                {/* Fun Message */}
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  <p>💎 Even diamonds need polishing sometimes. We're working to make your experience flawless!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
