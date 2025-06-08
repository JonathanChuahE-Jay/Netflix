import "./Card.css";
const TopMovieCard = ({ className, useRef, setDataModal, setModalPosition, setShowModal, movie, index }) => {
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
            setDataModal(movie);
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
            className={`top-movie-card ${className}`}
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <p className={`top-movie-rank ${index >= 10 ? "limit" : ""}`}>{index}</p>
            <div className="top-movie-card-container">
                <img className="top-movie-card-image" src={movie.Poster} alt={movie.Title} />
            </div>
        </div>
    );
};

export default TopMovieCard;
