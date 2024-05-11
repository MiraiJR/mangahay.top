import CardComic from "@/shared/components/card/CardComic";
import CardHighlightComic from "@/shared/components/card/CardHighlightComic";
import { ChevronsRight } from "lucide-react";
import themeStore from "@/shared/stores/themeStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import ComicService from "@/shared/services/comicService";
import EmptyComic from "@/shared/components/EmptyComic";
import { globalStore } from "@/shared/stores/globalStore";
import MyLoading from "@/shared/components/MyLoading";

const MAX_THE_NUMBER_OF_COMICS: number = 12;

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
  const [comics, setComics] = useState<Comic[]>([]);
  const { isMobile } = globalStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getComics = async () => {
      try {
        setIsLoading(true);
        const { data } = await ComicService.searchComics({
          filterGenres: [genre],
          page: 1,
          limit: MAX_THE_NUMBER_OF_COMICS,
        });

        setComics(data.comics);
      } catch (error: any) {
      } finally {
        setIsLoading(false);
      }
    };

    getComics();
  }, []);

  return (
    <div>
      <div className="border-s-4 border-orange-500 pl-4 my-4 flex justify-between items-center text-xl">
        <div
          className={`font-bold text-3xl mobile:text-xl text-${themeStore.getOppositeTheme()}`}
        >
          {title}
        </div>
        <Link
          rel="preload"
          className="flex items-center text-red-400"
          href={`/the-loai/${genre}`}
          hrefLang="vi"
        >
          <span className="text-sm not-italic">Xem thêm</span>
          <ChevronsRight size={20} />
        </Link>
      </div>
      {isLoading && <MyLoading />}
      {!isLoading && comics.length === 0 && <EmptyComic />}
      {!isLoading && comics.length > 0 && (
        <div className="grid grid-cols-12 gap-2">
          {isShowHighlight && (
            <div className="col-span-3 mobile:col-span-12">
              {comics.length !== 0 && <CardHighlightComic comic={comics[0]} />}
            </div>
          )}
          <div
            className={`col-span-${
              isShowHighlight ? 9 : 12
            } mobile:col-span-12`}
          >
            <div
              className={`grid grid-cols-${comicPerRow} mobile:grid-cols-3 gap-2 `}
            >
              {comics
                .slice(
                  isShowHighlight ? 1 : 0,
                  isMobile
                    ? isShowHighlight
                      ? MAX_THE_NUMBER_OF_COMICS - 2
                      : MAX_THE_NUMBER_OF_COMICS
                    : MAX_THE_NUMBER_OF_COMICS - 1
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
