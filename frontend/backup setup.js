import "../styles/SetupProfilePage.css";
import Avatar from "../components/avatar/Avatar";
import backgroundImg from "../assets/img/background/netflix-background-2.jpg";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import Center from "../components/center/Center";
import Button from "../components/button/Button";
import { createProfile } from "../services/ProfileServices";
import ProfilePictureServices from "../services/ProfilePicturesServices";

const BASE_URL = "http://localhost:5000";

const SetupProfilePage = () => {
    const { data: profilePictures, isLoading } = useQuery(
        "profilePictures",
        ProfilePictureServices.getDefaultProfilePictures
    );

    const { register, handleSubmit, setValue } = useForm();
    const registeredProfiles = useSelector((state) => state.auth.profile) || [];

    const getRandomProfilePicture = () => {
        if (profilePictures && profilePictures.length > 0) {
            const randomIndex = Math.floor(Math.random() * profilePictures.length);
            return `${BASE_URL}${profilePictures[randomIndex].url}`;
        }
        return `${BASE_URL}/uploads/profile_pictures/default-green.png`;
    };

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        if (!isLoading && profilePictures) {
            setProfiles(
                Array.from({ length: 4 }, (_, i) => ({
                    username: registeredProfiles[i]?.username || "",
                    profile_picture: registeredProfiles[i]?.profile_picture ? `${BASE_URL}${registeredProfiles[i].profile_picture}` : getRandomProfilePicture(),
                }))
            );
        }
    }, [registeredProfiles, profilePictures, isLoading]);

    const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);

    const onImageChange = (file) => {
        setProfiles((prevProfiles) => {
            const updatedProfiles = [...prevProfiles];
            updatedProfiles[selectedProfileIndex] = {
                ...updatedProfiles[selectedProfileIndex],
                profile_picture: file,
                preview: URL.createObjectURL(file),
            };
            return updatedProfiles;
        });
    };

    const mutation = useMutation(createProfile, {
        onSuccess: (response) => {
            console.log("Profile saved successfully:", response);
        },
        onError: (error) => {
            console.error("Error saving profile:", error);
        }
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("username", data.username);

        const selectedProfile = profiles[selectedProfileIndex];

        if (selectedProfile.profile_picture instanceof File) {
            formData.append("profile_picture", selectedProfile.profile_picture);
        } else if (typeof selectedProfile.profile_picture === "string" && !selectedProfile.profile_picture.startsWith(BASE_URL)) {
            formData.append("profile_picture", selectedProfile.profile_picture);
        }

        mutation.mutate(formData);
    };

    const handleProfileSelect = (index) => {
        if (!profiles[index]) return;
        setSelectedProfileIndex(index);
        setValue("username", profiles[index].username || "");
    };

    useEffect(() => {
        if (profiles.length > 0) {
            handleProfileSelect(0);
        }
    }, [profiles]);

    return (
        <div style={{ backgroundImage: `url(${backgroundImg})` }} className="setup-profile-page">
            <form className="setup-profile-page-container" onSubmit={handleSubmit(onSubmit)}>
                <div className="setup-profile-avatar-container">
                    {profiles.map((prof, index) => {
                        const avatarSrc =
                            prof.profile_picture instanceof File
                                ? prof.preview
                                : prof.profile_picture;
                        return (
                            <div
                                className={`setup-profile-avatar-select ${selectedProfileIndex === index ? "selected" : ""}`}
                                key={index}
                                onClick={() => handleProfileSelect(index)}
                            >
                                <Avatar src={avatarSrc} shape="square" size="sm" />
                            </div>
                        );
                    })}
                </div>
                <Center>
                    <Avatar
                        onImageChange={onImageChange}
                        editAvatar={true}
                        size="xxl"
                        shape="square"
                        src={profiles[selectedProfileIndex]?.preview || profiles[selectedProfileIndex]?.profile_picture}
                    />
                </Center>
                <Input
                    margin="20px 0px"
                    value={profiles[selectedProfileIndex]?.username || ""}
                    register={register}
                    setValue={setValue}
                    name="username"
                    placeholder="Username"
                    required
                />
                {mutation.isError && <p className="error-message">Failed to save profile. Please try again.</p>}

                <Button type="submit" width="100%" height="50px" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Saving..." : "Save Profile"}
                </Button>
            </form>
        </div>
    );
};

export default SetupProfilePage;
