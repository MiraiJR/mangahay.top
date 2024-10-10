import { useEffect } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { originalURL } from "@/shared/libs/config";
import dynamic from "next/dynamic";
import MyLoading from "@/shared/components/MyLoading";
import { useIncreaseViewComic } from "@/shared/hooks/useIncreaseViewComic";
import { useGetComic } from "@/shared/hooks/useGetComic";
import { ListComment } from "@/shared/components/comments/ListComment";
import { useUpdateHistory } from "@/shared/hooks/useUpdateHistory";

interface itemProps {
  detailComic: Comic;
}

const DescriptionComic = dynamic(() => import("./DescriptionComic"), {
  loading: () => <MyLoading />,
});
const ListChapters = dynamic(() => import("./ListChapters"), {
  loading: () => <MyLoading />,
});
const ListComicsOfAuthor = dynamic(() => import("./ListComicsOfAuthor"), {
  loading: () => <MyLoading />,
});
const ListComicsRanking = dynamic(
  () => import("../home-page/ListComicsRanking"),
  {
    loading: () => <MyLoading />,
  }
);

const ComicPage = ({ detailComic }: itemProps) => {
  const { comic } = useGetComic(detailComic);
  const { increaseView } = useIncreaseViewComic(detailComic.id);

  const items: MenuItem[] = [
    { label: "Truyện" },
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
            <BreadCrumb model={items} home={home} />
          </div>
          {comic && (
            <DescriptionComic
              firstChapter={
                detailComic.chapters[detailComic.chapters.length - 1] ?? null
              }
              lastChapter={detailComic.chapters[0] ?? null}
              comic={comic}
            />
          )}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 mt-10 mobile:col-span-12">
              <ListChapters chapters={detailComic.chapters} />
            </div>
            <div className="col-span-4 mt-10 mobile:col-span-12">
              {comic && (
                <ListComicsOfAuthor
                  title={"Truyện cùng tác giả"}
                  author={comic?.authors[0]}
                />
              )}
            </div>
            <ListComment comic={comic} />
            <div className="col-span-4 mt-10 mobile:col-span-12">
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

export default ComicPage;
