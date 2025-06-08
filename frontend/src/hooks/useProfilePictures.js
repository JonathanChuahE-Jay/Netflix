import { useQuery } from "react-query";
import ProfilePictureServices from "../services/ProfilePicturesServices";

export const useProfilePictures = () => {
    return useQuery("profilePictures", ProfilePictureServices.getDefaultProfilePictures);
};
