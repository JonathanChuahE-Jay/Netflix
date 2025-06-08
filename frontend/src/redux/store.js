import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import registerReducer from "./RegisterSlice";
import UiReducer from "./UiSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        ui: UiReducer,
    },
});

export default store;
