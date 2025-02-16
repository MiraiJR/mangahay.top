import CardComic from "@/shared/components/card/CardComic";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Divider } from "primereact/divider";
import { useEffect, useState } from "react";
import EmptyComic from "../EmptyComic";
import { THE_NUMBER_OF_COMICS_PER_PAGE } from "@/shared/settings/CommonConfig";
import { Pagination, PaginationProps } from "antd";

interface itemProps {
  comics: Comic[];
  title: string;
}

export const ListComic = ({ comics, title }: itemProps) => {
  const [pageComics, setPageComics] = useState<Comic[]>([]);
  const { oppositeTheme } = useThemeContext();
  useEffect(() => {
    setPageComics(comics.slice(0, THE_NUMBER_OF_COMICS_PER_PAGE));
  }, [comics]);

  const pagingComic = (page: number) => {
    setPageComics(
      comics.slice(
        (page - 1) * THE_NUMBER_OF_COMICS_PER_PAGE,
        page * THE_NUMBER_OF_COMICS_PER_PAGE
      )
    );
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    pagingComic(page);
  };

  return (
    <div className={`border border-${oppositeTheme} mt-4 p-4 mobile:text-xs`}>
      <div
        className={`text-${oppositeTheme} font-bold text-xl mobile:text-sm`}
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
          <Pagination
            className="flex items-center"
            align="center"
            pageSize={THE_NUMBER_OF_COMICS_PER_PAGE}
            onChange={onChange}
            total={comics.length}
          />
        </div>
      )}
    </div>
  );
};
