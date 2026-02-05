import {useEffect, useState} from "react";
import type {Movie} from "../types";
import axiosClient from "../lib/axios.ts";
import {MovieCard} from "../features/movies/components/MovieCard.tsx";

interface CategoryPageProps {
    title: string;
    type: 'movie' | 'tv'
}

export const CategoryPage = ({ title, type}: CategoryPageProps) => {
    const [items, setItems ] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const endpoint = type === 'tv'
                    ? `/tv/popular?language=en-US&page=1`
                    : `/movie/popular?language=en-US&page=1`;

                const response = await axiosClient.get(endpoint);

                if(response.data && Array.isArray(response.data.results)) {
                    setItems(response.data.results);
                } else {
                    console.error("Error in Response Format: ", response.data);
                    setItems([]);
                }
            } catch (error) {
                console.error("Error fetching category:", error);
            } finally {
                setLoading(false)
            }
        };
        fetchData()
    }, [type]);

    return (
        <div className="pt-32 px-12 min-h-screen bg-[#141414] pb-20 text-white">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                {title} <span className="text-sm font-normal text-gray-400 mt-2">(Popular)</span>
            </h1>

            {loading ? (
                <div className="text-center mt-20">Chargement...</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {items.map((item) => (
                        <MovieCard
                            key={item.id}
                            movie={{
                                ...item,
                                title: (item as any).name || item.title, // Fix pour les séries
                                release_date: (item as any).first_air_date || item.release_date // Fix pour les dates
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}