import comicService from "@/shared/services/comicService";
import { useContext, useEffect, useState } from "react";
import DescriptionComic from "./DescriptionComic";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { originalURL } from "@/shared/libs/config";
import ListChapters from "./ListChapters";
import ListComicsOfAuthor from "./ListComicsOfAuthor";
import ListComicsRanking from "../home-page/ListComicsRanking";
import ListComments from "./ListComments";
import { toast } from "react-toastify";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { globalStore } from "@/shared/stores/globalStore";
import historyStore from "@/shared/stores/historyStore";
import themeStore from "@/shared/stores/themeStore";
import { useRouter } from "next/router";
import { ThemeContext } from "@/shared/contexts/ThemeContext";

interface itemProps {
  detailComic: ComicDetail;
}

const ComicPage = ({ detailComic }: itemProps) => {
  const router = useRouter();
  const { slugComic } = router.query;
  const [comic, setComic] = useState<Comic>(detailComic.comic);
  const [comments, setComments] = useState<UserComment[]>(detailComic.comments);
  const [chapters, setChapters] = useState<Chapter[]>(detailComic.chapters);
  const [contentComment, setContentComment] = useState<string>("");
  const { isLogined } = globalStore();
  const items: MenuItem[] = [
    { label: "Truyện" },
    { label: comic?.name, url: `${originalURL}/truyen/${comic?.slug}` },
  ];
  const home: MenuItem = { icon: "pi pi-home", url: originalURL };
  const {} = useContext(ThemeContext);

  useEffect(() => {
    historyStore.setHistoryComics(detailComic.comic);

    const increaseView = async (comicId: number) => {
      try {
        await comicService.increaseField(comicId, "view", 1);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    increaseView(comic.id);
  }, [slugComic]);

  const handleCommentOnComic = async () => {
    if (!isLogined) {
      toast.warn("Bạn phải đăng nhập để thực hiện thao tác này!");
      return;
    }

    if (contentComment.trim() === "") {
      toast.warn("Vui lòng nhập nội dung bình luận!");
      return;
    }

    try {
      if (comic) {
        const { data } = await comicService.commentOnComic(
          comic.id,
          contentComment
        );

        setComments((pre) => [data, ...pre]);
        setContentComment("");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <BreadCrumb model={items} home={home} />
      </div>
      {comic && (
        <DescriptionComic
          firstChapter={chapters[chapters.length - 1] ?? null}
          lastChapter={chapters[0] ?? null}
          comic={comic}
          setComic={setComic}
        />
      )}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 mt-10 mobile:col-span-12">
          <ListChapters chapters={chapters} />
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
              <div
                className={`text-2xl mobile:text-xl text-${themeStore.getOppositeTheme()}`}
              >
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
            <div className="w-[100%]" onClick={handleCommentOnComic}>
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
