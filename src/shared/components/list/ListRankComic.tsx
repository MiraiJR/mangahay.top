import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useGetRankingComics } from "@/shared/hooks/useGetRankingComics";
import { ChevronsRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import CardRanking from "../card/CardRanking";
import Link from "next/link";
import { ListRankComicSkeleton } from "./ListRankComicSkeleton";

interface ListRankComicProps {
  title: string;
  field: string;
  amountComic: number;
}

export const ListRankComic = ({
  title,
  field,
  amountComic,
}: ListRankComicProps) => {
  const { oppositeTheme } = useThemeContext();
  const { comics, isLoading } = useGetRankingComics(field, amountComic);
  const shouldShowSkeleton = isLoading || comics.length === 0;
  const { t } = useTranslation();

  return (
    <div className="mobile:text-xs">
      <div className="my-4 flex justify-between items-center text-xl">
        <div
          className={`font-bold text-2xl mobile:text-sm text-${oppositeTheme}`}
        >
          {title}
        </div>
        <Link
          rel="preload"
          className="flex items-center text-red-400"
          href={`/tim-kiem?filterSort=${field}`}
          hrefLang="vi"
        >
          <span className="text-sm mobile:text-xs not-italic">
            {t("viewMore", { ns: "common" })}
          </span>
          <ChevronsRight size={20} />
        </Link>
      </div>

      {shouldShowSkeleton ? (
        <ListRankComicSkeleton />
      ) : (
        <div>
          {comics.map((comic, index) => (
            <CardRanking
              comic={comic}
              position={index + 1}
              key={`${comic.id}-${title}`}
              isRanking={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};
