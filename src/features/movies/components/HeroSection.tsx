import {useEffect, useState} from "react";
import type {Movie} from "../../../types";
import {useModalStore} from "../../../store/modalStore.ts";
import {getImageUrl, requests} from "../../../lib/api.ts";
import axiosClient from "../../../lib/axios.ts";
import {Button} from "../../../components/ui/Button.tsx";
import {Info, Play} from "lucide-react";

export const HeroSection = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const openModal = useModalStore((state) => state.openModal)

    useEffect(() => {
        async function fetchData() {
            const request = await axiosClient.get(requests.fetchTrending);
            if (request.data && request.data.results && request.data.results.length > 0) {
                const randomMovie = request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                    ];
                setMovie(randomMovie);
            } else {
                console.error("Aucun film trouvé ou problème API", request.data);
            }
            const randomMovie = request.data.results[
                Math.floor(Math.random() * request.data.results.length)
                ]

            setMovie(randomMovie);
        }
        fetchData();
    }, [])

    if (!movie) return <div className="h-[95vh] bg-[#141414] animate-pulse" />;

    const truncate = (str: string, n: number) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return (
        <header
            className="relative h-[95vh] text-white"
            style={{
                backgroundImage: `url("${getImageUrl(movie.backdrop_path, 'original')}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
            }}
        >
            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

            <div className="absolute top-[35%] left-12 max-w-xl space-y-5 z-10">
                <h1 className="text-6xl font-black drop-shadow-2xl font-display leading-none mb-4">
                    {movie.title || (movie as any).name}
                </h1>

                <div className="flex items-center gap-3 font-bold text-sm shadow-black drop-shadow-md">
                    <span className="text-[#46d369]">New Release</span>
                    <span className="border border-white/40 px-2 py-0.5 text-white/90 rounded-sm">HD</span>
                    <span className="text-gray-200">{movie.release_date?.split('-')[0]}</span>
                </div>

                <p className="text-lg text-white drop-shadow-md leading-relaxed line-clamp-3 text-shadow-lg">
                    {truncate(movie.overview, 200)}
                </p>

                <div className="flex gap-3 pt-4">
                    <Button
                        onClick={() => openModal(movie.id)}
                        className="bg-white text-black hover:bg-white/80 border-none px-8 py-3 text-lg font-bold gap-2 rounded w-auto flex items-center"
                    >
                        <Play className="w-6 h-6 fill-black" /> Play
                    </Button>
                    <Button
                        variant="ghost"
                        className="bg-[rgba(109,109,110,0.7)] text-white hover:bg-[rgba(109,109,110,0.4)] px-8 py-3 text-lg font-bold gap-2 rounded w-auto flex items-center backdrop-blur-sm"
                    >
                        <Info className="w-6 h-6" /> More Info
                    </Button>
                </div>
            </div>
        </header>
    );
}