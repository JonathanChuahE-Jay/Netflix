import axios from "axios";
import Requests from "../Requests";

export const getMovies = async () => {
    try {
        const categories = Object.keys(Requests);
        const movieRequests = categories.map(async (category) => {
            const response = await axios.get(Requests[category]);
            return { category, movies: response.data.results || [] };
        });

        const movieData = await Promise.all(movieRequests);
        return movieData.reduce((acc, { category, movies }) => {
            acc[category] = movies;
            return acc;
        }, {});
    } catch (error) {
        console.error("Error fetching movies:", error);
        return {};
    }
};

export const getGenre = async () => {
    try {
        const response = await axios.get(Requests.fetchGenre);
        if (!response.data.genres) throw new Error("No genres found");
        return response.data.genres;
    } catch (error) {
        console.error("Error fetching genres:", error);
        return [];
    }
};

export const getTrailers = async () => {
    try {
        const url = "https://api.kinocheck.com/trailers";
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching trailers:", error);
        return [];
    }
};
