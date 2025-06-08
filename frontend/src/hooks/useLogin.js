import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, loginSuccess, loginFailure, setProfile } from "../redux/AuthSlice";
import { setIsLoading } from "../redux/UiSlice";
import { loginUser } from "../services/AuthServices";
import { getProfileById } from "../services/ProfileServices";

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rememberMe = useSelector((state) => state.auth.rememberMe);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const mutation = useMutation(loginUser, {
        onMutate: () => {
            dispatch(loginRequest());
        },
        onSuccess: async (response) => {
            const userData = response.data;
            dispatch(loginSuccess(userData));

            if (rememberMe) {
                localStorage.setItem("token", userData.token);
            }

            try {
                dispatch(setIsLoading(true));
                const fetchedProfiles = [];

                for (const profile of userData.user.profiles) {
                    try {
                        const profileData = await getProfileById(profile._id);
                        fetchedProfiles.push(profileData.data);
                    } catch (error) {
                        console.error("Error fetching profile:", error);
                    }
                }
                if (fetchedProfiles.length > 0) {
                    dispatch(setProfile(fetchedProfiles));
                    navigate("/");
                } else {
                    navigate("/setup-profile");
                }
            } catch (error) {
                console.error("Error during the process:", error);
            } finally {
                dispatch(setIsLoading(false));
            }
        },
        onError: (error) => {
            dispatch(loginFailure());
            console.error("Login failed:", error.response?.data?.message || error.message);
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return { register, handleSubmit, setValue, errors, mutation, onSubmit };
};

export default useLogin;
