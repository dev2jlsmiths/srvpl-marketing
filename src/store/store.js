import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/reducer";
import userSlice from "./user/reducer";
const combinedReducer = combineReducers({
    auth: authSlice,
    user: userSlice
});

const rootReducer = (state, action) => {
    if (action.type === "auth/logout") {
        state = {};
    }
    return combinedReducer(state, action);
};

export default configureStore({
    reducer: rootReducer,
});