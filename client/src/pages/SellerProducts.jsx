import { useEffect } from "react";
import { Package } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSellerProducts, deleteProduct, clearProductError } from "../redux/reducers/productSlice";
import { toast } from "react-toastify";
import Layout from "../layouts/Layout";

export default function SellerProducts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { sellerProducts, loading, error, lastAction } = useSelector((state) => state.products);

    useEffect(() => {
        if (!user) {
            toast.error("Please log in to view your products");
            navigate("/login");
        } else {
            dispatch(getSellerProducts());
        }
    }, [dispatch, user, navigate]);

    useEffect(() => {
        if (lastAction) {
            toast.success(lastAction);
            dispatch(clearProductError());
        }
        if (error) {
            if (error.includes("Unauthorized") || error.includes("User not found")) {
                toast.error("Please log in to view your products");
                navigate("/login");
            } else {
                toast.error(error);
            }
            dispatch(clearProductError());
        }
    }, [lastAction, error, dispatch, navigate]);

    const handleDeleteProduct = (productId) => {
        if (!user) {
            toast.error("Please log in to manage your products");
            navigate("/login");
            return;
        }
        dispatch(deleteProduct(productId));
    };

    const handleProductClick = (productId, event) => {
        event.preventDefault(); // Prevent default behavior if needed
        event.stopPropagation(); // Prevent event bubbling from child elements
        navigate(`/product/${productId}`);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-lg p-8 border border-gray-200/20 dark:border-gray-700/20">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center space-x-2">
                                <Package className="w-8 h-8 text-purple-600" />
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Products</h1>
                            </div>
                            <Link
                                to="/add-product"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Add New Product
                            </Link>
                        </div>

                        {loading ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-lg text-gray-600 dark:text-gray-400">Loading products...</p>
                            </div>
                        ) : !user ? (
                            <div className="text-center py-12">
                                <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-600 dark:text-gray-400 mb-4">Please log in to view your products.</p>
                                <Link
                                    to="/login"
                                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                                >
                                    Log In
                                </Link>
                            </div>
                        ) : sellerProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-600 dark:text-gray-400 mb-4">You have no products listed.</p>
                                <Link
                                    to="/add-product"
                                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                                >
                                    Add Your First Product
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sellerProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={(event) => handleProductClick(product._id, event)}
                                        className="bg-white dark:bg-gray-900/50 rounded-lg p-6 border cursor-pointer border-gray-200/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300"
                                    >
                                        <img
                                            src={product.image || "/placeholder.svg?height=160&width=160&query=product image"}
                                            alt={product.name || "Product"}
                                            className="w-full h-40 object-cover rounded-md mb-4"
                                        />
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{product.name || "Unnamed Product"}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Price: ${product.price?.toFixed(2) || 0}</p>
                                        <p className="text-gray-600 dark:text-gray-400">Quantity: {product.quantity || 0}</p>

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}