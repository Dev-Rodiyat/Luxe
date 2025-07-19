import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdNotificationsOff } from "react-icons/md";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import api from "../utils/api";

const override = {
  display: 'block',
  margin: '100px auto',
}

const Notification = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log({ notifications })

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/notification/get-notifications");
        setNotifications(res.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notification/delete-notification/${id}`);
      setNotifications((prev) => prev.filter((note) => note._id !== id));
      toast.success('Notification deleted successfully!')
    } catch (error) {
      console.error("Failed to delete notification:", error);
      toast.error(' Error deleting notification!')
    }
  };

  const handleDeleteAll = async () => {
    try {
      await api.delete("/notification/delete-all-notifications");
      setNotifications([]);
      toast.success('All notifications deleted successfully!')
    } catch (error) {
      console.error("Failed to clear notifications:", error);
      toast.error('Error deleting all notifications!')
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-end z-50 font-inter">
      <div className="w-[95%] max-w-[360px] my-6 mr-6 flex flex-col rounded-2xl bg-white shadow-2xl border border-zinc-200 overflow-hidden transition-all">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-zinc-200 bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-zinc-900">Notifications</h2>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-amber-100 transition"
            onClick={onClose}
          >
            <IoClose size={22} className="text-zinc-700" />
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 space-y-3 max-h-[70vh]">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <FadeLoader color="#1a80e5" loading={loading} cssOverride={override} />
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((note) => (
              <div
                key={note._id}
                className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl cursor-pointer shadow-sm hover:bg-emerald-100 transition"
              >
                <div className="flex-1">
                  <p className="text-sm text-zinc-800">{note.message}</p>
                  <span className="text-xs text-zinc-500 ml-2">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-amber-200 active:bg-amber-100 transition"
                >
                  <IoClose size={18} className="text-zinc-600" />
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-zinc-600 py-12">
              <MdNotificationsOff size={64} className="text-zinc-300 mb-4" />
              <p className="font-medium">No notifications</p>
              <p className="text-sm mt-1">You're all caught up!</p>
            </div>
          )}
        </div>

        {/* Clear All */}
        {notifications.length > 0 && (
          <div className="sticky bottom-0 px-5 py-4 bg-white border-t border-zinc-200 flex justify-center">
            <button
              onClick={handleDeleteAll}
              className="py-2 px-6 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
