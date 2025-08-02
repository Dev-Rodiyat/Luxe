import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

let savedProducts = [];
try {
    const products = localStorage.getItem("products");
    if (products) {
        savedProducts = JSON.parse(products);
    }
} catch (e) {
    console.error("Failed to parse products from localStorage:", e);
    savedProducts = [];
}

const initialState = {
    products: savedProducts,
    productDetails: null,
    sellerProducts: [],
    sellerOrderedProducts: [],
    loading: false,
    error: null,
    lastAction: null,
};

export const getProducts = createAsyncThunk("products/getAll", async (_, thunkAPI) => {
    try {
        const res = await API.get("/product/get-all-products");
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch products");
    }
});

export const getProductById = createAsyncThunk("products/getById", async (id, thunkAPI) => {
    try {
        const res = await API.get(`/product/get-product/${id}`);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Product not found");
    }
});

export const getSellerProducts = createAsyncThunk(
    "products/getSellerProducts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/product/get-seller-products");
            console.log("API Response (getSellerProducts):", res.data);
            return res.data;
        } catch (err) {
            console.error("API Error (getSellerProducts):", err.response?.data);
            return rejectWithValue(err.response?.data?.message || "Failed to fetch products");
        }
    }
);

export const getSellerOrders = createAsyncThunk(
    "products/getSellerOrders",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/product/get-seller-orders");
            console.log("API Response (getSellerOrders):", res.data);
            return res.data;
        } catch (err) {
            console.error("API Error (getSellerOrders):", err.response?.data);
            return rejectWithValue(err.response?.data?.message || "Failed to fetch ordered products");
        }
    }
);

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("name", productData.name);
            formData.append("price", productData.price);
            formData.append("quantity", productData.quantity);
            formData.append("description", productData.description);
            formData.append("category", productData.category);
            formData.append("image", productData.image);

            const res = await API.post("/product/create-product", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("API Response (createProduct):", res.data);
            return res.data;
        } catch (err) {
            console.error("API Error (createProduct):", err.response?.data);
            return rejectWithValue(err.response?.data?.message || "Failed to create product");
        }
    }
);

export const updateProduct = createAsyncThunk("products/update", async ({ id, formData }, thunkAPI) => {
    try {
        const res = await API.put(`/product/update-product/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Update failed");
    }
});

export const deleteProduct = createAsyncThunk("products/delete", async (id, thunkAPI) => {
    try {
        await API.delete(`/product/delete-product/${id}`);
        return id;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete failed");
    }
});

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearProductError: (state) => {
            state.error = null;
            state.lastAction = null;
        },
        clearProductDetails: (state) => {
            state.productDetails = null;
            state.error = null;
            state.lastAction = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.lastAction = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                localStorage.setItem("products", JSON.stringify(action.payload));
                state.lastAction = "Products fetched successfully";
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.lastAction = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetails = action.payload;
                state.lastAction = "Product details fetched successfully";
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSellerProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.lastAction = null;
            })
            .addCase(getSellerProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.sellerProducts = action.payload;
                localStorage.setItem("sellerProducts", JSON.stringify(action.payload));
                state.lastAction = "Seller products fetched successfully";
            })
            .addCase(getSellerProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSellerOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.lastAction = null;
            })
            .addCase(getSellerOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.sellerOrderedProducts = action.payload;
                localStorage.setItem("sellerOrderedProducts", JSON.stringify(action.payload));
                state.lastAction = "Seller ordered products fetched successfully";
            })
            .addCase(getSellerOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.lastAction = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = [...state.products, action.payload];
                state.sellerProducts = [...state.sellerProducts, action.payload];
                state.lastAction = `Product "${action.payload.name}" listed successfully`;
                localStorage.setItem("products", JSON.stringify(state.products));
                localStorage.setItem("sellerProducts", JSON.stringify(state.sellerProducts));
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.lastAction = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                );
                state.sellerProducts = state.sellerProducts.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                );
                state.productDetails = action.payload._id === state.productDetails?._id ? action.payload : state.productDetails;
                state.lastAction = `Product "${action.payload.name}" updated successfully`;
                localStorage.setItem("products", JSON.stringify(state.products));
                localStorage.setItem("sellerProducts", JSON.stringify(state.sellerProducts));
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.lastAction = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((p) => p._id !== action.payload);
                state.sellerProducts = state.sellerProducts.filter((p) => p._id !== action.payload);
                state.lastAction = "Product deleted successfully";
                localStorage.setItem("products", JSON.stringify(state.products));
                localStorage.setItem("sellerProducts", JSON.stringify(state.sellerProducts));
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProductDetails, clearProductError } = productSlice.actions;
export default productSlice.reducer;