import { ChapterViewType } from "@/shared/types/enums/ChapterViewType";
import { TypeDefault } from "./TypeDefault";
import { TypeSlide } from "./TypeSlide";
import { userStore } from "@/shared/stores/user-storage";

export const ChapterViewTypeIndex = () => {
  const { userProfile } = userStore();

  const renderChapterStyle = () => {
    switch (userProfile?.setting.chapter.type) {
      case ChapterViewType.SLIDER_PER_VIEW:
        return (
          <TypeSlide sliderPerView={userProfile?.setting.chapter.amount} />
        );
      default:
        return <TypeDefault />;
    }
  };

  return renderChapterStyle();
};
