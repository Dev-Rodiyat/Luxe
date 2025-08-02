import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { logoutUser } from "../redux/reducers/userSlice";
import { clearCart } from "../redux/reducers/cartSlice";
import { clearOrders } from "../redux/reducers/orderSlice";
import { clearNotificationError } from "../redux/reducers/notificationSlice";
// import { clearNotifications } from "../redux/reducers/notificationSlice";

export default function LogoutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleConfirmLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearCart());
    dispatch(clearOrders());
    dispatch(clearNotificationError());
    toast.success("Logged out successfully");
    navigate("/login");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 w-full max-w-md border border-gray-200/20 dark:border-gray-700/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Logout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmLogout}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Confirm Logout
          </button>
        </div>
      </div>
    </div>
  );
}