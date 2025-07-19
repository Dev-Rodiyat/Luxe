import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FaArrowLeft, FaMoneyBillWave, FaTag, FaCalendarAlt, FaStickyNote, FaIdCard, FaWallet, FaPrint, FaDownload } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import DashboardLayout from "../layouts/DashLayout";
import TrackFiLogo from './../assets/TrackFi.png';
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getSingleExpense } from "../redux/reducers/expenseSlice";

export default function TransactionDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const receiptRef = useRef();

    const { selectedExpense, loading, error } = useSelector((state) => state.expense);

    useEffect(() => {
        dispatch(getSingleExpense(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    useEffect(() => {
        if (selectedExpense?.type === "Income") {
            import("canvas-confetti").then((module) =>
                module.default({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                })
            );
        } else if (selectedExpense?.type === "Expense" && navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }, [selectedExpense]);

    const handleDownloadPDF = () => {
        const element = receiptRef.current;
        const options = {
            margin: 0.5,
            filename: `Transaction-${selectedExpense?._id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(options).from(element).save();
    };

    if (loading.getSingle || !selectedExpense) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FadeLoader color="#10B981" height={12} />
            </div>
        );
    }

    const transaction = selectedExpense;
    const typeBadgeColor = transaction.type === "Income" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700";

    return (
        <DashboardLayout>
            <div className="bg-gradient-to-br from-emerald-50 to-white py-8 px-4 md:px-8 print:py-4">
                <div className="flex justify-between items-center mb-6 print:hidden">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-emerald-700 hover:underline flex items-center gap-2"
                    >
                        <FaArrowLeft /> Back
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={handleDownloadPDF}
                            className="flex items-center gap-2 text-sm bg-emerald-500 text-white px-3 py-2 rounded-md hover:bg-emerald-600"
                        >
                            <FaDownload /> Download PDF
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 text-sm bg-emerald-600 text-white px-3 py-2 rounded-md hover:bg-emerald-700"
                        >
                            <FaPrint /> Print
                        </button>
                    </div>
                </div>

                <div ref={receiptRef} className="bg-white shadow-xl rounded-2xl p-6 md:p-8 max-w-2xl mx-auto border border-emerald-100 print:shadow-none print:border-none">
                    <div className="flex justify-center mb-6">
                        <img src={TrackFiLogo} alt="TrackFi Logo" className="h-12" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-emerald-800 mb-4 text-center">Transaction Receipt 🧾</h2>
                    <p className="text-center text-gray-500 mb-8">
                        Here's everything we know about this transaction.
                    </p>

                    <div className="grid gap-6 text-gray-700">
                        <Detail label="Title" value={transaction?.title} icon={<FaTag />} />
                        <Detail label="Type" value={transaction?.type} icon={<FaWallet />} badgeColor={typeBadgeColor} />
                        <Detail label="Amount" value={`₦${transaction?.amount.toLocaleString()}`} icon={<FaMoneyBillWave />} isAmount />
                        <Detail label="Category" value={transaction?.category} icon={<FaTag />} />
                        <Detail label="Method" value={transaction?.paymentMethod} icon={<FaWallet />} />
                        <Detail label="Date" value={new Date(transaction?.date).toLocaleDateString()} icon={<FaCalendarAlt />} />
                        <Detail label="Note" value={transaction?.note || "No additional notes provided."} icon={<FaStickyNote />} />
                        <Detail label="Transaction ID" value={transaction?._id} icon={<FaIdCard />} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function Detail({ label, value, icon, badgeColor = "", isAmount = false }) {
    return (
        <div className="flex items-start gap-4 break-words">
            <div className="text-emerald-600 mt-1">{icon}</div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                {badgeColor ? (
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${badgeColor}`}>
                        {value}
                    </span>
                ) : (
                    <p className={`text-base font-medium ${isAmount ? "text-emerald-700 text-lg font-bold" : ""}`}>
                        {value}
                    </p>
                )}
            </div>
        </div>
    );
}
