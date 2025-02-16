import Image from "next/image";
import Link from "next/link";

interface itemProps {
  comic: Comic;
}

const CardSearchingComic = ({ comic }: itemProps) => {
  return (
    <div className="grid grid-cols-12 gap-2 mb-2">
      <Link
        className="col-span-3 max-h-[100px]"
        href={`/truyen/${comic.slug}`}
        prefetch={false}
      >
        <Image
          width={0}
          height={0}
          src={comic.thumb}
          alt={comic.name}
          className="w-[100%]"
        />
      </Link>
      <div className="col-span-9 flex flex-col">
        <Link href={`/truyen/${comic.slug}`} prefetch={false}>
          <h1
            className="line-clamp-2 text-left capitalize font-bold"
            title={comic.name}
          >
            {comic.name}
          </h1>
        </Link>
        {comic.chapters.length > 0 && (
          <Link
            prefetch={false}
            href={`/truyen/${comic.slug}/${comic.chapters[0].slug}`}
          >
            <h2 className="text-left font-thin capitalize">
              {comic.chapters[0].name}
            </h2>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardSearchingComic;
