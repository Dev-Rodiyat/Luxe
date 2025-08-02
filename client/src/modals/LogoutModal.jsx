import { useState } from "react"
import { LogOut, X, Loader2 } from "lucide-react"
import { logoutUser } from "../redux/reducers/userSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

export default function LogoutModal({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!isOpen) return null

  const handleConfirm = async () => {
    setIsLoading(true)
    await dispatch(logoutUser() )
    setIsLoading(false)
    onClose()
    toast.success('User logged out successfully!')
    navigate('/login')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-200/20 dark:border-gray-700/20 transform scale-100 opacity-100 transition-all duration-300 ease-out">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4">
            <LogOut className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Confirm Logout</h2>
          <p className="text-gray-600 dark:text-gray-400">Are you sure you want to log out of your account?</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl font-semibold border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
            <span>{isLoading ? "Logging Out..." : "Logout"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
