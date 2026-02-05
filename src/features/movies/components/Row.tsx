import {useEffect, useRef, useState} from "react";
import type {Movie} from "../../../types";
import {tmdb} from "../../../lib/api.ts";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {MovieCard} from "./MovieCard.tsx";

interface RowProps {
    title: string;
    fetchUrl: string;
    isLargeRow?: boolean;
}

export const Row = ({ title, fetchUrl, isLargeRow}: RowProps) => {
    const [ movies, setMovies ] = useState<Movie[]>([]);
    const rowRef = useRef<HTMLDivElement>(null);
    const [ isMoved, setIsMoved] = useState(false);


    useEffect(() => {
        async function fetchData() {
            const request = await tmdb.get(fetchUrl);
            setMovies(request.data.results);
        }
        fetchData();
    }, [fetchUrl])

    const handleClick = (direction: 'left' | 'right') => {
        setIsMoved(true);
        if(rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth'});
        }
    };

    return (
        <div className="space-y-2 my-8 pl-12 relative group/row">
            <h2 className="text-xl font-bold text-[#e5e5e5] hover:text-white cursor-pointer transition-colors inline-block mb-2">
                {title}
            </h2>

            <div className="relative group">
                {/* Left Arrow */}
                <div
                    className={`absolute top-0 bottom-0 left-0 bg-black/50 z-40 w-12 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-black/70 hover:scale-110 ${!isMoved && 'hidden'}`}
                    onClick={() => handleClick('left')}
                >
                    <ChevronLeft className="w-8 h-8 text-white" />
                </div>

                {/* The Row Container */}
                <div
                    ref={rowRef}
                    className="flex items-center gap-2 overflow-x-scroll scrollbar-hide scroll-smooth py-4 pr-12"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar
                >
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} isLarge={isLargeRow} />
                    ))}
                </div>

                {/* Right Arrow */}
                <div
                    className="absolute top-0 bottom-0 right-0 bg-black/50 z-40 w-12 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-black/70 hover:scale-110"
                    onClick={() => handleClick('right')}
                >
                    <ChevronRight className="w-8 h-8 text-white" />
                </div>
            </div>
        </div>
    );
}