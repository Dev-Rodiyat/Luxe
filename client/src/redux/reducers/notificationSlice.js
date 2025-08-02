import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

let savedNotifications = [];
try {
  const notifications = localStorage.getItem("notifications");
  if (notifications) {
    savedNotifications = JSON.parse(notifications);
  }
} catch (e) {
  console.error("Failed to parse notifications from localStorage:", e);
  savedNotifications = [];
}

const initialState = {
  items: savedNotifications,
  loading: false,
  error: null,
  lastAction: null,
};

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/notification/get-all-notifications");
      return res.data;
    } catch (err) {
      console.error("API Error (getNotifications):", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch notifications");
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (notificationId, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/notification/delete-notification/${notificationId}`);
      return { notificationId, message: res.data.message };
    } catch (err) {
      console.error("API Error (deleteNotification):", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Failed to delete notification");
    }
  }
);

export const deleteAllNotifications = createAsyncThunk(
  "notifications/deleteAllNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.delete("/notification/delete-all-notifications");
      return res.data.message;
    } catch (err) {
      console.error("API Error (deleteAllNotifications):", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Failed to delete all notifications");
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotificationError: (state) => {
      state.error = null;
      state.lastAction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastAction = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        localStorage.setItem("notifications", JSON.stringify(action.payload));
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastAction = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload.notificationId);
        state.lastAction = action.payload.message;
        localStorage.setItem("notifications", JSON.stringify(state.items));
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAllNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastAction = null;
      })
      .addCase(deleteAllNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [];
        state.lastAction = action.payload;
        localStorage.setItem("notifications", JSON.stringify([]));
      })
      .addCase(deleteAllNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNotificationError } = notificationSlice.actions;
export default notificationSlice.reducer;