import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type actionableLimitType = {
  limitTypeCode: string;
  limitClassificiationCode: string;
};

type UserState = {
  userId: number | null;
  username: string;
  role: string;
  roleDesc: string;
  actionableLimitTypes: actionableLimitType[];
  actions: string[];
};

const initialState: UserState = {
  userId: null,
  username: "",
  role: "",
  roleDesc: "",
  actionableLimitTypes: [],
  actions: [],
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.roleDesc = action.payload.roleDesc;
      state.actionableLimitTypes = action.payload.actionableLimitTypes;
      state.actions = action.payload.actions;
    },
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
