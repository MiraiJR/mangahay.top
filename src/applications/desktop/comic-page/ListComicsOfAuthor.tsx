import CardRanking from "@/shared/components/card/CardRanking";
import comicService from "@/shared/services/comicService";
import themeStore from "@/shared/stores/themeStore";
import { ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface itemProps {
  title: string;
  author: string;
}

const ListComicsOfAuthor = ({ title, author }: itemProps) => {
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    const getComics = async () => {
      try {
        const { data } = await comicService.searchComics({
          filterAuthor: author,
          page: 1,
          limit: 5,
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
      <div className="my-4 flex justify-between items-center text-xl">
        <h1
          className={`font-bold text-2xl mobile:text-xl text-${themeStore.getOppositeTheme()}`}
          title={`truyện tác giả ${author}`}
        >
          {title}
        </h1>
        <Link className="flex items-center text-red-400" to={""}>
          <span className="text-sm not-italic">Xem thêm</span>
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
