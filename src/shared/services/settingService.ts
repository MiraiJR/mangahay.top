import axiosClient from "../libs/axiosClient";
import { ChapterSetting } from "../types/UserSetting";

const PREFIX_API = "user-settings";

const UserSettingService = {
  updateChapterSetting: (data: ChapterSetting) =>
    axiosClient.patch<ChapterSetting>(`/${PREFIX_API}/chapter`, data),
};

export default UserSettingService;
