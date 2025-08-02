import { useEffect } from "react";
import { Bell, X, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNotifications, deleteNotification, deleteAllNotifications, clearNotificationError } from "../redux/reducers/notificationSlice";
import { toast } from "react-toastify";

export default function Notification({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { items: notifications, loading, error, lastAction } = useSelector((state) => state.notifications);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && isOpen) {
      dispatch(getNotifications());
    }
  }, [dispatch, user, isOpen]);

  useEffect(() => {
    if (lastAction) {
      toast.success(lastAction);
      dispatch(clearNotificationError());
    }
    if (error) {
      if (error.includes("Unauthorized") || error.includes("User not found")) {
        toast.error("Please log in to view notifications");
      } else {
        toast.error(error);
      }
      dispatch(clearNotificationError());
    }
  }, [lastAction, error, dispatch]);

  const handleDeleteNotification = (notificationId) => {
    if (!user) {
      toast.error("Please log in to manage notifications");
      return;
    }
    dispatch(deleteNotification(notificationId));
  };

  const handleDeleteAllNotifications = () => {
    if (!user) {
      toast.error("Please log in to manage notifications");
      return;
    }
    dispatch(deleteAllNotifications());
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 dark:bg-black/70 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg h-full shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200/20 dark:border-gray-700/20">
          <div className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto h-[calc(100%-8rem)]">
          {!user ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">Please log in to view your notifications.</p>
              <Link
                to="/login"
                onClick={onClose}
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Log In
              </Link>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 dark:text-gray-400">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">No notifications found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="flex items-start space-x-4 bg-white dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200/20 dark:border-gray-700/20"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 capitalize">
                        {notification.type || "General"}
                      </span>
                      <button
                        onClick={() => handleDeleteNotification(notification._id)}
                        className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition-colors"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-900 dark:text-white mt-1">{notification.message}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {user && notifications.length > 0 && (
          <div className="p-6 border-t border-gray-200/20 dark:border-gray-700/20">
            <button
              onClick={handleDeleteAllNotifications}
              className="w-full flex items-center justify-center bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Clear All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}