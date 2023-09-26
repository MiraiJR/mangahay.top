import { create } from "zustand";

interface globalStore {
  isLogined: boolean;
  setIsLogined: (data: boolean) => void;
  isLight: boolean;
  setIsLight: (data: boolean) => void;
}

export const globalStore = create<globalStore>((set) => ({
  isLogined: false,
  setIsLogined: (data) =>
    set((state) => ({
      ...state,
      isLogined: data,
    })),
  isLight: true,
  setIsLight: (data) => {
    set((state) => ({
      ...state,
      isLight: data,
    }));
  },
}));
