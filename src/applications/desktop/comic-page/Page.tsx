import { useContext, useEffect, useState } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { originalURL } from "@/shared/libs/config";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import historyStore from "@/shared/stores/historyStore";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import dynamic from "next/dynamic";
import MyLoading from "@/shared/components/MyLoading";
import { useRouter } from "next/router";
import { useComment } from "@/shared/hooks/useComment";
import { useIncreaseViewComic } from "@/shared/hooks/useIncreaseViewComic";
import { useGetComic } from "./useGetComic";

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
const ListComments = dynamic(() => import("./ListComments"), {
  loading: () => <MyLoading />,
});
const ListComicsRanking = dynamic(
  () => import("../home-page/ListComicsRanking"),
  {
    loading: () => <MyLoading />,
  }
);

const ComicPage = ({ detailComic }: itemProps) => {
  const router = useRouter();
  const { slugComic } = router.query;
  if (!slugComic || typeof slugComic !== "string") {
    return null;
  }
  const { comic } = useGetComic(slugComic, detailComic);
  const [comments, setComments] = useState<UserComment[]>(detailComic.comments);
  const { contentComment, setContentComment, handleComment } = useComment(
    detailComic.id,
    setComments
  );
  const { increaseView } = useIncreaseViewComic(detailComic.id);

  const items: MenuItem[] = [
    { label: "Truyện" },
    { label: comic?.name, url: `${originalURL}/truyen/${comic?.slug}` },
  ];
  const home: MenuItem = { icon: "pi pi-home", url: originalURL };

  const { oppositeTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (comic) {
      historyStore.setHistoryComics({
        ...detailComic,
        chapters: [comic.chapters[comic.chapters.length - 1]],
      });
    }

    increaseView();
  }, [comic]);

  return (
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
        <div className="col-span-8 mt-10 mobile:col-span-12">
          <div className="mt-10">
            <div className="border-s-4 border-orange-500 pl-4 font-bold">
              <div className={`text-2xl mobile:text-xl text-${oppositeTheme}`}>
                Danh sách bình luận ({comments.length})
              </div>
            </div>
            <Editor
              value={contentComment}
              onTextChange={(e: EditorTextChangeEvent) => {
                if (e.htmlValue) {
                  setContentComment(e.htmlValue);
                }
              }}
              style={{ height: "100px" }}
              className="mt-10"
            />
            <div className="w-[100%]" onClick={() => handleComment()}>
              <button className="btn-primary w-fit mt-2 float-right">
                Bình luận
              </button>
            </div>
            <ListComments comments={comments} />
          </div>
        </div>
        <div className="col-span-4 mt-10 mobile:col-span-12">
          <ListComicsRanking
            title={"Manga mới nhất"}
            field={"createdAt"}
            amountComic={5}
          />
        </div>
      </div>
    </div>
  );
};

export default ComicPage;
