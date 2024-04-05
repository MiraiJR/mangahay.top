import { ChapterViewType } from "./enums/ChapterViewType";

type ChapterSetting = {
  type: ChapterViewType;
  amount: number;
};

type UserSetting = {
  chapterSetting: ChapterSetting;
};
