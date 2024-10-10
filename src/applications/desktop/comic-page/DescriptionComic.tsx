import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { convertWebpResource } from "@/shared/helpers/helpers";
import { useRouter } from "next/router";
import { ComicInteraction } from "./ComicIntertion";

interface itemProps {
  comic: Comic;
  firstChapter: Chapter | null;
  lastChapter: Chapter | null;
}

const DescriptionComic = ({ comic, firstChapter, lastChapter }: itemProps) => {
  const { theme, oppositeTheme } = useContext(ThemeContext);
  const router = useRouter();
  const { slugChapter } = router.query;

  return (
    <div className={`grid grid-cols-12 gap-2 text-${oppositeTheme}`}>
      <Image
        priority
        width={0}
        height={0}
        className="col-span-3 shadow-lg p-5 mobile:col-span-12 w-[100%] max-h-[800px] object-cover object-top"
        src={convertWebpResource(comic.thumb)}
        alt={comic.name}
      />
      <div className="col-span-7 flex flex-col gap-4 mobile:col-span-12 mobile:mx-4">
        <div className="mobile:flex mobile:flex-col gap-2">
          <h1 className="font-bold text-2xl" title={comic.name}>
            <span>{comic.name}</span>
          </h1>
          <span
            className="text-sm font-thin text-yellow-500 ml-1"
            title={comic.state}
          >
            {comic.state}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 items-center mobile:flex-col mobile:items-start">
          <h2 className="font-bold">Tên khác:</h2>
          <span>{comic.anotherName}</span>
        </div>
        <div className="flex gap-2 items-center mobile:flex-col mobile:items-start">
          <h2 className="font-bold">Tác giả:</h2>
          <ul className="flex ">
            {comic.authors.map((author, _index) => (
              <Link
                key={_index}
                href={`/tim-kiem?filterAuthor=${author}`}
                className={`bg-${theme} rounded-md border border-${oppositeTheme} px-1 capitalize`}
                rel="preload"
              >
                <h2 title={author}>{author}</h2>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 items-center mobile:flex-col mobile:items-start">
          <h2 className="font-bold">Nhóm dịch:</h2>
          <ul className="flex flex-wrap gap-2">
            {comic.translators.length === 0 ? (
              <div>Đang cập nhật</div>
            ) : (
              comic.translators.map((translator, _index) => (
                <Link
                  key={_index}
                  href={`/nhom-dich/${translator}`}
                  className={`font-bold bg-${theme} text-red-600 rounded-md border border-${oppositeTheme} px-1 capitalize`}
                  rel="preload"
                >
                  <h2 title={translator}>{translator}</h2>
                </Link>
              ))
            )}
          </ul>
        </div>
        <div className="flex gap-2 items-center mobile:flex-col mobile:items-start">
          <h2 className="font-bold">Thể loại:</h2>
          <ul className="flex gap-1 flex-wrap">
            {comic.genres.map((genre, _index) => (
              <Link
                key={_index}
                href={`/tim-kiem?filterGenres=${genre.toLocaleLowerCase()}`}
                rel="preload"
              >
                <h2
                  title={genre}
                  className={`bg-${theme} rounded-md border border-${oppositeTheme} px-1 capitalize`}
                >
                  {genre}
                </h2>
              </Link>
            ))}
          </ul>
        </div>
        <h2
          title={comic.briefDescription}
          dangerouslySetInnerHTML={{ __html: comic.briefDescription }}
        ></h2>
        {!slugChapter && (
          <div className="flex gap-2">
            <button
              className="btn-primary"
              onClick={() =>
                router.push(`/truyen/${comic.slug}/${firstChapter?.slug}`)
              }
            >
              Đọc ngay
            </button>
            <button
              className="btn-primary bg-green-600"
              onClick={() =>
                router.push(`/truyen/${comic.slug}/${lastChapter?.slug}`)
              }
            >
              Đọc chương mới nhất
            </button>
          </div>
        )}
      </div>

      {!slugChapter && <ComicInteraction comic={comic} />}
    </div>
  );
};

export default DescriptionComic;
