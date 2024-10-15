import { globalStore } from "@/shared/stores/global-storage";
import { MAX_THE_NUMBER_OF_COMICS_RANK } from "../../constant";
import { CardComicSkeleton } from "@/shared/components/card/CardComicSkeleton";

export const BoxComicsSkeleton = () => {
  const { isMobile } = globalStore();
  const length = isMobile
    ? MAX_THE_NUMBER_OF_COMICS_RANK
    : MAX_THE_NUMBER_OF_COMICS_RANK - 1;
  const elements = Array.from({ length }, (_, index) => index + 1);

  return (
    <div className="grid grid-cols-5 mobile:grid-cols-3 gap-5 mobile:gap-1">
      {elements.map((index) => (
        <CardComicSkeleton key={index} />
      ))}
    </div>
  );
};
