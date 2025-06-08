import axios from 'axios';
import { useMutation } from "react-query";

const API = axios.create({ baseURL: 'http://localhost:5000/api/auth' });

export const registerUser = (data) => API.post('/register', data);
export const loginUser = (data) => API.post('/login', data);
export const sendOtp = (email, otpType) => API.post("/send-otp", { email, otpType });
export const verifyOtp = (email, otp, otpType) => API.post("/verify-otp", { email, otp, otpType });
export const resetPassword = (email, newPassword, confirmNewPassword) => API.post('/reset-password', { email, newPassword, confirmNewPassword })
export const checkEmailExists = async (email) => {
    try {
        const response = await API.post('/check-email', { email });
        return { data: response.data, status: response.status };
    } catch (error) {
        return {
            data: error.response?.data || { message: "Server error" },
            status: error.response?.status || 500
        };
    }
};
export const useCheckEmail = () => {
    return useMutation(checkEmailExists);
};
