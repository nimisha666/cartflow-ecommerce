import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi"; // RTK Query API
import productsApi from "../features/products/productsApi";
import reviewApi from "../features/reviews/reviewsApi";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer, // RTK Query API
        [productsApi.reducerPath]: productsApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, reviewApi.middleware),
});
