import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileById } from "../services/ProfileServices";

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");
const storedProfile = JSON.parse(localStorage.getItem("profile"));
const storedRememberMe = JSON.parse(localStorage.getItem("rememberMe"));

const initialState = {
    user: storedUser || null,
    token: storedToken || null,
    rememberMe: storedRememberMe || true,
    profile: storedProfile || [],
    isAuthenticated: !!storedToken,
    isLoading: false,
};

export const fetchProfiles = createAsyncThunk(
    "auth/fetchProfiles",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { user } = getState().auth; 

            if (!user || !user.profiles) {
                return rejectWithValue("User profiles not found");
            }

            const profileResponses = await Promise.all(
                user.profiles.map((u) => getProfileById(u._id))
            );

            return profileResponses.map((response) => response.data);
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch profiles");
        }
    }
);

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isLoading = false;

            if (state.rememberMe) {
                localStorage.setItem("user", JSON.stringify(action.payload));
                localStorage.setItem("token", action.payload.token);
            }
        },
        loginFailure: (state) => {
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.profile = [];
            state.isAuthenticated = false;
            state.isLoading = false;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("profile");
            localStorage.removeItem("rememberMe");
        },
        setProfile: (state, action) => {
            state.profile = [...state.profile, ...action.payload];
            localStorage.setItem("profile", JSON.stringify(state.profile));
        },
        setRememberMe: (state, action) => {
            state.rememberMe = action.payload;
            localStorage.setItem("rememberMe", JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfiles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
                localStorage.setItem("profile", JSON.stringify(action.payload));
            })
            .addCase(fetchProfiles.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export const { loginRequest, setProfile, loginSuccess, loginFailure, logout, setRememberMe } = AuthSlice.actions;
export default AuthSlice.reducer;
