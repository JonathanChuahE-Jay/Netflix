import { useEffect, useRef, useState } from "react";
import "../styles/Home.css";
import VerticalAccordions from "../components/accordions/VerticalAccordions";
import MovieCards from "../components/cards/MovieCards";
import { useMovies, useRandomTrailer } from "../hooks/MovieHooks";
import Trailer from "../components/trailer/Trailer";

const Home = () => {
    const { movies, loading: moviesLoading } = useMovies();
    const { trailer, loading: trailerLoading } = useRandomTrailer();

    const filterByGenre = (genre) => {
        return movies?.filter(movie => movie.Genres.includes(genre));
    };

    const filterByRecentReleased = () => {
        const today = new Date();
        return movies?.filter(movie => {
            const releaseDate = new Date(movie.Released);
            return releaseDate <= today;
        });
    };

    if (moviesLoading || trailerLoading) return <div>Loading...</div>;


    return (
        <div className="home">
            <Trailer trailer={trailer} />
            <div className="section-container">
                <MovieCards title="Recent Released" data={filterByRecentReleased()} />
                <MovieCards title="Horror" data={filterByGenre('Horror')} />
                <MovieCards title="Comedy" data={filterByGenre('Comedy')} />
                <p>Popular Games</p>
                <VerticalAccordions />
                <MovieCards title="Action" data={filterByGenre('Action')} />
                <MovieCards title="Adventure" data={filterByGenre('Adventure')} />
            </div>
        </div>
    );
};

export default Home;
