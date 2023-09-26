import themeStore from "@/shared/stores/themeStore";
import Image from "next/image";
import { Rating } from "primereact/rating";
import Link from "next/link";

interface itemProps {
  comic: Comic;
}

const CardHighlightComic = ({ comic }: itemProps) => {
  return (
    <div
      className={`bg-${themeStore.getOppositeTheme()} p-6 text-${themeStore.getTheme()} text-sm flex flex-col gap-2`}
    >
      <Link
        rel="preload"
        href={`/truyen/${comic.slug}`}
        lang="vi"
        className="flex items-center justify-center"
      >
        <Image
          width={0}
          height={0}
          className="mobile:w-[150px] w-[100%]"
          src={comic.thumb}
          alt={comic.name}
        />
      </Link>
      <Link rel="preload" href={`/truyen/${comic.slug}`} lang="vi">
        <h2
          className="text-center capitalize font-bold text-xl mobile:text-sm"
          title={comic.name}
        >
          {comic.name}
        </h2>
      </Link>
      <div className="flex justify-between">
        <Rating value={comic.star} cancel={false} readOnly />
        <span>{comic.star}</span>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {comic.genres.map((genre, _index) => (
          <Link
            rel="preload"
            href={""}
            className="flex flex-wrap m-1"
            key={_index}
            lang="vi"
          >
            <span
              className="p-1 bg-white text-black rounded-md capitalize"
              title={genre}
            >
              {genre}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap">
        <h2>Tác giả:</h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {comic.authors.map((author, _index) => (
            <Link
              key={_index}
              href={`/tim-kiem?filterAuthor=${author}`}
              className={`bg-${themeStore.getTheme()} rounded-md border border-${
                themeStore.getOppositeTheme
              } px-1 capitalize text-${themeStore.getOppositeTheme()}`}
              rel="preload"
            >
              <h2 title={author}>{author}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h2>Mô tả:</h2>
        <h2
          className="line-clamp-4"
          title={comic.briefDescription}
          dangerouslySetInnerHTML={{ __html: comic.briefDescription }}
        ></h2>
      </div>
    </div>
  );
};

export default CardHighlightComic;
