import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/reducers/userSlice";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.user);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (user) {
            toast.success("Registered successfully!");
            navigate("/dashboard");
        }
        if (error) {
            toast.error(error);
        }
    }, [user, error, navigate]);

    const handlePastePassword = (e) => {
        e.preventDefault();
        toast.error("Cannot paste into this field");
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const getPasswordStrength = (password) => {
        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[\W_]/.test(password)) strength++;

        if (strength <= 2) return { label: "Weak", color: "bg-red-500", level: 1 };
        if (strength === 3 || strength === 4) return { label: "Medium", color: "bg-yellow-500", level: 2 };
        return { label: "Strong", color: "bg-emerald-500", level: 3 };
    };
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const { name, email, password, confirmPassword } = formData;

            if (!name || !email || !password || !confirmPassword) {
                toast.error("Please fill all fields");
                return;
            }

            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordRegex.test(password)) {
                toast.error("Password must include uppercase, lowercase, number, and special character");
                return;
            }

            setIsSubmitting(true);
            dispatch(registerUser(formData));
        } catch (error) {
            toast.error(error || "Registration failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    {
        formData.password && !passwordRegex.test(formData.password) && (
            <p className="text-sm text-red-500 mt-1">
                Must contain uppercase, lowercase, number, and special character (min 8 chars)
            </p>
        )
    }

    return (
        <AuthLayout title="Create an Account 🚀">
            <form
                onSubmit={handleSubmit}
                className={`space-y-4 transition-opacity duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
            >
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="relative">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-16"
                        placeholder="********"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-9 right-3 text-emerald-600 hover:underline"
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible size={20} />
                        ) : (
                            <AiOutlineEye size={20} />
                        )}
                    </button>
                    {formData.password && (
                        <div className="mt-2">
                            <div className="h-2 w-full bg-gray-200 rounded">
                                <div
                                    className={`h-full rounded transition-all ${getPasswordStrength(formData.password).color}`}
                                    style={{
                                        width:
                                            getPasswordStrength(formData.password).level === 1
                                                ? "33%"
                                                : getPasswordStrength(formData.password).level === 2
                                                    ? "66%"
                                                    : "100%",
                                    }}
                                ></div>
                            </div>
                            <p className={`text-xs mt-1 ${getPasswordStrength(formData.password).color.replace("bg", "text")}`}>
                                {getPasswordStrength(formData.password).label} password
                            </p>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onPaste={handlePastePassword}
                        className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-16"
                        placeholder="********"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute top-9 right-3 text-emerald-600 hover:underline"
                    >
                        {showConfirmPassword ? (
                            <AiOutlineEyeInvisible size={20} />
                        ) : (
                            <AiOutlineEye size={20} />
                        )}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white font-semibold py-2 rounded-md hover:bg-emerald-700 transition-all disabled:opacity-60"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <FadeLoader height={10} color="#fff" /> : "Register"}
                </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-amber-500 font-medium hover:underline">
                    Login
                </Link>
            </p>
            <div className="flex justify-end mt-4">
                <Link to="/">
                    <p className="text-base text-gray-600 hover:text-amber-500 transition-colors">
                        ← Home
                    </p>
                </Link>
            </div>
        </AuthLayout>
    );
}
