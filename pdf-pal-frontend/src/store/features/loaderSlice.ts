import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";  // ✅ Correct path from features/loaderSlice.ts to store.ts

type LoaderState = {
  isLoading: boolean;
};

const initialState: LoaderState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loaderSlice.actions;

export const selectLoader = (state: RootState) => state.loader;

export default loaderSlice.reducer;
