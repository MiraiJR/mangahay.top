import { reduceQualityImage } from "@/shared/helpers/helpers";
import Image from "next/image";
import Link from "next/link";

interface itemProps {
  comic: Comic;
}

const CardSearchingComic = ({ comic }: itemProps) => {
  return (
    <div className="grid grid-cols-12 gap-2 mb-2">
      <Link
        rel="preload"
        className="col-span-3 max-h-[100px]"
        hrefLang="vi"
        href={`/truyen/${comic.slug}`}
      >
        <Image
          width={0}
          height={0}
          src={reduceQualityImage(comic.thumb)}
          alt={comic.name}
          className="w-[100%]"
        />
      </Link>
      <div className="col-span-9 flex flex-col">
        <Link rel="preload" hrefLang="vi" href={`/truyen/${comic.slug}`}>
          <h1
            className="line-clamp-2 text-left capitalize font-bold"
            title={comic.name}
          >
            {comic.name}
          </h1>
        </Link>
        <Link
          rel="preload"
          hrefLang="vi"
          href={`/truyen/${comic.slug}/${comic.newestChapter?.slug}`}
        >
          <h2 className="text-left font-thin capitalize">
            {comic.newestChapter?.name}
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default CardSearchingComic;
