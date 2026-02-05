import { useEffect, useState } from 'react';
import { useWatchlistStore} from "../store/watchListStore.ts";
import { fetchMovieDetails, getImageUrl } from '../lib/api';
import type {MovieDetails} from '../types';
import { useModalStore } from '../store/modalStore';
import { Play, X } from 'lucide-react';

export const MyListPage = () => {
    const { watchlist, loadWatchlist, removeFromWatchlist } = useWatchlistStore();
    const openModal = useModalStore(state => state.openModal);
    const [movies, setMovies] = useState<MovieDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWatchlist();
    }, [loadWatchlist]);

    // 2. Fetch Details
    useEffect(() => {
        const fetchMyListMovies = async () => {
            console.log("Watchlist IDs:", watchlist);

            if (!watchlist || watchlist.length === 0) {
                setMovies([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const promises = watchlist.map(id => fetchMovieDetails(id));
                const results = await Promise.all(promises);

                setMovies(results);
            } catch (error) {
                console.error("Error fetching watchlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyListMovies();
    }, [watchlist]);

    if (loading) return <div className="pt-40 text-center text-white text-xl">Loading your list...</div>;

    return (
        <div className="pt-32 px-12 min-h-screen bg-[#141414] pb-20 text-white">
            <h1 className="text-3xl font-bold mb-8">Ma Liste ({movies.length})</h1>

            {movies.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
                    <p className="text-xl">Votre liste est vide.</p>
                    <p className="text-sm mt-2">Ajoutez des films depuis la page d'accueil.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <div key={movie.id} className="relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-50">
                            <img
                                src={getImageUrl(movie.poster_path || movie.backdrop_path)}
                                alt={movie.title}
                                className="rounded-md object-cover w-full h-[350px] shadow-lg"
                                onClick={() => openModal(movie.id)}
                            />

                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center rounded-md gap-4">
                                <h3 className="text-center font-bold px-2">{movie.title}</h3>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => openModal(movie.id)}
                                        className="bg-white text-black p-3 rounded-full hover:scale-110 transition"
                                    >
                                        <Play className="w-5 h-5 fill-black" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromWatchlist(movie.id);
                                        }}
                                        className="border-2 border-white text-white p-3 rounded-full hover:bg-red-600 hover:border-red-600 transition"
                                        title="Retirer de la liste"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};