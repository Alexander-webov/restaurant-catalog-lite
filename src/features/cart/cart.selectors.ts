import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const selectCartItems = (state: RootState) => state.cart.cart;

export const selectCartQuantity = createSelector([selectCartItems], (items) =>
  items.reduce((sum, el) => sum + el.quantity, 0)
);
