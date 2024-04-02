import CardComic from "@/shared/components/card/CardComic";
import CardHighlightComic from "@/shared/components/card/CardHighlightComic";
import { ChevronsRight } from "lucide-react";
import themeStore from "@/shared/stores/themeStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import ComicService from "@/shared/services/comicService";
import EmptyComic from "@/shared/components/EmptyComic";

const MAX_THE_NUMBER_OF_COMICS: number = 11;

interface itemProps {
  genre: string;
  title: string;
}

const RecommendedComics = ({ genre, title }: itemProps) => {
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    const getComics = async () => {
      try {
        const { data } = await ComicService.searchComics({
          filterGenres: [genre],
          page: 1,
          limit: 11,
        });

        setComics(data.comics);
      } catch (error: any) {}
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
      {comics.length === 0 ? (
        <EmptyComic />
      ) : (
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3 mobile:col-span-12">
            {comics.length !== 0 && <CardHighlightComic comic={comics[0]} />}
          </div>
          <div className="col-span-9 mobile:col-span-12">
            <div className="grid grid-cols-5 mobile:grid-cols-3 grid-rows-2 gap-2">
              {comics.slice(1, MAX_THE_NUMBER_OF_COMICS).map((comic) => (
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
