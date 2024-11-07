import { create } from "zustand";

interface globalStore {
  isLight: boolean;
  setIsLight: (data: boolean) => void;
  genres: Genre[];
  setGenres: (data: Genre[]) => void;
  isMobile: boolean;
  setIsMobile: (data: boolean) => void;
}

export const globalStore = create<globalStore>((set) => ({
  isLight: true,
  setIsLight: (data) => {
    set((state) => ({
      ...state,
      isLight: data,
    }));
  },
  genres: [],
  setGenres: (data) => {
    set((state) => ({
      ...state,
      genres: data,
    }));
  },
  isMobile: false,
  setIsMobile: (data) => {
    set((state) => ({
      ...state,
      isMobile: data,
    }));
  },
}));
