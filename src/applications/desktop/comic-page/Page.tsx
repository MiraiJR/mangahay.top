import comicService from "@/shared/services/comicService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DescriptionComic from "./DescriptionComic";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { originalURL } from "@/shared/libs/config";
import ListChapters from "./ListChapters";
import { Helmet } from "react-helmet";
import ListComicsOfAuthor from "./ListComicsOfAuthor";
import ListComicsRanking from "../home-page/ListComicsRanking";
import ListComments from "./ListComments";
import { toast } from "react-toastify";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { globalState } from "@/shared/stores/globalStore";
import historyStore from "@/shared/stores/historyStore";
import themeStore from "@/shared/stores/themeStore";

const ComicPage = () => {
  const { slugComic } = useParams();
  const [comic, setComic] = useState<Comic | null>(null);
  const [comments, setComments] = useState<UserComment[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [contentComment, setContentComment] = useState<string>("");
  const { isLogined } = globalState();
  const items: MenuItem[] = [
    { label: "Truyện" },
    { label: comic?.name, url: `${originalURL}/truyen/${comic?.slug}` },
  ];
  const home: MenuItem = { icon: "pi pi-home", url: originalURL };

  useEffect(() => {
    const increaseView = async (comicId: number) => {
      try {
        await comicService.increaseField(comicId, "view", 1);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    const getComic = async () => {
      if (!slugComic) return;
      try {
        const { data } = await comicService.getComicBySlug(slugComic);
        setComic({
          ...data.comic,
          view: data.comic.view + 1,
        });

        historyStore.setHistoryComics(data.comic);
        setComments(data.comments);
        setChapters(data.chapters);
        await increaseView(data.comic.id);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getComic();
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>{comic?.name}</title>
        <meta name="description" content={comic?.briefDescription} />
        <meta
          name="keywords"
          content={`${comic?.name} ${comic?.briefDescription} ${comic?.authors.join(
            " "
          )} ${comic?.genres.join(" ")}`}
        />
        <meta property="og:title" content={comic?.name} />
        <meta property="og:type" content="website"></meta>
      </Helmet>
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
              <h1
                className={`text-2xl mobile:text-xl text-${themeStore.getOppositeTheme()}`}
              >
                Danh sách bình luận ({comments.length})
              </h1>
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
          <ListComicsRanking title={"Manga mới nhất"} field={"createdAt"} />
        </div>
      </div>
    </div>
  );
};

export default ComicPage;
