import CardRanking from "@/shared/components/card/CardRanking";
import comicService from "@/shared/services/comicService";
import { ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyImage from "@/shared/assets/empty.png";
import themeStore from "@/shared/stores/themeStore";
import { toast } from "react-toastify";

interface itemProps {
  title: string;
  field: string;
}

const ListComicsRanking = ({ title, field }: itemProps) => {
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    const getComics = async () => {
      try {
        const { data } = await comicService.getRankingComics(field, 5);
        setComics(data);
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
        <div className="">
          {comics.map((comic, _index) => (
            <CardRanking
              comic={comic}
              position={_index + 1}
              key={comic.id}
              isRanking={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListComicsRanking;
