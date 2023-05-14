import { configureStore } from "@reduxjs/toolkit";
import AlertSlice from "./Slice/AlertSlice";
import CurrentPageSlice from "./Slice/CurrentPageSlice";
import HeaderRequestSlice from "./Slice/HeaderRequestSlice";
import UserSlice from "./Slice/UserSlice";

export const store = configureStore({
  reducer: {
    AlertState: AlertSlice,
    CurrentPage: CurrentPageSlice,
    HeaderRequest: HeaderRequestSlice,
    User: UserSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
