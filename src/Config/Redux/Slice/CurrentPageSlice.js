import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  page: 1,
};

export const CurrentPageSlice = createSlice({
  name: "CurrentPage",
  initialState,
  reducers: {
    changeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { changeCurrentPage } = CurrentPageSlice.actions;

export default CurrentPageSlice.reducer;
