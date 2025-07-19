import { useState } from "react";
import { FiBell, FiMenu, FiUser } from "react-icons/fi";
import Sidebar from "./Sidebar";
import Notification from "../modals/Notification";
import { useSelector } from "react-redux";

export default function UserHeader({ className = "" }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [notificationModalOpen, setNotificationModalOpen] = useState(false);
        const { loading, error, user } = useSelector((state) => state.user);

    const openNotification = () => {
        setNotificationModalOpen(true)
    }

    const closeNotification = () => {
        setNotificationModalOpen(false)
    }

    return (
        <header className={`w-full h-16 flex items-center justify-between px-4 md:px-6 bg-white shadow sticky top-0 z-20 ${className}`}>
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-emerald-600">
                <FiMenu className="w-6 h-6" />
            </button>

            <h1 className="text-lg font-semibold text-emerald-700 hidden lg:block">Dashboard</h1>

            <div className="flex items-center gap-4">
                <button
                    onClick={openNotification}
                    className="relative text-emerald-600 hover:text-amber-500 transition">
                    <FiBell className="w-5 h-5" />
                </button>
                <button className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-1 rounded-full font-medium flex items-center gap-2 transition">
                    <img src={user?.image} alt={user?.name || ''} className="w-4 h-4 rounded-full" />
                    <span className="hidden sm:block">{user?.name}</span>
                </button>
            </div>

            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
                    <div className="w-64 bg-white shadow-lg p-4">
                        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
                    </div>
                    <div className="flex-1" onClick={() => setSidebarOpen(false)} />
                </div>
            )}
            {notificationModalOpen && <Notification onClose={closeNotification} />}
        </header>
    );
}
