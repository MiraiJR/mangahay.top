import CardRanking from "@/shared/components/card/CardRanking";
import { ChevronsRight } from "lucide-react";
import themeStore from "@/shared/stores/themeStore";
import Link from "next/link";
import MyLoading from "@/shared/components/MyLoading";
import EmptyComic from "@/shared/components/EmptyComic";
import { useGetRankingComics } from "@/shared/hooks/useGetRankingComics";

interface itemProps {
  title: string;
  field: string;
  amountComic: number;
}

const ListComicsRanking = ({ title, field, amountComic }: itemProps) => {
  const { comics, isLoading } = useGetRankingComics(field, amountComic);

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
      {isLoading && <MyLoading />}
      {!isLoading && comics.length === 0 && <EmptyComic />}
      {!isLoading && comics.length > 0 && (
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
