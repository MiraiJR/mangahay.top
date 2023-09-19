import { ThemeContext } from "@/shared/contexts/ThemeContext";
import themeStore from "@/shared/stores/themeStore";
import { Rating } from "primereact/rating";
import { useContext } from "react";
import { Link } from "react-router-dom";

interface itemProps {
  comic: Comic;
}

const CardHighlightComic = ({ comic }: itemProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`bg-${themeStore.getOppositeTheme()} p-6 text-${theme} text-sm flex flex-col gap-2`}
    >
      <Link
        to={`/truyen/${comic.slug}`}
        lang="vi"
        className="flex items-center justify-center"
      >
        <img className="mobile:w-[150px]" src={comic.thumb} alt={comic.name} />
      </Link>
      <Link to={`/truyen/${comic.slug}`} lang="vi">
        <h1
          className="text-center capitalize font-bold text-xl mobile:text-sm"
          title={comic.name}
        >
          {comic.name}
        </h1>
      </Link>
      <div className="flex justify-between">
        <Rating value={comic.star} cancel={false} readOnly />
        <span>{comic.star}</span>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {comic.genres.map((genre, _index) => (
          <Link to={""} className="flex flex-wrap m-1" key={_index} lang="vi">
            <span className="p-1 bg-white text-black rounded-md" title={genre}>
              {genre}
            </span>
          </Link>
        ))}
      </div>
      <div>
        <h1>Tác giả:</h1>
        <div className="flex flex-wrap items-center justify-center">
          {comic.authors.map((author, _index) => (
            <Link to={""} key={_index} lang="vi">
              <span title={author}>{author}</span>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h1>Mô tả:</h1>
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
