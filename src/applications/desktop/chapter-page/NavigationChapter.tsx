import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useGetChapter } from "@/shared/hooks/useGetChapter";
import { useGetListChapter } from "@/shared/hooks/useGetListChapter";
import { useEffect, useState } from "react";
import MenuChapter from "./MenuChapter";
import router from "next/router";
import { ArrowLeftCircle, ArrowRightCircle, MenuSquare } from "lucide-react";
import { cn } from "@/shared/libs/utils";

interface NavigationChapterProps {
  comicId: number;
  slugComic: string;
}

export const NavigationChapter = ({
  comicId,
  slugComic,
}: NavigationChapterProps) => {
  const { chapters } = useGetListChapter(comicId);
  const { chapter } = useGetChapter();
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);
  const [previousChapter, setPreviousChapter] = useState<Chapter | null>(null);
  const {
    elementRef: menuChapterRef,
    isVisiable: showMenuChapter,
    setIsVisiable: setShowMenuChapter,
  } = useClickOutside();

  useEffect(() => {
    if (chapter && chapters.length >= 0) {
      const indexCurrentChapter = chapters.findIndex(
        (ele) => ele.id === chapter.id
      );

      if (indexCurrentChapter === -1) {
        return;
      }

      setPreviousChapter(chapters[indexCurrentChapter + 1] ?? null);
      setNextChapter(chapters[indexCurrentChapter - 1] ?? null);
    }
  }, [chapter, chapters]);

  return (
    <div className="relative z-10 flex justify-center items-center mobile:flex-col mobile:items-start">
      <div className="flex gap-4 mobile:w-[100%] mobile:justify-center">
        <button
          className={cn("btn-primary", {
            "bg-slate-600": !previousChapter,
          })}
          title="Chapter trước"
          onClick={() =>
            router.push(`/truyen/${slugComic}/${previousChapter?.slug}`)
          }
          disabled={!previousChapter}
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
            "bg-slate-600": !nextChapter,
          })}
          title="Chapter tiếp theo"
          onClick={() => {
            router.push(`/truyen/${slugComic}/${nextChapter?.slug}`);
          }}
          disabled={!nextChapter}
        >
          <ArrowRightCircle />
        </button>
      </div>
    </div>
  );
};
