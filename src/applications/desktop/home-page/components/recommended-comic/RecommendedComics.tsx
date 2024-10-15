import CardComic from "@/shared/components/card/CardComic";
import CardHighlightComic from "@/shared/components/card/CardHighlightComic";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { globalStore } from "@/shared/stores/global-storage";
import { useSearchComic } from "@/shared/hooks/useSearchComic";
import { MAX_THE_NUMBER_OF_RECOMMENDED_COMICS } from "../../constant";
import { useContext } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { RecommendedComicsSkeleton } from "./RecommendedComicsSkeleton";
import { useTranslation } from "react-i18next";

interface itemProps {
  genre: string;
  title: string;
  isShowHighlight?: boolean;
  comicPerRow?: number;
}

const RecommendedComics = ({
  genre,
  title,
  isShowHighlight = true,
  comicPerRow = 5,
}: itemProps) => {
  const { oppositeTheme } = useContext(ThemeContext);
  const { isMobile } = globalStore();
  const { comics, isLoading } = useSearchComic({
    filterGenres: [genre],
    page: 1,
    limit: MAX_THE_NUMBER_OF_RECOMMENDED_COMICS,
  });
  const { t } = useTranslation();

  return (
    <div>
      <div className="border-s-4 border-orange-500 pl-4 my-4 flex justify-between items-center text-xl">
        <div
          className={`font-bold text-3xl mobile:text-xl text-${oppositeTheme}`}
        >
          {title}
        </div>
        <Link
          rel="preload"
          className="flex items-center text-red-400"
          href={`/the-loai/${genre}`}
          hrefLang="vi"
        >
          <span className="text-sm not-italic">
            {t("viewMore", { ns: "common" })}
          </span>
          <ChevronsRight size={20} />
        </Link>
      </div>
      {isLoading ? (
        <RecommendedComicsSkeleton
          isShowHighlight={isShowHighlight}
          comicPerRow={comicPerRow}
        />
      ) : comics.length === 0 ? (
        <RecommendedComicsSkeleton
          isShowHighlight={isShowHighlight}
          comicPerRow={comicPerRow}
        />
      ) : (
        <div className="grid grid-cols-12 gap-2">
          {isShowHighlight && comics.length > 0 && (
            <div className="col-span-3 mobile:col-span-12">
              <CardHighlightComic comic={comics[0]} />
            </div>
          )}
          <div
            className={`col-span-${
              isShowHighlight ? 9 : 12
            } mobile:col-span-12`}
          >
            <div
              className={`grid grid-cols-${comicPerRow} mobile:grid-cols-3 gap-2`}
            >
              {comics
                .slice(
                  isShowHighlight ? 1 : 0,
                  isMobile
                    ? isShowHighlight
                      ? MAX_THE_NUMBER_OF_RECOMMENDED_COMICS - 2
                      : MAX_THE_NUMBER_OF_RECOMMENDED_COMICS
                    : MAX_THE_NUMBER_OF_RECOMMENDED_COMICS - 1
                )
                .map((comic) => (
                  <CardComic comic={comic} key={comic.id} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RecommendedComics;
