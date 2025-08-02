import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder, clearOrderError } from "../redux/reducers/orderSlice";
import { clearCart } from "../redux/reducers/cartSlice";
import Layout from "../layouts/Layout";
import { ChevronLeft, ShoppingCart } from "lucide-react";

export default function CreateOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cartItems, loading: cartLoading } = useSelector((state) => state.cart);
  const { loading: orderLoading, error: orderError, lastAction } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const totalAmount = cartItems
    .reduce((total, item) => total + (item.product?.price || 0) * (item.quantity || 1), 0)
    .toFixed(2);

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to place an order");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (lastAction) {
      toast.success(lastAction);
      dispatch(clearOrderError());
      dispatch(clearCart()); // Clear cart after successful order
      const orderId = lastAction.match(/#([a-f0-9]+)/)?.[1]; // Extract orderId from lastAction
      if (orderId) {
        navigate(`/payment/${orderId}`);
      }
    }
    if (orderError) {
      toast.error(orderError);
      dispatch(clearOrderError());
    }
  }, [lastAction, orderError, dispatch, navigate]);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    const orderData = {
      products: cartItems.map((item) => ({
        product: item.product?._id,
        quantity: item.quantity,
      })),
      totalAmount: Number(totalAmount),
    };
    dispatch(createOrder(orderData));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="pt-20 px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-gray-600 dark:text-gray-400">
              <Link to="/cart" className="hover:underline flex items-center space-x-1">
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Cart</span>
              </Link>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/20 dark:border-gray-700/20">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h1>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty.</p>
                  <Link
                    to="/shop"
                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
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
                        </div>
                        <p className="text-gray-900 dark:text-white font-semibold">
                          ${((item.product?.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-200/20 dark:border-gray-700/20 pt-4">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">${totalAmount}</span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={orderLoading || cartLoading}
                    className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 ${
                      orderLoading || cartLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {orderLoading || cartLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span>Place Order</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}