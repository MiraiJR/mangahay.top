import {
  convertWebpResource,
  extractIdFromSlugChapter,
} from "@/shared/helpers/helpers";
import { originalURL } from "@/shared/libs/config";
import comicService from "@/shared/services/comicService";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ArrowLeftCircle, ArrowRightCircle, MenuSquare } from "lucide-react";
import { cn } from "@/shared/libs/utils";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { globalStore } from "@/shared/stores/globalStore";
import themeStore from "@/shared/stores/themeStore";
import Image from "next/image";
import { useRouter } from "next/router";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import MyLoading from "@/shared/components/MyLoading";
import dynamic from "next/dynamic";
import ListComicsOfAuthor from "../comic-page/ListComicsOfAuthor";
import ListComicsRanking from "../home-page/ListComicsRanking";

interface itemProps {
  detailComic: ComicDetail;
  detailChapterA: DetailChapter;
}

const DescriptionComic = dynamic(
  () => import("../comic-page/DescriptionComic")
);
const ListComments = dynamic(() => import("../comic-page/ListComments"));
const MenuChapter = dynamic(() => import("./MenuChapter"));

const ChapterPage = ({ detailComic, detailChapterA }: itemProps) => {
  const menuChapterRef = useRef<any>(null);
  const router = useRouter();
  const { slugChapter, slugComic } = router.query;
  const [comic, setComic] = useState<Comic>(detailComic.comic);
  const [contentComment, setContentComment] = useState<string>("");
  const [detailChapter, setDetailChapter] = useState<DetailChapter | null>(
    detailChapterA
  );
  const [chapters, setChapters] = useState<Chapter[]>(detailComic.chapters);
  const [comments, setComments] = useState<UserComment[]>(detailComic.comments);
  const [showMenuChapter, setShowMenuChapter] = useState<boolean>(false);
  const { isLogined } = globalStore();
  const items: MenuItem[] = [
    { label: "Truyện" },
    { label: comic?.name, url: `${originalURL}/truyen/${comic?.slug}` },
    {
      label: detailChapter?.currentChapter.name,
      url: `${originalURL}/truyen/${comic?.slug}/${detailChapter?.currentChapter.slug}`,
    },
  ];
  const home: MenuItem = { icon: "pi pi-home", url: originalURL };
  const {} = useContext(ThemeContext);

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
    setShowMenuChapter(false);
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

    getChapter(comic.id, extractIdFromSlugChapter(slugChapter as string));
    increaseView(comic.id);
  }, [slugChapter, slugComic]);

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
      <div className="flex justify-between items-center mobile:flex-col mobile:items-start">
        <h2
          title={detailChapter?.currentChapter.name}
          className={`border-s-4 border-orange-500 capitalize m-5 font-bold text-4xl pl-4 mobile:text-3xl text-${themeStore.getOppositeTheme()}`}
        >
          {detailChapter?.currentChapter.name}
        </h2>
        <div className="flex gap-4 mobile:w-[100%] mobile:justify-center">
          <button
            className={cn("btn-primary", {
              "bg-slate-600": !detailChapter?.previousChapter,
            })}
            title="Chapter trước"
            onClick={() =>
              router.push(
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
              router.push(
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
        {detailChapter?.currentChapter.images ? (
          detailChapter?.currentChapter.images.map((image, _index) => (
            <Image
              loading="lazy"
              width={0}
              height={0}
              className="w-[80%] mobile:w-[100%] object-fit"
              src={convertWebpResource(image)}
              alt={`${detailChapter?.currentChapter.name}-${comic?.name}`}
              key={_index}
            />
          ))
        ) : (
          <MyLoading />
        )}

        <div
          className={`text-${themeStore.getTheme()} w-[100%] bg-${themeStore.getOppositeTheme()} p-4 text-xl text-center`}
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
      <div className="relative z-10 flex justify-center items-center mobile:flex-col mobile:items-start">
        <div className="flex gap-4 mobile:w-[100%] mobile:justify-center">
          <button
            className={cn("btn-primary", {
              "bg-slate-600": !detailChapter?.previousChapter,
            })}
            title="Chapter trước"
            onClick={() =>
              router.push(
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
              router.push(
                `/truyen/${comic?.slug}/${detailChapter?.nextChapter?.slug}`
              );
            }}
            disabled={!detailChapter?.nextChapter}
          >
            <ArrowRightCircle />
          </button>
        </div>
      </div>
      <div className="retive grid grid-cols-12 gap-4">
        <div className="col-span-8 mt-10 mobile:col-span-12">
          <div className="border-s-4 border-orange-500 pl-4 font-bold">
            <h2
              className={`text-2xl mobile:text-xl text-${themeStore.getOppositeTheme()}`}
            >
              Danh sách bình luận ({comments.length})
            </h2>
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

export default ChapterPage;
