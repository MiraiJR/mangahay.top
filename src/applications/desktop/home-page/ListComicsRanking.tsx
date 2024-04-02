import CardRanking from "@/shared/components/card/CardRanking";
import comicService from "@/shared/services/comicService";
import { ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import EmptyImage from "@/shared/assets/empty.webp";
import themeStore from "@/shared/stores/themeStore";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

interface itemProps {
  title: string;
  field: string;
  amountComic: number;
}

const ListComicsRanking = ({ title, field, amountComic }: itemProps) => {
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    const getComics = async () => {
      try {
        const { data } = await comicService.getRankingComics(
          field,
          amountComic
        );

        setComics(data.comics);
      } catch (error: any) {}
    };

    getComics();
  }, []);
  return (
    <div>
      <div className="my-4 flex justify-between items-center text-xl">
        <div
          className={`font-bold text-2xl mobile:text-xl text-${themeStore.getOppositeTheme()}`}
        >
          {title}
        </div>
        <Link
          rel="preload"
          className="flex items-center text-red-400"
          href={""}
          hrefLang="vi"
        >
          <span className="text-sm not-italic">Xem thêm</span>
          <ChevronsRight size={20} />
        </Link>
      </div>
      {comics.length === 0 ? (
        <div className="text-center flex flex-col items-center justify-center">
          <Image priority width={200} src={EmptyImage} alt="Không có truyện" />
          <span>Không có truyện</span>
        </div>
      ) : (
        <div className="">
          {comics.map((comic, _index) => (
            <CardRanking
              comic={comic}
              position={_index + 1}
              key={comic.id + title}
              isRanking={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListComicsRanking;
