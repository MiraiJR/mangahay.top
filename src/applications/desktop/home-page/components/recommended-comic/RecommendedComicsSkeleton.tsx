import { globalStore } from "@/shared/stores/global-storage";
import { MAX_THE_NUMBER_OF_RECOMMENDED_COMICS } from "../../constant";
import { CardComicSkeleton } from "@/shared/components/card/CardComicSkeleton";
import { Skeleton } from "primereact/skeleton";
import { CardHighlightComicSkeleton } from "@/shared/components/card/CardHighlightComicSkeleton";

interface RecommendedComicsSkeletonProps {
  isShowHighlight: boolean;
  comicPerRow: number;
}

export const RecommendedComicsSkeleton = ({
  isShowHighlight,
  comicPerRow,
}: RecommendedComicsSkeletonProps) => {
  const { isMobile } = globalStore();
  const cardComicLength = isMobile
    ? isShowHighlight
      ? MAX_THE_NUMBER_OF_RECOMMENDED_COMICS - 3
      : MAX_THE_NUMBER_OF_RECOMMENDED_COMICS
    : MAX_THE_NUMBER_OF_RECOMMENDED_COMICS - 2;
  const cardComicElements = Array.from(
    { length: cardComicLength },
    (_, index) => index + 1
  );
  return (
    <div className="grid grid-cols-12 gap-2">
      {isShowHighlight && cardComicElements.length > 0 && (
        <div className="col-span-3 mobile:col-span-12">
          <CardHighlightComicSkeleton />
        </div>
      )}
      <div
        className={`col-span-${isShowHighlight ? 9 : 12} mobile:col-span-12`}
      >
        <div
          className={`grid grid-cols-${comicPerRow} mobile:grid-cols-3 gap-2`}
        >
          {cardComicElements.map((index) => (
            <CardComicSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
