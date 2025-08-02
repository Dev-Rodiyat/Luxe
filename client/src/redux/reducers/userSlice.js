import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

const userFromStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const saveUserToStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromStorage = () => {
    localStorage.removeItem("user");
};

export const registerUser = createAsyncThunk(
    "user/register",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/user/register", formData);
            saveUserToStorage(data);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Registration failed");
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/user/login", credentials);
            saveUserToStorage(data);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    "user/getCurrent",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get("/user/get-user");
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/update",
    async (updatedData, { rejectWithValue }) => {
        try {
            const { data } = await API.put("/user/update-user", updatedData);
            saveUserToStorage(data);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Update failed");
        }
    }
);

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await API.post("/user/logout");
            removeUserFromStorage();
            return true;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Logout failed");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/delete",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.delete("/user/delete-user");
            removeUserFromStorage();
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Delete failed");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: userFromStorage,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(updateUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.status = "idle";
                localStorage.removeItem("user");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(deleteUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.status = "succeeded";
                state.user = null;
                localStorage.removeItem("user");
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

// export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
