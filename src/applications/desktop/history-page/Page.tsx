import historyStore from "@/shared/stores/history-storage";
import { useState } from "react";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Divider } from "primereact/divider";
import EmptyComic from "@/shared/components/EmptyComic";
import CardComicHistory from "@/shared/components/card/CardHistory";
import { THE_NUMBER_OF_COMICS_PER_PAGE } from "@/shared/settings/CommonConfig";
import { useTranslation } from "react-i18next";
import { Pagination, PaginationProps } from "antd";

const HistoryPage = () => {
  const { t } = useTranslation();
  const { getHistoryComics } = historyStore;
  const comics = getHistoryComics() ?? [];
  const { oppositeTheme, theme } = useThemeContext();
  const [pageComics, setPageComics] = useState<Comic[]>(
    comics.slice(0, THE_NUMBER_OF_COMICS_PER_PAGE)
  );

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
    <div className={`bg-${theme} mobile:text-xs`}>
      <div className={`border border-${oppositeTheme} mt-4 p-4`}>
        <div
          className={`text-${oppositeTheme} font-bold text-xl mobile:text-sm`}
          title={"Lịch sử đọc truyện"}
        >
          {t("historyReadComic", { ns: "common" })}
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
            <Pagination
              align="center"
              pageSize={THE_NUMBER_OF_COMICS_PER_PAGE}
              onChange={onChange}
              total={comics.length}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
