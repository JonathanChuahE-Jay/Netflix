import "../styles/HomePage.css";
import VerticalAccordions from "../components/accordions/VerticalAccordions";
import MovieCards from "../components/cards/MovieCards";
import { useMovies, useRandomTrailer } from "../hooks/MovieHooks";
import Trailer from "../components/trailer/Trailer";
import { useSelector } from "react-redux";
import Spinner from "../components/spinner/Spinner";
import TopMovieCards from "../components/cards/TopMovieCards";

const Home = () => {
    const { movies, loading: moviesLoading } = useMovies();
    const { trailer, loading: trailerLoading } = useRandomTrailer();

    const user = useSelector((state) => state.auth.user);

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

    const filterByTop10 = () => {
        return movies
            .sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating))
            .slice(0, 10);
    };

    return (
        <div className="home-page">
            {
                moviesLoading || trailerLoading ? (
                    <div className="loading">
                        <Spinner variant="bars" />
                    </div>
                ) : (
                    <>
                        <Trailer trailer={trailer} />
                        <div className="section-container">
                            <TopMovieCards data={filterByTop10()} title="Top 10" />
                            <MovieCards title="Recent Released" data={filterByRecentReleased()} />
                            <MovieCards title="Horror" data={filterByGenre('Horror')} />
                            <MovieCards title="Comedy" data={filterByGenre('Comedy')} />
                            <p>Popular Games</p>
                            <VerticalAccordions />
                            <MovieCards title="Action" data={filterByGenre('Action')} />
                            <MovieCards title="Adventure" data={filterByGenre('Adventure')} />
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Home;
