import { useForm } from "react-hook-form";
import backgroundImg from "../assets/img/background/netflix-background-1.jpg";
import Container from "../components/container/Container";
import Input from "../components/input/Input";
import "../styles/ForgotPasswordPage.css";
import { emailValidationRules } from "../utils/validationRules";
import { resetPassword, sendOtp, verifyOtp } from "../services/AuthServices";
import { useMutation } from "react-query";
import { useToast } from "../context/ToastContext";
import { useState } from "react";
import { Step, Stepper, StepperFooter, StepperPrevButton, StepperStepButton } from "../components/stepper/Stepper";
import Spinner from "../components/spinner/Spinner";
import OTPInput from "../components/input/OTPInput";
import Text from "../components/text/Text";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
    const [step, setStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { register, setValue, handleSubmit, getValues, watch } = useForm();

    const showToast = useToast();
    const navigate = useNavigate();
    const email = getValues("email");

    const sendOtpMutation = useMutation(({ email }) => sendOtp(email, "reset"), {
        onSuccess: (response) => {
            setIsLoading(false);
            if (response.status === 200) {
                showToast({
                    type: "success",
                    message: "An OTP has been sent to your email. Please enter it to proceed.",
                    position: "top-left",
                });
                setErrorMessage("");
                setStep(1);
            } else {
                showToast({
                    type: "error",
                    message: "No account found with this email. Please try again.",
                    position: "top-left",
                });
                setErrorMessage("No account found with this email. Please try again.");
            }
        },
        onError: (error) => {
            setIsLoading(false);
            showToast({
                type: "error",
                message: error.response?.data?.message || "Something went wrong. Please try again later.",
                position: "top-left",
            });
            setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again later.");
        }
    });

    const verifyOtpMutation = useMutation(({ otp }) => verifyOtp(email, otp, "reset"), {
        onSuccess: () => {
            setIsLoading(false);
            showToast({ type: "success", message: "OTP verified successfully. You can now reset your password.", position: "top-left" });
            setErrorMessage("");
            setStep(2);
        },
        onError: (error) => {
            setIsLoading(false);
            showToast({
                type: "error",
                message: error.response?.data?.message || "Something went wrong. Please try again later.",
                position: "top-left",
            });
            setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again later.");
        }
    });

    const resetPasswordMutation = useMutation(({ email, newPassword, confirmNewPassword }) => resetPassword(email, newPassword, confirmNewPassword), {
        onSuccess: (response) => {
            setIsLoading(false);
            showToast({ type: "success", message: "Password reset successful! You can now log in.", position: "top-left" });
            setErrorMessage("");
            navigate("/");
        },
        onError: (error) => {
            setIsLoading(false);
            showToast({ type: "error", message: error.response?.data?.message || "Failed to reset password.", position: "top-left" });
            setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again later.");
        }
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        if (step === 0) {
            if (!data.email) {
                showToast({
                    type: "error",
                    message: "Please enter a valid email address.",
                    position: "top-left",
                });
                setErrorMessage("Please enter a valid email address.");
                return;
            }

            setIsLoading(true);
            sendOtpMutation.mutate({ email: data.email });
        } else if (step === 1) {
            if (data.otp.length < 4) {
                showToast({
                    type: "error",
                    message: "Please enter the 4-digit OTP sent to your email.",
                    position: "top-left",
                });
                setErrorMessage("Please enter the 4-digit OTP sent to your email.");
                return;
            }
            verifyOtpMutation.mutate({ otp: data.otp },)
        } else if (step === 2) {
            const newPassword = watch("newPassword");
            const confirmNewPassword = watch("confirmNewPassword");

            if (newPassword !== confirmNewPassword) {
                showToast({
                    type: "error",
                    message: "Passwords do not match. Please confirm your new password.",
                    position: "top-left",
                });
                setErrorMessage("Passwords do not match. Please confirm your new password.");
                return;
            }
            setIsLoading(true);
            resetPasswordMutation.mutate({ email, newPassword, confirmNewPassword });
        }
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImg})` }} className="forgot-password-page">
            <Container width="700px" minHeight="500px" glassmorphism={true} color="white">
                {isLoading ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                        <Spinner variant="bars" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stepper height="280px" setStep={setStep} currentStep={step} color="white">
                            <Step height="200px" width="400px" title="Step 1" description="Enter your email">
                                <div style={{ marginTop: "20px" }}>
                                    <Text color="white">Enter your registered email address to receive a password reset OTP.</Text>
                                    <Input
                                        value={email}
                                        marginBottom="50px"
                                        name="email"
                                        register={register}
                                        setValue={setValue}
                                        placeholder="Enter your email"
                                        validationRules={emailValidationRules}
                                    />
                                    <Text color="red" size="sm" textAlign="left">{errorMessage}</Text>
                                </div>
                            </Step>
                            <Step width="400px" height="200px" title="Step 2" description="Verify OTP">
                                <div style={{ display: "flex", gap: "20px", flexDirection: "column", alignItems: "center" }}>
                                    <Text color="white">A 4-digit OTP has been sent to your email. Enter it below to verify your identity.</Text>
                                    <OTPInput register={register} setValue={setValue} />
                                    <Text color="red" size="sm" marginTop="0px" textAlign="left">{errorMessage}</Text>
                                </div>
                            </Step>
                            <Step width="400px" height="200px" title="Step 3" description="Reset Password">
                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", alignItems: "center" }}>
                                    <Text color="white">Enter your new password below.</Text>
                                    <Input
                                        required={true}
                                        name="newPassword"
                                        register={register}
                                        setValue={setValue}
                                        placeholder="Enter new password"
                                        type="password"
                                        passwordView={true}
                                    />
                                    <Input
                                        required={true}
                                        name="confirmNewPassword"
                                        register={register}
                                        setValue={setValue}
                                        placeholder="Confirm new password"
                                        type="password"
                                        passwordView={true}
                                    />
                                    <Text marginTop="0px" color="red" size="sm" textAlign="left">{errorMessage}</Text>
                                </div>
                            </Step>
                            <StepperFooter>
                                <StepperPrevButton disabled={step === 2} onClick={() => step > 0 && setStep(step - 1)} />
                                <StepperStepButton step={step}>{step === 2 ? "Reset" : "Next"}</StepperStepButton>
                            </StepperFooter>
                        </Stepper>
                    </form>
                )}
            </Container>
        </div>
    );
};

export default ForgotPasswordPage;
