import Image from "next/image";
import Link from "next/link";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Rate, Tag } from "antd";
import { roundUpToNearestHalf } from "@/shared/helpers/helpers";

interface CardHighlightComicProps {
  comic: Comic;
}

const CardHighlightComic = ({ comic }: CardHighlightComicProps) => {
  const { theme, oppositeTheme } = useThemeContext();

  return (
    <div
      className={`bg-${theme} p-6 text-${oppositeTheme} text-sm flex flex-col gap-2 border-${oppositeTheme} border-2 rounded-sm mobile:text-xs`}
    >
      <Link
        href={`/truyen/${comic.slug}`}
        className="flex items-center justify-center"
        prefetch={false}
      >
        <Image
          loading="lazy"
          width={0}
          height={0}
          className="mobile:w-[150px] w-[100%]"
          src={comic.thumb}
          alt={comic.name}
        />
      </Link>
      <Link href={`/truyen/${comic.slug}`} prefetch={false}>
        <h2
          className="text-center capitalize font-bold text-xl mobile:text-sm"
          title={comic.name}
        >
          {comic.name}
        </h2>
      </Link>
      <div className="flex justify-between">
        <Rate allowHalf disabled value={roundUpToNearestHalf(comic.star)} />
        <span>{comic.star}</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {comic.genres.map((genre, index) => (
          <Link
            href={`/tim-kiem?filterGenres=${genre}`}
            key={index}
            prefetch={false}
          >
            <Tag color="magenta">{genre}</Tag>
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
              prefetch={false}
            >
              <Tag color="magenta">{author}</Tag>
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
