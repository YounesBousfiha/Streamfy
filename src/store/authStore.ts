import type {UserData} from "../types";
import {create} from "zustand/react";
import {clearSession, getCurrentSession, saveSession} from "../lib/storage.ts";

interface AuthState {
    user : UserData | null;
    isAuthenticated: boolean;
    login: (user: UserData) => void;
    logout: () => void;
    checkSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    login: (user) => {
        saveSession(user);
        set({ user, isAuthenticated: true})
    },
    logout: () => {
        clearSession();
        set({ user: null, isAuthenticated: false})
    },
    checkSession: () => {
        const user = getCurrentSession();
        if(user) {
            set({ user, isAuthenticated: true})
        }
    }
}));