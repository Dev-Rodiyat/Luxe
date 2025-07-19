import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchExpenses = createAsyncThunk("expense/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await api.get("/expense/get-all-expenses");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getSingleExpense = createAsyncThunk("expense/getSingle", async (id, thunkAPI) => {
  try {
    const res = await api.get(`/expense/get-expense/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const createExpense = createAsyncThunk("expense/create", async (expenseData, thunkAPI) => {
  try {
    const res = await api.post("/expense/create-expense", expenseData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateExpense = createAsyncThunk(
  "expense/update",
  async (updatedData, thunkAPI) => {
    try {
      const res = await api.put(`/expense/update-expense/${updatedData._id}`, updatedData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error updating expense");
    }
  }
);

export const deleteExpense = createAsyncThunk("expense/delete", async (id, thunkAPI) => {
  try {
    await api.delete(`/expense/delete-expense/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    selectedExpense: null,
    error: null,
    loading: {
      fetchAll: false,
      getSingle: false,
      create: false,
      update: false,
      delete: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading.fetchAll = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload;
        state.loading.fetchAll = false;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.error = action.payload.message || 'Failed to fetch expense';
        state.loading.fetchAll = false;
      })

      .addCase(getSingleExpense.pending, (state) => {
        state.loading.getSingle = true;
        state.error = null;
      })
      .addCase(getSingleExpense.fulfilled, (state, action) => {
        state.selectedExpense = action.payload;
        state.loading.getSingle = false;
      })
      .addCase(getSingleExpense.rejected, (state, action) => {
        state.error = action.payload.message || 'Failed to fetch expense details';
        state.loading.getSingle = false;
      })

      .addCase(createExpense.pending, (state) => {
        state.loading.create = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        state.loading.create = false;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.error = action.payload.message || 'Failed to create expense';
        state.loading.create = false;
      })

      .addCase(updateExpense.pending, (state) => {
        state.loading.update = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(e => e._id === action.payload._id);
        if (index !== -1) state.expenses[index] = action.payload;
        state.loading.update = false;
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.error = action.payload.message || 'Failed to update expense';
        state.loading.update = false;
      })

      .addCase(deleteExpense.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(e => e._id !== action.payload);
        state.loading.delete = false;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.error = action.payload.message || 'Failed to delete expense';
        state.loading.delete = false;
      });
  },
});

export default expenseSlice.reducer;
