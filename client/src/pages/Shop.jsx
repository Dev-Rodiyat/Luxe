import { useState, useEffect } from "react";
import {
  Search,
  Grid3X3,
  List,
  SlidersHorizontal,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import Layout from "../layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/reducers/productSlice";
import { clearCartError } from "../redux/reducers/cartSlice";
import Slider from "rc-slider";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);
  const { error: cartError } = useSelector((state) => state.cart);

  const maxPrice = products && products.length > 0 ? Math.ceil(Math.max(...products.map(p => p.price || 0))) : 2000;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSeller, setSelectedSeller] = useState("all");
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  useEffect(() => {
    const filtered = (products || []).filter((product) => {
      const matchesSearch = !searchQuery || (product.name?.toLowerCase() || "").includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product?.category === selectedCategory;
      const matchesSeller = selectedSeller === "all" || (product?.seller?.name || "") === selectedSeller;
      const matchesPrice = typeof product?.price === "number" && product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesSeller && matchesPrice;
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        break;
    }
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedSeller, priceRange, sortBy]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Electronics", label: "Electronics" },
    { value: "Clothing", label: "Clothing" },
    { value: "Books", label: "Books" },
    { value: "Beauty", label: "Beauty" },
    { value: "Home", label: "Home" },
    { value: "Toys", label: "Toys" },
    { value: "Other", label: "Other" },
  ];

  const sellers = [
    { value: "all", label: "All Sellers" },
    ...Array.from(
      new Set((products || []).filter((p) => p.seller?.name).map((p) => p.seller.name))
    ).map((name) => ({ value: name, label: name })),
  ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
  ];

  return (
    <Layout>
      <div className="min-h-screen py-12 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="pt-20 px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Luxe Collection
                </h1>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover our curated selection of premium fashion and luxury items
              </p>
            </div>

            {cartError && (
              <div className="text-center py-8 text-red-500">
                <AlertCircle className="w-10 h-10 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">{cartError}</p>
                <button
                  onClick={() => dispatch(clearCartError())}
                  className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Clear Error
                </button>
              </div>
            )}

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8 border border-gray-200/20 dark:border-gray-700/20">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSeller}
                  onChange={(e) => setSelectedSeller(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                >
                  {sellers.map((seller) => (
                    <option key={seller.value} value={seller.value}>
                      {seller.label}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-white dark:bg-gray-600 text-purple-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-white dark:bg-gray-600 text-purple-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span>Filters</span>
                </button>
              </div>

              {showFilters && (
                <div className="lg:hidden mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                      value={selectedSeller}
                      onChange={(e) => setSelectedSeller(e.target.value)}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    >
                      {sellers.map((seller) => (
                        <option key={seller.value} value={seller.value}>
                          {seller.label}
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Price: ${priceRange[0]} - ${priceRange[1]}
                      </span>
                      <Slider
                        range
                        min={0}
                        max={maxPrice}
                        value={priceRange}
                        onChange={(value) => setPriceRange(value)}
                        trackStyle={[{ backgroundColor: "#9333ea" }]}
                        handleStyle={[{ borderColor: "#9333ea" }]}
                        railStyle={{ backgroundColor: "#d1d5db" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg text-gray-600 dark:text-gray-400">Loading products...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12 text-red-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Error loading products</h3>
                <p className="text-gray-600 dark:text-gray-400">{error}</p>
                <button
                  onClick={() => dispatch(getProducts())}
                  className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing {filteredProducts.length} of {(products || []).length} products
                  </p>
                </div>

                <div
                  className={`grid gap-6 ${
                    viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                  }`}
                >
                  {(filteredProducts || []).map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                        setSelectedSeller("all");
                        setPriceRange([0, maxPrice]);
                        setSortBy("featured");
                      }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}