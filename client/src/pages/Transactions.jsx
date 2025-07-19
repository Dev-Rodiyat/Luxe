import { useState } from "react";
import { FiGrid, FiList, FiPlus, FiEdit, FiTrash2, FiSearch, FiX, FiDownload, FiPrinter, FiFileText } from "react-icons/fi";
import DashboardLayout from "../layouts/DashLayout";
import AddTransactionModal from "../modals/AddTransactionModal";
import EditTransactionModal from "../modals/EditTransactionModal";
import DeleteTransactionModal from "../modals/DeleteTransactionModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function Transactions() {
    const navigate = useNavigate();
    const [view, setView] = useState("table");
    const [search, setSearch] = useState("");

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const { loading, error } = useSelector((state) => state.user);
    const { expenses, loading: expenseLoading, error: expenseError } = useSelector((state) => state.expense);

    useEffect(() => {
        if (error) toast.error(error);
        if (expenseError) toast.error(expenseError);
    }, [error, expenseError]);

    if (loading.get || expenseLoading.getSingle) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FadeLoader color="#10B981" height={12} />
            </div>
        );
    }

    const handleOpenEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setShowEditModal(true);
    };

    const handleOpenDelete = (transaction) => {
        setSelectedTransaction(transaction);
        setShowDeleteModal(true);
    };

    const handleCloseModals = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setSelectedTransaction(null);
    };

    const filtered = expenses.filter((tx) =>
        Object.values(tx).some((val) =>
            String(val).toLowerCase().includes(search.toLowerCase())
        )
    );

    const handleExportCSV = () => {
        const csv = Papa.unparse(filtered);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "transactions_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text("TrackFi Transactions Report", 14, 20);
        autoTable(doc, {
            startY: 30,
            head: [["Title", "Type", "Amount", "Category", "Date", "Method"]],
            body: filtered.map((tx) => [
                tx.title,
                tx.type,
                `₦${tx.amount.toLocaleString()}`,
                tx.category,
                tx.date,
                tx.method,
            ]),
        });
        doc.save("transactions_report.pdf");
    };

    const handlePrint = () => {
        const content = filtered
            .map(
                (tx) =>
                    `Title: ${tx.title}\nType: ${tx.type}\nAmount: ₦${tx.amount.toLocaleString()}\nCategory: ${tx.category}\nDate: ${tx.date}\nMethod: ${tx.method}\n---\n`
            )
            .join("\n");
        const printWindow = window.open("", "", "height=600,width=800");
        printWindow.document.write("<pre>" + content + "</pre>");
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 md:pt-8 md:pl-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">
                        Transactions 💰
                    </h1>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-amber-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-600"
                        >
                            <FiPlus /> Add
                        </button>

                        <button onClick={handleExportCSV} className="bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200">
                            <FiFileText className="inline-block mr-2" /> Export CSV
                        </button>

                        <button onClick={handleDownloadPDF} className="bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200">
                            <FiDownload className="inline-block mr-2" /> Download PDF
                        </button>

                        <button onClick={handlePrint} className="bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200">
                            <FiPrinter className="inline-block mr-2" /> Print
                        </button>

                        <button
                            onClick={() => setView("table")}
                            className={`p-2 rounded-md ${view === "table" ? "bg-emerald-100 text-emerald-700" : "text-gray-500"}`}
                        >
                            <FiList size={18} />
                        </button>

                        <button
                            onClick={() => setView("grid")}
                            className={`p-2 rounded-md ${view === "grid" ? "bg-emerald-100 text-emerald-700" : "text-gray-500"}`}
                        >
                            <FiGrid size={18} />
                        </button>
                    </div>
                </div>

                <div className="relative w-full max-w-md">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-10 p-3 border border-gray-300 rounded-lg w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <FiX />
                        </button>
                    )}
                </div>

                {view === "table" ? (
                    <div className="overflow-x-auto bg-white rounded-xl shadow">
                        <table className="w-full text-left min-w-[600px]">
                            <thead className="bg-gray-100 text-gray-600 text-sm">
                                <tr>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Method</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered && filtered.length > 0 ? (
                                    filtered.map((tx) => (
                                        <tr key={tx?._id}
                                            onClick={() => navigate(`/transaction/${tx._id}`)}
                                            className="border-t hover:bg-emerald-50 cursor-pointer">
                                            <td className="py-5 px-4 font-medium">{tx?.title}</td>
                                            <td className="py-5 px-4">{tx?.type}</td>
                                            <td className={`py-5 px-4 font-semibold ${tx?.type === "Income" ? "text-green-600" : "text-red-500"}`}>
                                                ₦{tx.amount.toLocaleString()}
                                            </td>
                                            <td className="py-5 px-4">{tx?.category}</td>
                                            <td className="py-5 px-4">{dayjs(tx?.date).format("DD MMM YYYY")}</td>
                                            <td className="py-5 px-4">{tx?.paymentMethod}</td>
                                            <td className="py-3 px-4 text-right space-x-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpenEdit(tx);
                                                    }}
                                                    className="text-blue-500 hover:text-blue-700">
                                                    <FiEdit />
                                                </button>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpenDelete(tx);
                                                    }}
                                                    className="text-red-500 hover:text-red-700">
                                                    <FiTrash2 />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <div className="p-6 text-center items-center justify-center flex text-gray-500">
                                        You have no transactions yet.
                                    </div>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered && filtered.length > 0 ? (
                            filtered.map((tx) => (
                                <div key={tx?._id}
                                    onClick={() => navigate(`/transaction/${tx?._id}`)}
                                    className="bg-white rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="font-semibold text-gray-800">{tx?.title}</h3>
                                        <span
                                            className={`text-sm font-medium ${tx?.type === "Income" ? "text-green-600" : "text-red-500"}`}
                                        >
                                            {tx?.type}
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold mb-1">₦{tx?.amount.toLocaleString()}</p>
                                    <p className="text-sm text-gray-600 mb-1">Category: {tx?.category}</p>
                                    <td className="text-sm text-gray-600 mb-3">{dayjs(tx?.date).format("DD MMM YYYY")}</td>
                                    <p className="text-sm text-gray-600 mb-3">Method: {tx?.paymentMethod}</p>
                                    <div className="flex gap-2 justify-end text-sm">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenEdit(tx);
                                            }}
                                            className="text-blue-500 hover:text-blue-700">
                                            <FiEdit />
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenDelete(tx);
                                            }}
                                            className="text-red-500 hover:text-red-700">
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
                                You have no transactions yet.
                            </div>
                        )}
                    </div>
                )}

                {showAddModal && (
                    <AddTransactionModal
                        isOpen={showAddModal}
                        onClose={handleCloseModals}
                    />
                )}

                {showEditModal && (
                    <EditTransactionModal
                        isOpen={showEditModal}
                        onClose={handleCloseModals}
                        transaction={selectedTransaction}
                    />
                )}

                {showDeleteModal && (
                    <DeleteTransactionModal
                        isOpen={showDeleteModal}
                        onClose={handleCloseModals}
                        transaction={selectedTransaction}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
