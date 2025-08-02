import { X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  authLinks,
  cartItems,
  unreadCount,
  setIsCartModalOpen,
  isNotificationModalOpen,
  isLogoutModalOpen,
  user,
}) {
  if (!isOpen) return null;

  const isActiveLink = (path) => {
    if (path === "/") {
      return window.location.pathname === "/";
    }
    return window.location.pathname.startsWith(path);
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="fixed right-0 top-0 h-full w-80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-2xl transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200/20 dark:border-gray-700/20">
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

          <div className="space-y-2 pt-6 border-t border-gray-200/20 dark:border-gray-700/20">
            {authLinks.map((link, idx) => (
              <div key={idx}>
                {link.path ? (
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className={`w-full flex items-center space-x-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                      isActiveLink(link.path)
                        ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      link.action();
                      onClose();
                    }}
                    className={`w-full flex items-center space-x-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                      (link.name === "Notifications" && isNotificationModalOpen) ||
                      (link.name === "Logout" && isLogoutModalOpen)
                        ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                    {link.name === "Notifications" && unreadCount > 0 && (
                      <span className="ml-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                setIsCartModalOpen(true);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                isActiveLink("/cart")
                  ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span>Shopping Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}