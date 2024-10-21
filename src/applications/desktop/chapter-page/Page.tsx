import { originalURL } from "@/shared/libs/config";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { useContext, useEffect } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import ListComicsOfAuthor from "../comic-page/ListComicsOfAuthor";
import ListComicsRanking from "../home-page/components/comic-ranking/ListComicsRanking";
import EmptyComic from "@/shared/components/EmptyComic";
import ChapterViewTypeIndex from "./chapter-view-type/IndexComponent";
import { useGetComic } from "@/shared/hooks/useGetComic";
import { useGetChapter } from "@/shared/hooks/useGetChapter";
import { useIncreaseViewComic } from "@/shared/hooks/useIncreaseViewComic";
import { NavigationChapter } from "./NavigationChapter";
import { ListComment } from "@/shared/components/comments/ListComment";
import { useUpdateHistory } from "@/shared/hooks/useUpdateHistory";
import { useTranslation } from "react-i18next";

interface itemProps {
  detailComic: Comic;
  detailChapterA: DetailChapter;
}

const ChapterPage = ({ detailComic }: itemProps) => {
  const { t } = useTranslation();
  const { comic } = useGetComic(detailComic);
  const { chapter } = useGetChapter();
  const { increaseView } = useIncreaseViewComic(detailComic.id);
  const items: MenuItem[] = [
    { label: t("comic", { ns: "common" }) },
    { label: comic?.name, url: `${originalURL}/truyen/${comic?.slug}` },
    {
      label: chapter?.name,
      url: `${originalURL}/truyen/${comic?.slug}/${chapter?.slug}`,
    },
  ];
  const home: MenuItem = { icon: "pi pi-home", url: originalURL };
  const { theme, oppositeTheme } = useContext(ThemeContext);
  useUpdateHistory(comic, true, chapter);

  useEffect(() => {
    if (comic) {
      increaseView();
    }
  }, [comic]);

  return (
    <>
      {comic && chapter && (
        <div>
          <div className="mb-5">
            <BreadCrumb
              model={items}
              home={home}
              style={{
                backgroundColor: theme === "light" ? "white" : "black",
                border: `1px solid ${
                  oppositeTheme === "light" ? "white" : "black"
                }`,
              }}
            />
          </div>
          <NavigationChapter comicId={comic.id} slugComic={comic.slug} />
          <div
            className={`flex flex-col items-center justify-center m-5 bg-${theme}`}
          >
            {chapter && chapter.images ? (
              <ChapterViewTypeIndex
                images={chapter.images}
                chapterName={chapter.name}
                comicName={comic.name}
              />
            ) : (
              <EmptyComic content="Không có ảnh!" />
            )}

            <div
              className={`text-${oppositeTheme} w-[100%] bg-${theme} p-4 text-xl text-center border-${oppositeTheme} border-[1px]`}
            >
              <div>{t("endChapter", { ns: "chapter" })}</div>
              <h2>
                {t("recommendedFollowTranslator", {
                  ns: "chapter",
                  translator: comic.translators.join(", "),
                })}
              </h2>
            </div>
          </div>
          <NavigationChapter comicId={comic.id} slugComic={comic.slug} />
          <div className="retive grid grid-cols-12 gap-4">
            <ListComment comic={comic} />
            <div className="col-span-4 mt-10 mobile:col-span-12">
              {comic && (
                <ListComicsOfAuthor
                  title={t("comicWithTheSameAuthor", { ns: "common" })}
                  author={comic.authors[0]}
                />
              )}
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

export default ChapterPage;
