import { FiTrash2, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteExpense } from "../redux/reducers/expenseSlice";
import { useState } from "react";
import { FadeLoader } from "react-spinners";

export default function DeleteTransactionModal({ isOpen, onClose, transaction }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        try {
            if (!transaction?._id) throw new Error("Transaction ID missing");

            setIsLoading(true);
            await dispatch(deleteExpense(transaction._id)).unwrap();
            toast.success("Transaction deleted successfully");
            onClose();
        } catch (err) {
            toast.error(err?.message || "Failed to delete transaction");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen || !transaction) return null;

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 bg-white/60 dark:bg-black/60 flex items-center justify-center">
                <FadeLoader color="#10B981" />
            </div>
        );
    }
    
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-xl p-6 relative shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                >
                    <FiX size={20} />
                </button>

                <div className="flex items-center gap-3 mb-4">
                    <FiTrash2 className="text-red-500" size={24} />
                    <h2 className="text-lg font-semibold text-gray-700">Delete Transaction</h2>
                </div>

                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this transaction? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
