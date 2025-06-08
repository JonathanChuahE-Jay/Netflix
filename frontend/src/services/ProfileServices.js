import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/profiles' });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export const createProfile = (data) => {
    return API.post("/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
export const getProfiles = () => API.get('/');
export const getProfileById = (id) => API.get(`/${id}`);
export const updateProfile = (id, data) => API.put(`/${id}`, data);
export const deleteProfile = (id) => API.delete(`/${id}`);
