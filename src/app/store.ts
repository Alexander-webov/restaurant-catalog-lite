import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import promoReducer from "../features/promo/promoSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    promo: promoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
