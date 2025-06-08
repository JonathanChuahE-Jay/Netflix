import axios from "axios";

const BASE_URL = "http://localhost:5000";

const ProfilePictureServices = {
    getDefaultProfilePictures: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/profile-pictures`);
            return response.data;
        } catch (error) {
            console.error("Error fetching profile pictures:", error);
            throw error;
        }
    },

    uploadProfilePicture: async (file) => {
        try {
            const formData = new FormData();
            formData.append("profile_picture", file);

            const response = await axios.post(`${BASE_URL}/api/profile-pictures/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return response.data;
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            throw error;
        }
    },

    deleteProfilePicture: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/profile-pictures/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting profile picture:", error);
            throw error;
        }
    }
};

export default ProfilePictureServices;
