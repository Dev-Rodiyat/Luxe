import { useEffect } from "react";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCart, clearCartError } from "../redux/reducers/cartSlice";
import { toast } from "react-toastify";

export default function CartModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const { items: cartItems, loading: cartLoading, error: cartError, lastAction } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (lastAction && lastAction.includes("added")) {
            toast.success("Product added to cart");
            dispatch(clearCartError());
        } else if (lastAction && lastAction.includes("removed")) {
            toast.success("Product removed from cart");
            dispatch(clearCartError());
        }
        if (cartError) {
            if (cartError.includes("User not found") || cartError.includes("Unauthorized")) {
                toast.error("Please log in to manage your cart");
            } else {
                toast.error(cartError);
            }
            dispatch(clearCartError());
        }
    }, [lastAction, cartError, dispatch]);

    const handleQuantityChange = (productId, newQuantity) => {
        if (!user) {
            toast.error("Please log in to manage your cart");
            return;
        }
        if (newQuantity >= 1 && newQuantity <= (cartItems.find(item => item.product?._id === productId)?.product?.quantity || 1)) {
            dispatch(toggleCart({ productId, quantity: newQuantity }));
        }
    };

    const handleRemoveItem = (productId) => {
        if (!user) {
            toast.error("Please log in to manage your cart");
            return;
        }
        dispatch(toggleCart({ productId, quantity: 0 }));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.product?.price || 0) * (item.quantity || 1), 0).toFixed(2);
    };

    return (
        <div
            className={`fixed inset-0 bg-black/50 dark:bg-black/70 z-50 transition-opacity h-full duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
        >
            <div
                className={`fixed top-0 right-0 w-full sm:w-96 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-200/20 dark:border-gray-700/20">
                    <div className="flex items-center space-x-2">
                        <ShoppingCart className="w-6 h-6 text-purple-600" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto h-[calc(100%-8rem)]">
                    {!user ? (
                        <div className="text-center py-12">
                            <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Please log in to view your cart.</p>
                            <Link
                                to="/login"
                                onClick={onClose}
                                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                            >
                                Log In
                            </Link>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
                            <Link
                                to="/shop"
                                onClick={onClose}
                                className="mt-4 inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                            >
                                Shop Now
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.product?._id}
                                    className="flex items-center space-x-4 bg-white dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200/20 dark:border-gray-700/20"
                                >
                                    <img
                                        src={item.product?.image || "/placeholder.svg?height=80&width=80&query=product image"}
                                        alt={item.product?.name || "Product"}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {item.product?.name || "Unnamed Product"}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            ${(item.product?.price || 0).toFixed(2)} x {item.quantity}
                                        </p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <input
                                                type="number"
                                                min="1"
                                                max={item.product?.quantity || 1}
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.product?._id, Number.parseInt(e.target.value))}
                                                className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                                disabled={cartLoading}
                                            />
                                            <button
                                                onClick={() => handleRemoveItem(item.product?._id)}
                                                className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition-colors"
                                                disabled={cartLoading}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-900 dark:text-white font-semibold">
                                        ${((item.product?.price || 0) * (item.quantity || 1)).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {user && cartItems.length > 0 && (
                    <div className="p-6 border-t border-gray-200/20 dark:border-gray-700/20 mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">Subtotal:</span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">${calculateSubtotal()}</span>
                        </div>
                        <Link
                            to="/add-order"
                            onClick={onClose}
                            className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}