import { cn } from "@/shared/libs/utils";
import themeStore from "@/shared/stores/themeStore";

interface itemProps {
  comic: Comic;
  position: number;
  isRanking: boolean;
}
const CardRanking = ({ comic, position, isRanking }: itemProps) => {
  return (
    <div className="grid grid-cols-12 p-2 border-b-2">
      {isRanking && (
        <div
          className={cn(`col-span-1 p-2 bg-slate-600 w-fit h-fit text-white`, {
            "bg-red-600": position === 1,
            "bg-yellow-600": position === 2,
            "bg-orange-600": position === 3,
          })}
        >
          {position}
        </div>
      )}
      <div className="col-span-11 capitalize">
        <a rel="preload" href={`/truyen/${comic.slug}`} hrefLang="vi">
          <h2
            className={`font-bold line-clamp-1 text-${themeStore.getOppositeTheme()}`}
            title={comic.name}
          >
            {comic.name}
          </h2>
        </a>
        {comic.chapters.length === 0 ? (
          <span>Không có chương!</span>
        ) : (
          <a
            rel="preload"
            href={`/truyen/${comic.slug}/${comic.chapters[0].slug}`}
            hrefLang="vi"
          >
            <h2
              className={`font-light line-clamp-1 text-${themeStore.getOppositeTheme()}`}
              title={comic.chapters[0].name}
            >
              {comic.chapters[0].name}
            </h2>
          </a>
        )}
      </div>
    </div>
  );
};

export default CardRanking;
