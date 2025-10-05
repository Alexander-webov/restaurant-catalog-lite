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

/* export const selectDiscountCents = createSelector(
  [selectSubtotalCents, selectPromo],
  (subtotal, promo) => (promo.applied ? Math.min(promo.value, subtotal) : 0)
);
 */
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
export const selectTotalCents = createSelector(
  [
    selectSubtotalCents,
    selectTaxCents,
    selectConvenienceFeeCents,
    selectDiscountCents,
  ],
  (subtotal, tax, fee, discount) => Math.max(0, subtotal - discount + tax + fee)
);
