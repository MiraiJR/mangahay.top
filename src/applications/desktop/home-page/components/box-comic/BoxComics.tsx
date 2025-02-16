import CardComic from "@/shared/components/card/CardComic";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { globalStore } from "@/shared/stores/global-storage";
import { useGetRankingComics } from "@/shared/hooks/useGetRankingComics";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { MAX_THE_NUMBER_OF_COMICS_RANK } from "../../constant";
import { BoxComicsSkeleton } from "./BoxComicsSkeleton";
import { useTranslation } from "react-i18next";

interface ItemProps {
  title: string;
  field: string;
}

const BoxComics = ({ title, field }: ItemProps) => {
  const { comics, isLoading } = useGetRankingComics(
    field,
    MAX_THE_NUMBER_OF_COMICS_RANK
  );
  const { isMobile } = globalStore();
  const { oppositeTheme } = useThemeContext();
  const shouldShowSkeleton = isLoading || comics.length === 0;
  const displayedComics = comics.slice(
    0,
    isMobile ? MAX_THE_NUMBER_OF_COMICS_RANK : MAX_THE_NUMBER_OF_COMICS_RANK - 1
  );
  const { t } = useTranslation();

  return (
    <div className="mb-20 mobile:text-xs">
      <div className="border-s-4 border-orange-500 my-4 flex justify-between items-center text-xl pl-2">
        <div
          className={`text-${oppositeTheme} font-bold text-3xl mobile:text-sm`}
        >
          {title}
        </div>
        <Link
          className="flex items-center text-red-400"
          href={`/tim-kiem?filterSort=updatedAt`}
        >
          <span className="text-sm mobile:text-xs not-italic">
            {t("viewMore", { ns: "common" })}
          </span>
          <ChevronsRight size={20} />
        </Link>
      </div>

      {shouldShowSkeleton ? (
        <BoxComicsSkeleton />
      ) : (
        <div className="grid grid-cols-5 mobile:grid-cols-3 gap-5 mobile:gap-1">
          {displayedComics.map((comic) => (
            <CardComic comic={comic} key={comic.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoxComics;
