import { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";

const loadData = () => {
  var headerStorage = localStorage.getItem("header");
  headerStorage = headerStorage ? JSON.parse(headerStorage) : {};
  var lang = headerStorage["Accept-Language"];
  if (lang === "vi") {
    i18n.changeLanguage("vn");
  } else {
    i18n.changeLanguage("en");
    headerStorage["Accept-Language"] = "en";
  }
  localStorage.setItem("header", JSON.stringify({ ...headerStorage }));

  return headerStorage;
};

const initialState = {
  headers: { ...loadData() },
};

export const HeaderRequestSlice = createSlice({
  name: "HeaderRequest",
  initialState,
  reducers: {
    changeXAuthToken: (state, action) => {
      state.headers = { ...state.headers, "X-Auth-Token": action.payload };
      localStorage.setItem("header", JSON.stringify({ ...state.headers }));

    },
    changeAcceptLanguage: (state, action) => {
      state.headers = { ...state.headers, "Accept-Language": action.payload };
      localStorage.setItem("header", JSON.stringify({ ...state.headers }));
    },
    changeToken: (state, action) => {
      state.headers["Authorization"] = "Bearer " + action.payload;
      localStorage.setItem("header", JSON.stringify({ ...state.headers }));
    },
  },
});

export const { changeAcceptLanguage, changeToken, changeXAuthToken } = HeaderRequestSlice.actions;

export default HeaderRequestSlice.reducer;
