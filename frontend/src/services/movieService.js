import moviesData from "../assets/json/movies.json";
import movieTrailer from "movie-trailer";

export const getMovies = async () => {
    if (moviesData?.length) {
        return moviesData.map(movie => ({
            ...movie,
            Genres: movie.Genre ? movie.Genre.split(", ").map(genre => genre.trim()) : [],
            Actors: movie.Actors ? movie.Actors.split(", ").map(actor => actor.trim()) : []
        }));
    }
    return [];
};

export const getTrailers = async (movieTitle) => {
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
};
