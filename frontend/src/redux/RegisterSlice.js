import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 0,
    selectedPlan: null,
    paymentMethod: "",
    errorMessage: "",
    formData: { username: "", email: "", password: "", subscriptionPlan: {}, phoneNumber: ""},
    isLoading: false
};

const RegisterSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setSelectedPlan: (state, action) => {
            state.selectedPlan = action.payload;
        },
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
});

export const { setIsLoading, setStep, setSelectedPlan, setPaymentMethod, setErrorMessage, setFormData } = RegisterSlice.actions;
export default RegisterSlice.reducer;