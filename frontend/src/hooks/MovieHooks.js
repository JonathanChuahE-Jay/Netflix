import { useEffect, useState } from "react";
import { getMovies, getTrailers } from "../services/MovieService";
import moviesData from "../assets/json/movies.json"; 

export const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getMovies();
                setMovies(moviesData);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return { movies, loading };
};

export const useRandomTrailer = () => {
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrailer = async () => {
            if (moviesData.length === 0) {
                setLoading(false);
                return;
            }

            const randomMovie = moviesData[Math.floor(Math.random() * moviesData.length)];
            const youtubeId = await getTrailers(randomMovie.Title);

            if (youtubeId) {
                setTrailer({
                    youtube_video_id: youtubeId,
                    title: randomMovie.Title,
                    description: randomMovie.Plot || "No description available.",
                    categories: randomMovie.Genres || [],
                });
            }

            setLoading(false);
        };

        fetchTrailer();
    }, []);

    return { trailer, loading };
};
