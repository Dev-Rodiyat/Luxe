import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartSlice";
import notificationReducer from "./reducers/notificationSlice";
import orderReducer from "./reducers/orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    notifications: notificationReducer,
    order: orderReducer,
  },
});

export default store;
