import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import { deleteUser } from "../redux/reducers/userSlice";

export default function DeleteUserModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isDeleting = useSelector((state) => state.user.loading.delete);

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
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-xl max-w-sm w-full shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-red-700">Delete Account?</h2>
                <p className="text-gray-600 mb-6">
                    This action is permanent and cannot be undone. Are you sure you want to delete your account?
                </p>

                {isDeleting ? (
                    <div className="flex justify-center py-4">
                        <FadeLoader color="#DC2626" height={10} width={3} />
                    </div>
                ) : (
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
