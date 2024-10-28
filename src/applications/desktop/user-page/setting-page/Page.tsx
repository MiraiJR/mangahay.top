import { userStore } from "@/shared/stores/user-storage";
import { UserSetting } from "@/shared/types/UserSetting";
import { ChapterViewType } from "@/shared/types/enums/ChapterViewType";
import { useEffect, useState } from "react";
import ChapterSettingComponent from "./ChapterSetting";

const UserSettingPage = () => {
  const { userProfile } = userStore();

  const [setting, setSetting] = useState<UserSetting>({
    chapterSetting: {
      type: ChapterViewType.DEFAULT,
      amount: 1,
    },
  });

  useEffect(() => {
    if (userProfile && userProfile.setting) {
      setSetting(userProfile.setting);
    }
  }, [userProfile]);

  return (
    <div>
      <div className="pt-4 text-center font-bold text-xl">Cài đặt</div>
      <div className="flex gap-2">
        <div className="border border-spacing-1 w-full rounded-lg p-5">
          <ChapterSettingComponent currentSetting={setting.chapterSetting} />
        </div>
      </div>
    </div>
  );
};

export default UserSettingPage;
