import { create } from "zustand";
import { ChapterSetting } from "../types/UserSetting";

interface userStore {
  userProfile: User | null;
  setUserProfile: (data: User) => void;
  setUserChapterSetting: (data: ChapterSetting) => void;
}

export const userStore = create<userStore>((set) => ({
  userProfile: null,
  setUserProfile: (data) =>
    set((state) => ({
      ...state,
      userProfile: data,
    })),
  setUserChapterSetting: (data) =>
    set((state) => ({
      ...state,
      userProfile: {
        ...state.userProfile,
        setting: {
          ...state.userProfile?.setting,
          chapterSetting: data,
        },
      } as User,
    })),
}));
