import { Footer } from "../components/Footer";
import Sidebar from "../components/Sidebar";
import UserHeader from "../components/UserHeader";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <aside className="hidden lg:block fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-sm z-30 print:hidden">
                <Sidebar />
            </aside>

            <div className="lg:ml-64 flex flex-col min-h-screen">
                <UserHeader className="print:hidden" />
                <main className="flex-1 p-4 overflow-y-auto">{children}</main>
                <Footer className="print:hidden" />
            </div>
        </div>
    );
}


