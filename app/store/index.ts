import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice";
import appReducer from "./feature/app/appSlice";
// import addressReducer from './feature/address/addressSlice';
import cartReducer from "./feature/cart/cartSlice";
// import wishlistReducer from './feature/wishlist/wishlistSlice';
// import categoryReducer from './feature/category/categorySlice';
// import searchReducer from './feature/search/searchSlice';
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    // address: addressReducer,
    cart: cartReducer,
    // wishlist: wishlistReducer,
    // category: categoryReducer,
    // search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
