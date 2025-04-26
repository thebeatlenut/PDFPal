import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./features/loaderSlice";
import userReducer from "./features/userSlice";
import navReducer from "./features/navSlice";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    user: userReducer,
    nav: navReducer,
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
