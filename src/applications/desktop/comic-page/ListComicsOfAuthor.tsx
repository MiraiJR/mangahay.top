import CardRanking from "@/shared/components/card/CardRanking";
import { ChevronsRight } from "lucide-react";
import { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useListComicsOfAuthor } from "./useListComicsOfAuthor";
import { useTranslation } from "react-i18next";

interface itemProps {
  title: string;
  author: string;
}

const ListComicsOfAuthor = ({ title, author }: itemProps) => {
  const { oppositeTheme } = useContext(ThemeContext);
  const { comics } = useListComicsOfAuthor(author);
  const { t } = useTranslation();

  return (
    <div>
      <div className="my-4 flex justify-between items-center text-xl">
        <div
          className={`font-bold text-2xl mobile:text-xl text-${oppositeTheme}`}
          title={`truyện tác giả ${author}`}
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

export default ListComicsOfAuthor;
