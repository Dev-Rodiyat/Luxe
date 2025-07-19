import { FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { updateExpense } from "../redux/reducers/expenseSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

export default function EditTransactionModal({ isOpen, onClose, transaction }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        type: "",
        amount: "",
        category: "",
        date: "",
        paymentMethod: "",
        note: "",
        _id: null,
    });

    useEffect(() => {
        if (transaction) {
            setFormData({
                title: transaction.title || "",
                type: transaction.type || "",
                amount: transaction.amount?.toLocaleString() || "",
                category: transaction.category || "",
                date: transaction.date?.split("T")[0] || "",
                paymentMethod: transaction.paymentMethod || "",
                note: transaction.note || "",
                _id: transaction._id || null,
            });
        }
    }, [transaction]);

    if (!isOpen || !transaction) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "amount") {
            const rawValue = value.replace(/,/g, "");
            if (!/^\d*$/.test(rawValue)) return;
            const formatted = Number(rawValue).toLocaleString();
            setFormData(prev => ({ ...prev, [name]: formatted }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updatedData = {
                ...formData,
                amount: Number(formData.amount.replace(/,/g, "")),
            };

            await dispatch(updateExpense(updatedData)).unwrap();
            toast.success("Transaction updated!");
            onClose();
        } catch (err) {
            toast.error("Failed to update transaction");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-xl p-6 relative shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                    disabled={loading}
                >
                    <FiX size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-emerald-700">Edit Transaction</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-3 border rounded-lg"
                    />

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-3 border rounded-lg"
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>

                    <input
                        type="text"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-3 border rounded-lg"
                    />

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-3 border rounded-lg"
                    >
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Others</option>
                    </select>

                    <input
                        type="date"
                        name="date"
                        max={new Date().toISOString().split("T")[0]}
                        value={formData.date}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-3 border rounded-lg"
                    />

                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-3 border rounded-lg"
                    >
                        <option value="" disabled>Select Transaction payment method</option>
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Other">Others</option>
                    </select>

                    <textarea
                        name="note"
                        placeholder="About the transaction"
                        value={formData.note}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full p-3 border rounded-lg"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg transition text-white ${loading ? "bg-emerald-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                    >
                        {loading ? <FadeLoader /> : "Update Transaction"}
                    </button>
                </form>
            </div>
        </div>
    );
}
