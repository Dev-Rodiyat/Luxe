import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const loginUser = createAsyncThunk("user/login", async (credentials, thunkAPI) => {
    try {
        const res = await api.post("/user/login", credentials);
        localStorage.setItem("user", JSON.stringify(res.data));

        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const registerUser = createAsyncThunk("user/register", async (userData, thunkAPI) => {
    try {
        const res = await api.post("/user/register", userData);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
    try {
        const res = await api.get("/user/get-user");
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (updatedData, thunkAPI) => {
        try {
            const res = await api.put("/user/update-user", updatedData);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Error");
        }
    }
);

export const deleteUser = createAsyncThunk("user/deleteUser", async (_, thunkAPI) => {
    try {
        const res = await api.delete("/user/delete-user");
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const logoutUser = createAsyncThunk("user/logout", async (_, thunkAPI) => {
    try {
        const res = await api.post("/user/logout");
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

let initialUser = null;
try {
    const raw = localStorage.getItem("user");
    initialUser = raw && raw !== "undefined" ? JSON.parse(raw) : null;
} catch (e) {
    initialUser = null;
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: initialUser,
        error: null,
        success: false,
        loading: {
            login: false,
            register: false,
            get: false,
            update: false,
            delete: false,
            logout: false,
        },
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        },
        clearStatus: (state) => {
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading.login = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading.login = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload.message || 'Login Failed';
                state.loading.login = false;
            })

            .addCase(registerUser.pending, (state) => {
                state.loading.register = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading.register = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload.message || 'Registration Failed';
                state.loading.register = false;
            })

            .addCase(getUser.pending, (state) => {
                state.loading.get = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading.get = false;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.error = action.payload.message || 'Failed to get user';
                state.loading.get = false;
            })

            .addCase(updateUser.pending, (state) => {
                state.loading.update = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload.updatedUser;
                state.user = updatedUser;
                state.loading.update = false;
                state.success = true;
                localStorage.setItem("user", JSON.stringify(updatedUser));
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload.message || 'Update Failed';
                state.loading.update = false;
            })

            .addCase(logoutUser.pending, (state) => {
                state.loading.logout = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.success = true;
                state.loading.logout = false;
                localStorage.removeItem("user");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.user = null;
                state.loading.logout = false;
                localStorage.removeItem("user");
                state.error = action.payload?.message || "Logout failed";
            })

            .addCase(deleteUser.pending, (state) => {
                state.loading.delete = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.user = null;
                state.loading.delete = false;
                state.success = true;
                localStorage.removeItem("user");
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload.message || 'Delete failed';
                state.loading.delete = false;
                localStorage.removeItem("user");
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
