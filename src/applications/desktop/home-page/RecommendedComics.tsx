import CardComic from "@/shared/components/card/CardComic";
import CardHighlightComic from "@/shared/components/card/CardHighlightComic";
import comicService from "@/shared/services/comicService";
import { ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyImage from "@/shared/assets/empty.png";
import themeStore from "@/shared/stores/themeStore";
import { toast } from "react-toastify";

interface itemProps {
  genre: string;
  title: string;
}

const RecommendedComics = ({ genre, title }: itemProps) => {
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    const getComics = async () => {
      try {
        const { data } = await comicService.searchComics({
          filterGenres: [genre],
          page: 1,
          limit: 11,
        });

        setComics(data.comics);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getComics();
  }, []);

  return (
    <div>
      <div className="border-s-4 border-orange-500 pl-4 my-4 flex justify-between items-center text-xl">
        <h1
          className={`font-bold text-3xl mobile:text-xl text-${themeStore.getOppositeTheme()}`}
        >
          {title}
        </h1>
        <Link className="flex items-center text-red-400" to={""}>
          <span className="text-sm not-italic">Xem thêm</span>
          <ChevronsRight size={20} />
        </Link>
      </div>
      {comics.length === 0 ? (
        <div className="text-center flex flex-col items-center justify-center">
          <img width={200} src={EmptyImage} alt="Không có truyện" />
          <span>Không có truyện</span>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3 mobile:col-span-12">
            {comics.length !== 0 && <CardHighlightComic comic={comics[0]} />}
          </div>
          <div className="col-span-9 mobile:col-span-12">
            <div className="grid grid-cols-5 mobile:grid-cols-4 grid-rows-2 gap-2">
              {comics.slice(1).map((comic) => (
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
