import historyStore from "@/shared/stores/historyStore";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { Divider } from "primereact/divider";
import EmptyComic from "@/shared/components/EmptyComic";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import CardComicHistory from "@/shared/components/card/CardHistory";
import { THE_NUMBER_OF_COMICS_PER_PAGE } from "@/shared/settings/CommonConfig";

const HistoryPage = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const { oppositeTheme, theme } = useContext(ThemeContext);
  const [first, setFirst] = useState<number>(0);
  const [pageComics, setPageComics] = useState<Comic[]>([]);

  useEffect(() => {
    setComics(historyStore.getHistoryComics());
  }, []);

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
    <>
      <div className={`bg-${theme}`}>
        <div className={`border border-${oppositeTheme} mt-4 p-4`}>
          <div
            className={`text-${oppositeTheme} font-bold text-xl mobile:lg`}
            title={"Lịch sử đọc truyện"}
          >
            Lịch sử đọc truyện
          </div>
          <Divider />
          {comics.length === 0 ? (
            <EmptyComic />
          ) : (
            <div className="flex flex-col">
              <div className="grid grid-cols-6 gap-2 mobile:grid-cols-3">
                {pageComics.map((comic) => (
                  <CardComicHistory comic={comic} key={comic.id} />
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
      </div>
    </>
  );
};

export default HistoryPage;
