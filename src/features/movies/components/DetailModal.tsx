import { useEffect, useState } from 'react';
import { useModalStore } from '../../../store/modalStore';
import { useWatchlistStore} from "../../../store/watchListStore.ts";
import type { Movie, MovieDetails } from '../../../types';
import { fetchMovieDetails, fetchMovieVideos, fetchSimilarMovies, getImageUrl } from '../../../lib/api';
import { Check, Play, Plus, ThumbsUp, X } from 'lucide-react';

export const DetailModal = () => {
    const { isOpen, closeModal, movieId } = useModalStore();
    const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();

    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const inList = movieId ? watchlist.includes(movieId) : false;

    useEffect(() => {
        if (isOpen && movieId) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const details = await fetchMovieDetails(movieId);
                    setMovie(details);

                    const videoKey = await fetchMovieVideos(movieId);
                    if (videoKey) setTrailerKey(videoKey);

                    const similar = await fetchSimilarMovies(movieId);
                    setSimilarMovies(similar.slice(0, 6));
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        } else {
            setMovie(null);
            setTrailerKey(null);
        }
    }, [isOpen, movieId]);

    if (!isOpen || !movieId) return null;

    const handleListAction = () => {
        if (inList) removeFromWatchlist(movieId);
        else addToWatchlist(movieId);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-md pt-8 pb-8 px-4 animate-in fade-in duration-200">

            <div className="relative w-full max-w-4xl bg-[#181818] rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10">

                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-50 p-2 bg-[#181818]/80 hover:bg-[#2a2a2a] rounded-full transition border border-white/10 group"
                >
                    <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>

                <div className="relative h-[300px] md:h-[480px] w-full bg-black">
                    {trailerKey ? (
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img
                            src={getImageUrl(movie?.backdrop_path || movie?.poster_path, 'original')}
                            className="w-full h-full object-cover opacity-80"
                        />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#181818] to-transparent pointer-events-none" />
                </div>


                {/* === ZONE 2: LE TITRE ET LES ACTIONS (Sous la vidéo) === */}
                <div className="px-8 pt-6">
                    <h2 className="text-4xl font-black text-white mb-5">{movie?.title}</h2>

                    <div className="flex items-center gap-4 mb-8">
                        <button className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold text-lg rounded hover:bg-gray-200 transition transform active:scale-95">
                            <Play className="w-6 h-6 fill-black" /> Lecture
                        </button>

                        <button
                            onClick={handleListAction}
                            className={`p-3 border-2 rounded-full transition hover:border-white hover:text-white group relative
                                ${inList ? 'border-[#46d369] text-[#46d369]' : 'border-gray-400 text-gray-300'}`}
                            title={inList ? "Retirer de ma liste" : "Ajouter à ma liste"}
                        >
                            {inList ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />}
                        </button>

                        <button className="p-3 border-2 border-gray-400 rounded-full text-gray-300 hover:border-white hover:text-white transition">
                            <ThumbsUp className="w-6 h-6" />
                        </button>
                    </div>
                </div>


                {/* === ZONE 3: LES DÉTAILS (Grid) === */}
                <div className="px-8 pb-10 grid grid-cols-1 md:grid-cols-3 gap-10 bg-[#181818]">

                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-4 text-base font-bold">
                            <span className="text-[#46d369]">Recommandé à 98%</span>
                            <span className="text-gray-400">{movie?.release_date?.split('-')[0]}</span>
                            <span className="border border-gray-500 px-2 py-0.5 text-xs text-gray-300 rounded mx-2">HD</span>
                            {Number(movie?.vote_average) > 7.5 && (
                                <span className="text-xs border border-[#46d369] text-[#46d369] px-2 py-0.5 rounded">Top Rated</span>
                            )}
                        </div>

                        <p className="text-white text-lg leading-relaxed font-light">
                            {movie?.overview || "Aucune description disponible pour ce titre."}
                        </p>
                    </div>

                    <div className="text-sm space-y-5 text-gray-400">
                        <div>
                            <span className="block mb-1">Casting :</span>
                            <div className="text-white leading-snug">
                                {/* @ts-ignore */}
                                {movie?.credits?.cast?.slice(0, 5).map(actor => actor.name).join(', ')}
                                <span className="italic">...</span>
                            </div>
                        </div>
                        <div>
                            <span className="block mb-1">Genres :</span>
                            <div className="text-white leading-snug">
                                {movie?.genres?.map(g => g.name).join(', ')}
                            </div>
                        </div>
                        <div>
                            <span className="block mb-1">Note des utilisateurs :</span>
                            <span className="text-[#46d369] font-bold text-base">
                                {Number(movie?.vote_average).toFixed(1)} / 10
                            </span>
                        </div>
                    </div>

                    {/* --- SIMILAR MOVIES SECTION (Full Width below) --- */}
                    <div className="col-span-full pt-6 border-t border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-6">Titres similaires</h3>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                            {similarMovies.slice(0, 4).map(sim => (
                                <div key={sim.id} className="bg-[#2f2f2f] rounded-md overflow-hidden cursor-pointer hover:scale-105 transition duration-300 shadow-lg relative group">
                                    <div className="relative aspect-video">
                                        <img src={getImageUrl(sim.backdrop_path || sim.poster_path)} className="w-full h-full object-cover" />
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Play className="w-10 h-10 text-white fill-white opacity-80" />
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <p className="text-sm font-medium text-gray-200 truncate">{sim.title}</p>
                                        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                                            <span>{sim.release_date?.split('-')[0]}</span>
                                            <Plus className="w-4 h-4 hover:text-white transition" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}