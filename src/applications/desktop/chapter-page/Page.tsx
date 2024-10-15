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

interface itemProps {
  detailComic: Comic;
  detailChapterA: DetailChapter;
}

const ChapterPage = ({ detailComic }: itemProps) => {
  const { comic } = useGetComic(detailComic);
  const { chapter } = useGetChapter();
  const { increaseView } = useIncreaseViewComic(detailComic.id);
  const items: MenuItem[] = [
    { label: "Truyện" },
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
            <BreadCrumb model={items} home={home} />
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
              className={`text-${theme} w-[100%] bg-${oppositeTheme} p-4 text-xl text-center`}
            >
              <div>Hết rồi</div>
              <h2>
                Nhớ theo dõi nhóm dịch:{" "}
                <strong className="text-red-600">
                  {comic.translators.join(", ")}
                </strong>{" "}
                để ủng hộ nhóm dịch nha.
              </h2>
            </div>
          </div>
          <NavigationChapter comicId={comic.id} slugComic={comic.slug} />
          <div className="retive grid grid-cols-12 gap-4">
            <ListComment comic={comic} />
            <div className="col-span-4 mt-10 mobile:col-span-12">
              {comic && (
                <ListComicsOfAuthor
                  title={"Truyện cùng tác giả"}
                  author={comic.authors[0]}
                />
              )}
              <ListComicsRanking
                title={"Manga mới nhất"}
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
