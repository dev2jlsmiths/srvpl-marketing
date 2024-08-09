import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest } from "./endpoints";

export const login = createAsyncThunk(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await loginRequest(payload);
            const access_token = res.data.access_token;
            return access_token;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);