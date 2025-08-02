"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, Mail, Lock, Shield, Eye, EyeOff, AlertCircle, ArrowRight, UserPlus } from "lucide-react"
import Layout from "../layouts/Layout"
import { toast } from "react-toastify"
import { registerUser } from "../redux/reducers/userSlice"
import { useDispatch } from "react-redux"

const RegisterPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    
    const handleInputChange = (e) => {

        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
        setErrors({
            ...errors,
            [name]: "",
        })
    }

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required"
            isValid = false
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required"
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid"
            isValid = false
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required"
            isValid = false
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
            isValid = false
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const resultAction = await dispatch(registerUser(formData));
            if (registerUser.fulfilled.match(resultAction)) {
                toast.success("Registration successful!");
                navigate("/shop");
            } else {
                toast.error(resultAction.payload || "Registration failed");
            }
        } catch (err) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const calculatePasswordStrength = () => {
        let strength = 0
        if (formData.password.length >= 8) strength++
        if (/[A-Z]/.test(formData.password)) strength++
        if (/[a-z]/.test(formData.password)) strength++
        if (/[0-9]/.test(formData.password)) strength++
        if (/[^A-Za-z0-9]/.test(formData.password)) strength++
        return strength
    }

    const passwordStrength = calculatePasswordStrength()

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 1) return "Very weak"
        if (passwordStrength === 2) return "Weak"
        if (passwordStrength === 3) return "Fair"
        if (passwordStrength === 4) return "Strong"
        return "Very strong"
    }

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 2) return "bg-red-500"
        if (passwordStrength === 3) return "bg-yellow-500"
        if (passwordStrength === 4) return "bg-blue-500"
        return "bg-green-500"
    }

    return (
        <Layout>
            <div className="pt-20 min-h-screen flex items-center justify-center px-6 py-12 w-full">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="max-w-[600px] mx-auto w-full">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200/20 dark:border-gray-700/20">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/20 rounded-full px-4 py-2 mb-4">
                                    <UserPlus className="w-5 h-5 text-purple-600" />
                                    <span className="text-sm font-medium text-purple-600">Create Account</span>
                                </div>
                                <h1 className="text-3xl font-bold mb-2">Welcome to Luxe</h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Create your account to start your luxury fashion journey
                                </p>
                            </div>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.name
                                                ? "border-red-500 focus:ring-red-500/20"
                                                : "border-gray-300 dark:border-gray-600 focus:ring-purple-500/20 focus:border-purple-500"
                                                }`}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    {errors.name && (
                                        <div className="flex items-center space-x-1 mt-2 text-red-500 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.name}</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
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
                                            placeholder="Create a strong password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {formData.password && (
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-gray-500">Password strength</span>
                                                <span
                                                    className={`text-xs font-medium ${passwordStrength <= 2
                                                        ? "text-red-500"
                                                        : passwordStrength <= 3
                                                            ? "text-yellow-500"
                                                            : passwordStrength <= 4
                                                                ? "text-blue-500"
                                                                : "text-green-500"
                                                        }`}
                                                >
                                                    {getPasswordStrengthText()}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                    {errors.password && (
                                        <div className="flex items-center space-x-1 mt-2 text-red-500 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.password}</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className={`w-full pl-10 pr-12 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.confirmPassword
                                                ? "border-red-500 focus:ring-red-500/20"
                                                : "border-gray-300 dark:border-gray-600 focus:ring-purple-500/20 focus:border-purple-500"
                                                }`}
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <div className="flex items-center space-x-1 mt-2 text-red-500 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.confirmPassword}</span>
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
                                            <span>Creating Account...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-2">
                                            <span>Create Account</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    )}
                                </button>
                                <div className="text-center">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Already have an account?{" "}
                                        <Link to="/login" className="text-purple-600 hover:text-purple-500 font-semibold">
                                            Sign in here
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default RegisterPage
