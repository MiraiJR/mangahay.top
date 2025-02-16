import { useListComicsOfAuthor } from "@/shared/components/list/useListComicsOfAuthor";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../contexts/ThemeContext";
import CardRanking from "../card/CardRanking";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";

interface ListComicOfAuthorProps {
  title: string;
  author: string;
}

export const ListComicOfAuthor = ({
  title,
  author,
}: ListComicOfAuthorProps) => {
  const { oppositeTheme } = useThemeContext();
  const { comics } = useListComicsOfAuthor(author);
  const { t } = useTranslation();

  return (
    <div className="mobile:text-xs">
      <div className="my-4 flex justify-between items-center text-xl">
        <div
          className={`font-bold text-2xl mobile:text-sm text-${oppositeTheme}`}
          title={`truyện tác giả ${author}`}
        >
          {title}
        </div>
        <Link
          rel="preload"
          className="flex items-center text-red-400"
          href={`/tim-kiem?filterAuthor=${author}`}
          hrefLang="vi"
        >
          <span className="text-sm mobile:text-xs not-italic">
            {t("viewMore", { ns: "common" })}
          </span>
          <ChevronsRight size={20} />
        </Link>
      </div>
      <div>
        {comics.map((comic, _index) => (
          <CardRanking
            comic={comic}
            position={_index + 1}
            key={comic.id}
            isRanking={false}
          />
        ))}
      </div>
    </div>
  );
};
