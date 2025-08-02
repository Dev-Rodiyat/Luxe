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
    loading: false,
    error: null,
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

// export const createProduct = createAsyncThunk("products/create", async (formData, thunkAPI) => {
//   try {
//     const res = await API.post("/product/create-product", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || "Product creation failed");
//   }
// });

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
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                localStorage.setItem("products", JSON.stringify(action.payload));
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetails = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
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
                state.lastAction = `Product "${action.payload.name}" listed successfully`;
                localStorage.setItem("products", JSON.stringify(state.products));
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                );
                localStorage.setItem("products", JSON.stringify(state.products));
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((p) => p._id !== action.payload);
                localStorage.setItem("products", JSON.stringify(state.products));
            });
    },
});

export const { clearProductDetails, clearProductError } = productSlice.actions;
export default productSlice.reducer;
