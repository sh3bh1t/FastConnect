import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer"
import postReducer from "./postReducer"

/**
 * STEPS FOR STATE MANAGEMENT
 * Submit action
 * Handle Action in its reducer
 * register here -> reducer
 */


export const store = configureStore({
    reducer: {
        auth : authReducer,
        postReducer : postReducer
    }
})