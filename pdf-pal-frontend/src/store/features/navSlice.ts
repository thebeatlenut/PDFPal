import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type NavState = {
  selected: string;
  header: string;
  subheader: string;
  isOpen: boolean;
  notificationCount: number;
  runBasicChecksDisabled: boolean;
};

// Define the initial state using that type
const initialState: NavState = {
  selected: "home",
  header: "Home",
  subheader: "",
  isOpen: true,
  notificationCount: 0,
  runBasicChecksDisabled: true,
};

export const navSlice = createSlice({
  name: "nav",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setHeader: (
      state,
      action: PayloadAction<{
        selected: string;
        header: string;
        subheader: string;
      }>
    ) => {
      state.selected = action.payload.selected;
      state.header = action.payload.header;
      state.subheader = action.payload.subheader;
    },
    setNavOpen: (
      state,
      action: PayloadAction<{
        isOpen: boolean;
      }>
    ) => {
      state.isOpen = action.payload.isOpen;
    },
    setNotificationCount: (
      state,
      action: PayloadAction<{
        notificationCount: number;
      }>
    ) => {
      state.notificationCount = action.payload.notificationCount;
    },
    setBasicCheckDisabled: (
      state,
      action: PayloadAction<{
        runBasicChecksDisabled: boolean;
      }>
    ) => {
      state.runBasicChecksDisabled = action.payload.runBasicChecksDisabled;
    },
  },
});

export const {
  setHeader,
  setNavOpen,
  setNotificationCount,
  setBasicCheckDisabled,
} = navSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNav = (state: RootState) => state.nav;

export default navSlice.reducer;
