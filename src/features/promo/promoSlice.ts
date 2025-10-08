import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type promoType = {
  codeWord: string;
  value: number;
  applied: boolean;
  error: null | string;
  appliedCode: string | null;
};
export type DiscountType = {
  discount: number;
  code: string;
};

const initialState: promoType = {
  codeWord: "",
  value: 0,
  applied: false,
  error: null,
  appliedCode: null,
};

export const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    applyCode: (state, action: PayloadAction<DiscountType>) => {
      const cleanUserCode = action.payload.code.trim().toLowerCase();
      if (!cleanUserCode) {
        state.applied = false;
        state.error = "enter code";
        state.value = 0;
        return;
      }
      if (state.codeWord !== cleanUserCode) {
        state.error = "unavailable code";
        state.applied = false;
        state.value = 0;
      }
      if (state.codeWord === cleanUserCode) {
        state.applied = true;
        state.value = action.payload.discount;
        state.error = null;
      }
    },
    getDiscount: (state, action: PayloadAction<{ code: string }>) => {
      state.codeWord = action.payload.code;
    },
  },
});

export const { applyCode, getDiscount } = promoSlice.actions;

export default promoSlice.reducer;
