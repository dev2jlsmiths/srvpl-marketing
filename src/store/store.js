import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/reducer";

const combinedReducer = combineReducers({
    auth: authSlice,
  
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