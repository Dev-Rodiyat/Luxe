import {
    AlertCircle,
    ArrowRight,
    CheckCircle,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Sparkles,
    Star,
    Heart,
    LogIn,
} from "lucide-react"
import Layout from "../layouts/Layout"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../redux/reducers/userSlice";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const validateForm = () => {
        const newErrors = {}

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        try {
            const resultAction = await dispatch(loginUser(formData));
            if (loginUser.fulfilled.match(resultAction)) {
                toast.success("Login successful! Welcome back to Luxe!");
                navigate("/shop");
            } else {
                toast.error(resultAction.payload || "Login failed");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="pt-20 min-h-screen flex items-center justify-center px-6 py-12">
                    <div className="max-w-5xl w-full flex justify-center items-center">

                        <div className="max-w-[600px] mx-auto w-full">
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200/20 dark:border-gray-700/20">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/20 rounded-full px-4 py-2 mb-4">
                                        <LogIn className="w-5 h-5 text-purple-600" />
                                        <span className="text-sm font-medium text-purple-600">Sign In</span>
                                    </div>

                                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Sign in to your account to continue your luxury shopping experience
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email
                                                    ? "border-red-500 focus:ring-red-500/20"
                                                    : "border-gray-300 dark:border-gray-600 focus:ring-purple-500/20 focus:border-purple-500"
                                                    }`}
                                                placeholder="Enter your email address"
                                            />
                                        </div>
                                        {errors.email && (
                                            <div className="flex items-center space-x-1 mt-2 text-red-500 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{errors.email}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className={`w-full pl-10 pr-12 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.password
                                                    ? "border-red-500 focus:ring-red-500/20"
                                                    : "border-gray-300 dark:border-gray-600 focus:ring-purple-500/20 focus:border-purple-500"
                                                    }`}
                                                placeholder="Enter your password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <div className="flex items-center space-x-1 mt-2 text-red-500 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{errors.password}</span>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Signing In...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <span>Sign In</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        )}
                                    </button>

                                    <div className="text-center">
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {"Don't have an account? "}
                                            <Link to="/register" className="text-purple-600 hover:text-purple-500 font-semibold">
                                                Create one here
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
