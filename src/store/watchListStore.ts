import {create} from "zustand";
import {getCurrentSession, updateUser} from "../lib/storage.ts";
import type {UserData} from "../types";

interface WatchlistState {
    watchlist: number[];
    addToWatchlist: (movieId: number) => void;
    removeFromWatchlist: (movieId: number) => void;
    loadWatchlist: () => void;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
    watchlist: [],

    loadWatchlist: () => {
        const user = getCurrentSession();
        if(user && user.watchlist) {
            const ids = user.watchlist.map(item => item.movieId);
            set({ watchlist: ids})
        } else {
            set({ watchlist: []})
        }
    },
    addToWatchlist: (movieId: number) => {
        const user = getCurrentSession();
        if(!user) return;

        const currentList = get().watchlist;
        if(currentList.includes(movieId)) return;

        set({ watchlist: [...currentList, movieId]})

        const updatedUser: UserData = {
            ...user,
            watchlist: [
                ...user.watchlist,
                { movieId, addedAt: new Date().toISOString()}
            ]
        };
        updateUser(updatedUser);
    },
    removeFromWatchlist: (movieId: number) => {
        const user = getCurrentSession();
        if(!user) return;

        set({ watchlist: get().watchlist.filter(id => id !== movieId)})

        const updatedUser: UserData = {
            ...user,
            watchlist: user.watchlist.filter(item => item.movieId !== movieId)
        };
        updateUser(updatedUser);
    },
    isInWatchlist: (movieId: number) => {
        return get().watchlist.includes(movieId);
    }
}));