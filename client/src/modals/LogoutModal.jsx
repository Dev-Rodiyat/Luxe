import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { logoutUser } from "../redux/reducers/userSlice";

export default function LogoutModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
    setIsLoading(true);
    try {
        const result = await dispatch(logoutUser());

        if (logoutUser.fulfilled.match(result)) {
            toast.success("Logged out successfully");
            navigate("/login");
        } else {
            toast.error(result.payload?.message || "Logout failed");
        }
    } catch (err) {
        toast.error("Logout failed");
    } finally {
        setIsLoading(false);
    }
};

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-xl max-w-sm w-full shadow-xl relative">
                <h2 className="text-xl font-bold mb-4 text-emerald-800">Log out?</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to log out of your account?</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50 flex items-center gap-2"
                    >
                        {isLoading ? <FadeLoader size={16} color="#fff" /> : 'Yes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
