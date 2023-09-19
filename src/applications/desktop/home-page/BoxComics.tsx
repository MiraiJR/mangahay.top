import CardComic from "@/shared/components/card/CardComic";
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

const BoxComics = ({ title, field }: itemProps) => {
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
    <div className="mb-20">
      <div className="border-s-4 border-orange-500 my-4 flex justify-between items-center text-xl pl-4">
        <h1
          className={`text-${themeStore.getOppositeTheme()} font-bold text-3xl mobile:text-xl`}
        >
          {title}
        </h1>
        <Link className="flex items-center text-red-400" to={""}>
          <span className="text-sm mobile:text-xs not-italic">Xem thêm</span>
          <ChevronsRight size={20} />
        </Link>
      </div>
      {comics.length === 0 ? (
        <div className="text-center flex flex-col items-center justify-center">
          <img width={200} src={EmptyImage} alt="Không có truyện" />
          <span>Không có truyện</span>
        </div>
      ) : (
        <div className="grid grid-cols-5 mobile:grid-cols-4 gap-5 mobile:gap-1">
          {comics.map((comic) => (
            <CardComic comic={comic} key={comic.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoxComics;
