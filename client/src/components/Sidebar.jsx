import { FiHome, FiPieChart, FiList, FiSettings, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Dashboard", icon: <FiHome />, path: "/dashboard" },
  { label: "Analytics", icon: <FiPieChart />, path: "/analytics" },
  { label: "Transactions", icon: <FiList />, path: "/transactions" },
  { label: "Settings", icon: <FiSettings />, path: "/settings" },
];

export default function Sidebar({ closeSidebar }) {
  const location = useLocation();

  return (
    <div className="h-screen w-64 p-4 pt-16 bg-white border-r shadow-sm">
      {closeSidebar && (
        <button
          onClick={closeSidebar}
          className="flex items-center gap-1 mb-6 text-emerald-700 hover:text-emerald-900"
        >
          <FiX className="w-5 h-5" />
          Close
        </button>
      )}
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
              location.pathname === link.path
                ? "bg-emerald-100 text-emerald-800"
                : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
