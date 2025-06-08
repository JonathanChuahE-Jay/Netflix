import { useEffect } from "react";
import useLogin from "../hooks/useLogin";
import "../styles/LoginPage.css";
import Img from "../assets/img/background/netflix-background-1.jpg";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import Text from "../components/text/Text";
import { useNavigate } from "react-router-dom";
import Checkbox from "../components/checkbox/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { setRememberMe } from "../redux/AuthSlice";

const Login = () => {
    const { register, handleSubmit, setValue, mutation, onSubmit } = useLogin();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rememberMe = useSelector((state) => state.auth.rememberMe);

    const handleCheckboxChange = () => {
        dispatch(setRememberMe(!rememberMe));
    };

    const handleFormSubmit = (data) => {
        onSubmit({ ...data, rememberMe });
    };

    return (
        <div className="login-page" style={{ backgroundImage: `url(${Img})` }}>
            <form className="login-page-container" onSubmit={handleSubmit(handleFormSubmit)} style={{ marginTop: "100px" }}>
                <Text color="white" size="xxxl" fontWeight="bold">Sign in</Text>
                <Input
                    setValue={setValue}
                    register={register}
                    name="email"
                    placeholder="Email"
                    required
                />
                <Input
                    setValue={setValue}
                    register={register}
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                    passwordView={true}
                />
                <a href="/forgot-password" className="forgot-password-link">Forgot password</a>
                <Button padding="10px" type="submit" textAlign="center" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Logging in..." : "Sign in"}
                </Button>
                {mutation.isError && (
                    <p className="error-message" style={{ marginTop: "0px" }}>
                        {mutation.error?.response?.data?.message || "Login failed. Try again."}
                    </p>
                )}
                <Checkbox 
                    width="15px" 
                    height="15px" 
                    border="1px solid white" 
                    color="white" 
                    label="Remember me" 
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                />
                <div style={{display: "flex"}}>
                    <Text color="darkgray">New to Netflix?</Text>
                    <Button bg="transparent" border="none" onClick={() => navigate("/")}>Sign up now.</Button>
                </div>
                <Text color="gray" size="sm">This page is protected by Google reCAPTCHA to ensure you're not a bot.</Text>
            </form>
        </div>
    );
};

export default Login;
