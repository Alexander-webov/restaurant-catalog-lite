import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { CONVENIENCE_FEE_CENTS } from "./cart.constans";

export const selectCartItems = (state: RootState) => state.cart.cart;
export const selectPromo = (state: RootState) => state.promo;
export const convenienceFee = CONVENIENCE_FEE_CENTS;
export const selectCartQuantity = createSelector([selectCartItems], (items) =>
  items.reduce((sum, el) => sum + el.quantity, 0)
);

export const selectSubtotalCents = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.price_cents * i.quantity, 0)
);

export const selectDiscountCents = createSelector(
  [selectSubtotalCents, selectPromo],
  (subtotal, promo) =>
    promo.applied && subtotal > promo.value ? promo.value : 0
);

export const selectTaxCents = createSelector(
  [selectSubtotalCents],
  (item) => (item * 8.82) / 100
);
export const selectConvenienceFeeCents = () => CONVENIENCE_FEE_CENTS;

export const selectCountProcentDiscount = createSelector(
  [selectSubtotalCents, selectDiscountCents],
  (subtotal, discount) => (subtotal / 100) * discount * 100
);

export const selectTotalCents = createSelector(
  [
    selectSubtotalCents,
    selectTaxCents,
    selectConvenienceFeeCents,
    selectCountProcentDiscount,
  ],
  (subtotal, tax, fee, selectCountProcentDiscount) =>
    Math.max(0, subtotal - selectCountProcentDiscount + tax + fee)
);
