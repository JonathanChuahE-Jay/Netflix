import React, { useRef } from "react";
import "./Card.css";
import default_movie from "../../assets/img/movies/default.png";

const MovieCard = ({ setData, data, setModalPosition, setShowModal, className }) => {
    const cardRef = useRef(null);
    let hoverTimeout = useRef(null);

    const handleMouseEnter = () => {
        const cardRect = cardRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        let leftPosition = cardRect.left + window.scrollX + cardRect.width / 2;

        if (cardRect.left < 100) {
            leftPosition = cardRect.left + window.scrollX + cardRect.width * 0.7;
        }

        if (cardRect.right > windowWidth - 100) {
            leftPosition = cardRect.right + window.scrollX - cardRect.width * 0.7;
        }

        hoverTimeout.current = setTimeout(() => {
            setData(data);
            setModalPosition({
                top: cardRect.top + window.scrollY + cardRect.height / 2,
                left: leftPosition,
                width: cardRect.width,
                height: cardRect.height,
            });
            setShowModal(true);
        }, 500);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout.current);
        setShowModal(false);
    };

    return (
        <div
            className={`card ${className}`}
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={data?.Poster? data.Poster : default_movie}
                alt="Movie Poster" className="card-image" />
        </div>
    );
};

export default MovieCard;
