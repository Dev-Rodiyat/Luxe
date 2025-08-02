import React from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../redux/reducers/userSlice";
import { Trash2, X, Loader2, AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function DeleteUserModal({ isOpen, onClose }) {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    if (!isOpen) return null

    const handleDelete = async () => {
        try {
            const resultAction = await dispatch(deleteUser());

            if (deleteUser.fulfilled.match(resultAction)) {
                toast.success("Account deleted successfully 💀");
                localStorage.removeItem("user");
                navigate("/login");
            } else {
                throw new Error(resultAction.payload || "Failed to delete user");
            }
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            onClose()
        }
    };

    if (isLoading) {
        return <ClipLoader />
    }

    // const handleConfirm = async () => {
    //     setIsLoading(true)
    //     await onConfirmDelete()
    //     setIsLoading(false)
    //     onClose() 
    // }

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
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Confirm Account Deletion</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        This action is irreversible. All your data will be permanently removed. Are you absolutely sure?
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 rounded-xl font-semibold border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                        <span>{isLoading ? "Deleting Account..." : "Delete Account"}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
