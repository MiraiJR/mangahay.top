import { create } from "zustand";

interface userStore {
  userProfile: User | null;
  setUserProfile: (data: User) => void;
}

export const userStore = create<userStore>((set) => ({
  userProfile: null,
  setUserProfile: (data) =>
    set((state) => ({
      ...state,
      userProfile: data,
    })),
}));
