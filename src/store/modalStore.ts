import { create } from 'zustand';

interface ModalState {
    isOpen: boolean;
    movieId: number | null;
    openModal: (movieId: number) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    movieId: null,
    openModal: (movieId) => set({ isOpen: true, movieId}),
    closeModal: () => set({ isOpen: false, movieId: null}),
}));