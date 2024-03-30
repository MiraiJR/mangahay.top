import CardComic from "@/shared/components/card/CardComic";
import comicService from "@/shared/services/comicService";
import { ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import EmptyImage from "@/shared/assets/empty.webp";
import themeStore from "@/shared/stores/themeStore";
import Image from "next/image";
import Link from "next/link";
import EmptyComic from "@/shared/components/EmptyComic";

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
      } catch (error: any) {}
    };

    getComics();
  }, []);

  return (
    <>
      {comics && (
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
              {comics.slice(0, 5).map((comic) => (
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
