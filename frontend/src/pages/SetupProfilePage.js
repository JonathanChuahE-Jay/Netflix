import "../styles/SetupProfilePage.css";
import Avatar from "../components/avatar/Avatar";
import backgroundImg from "../assets/img/background/netflix-background-2.jpg";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import Center from "../components/center/Center";
import Button from "../components/button/Button";
import { createProfile, updateProfile } from "../services/ProfileServices";
import { useProfilePictures } from "../hooks/useProfilePictures";
import { useProfiles } from "../hooks/useProfiles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../redux/AuthSlice";
import { useEffect } from "react";

const SetupProfilePage = () => {
    const { data: profilePictures, isLoading } = useProfilePictures();
    const { profiles, selectedProfileIndex, setProfiles, handleProfileSelect } = useProfiles(profilePictures, isLoading);
    const registeredProfiles = useSelector((state) => state.auth.profile) || [];
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    useEffect(() => {
        dispatch(fetchProfiles());
    }, [dispatch]);

    const mutation = useMutation(createProfile, {
        onSuccess: () => {
            queryClient.invalidateQueries("profiles");
            dispatch(fetchProfiles());
        },
        onError: (error) => console.error("Error saving profile:", error),
    });

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

    useEffect(() => {
        return () => {
            profiles.forEach((profile) => {
                if (profile.preview) {
                    URL.revokeObjectURL(profile.preview);
                }
            });
        };
    }, [profiles]);

    const onSubmit = () => {
        const profilesToCreate = [];
        const profilesToUpdate = [];

        profiles.forEach((profile, index) => {
            if (!profile.username || profile.username.trim() === "") return;

            const existingProfile = registeredProfiles[index];

            if (existingProfile) {
                const updatedProfile = {
                    id: existingProfile._id,
                    username: profile.username,
                    profile_picture: profile.profile_picture,
                };
                profilesToUpdate.push(updatedProfile);
            } else {
                const newProfile = {
                    username: profile.username,
                    profile_picture: profile.profile_picture,
                };
                profilesToCreate.push(newProfile);
            }
        });

        profilesToCreate.forEach((profile) => {
            const formData = new FormData();
            formData.append("username", profile.username);
            if (profile.profile_picture) formData.append("profile_picture", profile.profile_picture);
            mutation.mutate(formData);
        });
        profilesToUpdate.forEach((profile) => {
            const formData = new FormData();
            formData.append("username", profile.username);
            if (profile.profile_picture) formData.append("profile_picture", profile.profile_picture);
            updateProfile(profile.id, formData).then(() => {
                queryClient.invalidateQueries("profiles");
                dispatch(fetchProfiles());
            });
        });
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImg})` }} className="setup-profile-page">
            <form className="setup-profile-page-container" onSubmit={handleSubmit(onSubmit)}>
                <div className="setup-profile-avatar-container">
                    {profiles.map((prof, index) => (
                        <div
                            className={`setup-profile-avatar-select ${selectedProfileIndex === index ? "selected" : ""}`}
                            key={index}
                            onClick={() => handleProfileSelect(index)}
                        >
                            <Avatar src={prof.preview || prof.profile_picture} shape="square" size="sm" />
                        </div>
                    ))}
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
                    setValue={(name, value) => {
                        setProfiles((prevProfiles) => {
                            const updatedProfiles = [...prevProfiles];
                            updatedProfiles[selectedProfileIndex] = {
                                ...updatedProfiles[selectedProfileIndex],
                                username: value,
                            };
                            return updatedProfiles;
                        });
                    }}
                    name="username"
                    placeholder="Username"
                    required
                />
                {mutation.isError && <p className="error-message">Failed to save profile. Please try again.</p>}

                <Button type="submit" width="100%" height="50px" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Saving..." : "Save all Profiles"}
                </Button>
            </form>
        </div>
    );
};

export default SetupProfilePage;
