// src/features/movies/components/MovieCard.tsx

import { useState } from 'react';
import type {Movie} from '../../../types';
import { getImageUrl } from '../../../lib/api';
import { useModalStore } from '../../../store/modalStore';
import { useWatchlistStore} from "../../../store/watchListStore.ts";
import { Play, Plus, Check, ThumbsUp, ChevronDown } from 'lucide-react';
import * as React from "react"; // Icons

interface MovieCardProps {
    movie: Movie;
    isLarge?: boolean;
}

export const MovieCard = ({ movie, isLarge = false }: MovieCardProps) => {
    const openModal = useModalStore((state) => state.openModal);

    const watchlist = useWatchlistStore((state) => state.watchlist);
    const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);
    const removeFromWatchlist = useWatchlistStore((state) => state.removeFromWatchlist);

    const inList = watchlist.includes(movie.id);

    const [isHovered, setIsHovered] = useState(false);

    if ((isLarge && !movie.poster_path) || (!isLarge && !movie.backdrop_path)) return null;

    const handleWatchlistClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (inList) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie.id);
        }
    };

    return (
        <div
            className={`relative flex-none transition-all duration-300 ease-in-out cursor-pointer group/card z-0 hover:z-50 ${
                isLarge ? 'w-[160px]' : 'w-[240px]'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={getImageUrl(isLarge ? movie.poster_path : movie.backdrop_path || movie.poster_path)}
                alt={movie.title}
                className={`rounded-md object-cover w-full shadow-md transition-all duration-300 ${
                    isLarge ? 'h-[240px]' : 'h-[135px]'
                } ${isHovered ? 'rounded-b-none scale-110 shadow-xl ring-2 ring-white/20' : ''}`}
                loading="lazy"
                onClick={() => openModal(movie.id)}
            />

            {isHovered && !isLarge && (
                <div className="absolute top-full left-0 w-[110%] -ml-[5%] bg-[#181818] rounded-b-md shadow-2xl p-4 scale-110 z-50 animate-in fade-in duration-200">

                    <div className="flex items-center gap-2 mb-3">
                        <button
                            onClick={() => openModal(movie.id)}
                            className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                            <Play className="w-4 h-4 fill-black text-black pl-0.5" />
                        </button>

                        <button
                            onClick={handleWatchlistClick}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                                inList
                                    ? 'border-green-500 bg-black text-green-500 hover:bg-green-500 hover:text-white'
                                    : 'border-gray-400 hover:border-white text-gray-300 hover:text-white'
                            }`}
                        >
                            {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                        {/* --------------------------------- */}

                        <button className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center text-gray-300 hover:text-white ml-auto transition-colors">
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold">
                            <span className="text-[#46d369]">98% Match</span>
                            <span className="border border-gray-500 px-1 text-gray-400 uppercase">HD</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white">
                            <span className="truncate">{movie.genre_ids?.slice(0, 3).join(' • ')}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};