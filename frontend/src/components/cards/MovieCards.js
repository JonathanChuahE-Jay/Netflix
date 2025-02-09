import React, { useEffect, useRef, useState } from "react";
import Modal from "../modal/Modal";
import { faPlay, faCheck, faThumbsUp, faThumbsDown, faHeart, faChevronDown, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../tooltip/Tooltip";
import Movie_Card from "./MovieCard";
import default_movie from "../../assets/img/movies/default.png";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const MovieCards = ({ genres, base_url, movies, title }) => {
    const [movieModal, setMovieModal] = useState(null);
    const [showArrow, setShowArrow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const [trailerId, setTrailerId] = useState(null);

    const ITEMSPERPAGE = 5;
    const cardsRef = useRef(null);

    const getNextIndex = (index) => (index + ITEMSPERPAGE) % (movies?.length || 0);
    const getPrevIndex = (index) => (index - ITEMSPERPAGE + (movies?.length || 0)) % (movies?.length || 0);

    useEffect(() => {
        if (movieModal) {
            movieTrailer(movieModal?.title || movieModal?.original_title || movieModal?.name || movieModal?.original_name)
                .then((response) => {
                    if (response) {
                        const videoId = new URL(response).searchParams.get("v");
                        setTrailerId(videoId);
                    } else {
                        setTrailerId(null);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching trailer:", error);
                    setTrailerId(null);
                });
        }
    }, [movieModal]);

    const handleNext = () => {
        if (isSliding || !cardsRef.current) return;
        setIsSliding(true);

        const visibleCards = cardsRef.current.querySelectorAll('.visible-card');

        visibleCards.forEach(card => card.classList.add('slide-out-left'));

        setTimeout(() => {
            const nextIndex = getNextIndex(currentIndex);
            setCurrentIndex(nextIndex);

            visibleCards.forEach(card => {
                card.classList.remove('slide-out-left');
                card.classList.add('slide-in-right');
            });

            setTimeout(() => {
                visibleCards.forEach(card => card.classList.remove('slide-in-right'));
                setIsSliding(false);
            }, 300);
        }, 300);
    };

    const handlePrev = () => {
        if (isSliding || !cardsRef.current) return;
        setIsSliding(true);

        const visibleCards = cardsRef.current.querySelectorAll('.visible-card');

        visibleCards.forEach(card => card.classList.add('slide-out-right'));

        setTimeout(() => {
            const prevIndex = getPrevIndex(currentIndex);
            setCurrentIndex(prevIndex);

            visibleCards.forEach(card => {
                card.classList.remove('slide-out-right');
                card.classList.add('slide-in-left');
            });

            setTimeout(() => {
                visibleCards.forEach(card => card.classList.remove('slide-in-left'));
                setIsSliding(false);
            }, 300);
        }, 100);
    };

    const getItemsForCurrentPage = () => {
        if (!movies || movies.length === 0) return [];

        const totalIndex = movies.length;
        const prevIndex = (currentIndex - 1 + totalIndex) % totalIndex;
        const nextIndex = (currentIndex + ITEMSPERPAGE) % totalIndex;

        const endIndex = currentIndex + ITEMSPERPAGE;
        let currentPageItems = [];

        if (endIndex <= totalIndex) {
            currentPageItems = movies.slice(currentIndex, endIndex);
        } else {
            const itemsFromEnd = movies.slice(currentIndex);
            const itemsFromStart = movies.slice(0, ITEMSPERPAGE - itemsFromEnd.length);
            currentPageItems = [...itemsFromEnd, ...itemsFromStart];
        }

        return [movies[prevIndex], ...currentPageItems, movies[nextIndex]];
    };

    return (
        <>
            <p>{title}</p>
            <div className="cards"
                ref={cardsRef}
                onMouseEnter={() => setShowArrow(true)}
                onMouseLeave={() => setShowArrow(false)}
            >
                <button className={`pagination-button left-arrow ${showArrow ? 'visible' : ''}`} onClick={handlePrev}>
                    <FontAwesomeIcon size="lg" icon={faChevronLeft} />
                </button>
                {Array.isArray(movies) && movies.length > 0 ? (
                    getItemsForCurrentPage().map((movie, index) => {
                        const isFirst = index === 0;
                        const isLast = index === getItemsForCurrentPage().length - 1;
                        return (
                            <Movie_Card
                                key={index}
                                setModalPosition={setModalPosition}
                                setShowModal={setShowModal}
                                setMovie={setMovieModal}
                                movie={movie}
                                base_url={base_url}
                                className={`${isFirst || isLast ? 'half-view no-hover' : ''} visible-card`}
                            />
                        );
                    })
                ) : (
                    <div>No movies available</div>
                )}
                <button className={`pagination-button right-arrow ${showArrow ? 'visible' : ''}`} onClick={handleNext}>
                    <FontAwesomeIcon size="lg" icon={faChevronRight} />
                </button>
            </div>

            <Modal setShowArrow={setShowArrow} showModal={showModal} position={modalPosition} setShowModal={setShowModal}>
                <div className="modal-image-container">
                    {trailerId ? (
                        <YouTube 
                        className="video" 
                        videoId={trailerId} 
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
                    ) : (
                        <img src={movieModal?.backdrop_path ? base_url + movieModal.backdrop_path : default_movie} alt="Movie Poster" />
                    )}
                    <h3 className="img-title">{movieModal?.title}</h3>
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
                        <span className="modal-age">{movieModal?.adult ? "18+" : "R"}</span>
                        <span className="modal-duration">"10</span>
                    </div>
                    <ul className="modal-tags">
                        {movieModal?.genre_ids?.map((genreId) => {
                            const genre = genres.find((g) => g.id === genreId);
                            if (!genre) {
                                console.warn(`Missing genre ID: ${genreId}`);
                                return null;
                            }
                            return <li key={genreId} className="modal-tag">{genre.name}</li>;
                        })}
                    </ul>
                </div>
            </Modal>
        </>
    );
};

export default MovieCards;
