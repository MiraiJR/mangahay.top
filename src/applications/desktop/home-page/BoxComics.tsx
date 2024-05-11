import CardComic from "@/shared/components/card/CardComic";
import comicService from "@/shared/services/comicService";
import { ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import themeStore from "@/shared/stores/themeStore";
import Link from "next/link";
import EmptyComic from "@/shared/components/EmptyComic";
import { globalStore } from "@/shared/stores/globalStore";
import MyLoading from "@/shared/components/MyLoading";

interface itemProps {
  title: string;
  field: string;
}

const MAX_THE_NUMBER_OF_COMICS: number = 6;

const BoxComics = ({ title, field }: itemProps) => {
  const [comics, setComics] = useState<Comic[]>([]);
  const { isMobile } = globalStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getComics = async () => {
      try {
        setIsLoading(true);
        const { data } = await comicService.getRankingComics(
          field,
          MAX_THE_NUMBER_OF_COMICS
        );

        setComics(data.comics);
      } catch (error: any) {
      } finally {
        setIsLoading(false);
      }
    };

    getComics();
  }, []);

  return (
    <>
      {isLoading && <MyLoading />}
      {!isLoading && comics.length === 0 && <EmptyComic />}
      {!isLoading && comics.length > 0 && (
        <div className="mb-20">
          <div className="border-s-4 border-orange-500 my-4 flex justify-between items-center text-xl pl-4">
            <div
              className={`text-${themeStore.getOppositeTheme()} font-bold text-3xl mobile:text-xl`}
            >
              {title}
            </div>
            <Link
              rel="preload"
              className="flex items-center text-red-400"
              href={`/danh-sach-truyen?field=${field}`}
              hrefLang="vi"
            >
              <span className="text-sm mobile:text-xs not-italic">
                Xem thêm
              </span>
              <ChevronsRight size={20} />
            </Link>
          </div>
          {comics.length === 0 ? (
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
          )}
        </div>
      )}
    </>
  );
};

export default BoxComics;
