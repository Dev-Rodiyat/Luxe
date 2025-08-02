import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

let savedMyOrders = [];
let savedSellerOrders = [];
try {
  const myOrders = localStorage.getItem("myOrders");
  const sellerOrders = localStorage.getItem("sellerOrders");
  if (myOrders) savedMyOrders = JSON.parse(myOrders);
  if (sellerOrders) savedSellerOrders = JSON.parse(sellerOrders);
} catch (e) {
  console.error("Failed to parse orders from localStorage:", e);
  savedMyOrders = [];
  savedSellerOrders = [];
}

const initialState = {
  orders: [],
  myOrders: savedMyOrders,
  sellerOrders: savedSellerOrders,
  loading: false,
  error: null,
  lastAction: null,
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await API.post("/order/create-order", orderData);
      return res.data;
    } catch (err) {
      console.error("API Error (createOrder):", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Failed to create order");
    }
  }
);

export const getMyOrders = createAsyncThunk(
  "orders/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/order/my-orders");
      return res.data;
    } catch (err) {
      console.error("API Error (getMyOrders):", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch orders");
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await API.put(`/order/cancel-order/${orderId}`);
      return { orderId, message: res.data.message, order: res.data.order };
    } catch (err) {
      console.error("API Error (cancelOrder):", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Failed to cancel order");
    }
  }
);

export const getSellerOrders = createAsyncThunk(
  "orders/getSellerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/order/seller-orders");
      return res.data;
    } catch (err) {
      console.error("API Error (getSellerOrders):", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch seller orders");
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/order/get-all-orders");
      return res.data;
    } catch (err) {
      console.error("API Error (getAllOrders):", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch all orders");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/order/update-order-status/${orderId}`, { status });
      return { orderId, message: res.data.message, order: res.data.order };
    } catch (err) {
      console.error("API Error (updateOrderStatus):", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Failed to update order status");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
      state.lastAction = null;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.myOrders = [];
      state.sellerOrders = [];
      state.lastAction = null;
      localStorage.removeItem("myOrders");
      localStorage.removeItem("sellerOrders");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastAction = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = [action.payload, ...state.myOrders];
        localStorage.setItem("myOrders", JSON.stringify(state.myOrders));
        state.lastAction = `Order created successfully`;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastAction = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
        localStorage.setItem("myOrders", JSON.stringify(action.payload));
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastAction = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = state.myOrders.map((order) =>
          order._id === action.payload.orderId ? action.payload.order : order
        );
        state.sellerOrders = state.sellerOrders.map((order) =>
          order._id === action.payload.orderId ? action.payload.order : order
        );
        localStorage.setItem("myOrders", JSON.stringify(state.myOrders));
        localStorage.setItem("sellerOrders", JSON.stringify(state.sellerOrders));
        state.lastAction = action.payload.message;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
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
        state.sellerOrders = action.payload;
        localStorage.setItem("sellerOrders", JSON.stringify(action.payload));
      })
      .addCase(getSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastAction = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastAction = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order._id === action.payload.orderId ? action.payload.order : order
        );
        state.myOrders = state.myOrders.map((order) =>
          order._id === action.payload.orderId ? action.payload.order : order
        );
        state.sellerOrders = state.sellerOrders.map((order) =>
          order._id === action.payload.orderId ? action.payload.order : order
        );
        localStorage.setItem("myOrders", JSON.stringify(state.myOrders));
        localStorage.setItem("sellerOrders", JSON.stringify(state.sellerOrders));
        state.lastAction = action.payload.message;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;