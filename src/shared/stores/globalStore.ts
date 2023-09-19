import { create } from "zustand";

interface GlobalState {
  isLogined: boolean;
  setIsLogined: (data: boolean) => void;
  isLight: boolean;
  setIsLight: (data: boolean) => void;
}

export const globalState = create<GlobalState>((set) => ({
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
