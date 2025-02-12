import Home from "../pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/LoginPage";
import Landing from "../pages/LandingPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Landing/>}/>
                    <Route path="home" element={<Home />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </Router>
    )
}
export default AppRoutes;