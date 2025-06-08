import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layouts/Layout";
import Home from "../pages/HomePage";
import Login from "../pages/LoginPage";
import Landing from "../pages/LandingPage";
import Register from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import ScrollToTop from "../hooks/useScrollToTop";
import SetupProfilePage from "../pages/SetupProfilePage";
import Spinner from "../components/spinner/Spinner";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import backgroundImg from "../assets/img/background/netflix-background-1.jpg";

const AppRoutes = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLoading = useSelector((state) => state.ui.isLoading);
    const profile = useSelector((state) => state.auth.profile);
    const user = useSelector((state) => state.auth.user);
    
    if (isLoading) {
        return (
            <div style={{ backgroundImage: `url(${backgroundImg})` }} className="loading">
                <Spinner variant="bars" />
            </div>
        );
    }

    return (
        <>
            <ScrollToTop />
            <Routes>
                {isAuthenticated ? (
                    <Route path="/" element={<Layout />}>
                        {profile.length > 0 ? (
                            <>
                                <Route index element={<Home />} />
                                <Route path="setup-profile" element={<SetupProfilePage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </>
                        ) : (
                            <>
                                <Route index element={<Navigate to="/setup-profile" replace />} />
                                <Route path="setup-profile" element={<SetupProfilePage />} />
                                <Route path="*" element={<NotFoundPage link="/setup-profile" />} />
                            </>
                        )}
                    </Route>
                ) : (
                    <>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Landing />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="forgot-password" element={<ForgotPasswordPage />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                )}
            </Routes>
        </>
    );
};

export default AppRoutes;
