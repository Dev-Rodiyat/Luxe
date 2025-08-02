import { useState, useEffect } from "react";
import { ShoppingBag, Sparkles, Menu, User, LogIn, LogOut, Plus } from "lucide-react";
import MobileMenu from "../modals/MobileMenu";
import CartModal from "../modals/CartModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../redux/reducers/notificationSlice";
import { logoutUser } from "../redux/reducers/userSlice";
import Notification from "../modals/Notification";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: notifications } = useSelector((state) => state.notifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (user) {
      dispatch(getNotifications());
    }
  }, [dispatch, user]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "FAQs", path: "/faqs" },
  ];

  const authLinks = user
    ? [
        { name: "Add Product", path: "/add-product", icon: <Plus className="w-4 h-4" /> },
        { name: "Notifications", path: "/notifications", icon: <IoNotificationsOutline className="w-4 h-4" /> },
        { name: "Logout", path: "/login", icon: <LogOut className="w-4 h-4" /> },
      ]
    : [
        { name: "Login", path: "/login", icon: <LogIn className="w-4 h-4" /> },
        { name: "Register", path: "/register", icon: <User className="w-4 h-4" /> },
      ];

  const isActiveLink = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Luxe
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((nav, idx) => (
              <Link
                key={idx}
                to={nav?.path}
                className={`relative font-medium transition-all duration-300 ${
                  isActiveLink(nav.path)
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-purple-600"
                }`}
              >
                {nav?.name}
                {isActiveLink(nav.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/add-product">
                  <button
                    className={`flex items-center space-x-2 font-medium transition-all duration-300 ${
                      isActiveLink("/add-product")
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-purple-600"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </Link>
                <button
                  onClick={() => setIsCartModalOpen(true)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isActiveLink("/cart")
                      ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <ShoppingBag className="w-6 h-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setIsNotificationModalOpen(true)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isActiveLink("/notifications")
                      ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <IoNotificationsOutline className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button
                    className={`flex items-center space-x-2 font-medium transition-all duration-300 ${
                      isActiveLink("/login")
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-purple-600"
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      isActiveLink("/register")
                        ? "bg-gradient-to-r from-purple-700 to-pink-700 text-white shadow-lg shadow-purple-500/25"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Register</span>
                  </button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {user ? (
              <>
                <button
                  onClick={() => setIsCartModalOpen(true)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isActiveLink("/cart")
                      ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <ShoppingBag className="w-6 h-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setIsNotificationModalOpen(true)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isActiveLink("/notifications")
                      ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <IoNotificationsOutline className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isActiveLink("/login")
                        ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <LogIn className="w-6 h-6" />
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isActiveLink("/register")
                        ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <User className="w-6 h-6" />
                  </button>
                </Link>
              </>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={[...navLinks, ...authLinks]}
        isActiveLink={isActiveLink}
        handleLogout={user ? handleLogout : null}
      />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
      <Notification
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </>
  );
}