import CardComic from "@/shared/components/card/CardComic";
import EmptyComic from "@/shared/components/EmptyComic";
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
      <div
        className={`text-${themeStore.getOppositeTheme()} font-bold text-xl mobile:lg`}
        title={title}
      >
        {title}
      </div>
      <Divider />
      {comics.length === 0 ? (
        <EmptyComic />
      ) : (
        <div className="flex flex-col">
          <div className="grid grid-cols-6 gap-2 mobile:grid-cols-3">
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
