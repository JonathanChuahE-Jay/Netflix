import logo from "../../assets/img/logo/netflix_N.png";
import { faExclamationCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Trailer.css";
import YouTube from "react-youtube";

const Trailer = ({ trailer }) => {
    if (!trailer) return null;
    return (
        <div className="trailer">
            <YouTube
                className="trailer-video"
                videoId={trailer?.youtube_video_id}
                opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                        controls: 0,
                        showinfo: 0,
                        rel: 0,
                        fs: 0,
                        iv_load_policy: 3,
                        disablekb: 1,
                        playsinline: 1,
                        widget_referrer: '',
                        cc_load_policy: 0,
                        enablejsapi: 1,
                        origin: window.location.origin
                    },
                }}
            />
            <div className="trailer-logo-text">
                <img src={logo} className="trailer-logo" alt="Netflix Logo" />
                SERIES
            </div>
            <div className="trailer-header">{trailer?.title}</div>
            <div className="trailer-description">
                {trailer?.description}
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