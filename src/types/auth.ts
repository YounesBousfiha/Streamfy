export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
    createdAt: string;
}

export interface WatchlistItem {
    movieId: number;
    addedAt: string;
}

export interface WatchHistoryItem {
    movieId: number;
    watchedAt: string;
    progress: number;
    completed: boolean;
}

export interface  UserData extends User {
    watchlist: WatchlistItem[];
    history: WatchHistoryItem[];
}