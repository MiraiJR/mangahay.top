import { useContext, useEffect } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { originalURL } from "@/shared/libs/config";
import { useIncreaseViewComic } from "@/shared/hooks/useIncreaseViewComic";
import { useGetComic } from "@/shared/hooks/useGetComic";
import { ListComment } from "@/shared/components/comments/ListComment";
import { useUpdateHistory } from "@/shared/hooks/useUpdateHistory";
import DescriptionComic from "./DescriptionComic";
import ListChapters from "./ListChapters";
import ListComicsOfAuthor from "./ListComicsOfAuthor";
import ListComicsRanking from "../home-page/components/comic-ranking/ListComicsRanking";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "@/shared/contexts/ThemeContext";

const ComicPage = () => {
  const { t } = useTranslation();
  const { comic } = useGetComic();
  const { increaseView } = useIncreaseViewComic(comic?.id);
  const { theme, oppositeTheme } = useContext(ThemeContext);

  const items: MenuItem[] = [
    { label: t("comic", { ns: "common" }) },
    { label: comic?.name, url: `${originalURL}/truyen/${comic?.slug}` },
  ];
  const home: MenuItem = { icon: "pi pi-home", url: originalURL };
  useUpdateHistory(comic);

  useEffect(() => {
    increaseView();
  }, [comic]);

  return (
    <>
      {comic && (
        <div>
          <div className="mb-5">
            <BreadCrumb
              style={{
                backgroundColor: theme === "light" ? "white" : "black",
                border: `1px solid ${
                  oppositeTheme === "light" ? "white" : "black"
                }`,
              }}
              model={items}
              home={home}
            />
          </div>
          {comic && (
            <DescriptionComic
              firstChapter={comic.chapters[comic.chapters.length - 1] ?? null}
              lastChapter={comic.chapters[0] ?? null}
              comic={comic}
            />
          )}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 mt-10 mobile:col-span-12">
              <ListChapters chapters={comic.chapters} />
            </div>
            <div className="col-span-4 mt-10 mobile:col-span-12">
              {comic && (
                <ListComicsOfAuthor
                  title={t("comicWithTheSameAuthor", { ns: "common" })}
                  author={comic?.authors[0]}
                />
              )}
            </div>
            <ListComment comic={comic} />
            <div className="col-span-4 mt-10 mobile:col-span-12">
              <ListComicsRanking
                title={t("newestMangaga", { ns: "common" })}
                field={"createdAt"}
                amountComic={5}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComicPage;
