import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import expenseReducer from "./reducers/expenseSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    expense: expenseReducer,
  },
});

export default store;
