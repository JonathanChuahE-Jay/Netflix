import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
    name: "ui",
    initialState: {
        isLoading: false,
        error: null,
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { setIsLoading, setError, clearError } = UiSlice.actions;
export default UiSlice.reducer;
