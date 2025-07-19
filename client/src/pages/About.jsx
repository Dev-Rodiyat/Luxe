import { Footer } from "../components/Footer";
import Navbar from "../components/NavBar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-300 opacity-20 blur-3xl rounded-full animate-pulse -z-10" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-emerald-200 opacity-30 blur-2xl rounded-full animate-pulse delay-200 -z-10" />

      <main className="pt-28 px-6 pb-16 max-w-3xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-emerald-700 text-center mb-12"
        >
          About Trackfi
        </motion.h1>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-amber-500 mb-4">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Trackfi was born out of the frustration of juggling expenses with spreadsheets and mental math.
            We realized that most people don't need complex accounting tools — just a smart, simple way
            to track where their money goes. So we built Trackfi: an intuitive and friendly expense tracker
            designed for everyday use.
          </p>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-amber-500 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            To empower individuals to make better financial decisions by making expense tracking
            easy, insightful, and even a little fun.
          </p>

          <h3 className="text-xl font-semibold text-emerald-600 mb-3">Our Goals</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
            <li>Make personal finance approachable and stress-free.</li>
            <li>Help users form smarter spending habits.</li>
            <li>Continue evolving with useful, user-focused features.</li>
          </ul>
        </motion.section>

        <motion.section
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-emerald-700 mb-5">
            Ready to take control of your spending?
          </h2>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-amber-500 to-emerald-400 text-white font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Get Started with Trackfi
          </Link>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
