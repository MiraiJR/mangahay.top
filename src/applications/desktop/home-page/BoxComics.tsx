import CardComic from "@/shared/components/card/CardComic";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import EmptyComic from "@/shared/components/EmptyComic";
import { globalStore } from "@/shared/stores/globalStore";
import MyLoading from "@/shared/components/MyLoading";
import { useGetRankingComics } from "@/shared/hooks/useGetRankingComics";
import { useContext } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";

interface itemProps {
  title: string;
  field: string;
}

const MAX_THE_NUMBER_OF_COMICS: number = 6;

const BoxComics = ({ title, field }: itemProps) => {
  const { comics, isLoading } = useGetRankingComics(
    field,
    MAX_THE_NUMBER_OF_COMICS
  );
  const { isMobile } = globalStore();
  const { oppositeTheme } = useContext(ThemeContext);

  return (
    <>
      <div className="mb-20">
        <div className="border-s-4 border-orange-500 my-4 flex justify-between items-center text-xl pl-4">
          <div
            className={`text-${oppositeTheme} font-bold text-3xl mobile:text-xl`}
          >
            {title}
          </div>
          <Link
            rel="preload"
            className="flex items-center text-red-400"
            href={`/danh-sach-truyen?field=${field}`}
            hrefLang="vi"
          >
            <span className="text-sm mobile:text-xs not-italic">Xem thêm</span>
            <ChevronsRight size={20} />
          </Link>
        </div>
        {isLoading && <MyLoading />}
        {!isLoading && comics.length === 0 && <EmptyComic />}
        {!isLoading &&
          comics.length > 0 &&
          (comics.length === 0 ? (
            <EmptyComic />
          ) : (
            <div className="grid grid-cols-5 mobile:grid-cols-3 gap-5 mobile:gap-1">
              {comics
                .slice(
                  0,
                  isMobile
                    ? MAX_THE_NUMBER_OF_COMICS
                    : MAX_THE_NUMBER_OF_COMICS - 1
                )
                .map((comic) => (
                  <CardComic comic={comic} key={comic.id} />
                ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default BoxComics;
