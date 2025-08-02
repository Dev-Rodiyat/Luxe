import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, clearCartError } from "../redux/reducers/cartSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { items: cartItems, loading: cartLoading, error: cartError, lastAction } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const isInCart = cartItems.some((item) => item.product?._id === product?._id);

  useEffect(() => {
    if (lastAction && lastAction.includes("added")) {
      toast.success(`${product?.name || "Product"} added to cart`);
      dispatch(clearCartError());
    } else if (lastAction && lastAction.includes("removed")) {
      toast.success(`${product?.name || "Product"} removed from cart`);
      dispatch(clearCartError());
    }
    if (cartError) {
      if (cartError.includes("User not found") || cartError.includes("Unauthorized")) {
        toast.error("Please log in to add a product to cart");
      } else {
        toast.error(cartError);
      }
      dispatch(clearCartError());
    }
  }, [lastAction, cartError, dispatch, product?.name]);

  const handleToggleCart = () => {
    if (!user) {
      toast.error("Please log in to add a product to cart");
      return;
    }
    dispatch(toggleCart({ productId: product?._id, quantity: 1 }));
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/20 dark:border-gray-700/20">
      <div className="relative overflow-hidden">
        <img
          src={product?.image || "/placeholder.svg?height=400&width=300&query=product image"}
          alt={product?.name || "Product"}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link to={`/product/${product?._id}`}>
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-purple-500 hover:text-white transition-colors">
              <Eye className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-purple-600 font-medium">
            {product?.seller?.name || "Unknown Seller"}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
          {product?.name || "Unnamed Product"}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {product?.description || "No description available"}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${product?.price?.toFixed(2) || "0.00"}
            </span>
            <span className="text-sm text-gray-500">
              ({product?.quantity || 0} in stock)
            </span>
          </div>
          <button
            onClick={handleToggleCart}
            disabled={cartLoading || product?.quantity === 0}
            className={`p-2 rounded-full transition-all duration-300 ${
              isInCart
                ? "bg-green-500 text-white"
                : product?.quantity === 0
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}