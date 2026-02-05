import {useWatchlistStore} from "../store/watchListStore.ts";
import {useModalStore} from "../store/modalStore.ts";
import {useEffect, useState} from "react";
import type {MovieDetails} from "../types";
import {fetchMovieDetails, getImageUrl} from "../lib/api.ts";
import {X} from "lucide-react";

export const MyListPage = () => {
    const { watchlist, loadWatchlist, removeFromWatchlist} = useWatchlistStore();
    const openModal = useModalStore((state) => state.openModal);
    const [movies, setMovies] = useState<MovieDetails[]>([]);


    useEffect(() => {
        loadWatchlist()
    }, [])

    useEffect(() => {
        const fetchMyListMovie = async () => {
            if(watchlist.length === 0) {
                setMovies([]);
                return;
            }
            const promises = watchlist.map(id => fetchMovieDetails(id));
            const results = await Promise.all(promises);
            setMovies(results);
        };
        fetchMyListMovie();
    }, [watchlist]);

    return (
        <div className="pt-32 px-12 min-h-screen bg-[#141414] pb-20 text-white">
            <h1 className="text-3xl font-bold mb-8">Ma Liste</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="relative group cursor-pointer">
                        <img
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.title}
                            className="rounded-md object-cover w-full h-[300px]"
                            onClick={() => openModal(movie.id)}
                        />
                        <button
                            onClick={() => removeFromWatchlist(movie.id)}
                            className="absolute top-2 right-2 bg-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}