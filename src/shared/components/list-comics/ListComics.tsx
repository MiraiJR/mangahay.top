import CardComic from "@/shared/components/card/CardComic";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { Divider } from "primereact/divider";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useEffect, useContext, useState } from "react";
import EmptyComic from "../EmptyComic";
import { THE_NUMBER_OF_COMICS_PER_PAGE } from "@/shared/settings/CommonConfig";

interface itemProps {
  comics: Comic[];
  title: string;
}

const ListComics = ({ comics, title }: itemProps) => {
  const [first, setFirst] = useState<number>(0);
  const [pageComics, setPageComics] = useState<Comic[]>([]);
  const { oppositeTheme } = useContext(ThemeContext);

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
    <div className={`border border-${oppositeTheme} mt-4 p-4`}>
      <div
        className={`text-${oppositeTheme} font-bold text-xl mobile:lg`}
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
