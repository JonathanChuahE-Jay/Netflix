import Text from "../components/text/Text";
import "../styles/LandingPage.css";
import landingPageImg from "../assets/img/background/netflix-background-1.jpg";
import Button from "../components/button/Button";
import { faChevronRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner/Spinner";
import { useToast } from "../context/ToastContext";
import { useCheckEmail } from "../services/AuthServices";
import { setFormData } from "../redux/RegisterSlice";
import { useDispatch } from "react-redux";
import { emailValidationRules } from "../utils/validationRules";

const LandingPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showToast = useToast();
    const checkEmailMutation = useCheckEmail();
    const emailValue = watch("email")

    useEffect(() => {
        if (errors.email) {
            showToast({
                type: "error",
                message: errors.email.message,
                position: "top-left",
            });
        }
    }, [errors.email]);

    const onSubmit = async (data) => {
        setIsLoading(true);

        checkEmailMutation.mutate(data.email, {
            onSuccess: (response) => {
                if (response.status === 200) {
                    showToast({
                        type: "error",
                        message: "Email is already registered. Please log in.",
                        position: "top-left",
                    });
                    setIsLoading(false);
                    return;
                }
                dispatch(setFormData({ username: "", email: data.email, password: "", subscriptionPlan: {} },))
                navigate(`/register?email=${encodeURIComponent(data.email)}`);
                setIsLoading(false);
            },
            onError: (error) => {
                const errorMessage =
                error?.response?.data?.message || "Server error. Please try again later.";

                showToast({
                    type: "error",
                    message: errorMessage,
                    position: "top-left",
                });
                setIsLoading(false);
            },
        });
    };

    return (
        <div
            className="landing-page"
            style={{ backgroundImage: `url(${landingPageImg})` }}
        >
            {
                isLoading ?
                    <>
                        <Spinner variant="bars" />
                    </>
                    :
                    <div className="landing-page-container">
                        <Text size="xl" fontWeight="bold" color="white">
                            Unlimited movies, TV shows, and more
                        </Text>
                        <Text size="md" color="white">
                            Starts at RM 18.90. Cancel anytime.
                        </Text>
                        <Text size="md" color="white" marginBottom="20px">
                            Ready to watch? Enter your email to create or restart your membership.
                        </Text>
                        <form onSubmit={handleSubmit(onSubmit)} className="landing-page-input-container">
                            <Input
                                value={emailValue}
                                setValue={setValue}
                                register={register}
                                name="email"
                                placeholder="Email address"
                                width="100%"
                                icon={faEnvelope}
                                validationRules={emailValidationRules}
                            />

                            <Button type="submit" color="white" bg="red" iconPosition="right" height="50px" icon={faChevronRight}>
                                Get Started
                            </Button>
                        </form>
                    </div>
            }
        </div>
    );
};

export default LandingPage;