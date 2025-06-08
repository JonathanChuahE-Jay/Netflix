import "./Card.css";
import { useEffect, useRef, useState } from "react";
import Button from "../button/Button";
import TopMovieCard from "./TopMovieCard";
import useBreakpoint from "../breakpoint/UseBreakpoint";
import { faCheck, faChevronDown, faChevronLeft, faChevronRight, faHeart, faPlay, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Modal from "../modal/Modal";
import Tooltip from "../tooltip/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopMovieCards = ({ data, title }) => {
    const [dataModal, setDataModal] = useState(null);
    const [showArrow, setShowArrow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isSliding, setIsSliding] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [page, setPage] = useState(0);
    const breakpoint = useBreakpoint();
    const cardsRef = useRef(null);
    const MAXITEMPERPAGE = breakpoint === "mobile" ? 2 : breakpoint === "tablet" ? 3 : 5;
    const totalPages = Math.ceil(data.length / MAXITEMPERPAGE);

    useEffect(() => {
        setPage(0);
    }, [breakpoint]);

    const prevPageBtn = () => {
        if (isSliding || !cardsRef.current) return;
        setIsSliding(true);
        const visibleCards = cardsRef.current.querySelectorAll('.visible-card');

        visibleCards.forEach(card => card.classList.add('slide-out-right'));

        setTimeout(() => {
            setPage(prev => (prev === 0 ? totalPages - 1 : prev - 1));

            visibleCards.forEach(card => {
                card.classList.remove('slide-out-right');
                card.classList.add('slide-in-left');
            });

            setTimeout(() => {
                visibleCards.forEach(card => card.classList.remove('slide-in-right', 'slide-in-left'));
                setIsSliding(false);
            }, 500);

        }, 500);
    };

    const nextPageBtn = () => {
        if (isSliding || !cardsRef.current) return;
        setIsSliding(true);

        const visibleCards = cardsRef.current.querySelectorAll('.visible-card');

        visibleCards.forEach(card => card.classList.add('slide-out-left'));
        setTimeout(() => {
            setPage(prev => (prev === totalPages - 1 ? 0 : prev + 1));

            visibleCards.forEach(card => {
                card.classList.remove('slide-out-left');
                card.classList.add('slide-in-right');
            });

            setTimeout(() => {
                visibleCards.forEach(card => card.classList.remove('slide-in-right', 'slide-in-left'));
                setIsSliding(false);
            }, 500);

        }, 500);
    };

    let startIndex = page * MAXITEMPERPAGE;
    let paginatedMovies = data.slice(startIndex, startIndex + MAXITEMPERPAGE);

    if (paginatedMovies.length < MAXITEMPERPAGE && page === totalPages - 1) {
        startIndex = Math.max(0, data.length - MAXITEMPERPAGE);
        paginatedMovies = data.slice(startIndex);
    }

    const prevItem = startIndex > 0 ? data[startIndex - 1] : data[data.length - 1];
    const nextItem = startIndex + MAXITEMPERPAGE < data.length ? data[startIndex + MAXITEMPERPAGE] : data[0];

    return (
        <>
            <p>{title}</p>
            <div
                ref={cardsRef}
                className="top-movie-cards"
                onMouseEnter={() => setShowArrow(true)}
                onMouseLeave={() => setShowArrow(false)}
            >
                <div className={`top-movie-prev-card visible-card ${showArrow ? 'visible' : ''}`}>
                    <img src={prevItem?.Poster} alt={prevItem?.Title} className="top-movie-prev-item-img" />
                    <Button onClick={prevPageBtn} bg="transparent" icon={faChevronLeft} />
                </div>
                {paginatedMovies.map((movie, i) => (
                    <TopMovieCard
                        className={`visible-card`}
                        movie={movie}
                        index={startIndex + i + 1}
                        useRef={useRef}
                        setModalPosition={setModalPosition}
                        setShowModal={setShowModal}
                        setDataModal={setDataModal}
                    />
                ))}
                <div className={`top-movie-next-card visible-card ${showArrow ? 'visible' : ''}`}>
                    <img src={nextItem?.Poster} alt={nextItem?.Title} className="top-movie-next-item-img" />
                    <Button onClick={nextPageBtn} bg="transparent" icon={faChevronRight} />
                </div>
                <Modal hoverEffect={true} setShowArrow={setShowArrow} showModal={showModal} position={modalPosition} setShowModal={setShowModal}>
                    <div className="modal-image-container">
                        <img
                            src={dataModal?.Poster ? dataModal.Poster : ''}
                            alt="Movie Poster" />
                        <h3 className="img-title">{dataModal?.Title}</h3>
                    </div>
                    <div className="modal-content">
                        <div className="button-wrapper">
                            <div className="button-container">
                                <Tooltip text="Play" position="bottom">
                                    <button className="round-button special">
                                        <FontAwesomeIcon size="lg" icon={faPlay} />
                                    </button>
                                </Tooltip>
                                <Tooltip text="Save to playlist" position="bottom">
                                    <button className="round-button">
                                        <FontAwesomeIcon size="lg" icon={faCheck} />
                                    </button>
                                </Tooltip>
                                <div className="hover-container">
                                    <button className="round-button">
                                        <FontAwesomeIcon size="lg" icon={faThumbsUp} />
                                    </button>
                                    <div className="hover-buttons">
                                        <Tooltip text="I hate it" position="bottom">
                                            <button className="round-button" title="Dislike">
                                                <FontAwesomeIcon size="lg" icon={faThumbsDown} />
                                            </button>
                                        </Tooltip>
                                        <Tooltip text="I like it" position="bottom">
                                            <button className="round-button" title="Dislike">
                                                <FontAwesomeIcon size="lg" icon={faThumbsUp} />
                                            </button>
                                        </Tooltip>
                                        <Tooltip text="I love it" position="bottom">
                                            <button className="round-button" title="Love">
                                                <FontAwesomeIcon size="lg" icon={faHeart} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Tooltip text="Episode & info" position="bottom">
                                    <button className="round-button">
                                        <FontAwesomeIcon size="lg" icon={faChevronDown} />
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="modal-details">
                            <span className="modal-age">{dataModal?.Rated}</span>
                            <span className="modal-duration">{dataModal?.Runtime}</span>
                        </div>
                        <ul className="modal-tags">
                            {dataModal?.Genres?.map((Genre, index) => (
                                <li key={index} className="modal-tag">{Genre}</li>
                            ))}
                        </ul>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default TopMovieCards;
