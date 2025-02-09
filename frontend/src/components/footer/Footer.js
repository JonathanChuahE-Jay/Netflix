import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="icon-container">
                <a href="#"><FontAwesomeIcon icon={faFacebook} color="white" size="xl" /></a>
                <a href="#"><FontAwesomeIcon icon={faInstagram} color="white" size="xl" /></a>
                <a href="#"><FontAwesomeIcon icon={faTwitter} color="white" size="xl" /></a>
                <a href="#"><FontAwesomeIcon icon={faYoutube} color="white" size="xl" /></a>
            </div>
            <div className="footer-link-container">
                <div className="link-item">
                    <a href="#">Audio description</a>
                    <a href="#">Gift Cards</a>
                    <a href="#">Investor Relations</a>
                    <a href="#">Terms of Use</a>
                    <a href="#">Legal Notices</a>
                    <a href="#">Corporate Information</a>
                </div>
                <div className="link-item">
                    <a href="#">Help Center</a>
                    <a href="#">Media Center</a>
                    <a href="#">Jobs</a>
                    <a href="#">Privacy</a>
                    <a href="#">Cookie Preferences</a>
                    <a href="#">Contact Us</a>
                </div>
            </div>
            <button className="service-button">Service Code</button>
            <p className="copy-right">&copy; 1996-{new Date().getFullYear()} Netflix, Inc.</p>
        </footer>
    );
}

export default Footer;
