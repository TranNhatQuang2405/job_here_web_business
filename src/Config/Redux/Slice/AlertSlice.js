import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertData: {
        show: false,
        message: "",
        title: "",
        httpCode: 200,
        confirm: false,
        onHide: () => { },
        onConfirm: () => { }
    }
}

export const AlertSlice = createSlice({
    name: "AlertSlice",
    initialState,
    reducers: {
        changeContentAlert: (state, action) => {
            state.alertData = { ...state.alertData, ...action.payload };
        },
        custom: (state, action) => {
            state.alertData = {
                ...state.alertData,
                show: true,
                onHide: action.payload.onHide || (() => { }),
                ...action.payload
            }
        },
        confirm: (state, action) => {
            state.alertData = {
                ...state.alertData,
                httpCode: 401,
                show: true,
                confirm: true,
                onHide: action.payload.onHide || (() => { }),
                onConfirm: action.payload.onConfirm || (() => { }),
                ...action.payload
            }
            console.log('-------state.alertData',state.alertData)
        },
        warning: (state, action) => {
            state.alertData = {
                ...state.alertData,
                httpCode: 401,
                show: true,
                onHide: action.payload.onHide || (() => { }),
                ...action.payload
            }
        },
        error: (state, action) => {
            state.alertData = {
                ...state.alertData,
                httpCode: 400,
                show: true,
                onHide: action.payload.onHide || (() => { }),
                ...action.payload
            }
        },
        success: (state, action) => {
            state.alertData = {
                ...state.alertData,
                httpCode: 200,
                show: true,
                onHide: action.payload.onHide || (() => { }),
                ...action.payload
            }
        },
        clearContentAlert: (state, action) => {
            state.alertData = {
                show: false,
                message: "",
                title: "",
                httpCode: 200,
                confirm: false,
                onHide: () => { },
                onConfirm: () => { }
            }
        },
    },
});

export const { changeContentAlert, confirm, custom, warning, error, success, clearContentAlert } = AlertSlice.actions;

export default AlertSlice.reducer;
