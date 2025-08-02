import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaSignOutAlt } from "react-icons/fa";
import DeleteUserModal from "../modals/DeleteUserModal";
import LogoutModal from "../modals/LogoutModal";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { FadeLoader } from "react-spinners";
import { updateUser } from "../redux/reducers/userSlice";

export default function Settings() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        name: "",
    });

    const isNameChanged = formData.name.trim() !== (user?.name?.trim() || "");

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name || "" });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const resultAction = await dispatch(updateUser(formData));
            if (updateUser.fulfilled.match(resultAction)) {
                toast.success("Profile updated successfully ✅");
            } else {
                const error = resultAction.payload || "Failed to update profile";
                toast.error(error);
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-white pt-20 px-4 md:px-8 lg:px-24">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-emerald-800 mb-10"
            >
                Settings ⚙️
            </motion.h1>

            {/* Profile Edit Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white shadow rounded-xl p-6 md:p-8 mb-10"
            >
                <h2 className="text-xl font-semibold text-emerald-700 mb-6">Profile</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={user?.email || ""}
                        disabled
                        className="border border-gray-200 p-3 rounded-lg w-full bg-gray-100 cursor-not-allowed text-gray-500"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading.update || !isNameChanged}
                    className={`mt-6 px-6 py-3 rounded-lg font-medium flex items-center gap-3 transition
    ${loading.update || !isNameChanged
                            ? "bg-emerald-300 cursor-not-allowed"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
                >
                    {loading.update ? (
                        <FadeLoader color="#fff" height={10} width={3} />
                    ) : (
                        "Save Changes"
                    )}
                </button>
            </motion.section>

            {/* Logout Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white shadow rounded-xl p-6 md:p-8 mb-10"
            >
                <h2 className="text-xl font-semibold text-emerald-600 mb-6">Log Out</h2>
                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-3 bg-emerald-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
                >
                    <FaSignOutAlt size={16} />
                    Logout
                </button>
            </motion.section>

            {/* Danger Zone */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white shadow rounded-xl p-6 md:p-8 mb-20"
            >
                <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Deleting your account is irreversible. Please proceed with caution.
                </p>
                <button
                    onClick={() => setShowDeleteUserModal(true)}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                >
                    Delete My Account
                </button>
            </motion.section>

            {/* Modals */}
            <LogoutModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
            <DeleteUserModal isOpen={showDeleteUserModal} onClose={() => setShowDeleteUserModal(false)} />
        </div>
    );
}
