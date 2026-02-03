import {useModalStore} from "../../../store/modalStore.ts";
import {useEffect, useState} from "react";
import { fetchMovieVideos } from '../../../lib/api';
import {X} from "lucide-react";

export const VideoModal = () => {
    const { isOpen, closeModal, movieId } = useModalStore();
    const [videoKey, setVideoKey] = useState<string | null>(null);

    useEffect(() => {
        if(movieId && isOpen) {
            fetchMovieVideos(movieId).then(setVideoKey)
        }
    }, [movieId, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
            <button
                onClick={closeModal}
                className="absolute top-8 right-8 p-2 text-white hover:text-red-500 transition-colors z-50"
            >
                <X className="w-10 h-10" />
            </button>

            <div className="w-full max-w-6xl aspect-video bg-black shadow-2xl rounded-xl overflow-hidden border border-white/10">
                {videoKey ? (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
                        title="Trailer"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div className="flex items-center justify-center h-full text-white">
                        <p className="text-2xl">No trailer available</p>
                    </div>
                )}
            </div>
        </div>
    );
}