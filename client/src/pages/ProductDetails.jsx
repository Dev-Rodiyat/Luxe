import { useState, useEffect } from "react";
import { ShoppingCart, ChevronLeft, AlertCircle, Heart } from "lucide-react";
import Layout from "../layouts/Layout";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, getProducts, clearProductDetails } from "../redux/reducers/productSlice";
import { toggleCart, clearCartError } from "../redux/reducers/cartSlice";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productDetails, products, loading, error } = useSelector((state) => state.products);
  const { items: cartItems, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const isInCart = cartItems.some((item) => item.product?._id === id);

  const relatedProducts = products
    .filter((p) => p.category === productDetails?.category && p._id !== productDetails?._id && p.quantity > 0)
    .slice(0, 4)
    .map((p) => ({
      _id: p._id,
      name: p.name,
      image: p.image,
      price: p.price,
      seller: p.seller,
    }));

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    dispatch(getProductById(id));
    if (!products.length) {
      dispatch(getProducts());
    }
  }, [dispatch, id, products.length]);

  useEffect(() => {
    setQuantity(1);
  }, [productDetails]);

  useEffect(() => {
    if (cartError) {
      if (cartError.includes("User not found") || cartError.includes("Unauthorized")) {
        toast.error("Please log in to add a product to cart");
        navigate("/login");
      } else {
        toast.error(cartError);
      }
      dispatch(clearCartError());
    }
  }, [cartError, dispatch, navigate]);

  const handleToggleCart = async () => {
    if (!user) {
      toast.error("Please log in to add a product to cart");
      navigate("/login");
      return;
    }
    dispatch(toggleCart({ productId: id, quantity }));
  };

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value);
    if (value > 0 && value <= (productDetails?.quantity || 1)) {
      setQuantity(value);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="pt-20 px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 text-gray-600 dark:text-gray-400">
              <Link to="/shop" className="hover:underline flex items-center space-x-1">
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Shop</span>
              </Link>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg text-gray-600 dark:text-gray-400">Loading product...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12 text-red-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No product found</h3>
                <p className="text-gray-600 dark:text-gray-400">{error}</p>
                <button
                  onClick={() => {
                    dispatch(clearProductDetails());
                    dispatch(getProductById(id));
                  }}
                  className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && !productDetails && (
              <div className="text-center py-12 text-red-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No product found</h3>
                <p className="text-gray-600 dark:text-gray-400">The product with the specified ID does not exist.</p>
                <Link
                  to="/shop"
                  className="mt-4 inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Back to Shop
                </Link>
              </div>
            )}

            {!loading && !error && productDetails && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/20 dark:border-gray-700/20 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-lg aspect-[3/4] rounded-xl overflow-hidden shadow-lg mb-6">
                    <img
                      src={productDetails.image}
                      alt={productDetails.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-sm text-purple-600 font-medium mb-2 block">{productDetails.seller?.name || "Unknown Seller"}</span>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{productDetails.name}</h1>

                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${productDetails.price.toFixed(2)}</span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quantity:</h3>
                    <input
                      type="number"
                      min="1"
                      max={productDetails.quantity}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    />
                    <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                      ({productDetails.quantity} in stock)
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button
                      onClick={handleToggleCart}
                      disabled={cartLoading || productDetails.quantity === 0}
                      className="flex-1 flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {cartLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <ShoppingCart className="w-5 h-5" />
                      )}
                      <span>{isInCart ? "Remove from Cart" : productDetails.quantity > 0 ? "Add to Cart" : "Out of Stock"}</span>
                    </button>
                  </div>

                   {productDetails.description && (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{productDetails.description}</p>
                  )}

                </div>
              </div>
            )}

            {!loading && !error && productDetails && relatedProducts.length > 0 && (
              <div className="mt-16">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">You Might Also Like</h2>
                  <p className="text-gray-600 dark:text-gray-400">Explore other exquisite items from our collection</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((related) => (
                    <Link
                      to={`/product/${related._id}`}
                      key={related._id}
                      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/20 dark:border-gray-700/20"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-sm text-purple-600 font-medium">{related.seller?.name || "Unknown Seller"}</span>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                          {related.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">${related.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}