import { useState, useEffect } from 'react';
import { Star, ArrowRight, Sparkles, TrendingUp, Users, Shield } from 'lucide-react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentHero, setCurrentHero] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentHero((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const heroSlides = [
        {
            title: "Discover Timeless Fashion",
            subtitle: "Elevate your wardrobe with luxury pieces crafted for confidence and charm",
            bg: "from-purple-600 via-pink-600 to-orange-500"
        },
        {
            title: "Sustainable Style",
            subtitle: "Eco-conscious fashion that doesn't compromise on elegance",
            bg: "from-emerald-500 via-teal-600 to-cyan-600"
        },
        {
            title: "Limited Edition",
            subtitle: "Exclusive collections designed by world-renowned artists",
            bg: "from-indigo-600 via-blue-600 to-purple-700"
        }
    ];

    const categories = [
        { label: "Women", emoji: "👗", gradient: "from-pink-400 to-rose-600", items: "2,400+" },
        { label: "Men", emoji: "👔", gradient: "from-blue-400 to-indigo-600", items: "1,800+" },
        { label: "Accessories", emoji: "💎", gradient: "from-amber-400 to-orange-600", items: "950+" },
    ];

    const products = [
        { name: "Silk Harmony Dress", price: "$299", rating: 4.9, image: "🌸", tag: "New" },
        { name: "Urban Classic Jacket", price: "$189", rating: 4.8, image: "🧥", tag: "Popular" },
        { name: "Minimalist Watch", price: "$450", rating: 5.0, image: "⌚", tag: "Luxury" },
        { name: "Artisan Handbag", price: "$220", rating: 4.7, image: "👜", tag: "Trending" }
    ];

    const features = [
        { icon: Shield, title: "Premium Quality", desc: "Crafted with finest materials" },
        { icon: Users, title: "2M+ Happy Customers", desc: "Trusted worldwide" },
        { icon: TrendingUp, title: "Trending Styles", desc: "Latest fashion insights" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Navigation */}
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-20 min-h-screen flex items-center overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentHero].bg} opacity-10 transition-all duration-1000`}></div>

                {/* Floating Elements */}
                <div className="absolute top-1/4 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl animate-pulse delay-300"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-700"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
                    <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium">New Collection Available</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                                {heroSlides[currentHero].title}
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            {heroSlides[currentHero].subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300">
                                <span className="flex items-center justify-center space-x-2">
                                    <span>Shop Collection</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                            <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                                View Lookbook
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-8 mt-12">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">2M+</div>
                                <div className="text-sm text-gray-500">Happy Customers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">4.9★</div>
                                <div className="text-sm text-gray-500">Average Rating</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">5K+</div>
                                <div className="text-sm text-gray-500">Products</div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="relative">
                        <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentHero].bg} opacity-80 transition-all duration-1000`}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-8xl opacity-20">👗</div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-lg rounded-2xl p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-white font-semibold">Featured Item</div>
                                        <div className="text-white/80 text-sm">Silk Evening Dress</div>
                                    </div>
                                    <div className="text-white font-bold text-xl">$299</div>
                                </div>
                            </div>
                        </div>

                        {/* Slide indicators */}
                        <div className="flex justify-center space-x-2 mt-6">
                            {heroSlides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentHero(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentHero ? 'bg-purple-600 w-8' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">Discover your perfect style</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {categories.map((category, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className={`relative bg-gradient-to-br ${category.gradient} rounded-3xl p-8 h-64 overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl`}>
                                    <div className="absolute top-4 right-4 text-white/80 text-sm font-medium">
                                        {category.items}
                                    </div>
                                    <div className="absolute bottom-8 left-8">
                                        <div className="text-6xl mb-2">{category.emoji}</div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{category.label}</h3>
                                        <div className="flex items-center text-white/80">
                                            <span className="text-sm">Explore Collection</span>
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Trending Now</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">Most loved by our customers</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product, idx) => (
                            <div key={idx} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                                    <div className="text-6xl">{product.image}</div>
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                                            {product.tag}
                                        </span>
                                    </div>
                                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-lg">♡</span>
                                    </button>
                                </div>

                                <div className="p-6">
                                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-2xl font-bold text-purple-600">{product.price}</span>
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                                        </div>
                                    </div>
                                    <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">Limited Time Offer</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Up to 40% Off
                        <br />
                        <span className="text-yellow-300">Selected Items</span>
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Hurry! Exclusive fashion pieces at unbeatable prices
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                            Shop Sale Now
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
                            View All Deals
                        </button>
                    </div>

                    <div className="mt-8 text-sm opacity-80">
                        ⏰ Sale ends in: 2 days, 14 hours, 23 minutes
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}