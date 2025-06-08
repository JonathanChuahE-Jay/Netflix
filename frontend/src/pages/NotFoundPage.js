import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import useCountdown from "../hooks/useCountdown";
import "../styles/NotFoundPage.css";
import Button from "../components/button/Button";

const NotFoundPage = ({ link }) => {
    const navigate = useNavigate();
    const countdown = useCountdown(3, () => navigate(link ? link : "/"));

    return (
        <div className="not-found-page">
            <h1>404 - Page Not Found</h1>
            <p style={{ marginBottom: "50px" }}>The page you are looking for does not exist.</p>
            <Spinner label={`Going back in ${countdown} seconds...`} variant="square" />
            <Button padding="10px" onClick={() => { navigate(link ? link : "/") }}>Go back now</Button>
        </div>
    );
};

export default NotFoundPage;
