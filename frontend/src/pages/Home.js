import { useEffect, useRef, useState } from "react";
import "../styles/Home.css";
import VerticalAccordions from "../components/accordions/VerticalAccordions";
import MovieCards from "../components/cards/MovieCards";
import { getMovies, getTrailers, getGenre } from "../services/movieService";
import Trailer from "../components/trailer/Trailer";
const base_url = "https://image.tmdb.org/t/p/original/";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState([]);

    console.log(movies)
    useEffect(() => {
        const fetchGenres = async () => {
            const genreList = await getGenre();
            setGenres(genreList);
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movies, trailersData] = await Promise.all([getMovies(), getTrailers()]);
                setMovies(movies);
                setTrailers(trailersData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home">
            <Trailer trailers={trailers} />
            <div className="section-container">
                <MovieCards title="Trending Now" genres={genres} base_url={base_url} movies={movies.fetchTrending} />
                <p>Popular Games</p>
                <VerticalAccordions />
            </div>
        </div>
    );
};

export default Home;
