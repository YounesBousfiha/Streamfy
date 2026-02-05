import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {MovieDetails} from "../types";
import {searchMovies} from "../lib/api.ts";
import {MovieCard} from "../features/movies/components/MovieCard.tsx";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [ movies, setMovies ] = useState<MovieDetails[]>([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if(query) {
                setLoading(true);
                try {
                    const results = await searchMovies(query);
                    setMovies(results)
                } catch (error) {
                    console.error("Search error: ", error);
                } finally {
                    setLoading(false)
                }
            } else {
                setMovies([])
            }
        };

        const timeoutId = setTimeout(() => {
            fetchData();
        }, 500)

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div className="pt-32 px-12 min-h-screen bg-[#141414] pb-20 text-white">
            <div className="mb-8">
                <h1 className="text-2xl font-medium text-gray-400">
                    Résultats pour : <span className="text-white font-bold">"{query}"</span>
                </h1>
            </div>

            {loading ? (
                <div className="text-center mt-20">Recherche en cours...</div>
            ) : movies.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (

                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="text-center mt-20 text-gray-400">
                    <p>Aucun résultat trouvé pour "{query}".</p>
                    <p className="text-sm mt-2">Essayez avec un autre terme (ex: Avatar, Marvel...).</p>
                </div>
            )}
        </div>
    );
}