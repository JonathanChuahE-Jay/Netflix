import { useCallback, useState, useEffect } from "react";
import moviesData from "../assets/json/movies.json";
import movieTrailer from "movie-trailer";

const useMovies = () => {
    const getMovies = useCallback(() => {
        if (moviesData?.length) {
            return moviesData.map(movie => ({
                ...movie,
                Genres: movie.Genre ? movie.Genre.split(", ").map(genre => genre.trim()) : [],
                Actors: movie.Actors ? movie.Actors.split(", ").map(actor => actor.trim()) : []
            }));
            
        }
        return [];
    }, []);

    const getTrailers = useCallback(async (movieTitle) => {
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

    return { getMovies, getTrailers };
};

export default useMovies;
