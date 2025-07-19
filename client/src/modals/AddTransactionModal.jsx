import { FiX } from "react-icons/fi";
import { useState } from "react";
import { createExpense } from "../redux/reducers/expenseSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FadeLoader } from "react-spinners";

export default function AddTransactionModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: "",
        type: "",
        amount: "",
        category: "",
        date: "",
        paymentMethod: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData?.title || !formData?.type || !formData?.amount || !formData?.date || !formData?.paymentMethod || !formData?.category) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            setLoading(true);
            const preparedData = {
                ...formData,
                amount: Number(formData.amount.replace(/,/g, '')),
            };
            await dispatch(createExpense(preparedData)).unwrap();
            setFormData({ title: "", type: "", amount: "", category: "", date: "", paymentMethod: "" });
            toast.success("Transaction added successfully!");
            onClose();
        } catch (err) {
            toast.error(err?.message || "Failed to add transaction");
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

                <h2 className="text-xl font-semibold mb-4 text-emerald-700">Add Transaction</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title">Title</label>
                        <input type="text" disabled={loading} name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="type">Type</label>
                        <select name="type" required disabled={loading} value={formData.type} onChange={handleChange} className="w-full p-3 border rounded-lg">
                            <option value="" disabled hidden>Select Transaction type</option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="text"
                            name="amount"
                            placeholder="Amount"
                            disabled={loading}
                            value={formData.amount}
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/,/g, '');
                                if (!/^\d*$/.test(rawValue)) return;
                                const formatted = Number(rawValue).toLocaleString();
                                setFormData(prev => ({ ...prev, amount: formatted }));
                            }}
                            required
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="category">Category</label>
                        <select name="category" value={formData.category} disabled={loading} onChange={handleChange} className="w-full p-3 border rounded-lg">
                            <option value="" disabled>Select Transaction category</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Others</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" disabled={loading} max={new Date().toISOString().split("T")[0]} value={formData.date} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="paymentMethod">Method</label>
                        <select name="paymentMethod" value={formData.paymentMethod} disabled={loading} onChange={handleChange} className="w-full p-3 border rounded-lg">
                            <option value="" disabled>Select Transaction payment method</option>
                            <option value="Cash">Cash</option>
                            <option value="Card">Card</option>
                            <option value="UPI">UPI</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Other">Others</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center bg-emerald-600 text-white py-3 rounded-lg transition font-medium ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-emerald-700"
                            }`}
                    >
                        {loading ? <FadeLoader size={20} color="#fff" /> : "Add Transaction"}
                    </button>
                </form>
            </div>
        </div>
    );
}
