import axiosClient from "../libs/axiosClient";
import { ChapterViewType } from "../types/enums/ChapterViewType";
import { UserSetting } from "../types/UserSetting";

const PREFIX_API = "user-settings";

const UserSettingService = {
  update: (data: Update) =>
    axiosClient.put<UserSetting>(`/${PREFIX_API}`, data),
};

interface Update {
  chapter: {
    type: ChapterViewType;
    amount: number;
  };
  notification: {
    mention: boolean;
  };
}

export default UserSettingService;
