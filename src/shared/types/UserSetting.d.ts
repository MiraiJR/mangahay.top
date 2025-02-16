import { ChapterViewType } from "./enums/ChapterViewType";

type ChapterSetting = {
  type: ChapterViewType;
  amount: number;
};

type UserSetting = {
  chapter: ChapterSetting;
  notification: NotificationSetting;
};

type NotificationSetting = {
  mention: boolean;
};
