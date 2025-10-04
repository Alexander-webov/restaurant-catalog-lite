import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type promoType = {
  codeWord: string;
  value: number;
  applied: boolean;
  error: null | string;
};

const initialState: promoType = {
  codeWord: "sushi",
  value: 500,
  applied: false,
  error: null,
};

export const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    applyCode: (state, action: PayloadAction<{ code: string }>) => {
      const cleanUserCode = action.payload.code.trim().toLowerCase();
      if (!action.payload.code) return;
      if (state.codeWord !== cleanUserCode) {
        state.error = "unavailable code";
        state.applied = false;
      }
      if (state.codeWord === cleanUserCode) {
        state.applied = true;
        state.error = null;
      }
    },
  },
});
