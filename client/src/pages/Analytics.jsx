import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import DashboardLayout from "../layouts/DashLayout";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import dayjs from "dayjs";

const COLORS = ["#34D399", "#F59E0B", "#60A5FA", "#A78BFA", "#F472B6", "#818CF8"];

export default function Analytics() {
    const { loading, error } = useSelector((state) => state.user);
    const { expenses, loading: expenseLoading, error: expenseError } = useSelector((state) => state.expense);

    useEffect(() => {
        if (error) toast.error(error);
        if (expenseError) toast.error(expenseError);
    }, [error, expenseError]);

    const isLoading = loading.get || expenseLoading.fetchAll;

    const totalIncome = useMemo(() => {
        return expenses
            .filter((t) => t.type === "Income")
            .reduce((sum, t) => sum + Number(t.amount), 0);
    }, [expenses]);

    const totalExpenses = useMemo(() => {
        return expenses
            .filter((t) => t.type === "Expense")
            .reduce((sum, t) => sum + Number(t.amount), 0);
    }, [expenses]);

    const totalBalance = totalIncome - totalExpenses;

    const transactionSummary = [
        {
            label: "Total Income",
            amount: `₦${totalIncome.toLocaleString()}`,
            color: "text-green-600",
        },
        {
            label: "Total Expenses",
            amount: `₦${totalExpenses.toLocaleString()}`,
            color: "text-red-500",
        },
        {
            label: "Net Savings",
            amount: `₦${totalBalance.toLocaleString()}`,
            color: "text-emerald-700",
        },
    ];

    const monthlyData = useMemo(() => {
        const grouped = {};
        expenses.forEach((item) => {
            const month = dayjs(item.date).format("MMM");
            if (!grouped[month]) grouped[month] = { name: month, income: 0, expenses: 0 };
            if (item.type === "Income") grouped[month].income += Number(item.amount);
            else if (item.type === "Expense") grouped[month].expenses += Number(item.amount);
        });

        return Object.values(grouped).sort(
            (a, b) => dayjs(a.name, "MMM").month() - dayjs(b.name, "MMM").month()
        );
    }, [expenses]);

    const pieData = useMemo(() => {
        const categories = {};
        expenses.forEach((item) => {
            if (item.type === "Expense") {
                if (!categories[item.category]) {
                    categories[item.category] = 0;
                }
                categories[item.category] += Number(item.amount);
            }
        });

        return Object.entries(categories).map(([name, value]) => ({ name, value }));
    }, [expenses]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FadeLoader color="#10B981" height={12} />
            </div>
        );
    }

    return (
        <DashboardLayout>
            <h1 className="text-2xl md:pt-8 md:pl-4 md:text-3xl font-bold text-emerald-800 mb-6">
                Analytics 📊
            </h1>

            {/* Summary cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 px-4">
                {transactionSummary.map((item, i) => (
                    <div
                        key={i}
                        className={`rounded-xl p-6 shadow bg-white ${item.color}`}
                    >
                        <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                        <h2 className="text-xl font-bold">{item.amount}</h2>
                    </div>
                ))}
            </section>

            {/* Monthly chart */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-10 mx-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Monthly Income vs Expenses
                </h3>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[320px] h-[300px]">
                        {monthlyData.length <= 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 mb-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M9 16h6M12 3v1m0 16v1m9-9a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-center text-sm">No transactions yet to show monthly trends.</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={36} />
                                    <Line type="monotone" dataKey="income" stroke="#10B981" name="Income" />
                                    <Line type="monotone" dataKey="expenses" stroke="#F97316" name="Expenses" />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>

            {/* Pie chart */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow mx-4 mb-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Expenses by Category
                </h3>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px] h-[300px]">
                        {pieData.length <= 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 mb-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 3v9.75H21A9.75 9.75 0 0011.25 3zM3 12a9.75 9.75 0 009.75 9.75V12H3z" />
                                </svg>
                                <p className="text-center text-sm">No expense breakdown to display by category.</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name }) => name}
                                        outerRadius={100}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
