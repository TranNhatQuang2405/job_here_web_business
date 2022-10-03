import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sessionInfo: null,
  pending: false
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    changeSession: (state, action) => {
      state.sessionInfo = action.payload;
      state.pending = false
    },
    LogOut: (state) => {
      state.sessionInfo = null;
      state.pending = false;
    },
    SetIsPending: (state) => {
      state.pending = true;
    },
  },
});

export const { changeSession, LogOut, SetIsPending } = UserSlice.actions;

export default UserSlice.reducer;
