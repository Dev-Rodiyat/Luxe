import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

let savedCart = [];
try {
  const cart = localStorage.getItem("cart");
  if (cart) {
    savedCart = JSON.parse(cart);
  }
} catch (e) {
  console.error("Failed to parse cart from localStorage:", e);
  savedCart = [];
}

const initialState = {
  items: savedCart,
  loading: false,
  error: null,
  lastAction: null
};

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/user/get-cart");
      return res.data;
    } catch (err) {
      console.error("API Error (getCart):", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
    }
  }
);

export const toggleCart = createAsyncThunk(
  "cart/toggle",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/user/toggle-cart/${productId}`, { quantity });
      console.log("API Response (toggleCart):", res.data);
      return { cart: res.data.cart, message: res.data.message };
    } catch (err) {
      console.error("API Error (toggleCart):", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Failed to toggle cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
      state.lastAction = null;
    },
    clearCart: (state) => {
      state.items = [];
      state.lastAction = null;
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastAction = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        localStorage.setItem("cart", JSON.stringify(action.payload));
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastAction = null;
      })
      .addCase(toggleCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart;
        state.lastAction = action.payload.message;
        localStorage.setItem("cart", JSON.stringify(action.payload.cart));
      })
      .addCase(toggleCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartError, clearCart } = cartSlice.actions;
export default cartSlice.reducer;