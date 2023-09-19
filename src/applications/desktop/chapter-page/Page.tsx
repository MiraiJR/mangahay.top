import { extractIdFromSlugChapter } from "@/shared/helpers/helpers";
import { originalURL } from "@/shared/libs/config";
import comicService from "@/shared/services/comicService";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DescriptionComic from "../comic-page/DescriptionComic";
import { ArrowLeftCircle, ArrowRightCircle, MenuSquare } from "lucide-react";
import { cn } from "@/shared/libs/utils";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { globalState } from "@/shared/stores/globalStore";
import ListComments from "../comic-page/ListComments";
import ListComicsRanking from "../home-page/ListComicsRanking";
import ListComicsOfAuthor from "../comic-page/ListComicsOfAuthor";
import themeStore from "@/shared/stores/themeStore";
import MenuChapter from "./MenuChapter";

const ChapterPage = () => {
  const menuChapterRef = useRef<any>(null);
  const { slugComic } = useParams();
  const { slugChapter } = useParams<string>();
  const [comic, setComic] = useState<Comic | null>(null);
  const [contentComment, setContentComment] = useState<string>("");
  const [detailChapter, setDetailChapter] = useState<DetailChapter | null>(
    null
  );
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [comments, setComments] = useState<UserComment[]>([]);
  const [showMenuChapter, setShowMenuChapter] = useState<boolean>(false);
  const { isLogined } = globalState();
  const items: MenuItem[] = [
    { label: "Truyện" },
    { label: comic?.name, url: `${originalURL}/truyen/${comic?.slug}` },
    {
      label: detailChapter?.currentChapter.name,
      url: `${originalURL}/truyen/${comic?.slug}/${detailChapter?.currentChapter.slug}`,
    },
  ];
  const home: MenuItem = { icon: "pi pi-home", url: originalURL };

  useEffect(() => {}, [slugChapter]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        menuChapterRef.current &&
        !menuChapterRef.current.contains(event.target)
      ) {
        setShowMenuChapter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const increaseView = async (comicId: number) => {
      try {
        await comicService.increaseField(comicId, "view", 1);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    const getChapter = async (comicId: number, chapterId: number) => {
      try {
        const { data } = await comicService.getChapterOfComic(
          comicId,
          chapterId
        );

        setDetailChapter(data);
      } catch (error) {}
    };

    const getComic = async () => {
      if (!slugComic || !slugChapter) return;

      try {
        const { data } = await comicService.getComicBySlug(slugComic);
        setComic(data.comic);
        setComments(data.comments);
        setChapters(data.chapters);
        await Promise.all([
          increaseView(data.comic.id),
          getChapter(data.comic.id, extractIdFromSlugChapter(slugChapter)),
        ]);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getComic();
  }, [navigate]);

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
        <title>{`${detailChapter?.currentChapter.name}-${comic?.name}`}</title>
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
      <div className="flex justify-between items-center mobile:flex-col mobile:items-start">
        <h1
          title={detailChapter?.currentChapter.name}
          className={`border-s-4 border-orange-500 capitalize m-5 font-bold text-4xl pl-4 mobile:text-3xl text-${themeStore.getOppositeTheme()}`}
        >
          {detailChapter?.currentChapter.name}
        </h1>
        <div className="flex gap-4 mobile:w-[100%] mobile:justify-center">
          <button
            className={cn("btn-primary", {
              "bg-slate-600": !detailChapter?.previousChapter,
            })}
            title="Chapter trước"
            onClick={() =>
              navigate(
                `/truyen/${comic?.slug}/${detailChapter?.previousChapter?.slug}`
              )
            }
            disabled={!detailChapter?.previousChapter}
          >
            <ArrowLeftCircle />
          </button>
          <div className="relative" ref={menuChapterRef}>
            <button
              className="btn-primary"
              title="Danh sách chương"
              onClick={() => setShowMenuChapter(!showMenuChapter)}
            >
              <MenuSquare />
            </button>
            {showMenuChapter && <MenuChapter chapters={chapters} />}
          </div>
          <button
            className={cn("btn-primary", {
              "bg-slate-600": !detailChapter?.nextChapter,
            })}
            title="Chapter tiếp theo"
            onClick={() => {
              navigate(
                `/truyen/${comic?.slug}/${detailChapter?.nextChapter?.slug}`
              );
            }}
            disabled={!detailChapter?.nextChapter}
          >
            <ArrowRightCircle />
          </button>
        </div>
      </div>
      <div
        className={`flex flex-col items-center justify-center m-5 bg-${themeStore.getTheme()}`}
      >
        {detailChapter?.currentChapter.images.map((image, _index) => (
          <img
            className="w-screen object-fit"
            src={image}
            alt={`${detailChapter?.currentChapter.name}-${comic?.name}`}
            key={_index}
          />
        ))}
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 mt-10 mobile:col-span-12">
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
        <div className="col-span-4 mt-10 mobile:col-span-12">
          {comic && (
            <ListComicsOfAuthor
              title={"Truyện cùng tác giả"}
              author={comic?.authors[0]}
            />
          )}
          <ListComicsRanking title={"Manga mới nhất"} field={"createdAt"} />
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
