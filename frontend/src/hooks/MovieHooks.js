import { useEffect, useState, useCallback } from "react";
import moviesData from "../assets/json/movies.json";
import movieTrailer from "movie-trailer";

export const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (moviesData?.length) {
            const formattedMovies = moviesData.map(movie => ({
                ...movie,
                Genres: movie.Genre ? movie.Genre.split(", ").map(genre => genre.trim()) : [],
                Actors: movie.Actors ? movie.Actors.split(", ").map(actor => actor.trim()) : []
            }));
            setMovies(formattedMovies);
        }
        setLoading(false);
    }, []);

    return { movies, loading };
};

export const useRandomTrailer = () => {
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);

    const getTrailer = useCallback(async (movieTitle) => {
        try {
            const url = await movieTrailer(movieTitle);
            if (url) {
                const urlParams = new URLSearchParams(new URL(url).search);
                return urlParams.get("v");
            }
        } catch (error) {
            console.error(`Error fetching trailer for ${movieTitle}:`, error);
        }
        return null;
    }, []);

    useEffect(() => {
        const fetchTrailer = async () => {
            if (!moviesData.length) {
                setLoading(false);
                return;
            }

            const randomMovie = moviesData[Math.floor(Math.random() * moviesData.length)];
            const youtubeId = await getTrailer(randomMovie.Title);

            if (youtubeId) {
                setTrailer({
                    youtube_video_id: youtubeId,
                    title: randomMovie.Title,
                    description: randomMovie.Plot || "No description available.",
                    categories: randomMovie.Genres ? randomMovie.Genres.split(", ") : [],
                });
            }

            setLoading(false);
        };

        fetchTrailer();
    }, [getTrailer]);

    return { trailer, loading };
};
