import CardRanking from "@/shared/components/card/CardRanking";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { useGetRankingComics } from "@/shared/hooks/useGetRankingComics";
import { useContext } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { ListComicsRankingSkeleton } from "./ListComicsRankingSkeleton";
import { useTranslation } from "react-i18next";

interface ItemProps {
  title: string;
  field: string;
  amountComic: number;
}

const ListComicsRanking = ({ title, field, amountComic }: ItemProps) => {
  const { oppositeTheme } = useContext(ThemeContext);
  const { comics, isLoading } = useGetRankingComics(field, amountComic);
  const shouldShowSkeleton = isLoading || comics.length === 0;
  const { t } = useTranslation();

  return (
    <div>
      <div className="my-4 flex justify-between items-center text-xl">
        <div
          className={`font-bold text-2xl mobile:text-xl text-${oppositeTheme}`}
        >
          {title}
        </div>
        <Link
          rel="preload"
          className="flex items-center text-red-400"
          href={""}
          hrefLang="vi"
        >
          <span className="text-sm not-italic">
            {t("viewMore", { ns: "common" })}
          </span>
          <ChevronsRight size={20} />
        </Link>
      </div>

      {shouldShowSkeleton ? (
        <ListComicsRankingSkeleton />
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

export default ListComicsRanking;
