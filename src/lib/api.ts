import axiosClient from "./axios.ts";
import type {Movie, MovieDetails} from "../types";


export const getImageUrl = (path: string | null | undefined, size: 'original' | 'w500' = 'w500') =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';

export const requests = {
    fetchTrending: `/trending/movie/week`,
    fetchNetflixOriginals: `/discover/tv?with_networks=213`,
    fetchTopRated: `/movie/top_rated`,
    fetchActionMovies: `/discover/movie?with_genres=28`,
    fetchComedyMovies: `/discover/movie?with_genres=35`,
    fetchHorrorMovies: `/discover/movie?with_genres=27`,
    fetchRomanceMovies: `/discover/movie?with_genres=10749`,
    fetchDocumentaries: `/discover/movie?with_genres=99`,
};


export const fetchMovieVideos = async (movieId: number): Promise<string | null> => {
    try {
        const { data } = await axiosClient.get(`/movie/${movieId}/videos`);

        const trailer = data.results.find(
            (vid: any) => vid.site === "Youtube" && (vid.type === "Trailer" || vid.type === "Teaser")
        );

        return trailer ? trailer.key : data.results[0]?.key || null;
    } catch (err: any) {
        console.error("Error fetching video:", err);
        return null;
    }
}

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
    try {
        const { data } = await axiosClient.get(`/movie/${movieId}?append_to_response=videos,credits`);
        return data;
    } catch (e) {
        console.error("Error fetching data movie: ", e);
        throw  e;
    }
}

export const fetchMovies = async (url: string): Promise<Movie[]> => {
    const { data } = await axiosClient.get(url);
    return data.results;
}