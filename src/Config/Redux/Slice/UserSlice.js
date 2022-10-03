import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sessionInfo: false,
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    changeSession: (state, action) => {
      state.sessionInfo = action.payload;
    },
  },
});

export const { changeSession } = UserSlice.actions;

export default UserSlice.reducer;
