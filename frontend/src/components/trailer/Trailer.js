import logo from "../../assets/img/logo/netflix_N.png";
import { faExclamationCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Trailer.css";

const Trailer = ({ trailers }) => {
    
    return (
        <div className="trailer">
            <video
                src={`https://www.youtube.com/embed/${trailers?.youtube_video_id}?autoplay=1&loop=1&mute=1&playlist=${trailers?.youtube_video_id}`}
                autoPlay
                loop
                muted
                playsInline
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            />
            <div className="trailer-logo-text">
                <img src={logo} className="trailer-logo" alt="Netflix Logo" />
                SERIES
            </div>
            <div className="trailer-header">Squid Game</div>
            <div className="trailer-description">
                Squid Game is a South Korean survival thriller TV series about a group of
                people who play deadly children's games for a large cash prize. The series was
                created by Hwang Dong-hyuk and released on Netflix in 2021.
            </div>
            <div
                className="trailer-button-container"
            >
                <button className="trailer-button">
                    <FontAwesomeIcon color="white" icon={faPlay} style={{ marginRight: "10px" }} />
                    Play
                </button>
                <button className="trailer-button">
                    <FontAwesomeIcon color="white" icon={faExclamationCircle} style={{ marginRight: "10px" }} />
                    More Info
                </button>
            </div>
        </div>
    )
}

export default Trailer;