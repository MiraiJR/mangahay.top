import { userStore } from "@/shared/stores/user-storage";
import { ChapterViewType } from "@/shared/types/enums/ChapterViewType";
import ChapterViewTypeDefault from "./ChapterViewTypeDefault";
import { useEffect, useState } from "react";
import { UserSetting } from "@/shared/types/UserSetting";
import ChapterViewTypeSlide from "./ChapterViewTypeSlide";

interface itemProps {
  images: string[];
  chapterName: string;
  comicName: string;
}

const ChapterViewTypeIndex = ({
  images,
  chapterName,
  comicName,
}: itemProps) => {
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

  const renderChapterStyle = () => {
    switch (setting.chapterSetting.type) {
      case ChapterViewType.SLIDER_PER_VIEW:
        return (
          <ChapterViewTypeSlide
            images={images}
            chapterName={chapterName}
            comicName={comicName}
            sliderPerView={setting.chapterSetting.amount}
          />
        );
      default:
        return (
          <ChapterViewTypeDefault
            images={images}
            chapterName={chapterName}
            comicName={comicName}
          />
        );
    }
  };

  return renderChapterStyle();
};

export default ChapterViewTypeIndex;
