import { ChevronDown, ChevronRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import Layout from "../layouts/Layout";

export default function FAQ() {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        {
            question: "What makes Luxe different from other fashion brands?",
            answer: "Luxe combines timeless elegance with modern sophistication. We use only premium materials, employ master craftspeople, and focus on sustainable practices. Every piece is designed to last decades, not seasons."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes! We ship to over 50 countries worldwide. Shipping is free on orders over $150. International orders typically arrive within 7-14 business days, depending on your location."
        },
        {
            question: "What's your return policy?",
            answer: "We offer a 30-day return policy for unworn items in original condition with tags attached. Return shipping is free within the US, and we provide prepaid return labels for your convenience."
        },
        {
            question: "Are your products ethically made?",
            answer: "Absolutely. We work directly with certified ethical manufacturers, ensure fair wages for all workers, and conduct regular facility inspections. We're also committed to carbon-neutral shipping and sustainable packaging."
        },
        {
            question: "How do I find my perfect size?",
            answer: "We provide detailed size guides for each product category. You can also use our virtual fitting tool or contact our style consultants for personalized sizing advice. We also offer free exchanges if the size isn't quite right."
        },
        {
            question: "Do you have a loyalty program?",
            answer: "Yes! Our Luxe Elite program offers exclusive benefits including early access to new collections, birthday discounts, free premium shipping, and invitations to private shopping events. You'll earn points on every purchase."
        },
        {
            question: "Can I track my order?",
            answer: "Once your order ships, you'll receive a tracking number via email and SMS. You can also log into your account to view real-time order status and delivery updates."
        },
        {
            question: "Do you offer gift cards?",
            answer: "Yes! Digital gift cards are available in amounts from $50 to $1000. They never expire and can be used online or in our flagship stores. Perfect for the fashion lover in your life!"
        }
    ];

    return (
        <Layout>
            <section className="pb-20 pt-28 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Everything you need to know about Luxe
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <span className="font-semibold text-lg pr-4">{faq.question}</span>
                                    <div className="flex-shrink-0">
                                        {openFAQ === idx ? (
                                            <ChevronDown className="w-6 h-6 text-purple-600 transform transition-transform duration-300" />
                                        ) : (
                                            <ChevronRight className="w-6 h-6 text-gray-400" />
                                        )}
                                    </div>
                                </button>

                                <div className={`transition-all duration-300 ease-in-out ${openFAQ === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    } overflow-hidden`}>
                                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Still have questions? We're here to help!
                        </p>
                        <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                            <MessageCircle className="w-5 h-5" />
                            <span>Contact Support</span>
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}