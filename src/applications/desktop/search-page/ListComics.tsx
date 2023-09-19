import EmptyImage from "@/shared/assets/empty.png";
import CardComic from "@/shared/components/card/CardComic";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import themeStore from "@/shared/stores/themeStore";
import { Divider } from "primereact/divider";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useEffect, useContext, useState } from "react";

interface itemProps {
  comics: Comic[];
  title: string;
}

const THE_NUMBER_OF_COMICS_PER_PAGE: number = 12;

const ListComics = ({ comics, title }: itemProps) => {
  const [first, setFirst] = useState<number>(0);
  const [pageComics, setPageComics] = useState<Comic[]>([]);
  const {} = useContext(ThemeContext);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setPageComics(
      comics.slice(event.first, event.first + THE_NUMBER_OF_COMICS_PER_PAGE)
    );
  };

  useEffect(() => {
    setPageComics(comics.slice(first, first + THE_NUMBER_OF_COMICS_PER_PAGE));
  }, [comics]);

  return (
    <div className={`border border-${themeStore.getOppositeTheme()} mt-4 p-4`}>
      <h1
        className={`text-${themeStore.getOppositeTheme()} font-bold text-xl mobile:lg`}
        title={title}
      >
        {title}
      </h1>
      <Divider />
      {comics.length === 0 ? (
        <div className="text-center flex flex-col items-center justify-center">
          <img className="w-[200px]" src={EmptyImage} alt="Không có truyện" />
          <span className={`text-${themeStore.getOppositeTheme()}`}>
            Không có truyện
          </span>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="grid grid-cols-6 gap-2 relative mobile:grid-cols-3">
            {pageComics.map((comic) => (
              <CardComic comic={comic} key={comic.id} />
            ))}
          </div>
          <div className="card mt-4 flex items-center justify-center w-[100%]">
            <Paginator
              first={first}
              rows={THE_NUMBER_OF_COMICS_PER_PAGE}
              totalRecords={comics.length}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListComics;
