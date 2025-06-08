import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getRandomItem } from "../utils/getRandomItem";
import { BASE_URL } from "../utils/constants";

export const useProfiles = (profilePictures, isLoading) => {
    const registeredProfiles = useSelector((state) => state.auth.profile) || [];
    const [profiles, setProfiles] = useState([]);
    const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);

    useEffect(() => {
        if (!isLoading && profilePictures) {
            setProfiles(
                Array.from({ length: 4 }, (_, i) => ({
                    id: registeredProfiles[i]?._id || null,
                    username: registeredProfiles[i]?.username || "",
                    profile_picture: registeredProfiles[i]?.profile_picture
                        ? `${BASE_URL}${registeredProfiles[i].profile_picture}`
                        : getRandomItem(profilePictures, BASE_URL),

                }))
            );
        }
    }, [registeredProfiles, profilePictures, isLoading]);

    const handleProfileSelect = (index) => {
        if (!profiles[index]) return;
        setSelectedProfileIndex(index);
    };

    return { profiles, selectedProfileIndex, setProfiles, handleProfileSelect };
};
