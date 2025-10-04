import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  name: string;
  id: number;
  image?: string | null;
  quantity: number;
  price_cents: number;
};

type CartState = { cart: CartItem[] };

const initialState: CartState = {
  cart: [],
};
const clamp = (n: number, min = 1, max = 99) => Math.max(min, Math.min(max, n));

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartItem>) => {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity ?? 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    incrementItem: (state, action: PayloadAction<{ id: number }>) => {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (!existing) return;
      existing.quantity = clamp(existing.quantity + 1);
    },
    decrementItem: (state, action: PayloadAction<{ id: number }>) => {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (!existing) return;
      existing.quantity = clamp(existing.quantity - 1);
    },
    delteItem: (state, action: PayloadAction<{ id: number }>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    clearAllCart: (state) => {
      state.cart = [];
    },
  },
});

export const { add, incrementItem, decrementItem, clearAllCart, delteItem } =
  cartSlice.actions;
export default cartSlice.reducer;
