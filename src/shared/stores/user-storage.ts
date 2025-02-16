import { create } from "zustand";
import { UserSetting } from "../types/UserSetting";

interface userStore {
  userProfile: User | null;
  setUserProfile: (data: User) => void;
  setUserSetting: (data: UserSetting) => void;
}

export const userStore = create<userStore>((set) => ({
  userProfile: null,
  setUserProfile: (data) =>
    set((state) => ({
      ...state,
      userProfile: data,
    })),
  setUserSetting: (data) =>
    set((state) => ({
      ...state,
      userProfile: {
        ...state.userProfile,
        setting: {
          ...state.userProfile?.setting,
          ...data,
        },
      } as User,
    })),
}));
