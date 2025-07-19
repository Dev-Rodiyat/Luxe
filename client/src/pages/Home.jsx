import { useState } from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/NavBar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Home() {
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const steps = [
        {
            title: "1. Add Expenses",
            desc: "Log your daily spending in a few taps."
        },
        {
            title: "2. Analyze Spending",
            desc: "Visual breakdowns help you understand your habits."
        },
        {
            title: "3. Improve Finances",
            desc: "Set goals, stay within budget, and build savings."
        }
    ]

    const features = [
        {
            title: "Real-Time Expense Logging",
            desc: "Add expenses instantly from any device."
        },
        {
            title: "Smart Charts",
            desc: "Visualize your monthly or weekly spending trends."
        },
        {
            title: "Categorized Spending",
            desc: "See where your money goes: food, bills, fun, and more."
        }
    ]

    const FAQs = [
        {
            q: "Is Trackfi free to use?",
            a: "Yes, the core features are completely free."
        },
        {
            q: "Can I use it on mobile?",
            a: "Absolutely! Trackfi is responsive and mobile-friendly."
        },
        {
            q: "How secure is my data?",
            a: "We use secure encryption and don’t share your data with third parties."
        }
    ]

    return (
        <main className="bg-gradient-to-br from-emerald-100 via-emerald-50 to-white relative overflow-x-hidden">
            <Navbar />

            <div className="absolute -top-10 -left-10 w-72 h-72 bg-amber-300 opacity-20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-20 right-0 w-60 h-60 bg-emerald-200 opacity-30 rounded-full blur-2xl animate-pulse delay-200" />

            <section className="text-center py-40 px-4 pt-40 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-emerald-700 drop-shadow-sm mb-4"
                >
                    Take control of your spending with Trackfi 💸
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-gray-600 max-w-xl mx-auto text-lg"
                >
                    Trackfi helps you track your expenses, stay on budget, and achieve your financial goals effortlessly.
                </motion.p>
                <Link
                    to="/register"
                    className="mt-6 inline-block bg-gradient-to-r from-emerald-500 to-amber-400 text-white px-8 py-4 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300"
                >
                    ⚡ Get Started
                </Link>
            </section>

            <section id="how-it-works" className="py-20 px-6 bg-emerald-50 text-center">
                <h2 className="text-3xl font-semibold text-emerald-700 mb-6">How It Works ⚙️</h2>
                <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                    {steps.map((item, index) => (
                        <motion.div
                            key={index}
                            className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all bg-white border-t-4 border-amber-400"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-medium text-amber-500 mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section id="features" className="py-20 px-6 bg-white text-center">
                <h2 className="text-3xl font-semibold text-emerald-700 mb-6">Features ✨</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-gradient-to-tr from-white via-amber-50 to-emerald-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:scale-105 duration-300"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h4>
                            <p className="text-gray-600">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section id="faqs" className="py-20 px-6 text-center bg-emerald-50">
                <h2 className="text-3xl font-semibold text-emerald-700 mb-6">FAQs ❓</h2>
                <div className="max-w-3xl mx-auto space-y-4 text-left">
                    {FAQs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="border border-gray-200 rounded-lg p-4 bg-white shadow hover:shadow-md transition-all duration-300"
                        >
                            <button
                                className="w-full text-left font-semibold text-gray-800 focus:outline-none flex justify-between items-center"
                                onClick={() => toggleFaq(index)}
                            >
                                {faq.q}
                                <span className="text-2xl text-amber-500">{openFaqIndex === index ? "−" : "+"}</span>
                            </button>
                            <div
                                className={`mt-2 overflow-hidden transition-all duration-300 ${openFaqIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
