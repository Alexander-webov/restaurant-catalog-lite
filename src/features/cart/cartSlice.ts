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

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartItem>) => {
      const exisitng = state.cart.find((item) => item.id === action.payload.id);
      if (exisitng) {
        exisitng.quantity += action.payload.quantity ?? 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    clearAllCart: (state) => {
      state.cart = [];
    },
  },
});

export const { add } = cartSlice.actions;
export default cartSlice.reducer;
