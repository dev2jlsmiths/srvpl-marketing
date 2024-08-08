import { createSlice } from "@reduxjs/toolkit";
import { login } from "./action";
import { jwtDecode } from "jwt-decode"; // Note: Changed from "jwt-decode" to "jwtDecode"

const token = localStorage.getItem("token");

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: token || null,
        currentUser: token ? jwtDecode(token) : null,
        isLoading: false,
        error: null,
        registerForm: {},
        isRegisterOpen: false,
        isSignupLoading: false,
    },
    reducers: {
        logout(state) {
            localStorage.removeItem("token");
            state.token = null;
            state.currentUser = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                console.log('payload', payload)
                localStorage.setItem("token", payload);
                state.token = payload;
                state.currentUser = jwtDecode(payload);
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                state.token = null;
                localStorage.removeItem("token");
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
