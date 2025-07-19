import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import expenseIllustration from './../assets/expense-illustration.jpeg';
import AddTransactionModal from "../modals/AddTransactionModal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import { fetchExpenses } from "../redux/reducers/expenseSlice";

const formatName = (namee) => {
    const name = namee?.split(" ")[0];
    return name;
};

export default function Dashboard() {
    const dispatch = useDispatch()
    const [showAddModal, setShowAddModal] = useState(false);
    const { loading, error, user } = useSelector((state) => state.user);
    const { expenses, loading: expenseLoading, error: expenseError } = useSelector((state) => state.expense);

    useEffect(() => {
        if (user) {
            dispatch(fetchExpenses())
        }
    })

    useEffect(() => {
        if (error) toast.error(error);
        if (expenseError) toast.error(expenseError);
    }, [error, expenseError]);

    const handleCloseModals = () => {
        setShowAddModal(false);
    };

    const handleAddTransaction = () => {
        toast.success("Transaction added successfully!");
    };

    if (loading.get || expenseLoading.getSingle) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FadeLoader color="#10B981" height={12} />
            </div>
        );
    }

    const displayedTransactions = expenses.slice(0, 3);

    const totalIncome = expenses
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = expenses
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalBalance = totalIncome - totalExpenses;

    const transactionSummary = [
        {
            label: "Total Balance",
            amount: `₦${totalBalance.toLocaleString()}`,
            color: "bg-emerald-100",
        },
        {
            label: "Total Income",
            amount: `₦${totalIncome.toLocaleString()}`,
            color: "bg-green-100",
        },
        {
            label: "Total Expenses",
            amount: `₦${totalExpenses.toLocaleString()}`,
            color: "bg-orange-100",
        },
    ];

    return (
        <motion.div
            className="bg-gradient-to-br from-white via-emerald-50 to-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <main className="w-full p-6 mx-auto">
                <section className="flex flex-col md:flex-row justify-between items-center w-full mb-10 gap-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-bold text-emerald-800"
                    >
                        Welcome back, <span className="text-amber-500">{formatName(user?.name)}</span> 👋
                    </motion.h1>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-amber-600 transition"
                    >
                        + Add Transaction
                    </button>
                </section>


                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {transactionSummary.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.2 }}
                            className={`rounded-xl p-6 shadow ${item.color}`}
                        >
                            <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                            <h2 className="text-xl font-bold text-gray-800">{item.amount}</h2>
                        </motion.div>
                    ))}
                </section>

                <section className="mb-10 bg-white rounded-xl shadow p-6 flex items-center justify-between gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                            Need to add a new transaction?
                        </h3>
                        <p className="text-gray-600">
                            Use the <span className="text-amber-500 font-medium">“+ Add”</span> button above to log your incomes or expenses.
                        </p>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="hidden sm:block"
                    >
                        <img
                            src={expenseIllustration}
                            alt="Add transaction"
                            className="w-28 h-28 object-contain"
                        />
                    </motion.div>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-emerald-700 mb-4">
                        Recent Transactions
                    </h3>

                    {expenses && expenses.length > 0 ? (
                        <div className="bg-white rounded-xl shadow divide-y">
                            {displayedTransactions.map((tx, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.01 }}
                                    className="flex justify-between items-center p-4 hover:bg-emerald-50 transition cursor-pointer"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">{tx?.title}</p>
                                        <p className="text-sm text-gray-500">{tx?.type}</p>
                                    </div>
                                    <p
                                        className={`font-semibold ${tx?.type === "Income"
                                            ? "text-green-600"
                                            : "text-orange-500"
                                            }`}
                                    >
                                        {tx?.amount}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
                            You have no transactions yet.
                        </div>
                    )}

                    {expenses.length > 3 && (
                        <div className="mt-4 text-center">
                            <Link
                                to="/transactions"
                                className="text-emerald-600 font-medium hover:underline"
                            >
                                See All Transactions →
                            </Link>
                        </div>
                    )}
                </section>
            </main>
            {showAddModal && (
                <AddTransactionModal
                    isOpen={showAddModal}
                    onClose={handleCloseModals}
                    onAdd={handleAddTransaction}
                />
            )}
        </motion.div>
    );
}
