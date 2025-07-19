import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import AuthLayout from "./AuthLayout";
import { loginUser } from "../redux/reducers/userSlice";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (error || user) {
            setIsSubmitting(false);
        }

        if (error) {
            toast.error(error);
        }

        if (user) {
            toast.success("Login successful");
            navigate("/dashboard");
        }
    }, [error, user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }
        setIsSubmitting(true);
        dispatch(loginUser(formData));
    };

    return (
        <AuthLayout title="Welcome Back 👋">
            <form
                onSubmit={handleSubmit}
                className={`space-y-4 transition-opacity duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
            >
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="relative">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
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
                        {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white font-semibold py-2 rounded-md hover:bg-emerald-700 transition-all disabled:opacity-60"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <FadeLoader height={10} color="#fff" /> : "Login"}
                </button>

            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-amber-500 font-medium hover:underline">
                    Register
                </Link>
            </p>
            <div className="flex justify-end mt-4">
            <Link to="/">
              <p className="text-base text-gray-500 hover:text-amber-500 transition-colors">
                ← Home
              </p>
            </Link>
          </div>
        </AuthLayout>
    );
}
