import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "../components/Footer";
import Navbar from "../components/NavBar";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-white via-emerald-50 to-amber-50">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-grow flex flex-col items-center justify-center px-4 text-center"
      >
        <h1 className="text-6xl font-extrabold text-amber-500 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-2">Oops! Page not found.</p>
        <p className="text-gray-500 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-emerald-700 transition-all"
        >
          Go Back Home
        </Link>
      </motion.div>

      <Footer />
    </div>
  );
}
