import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useEffect, useState } from "react";
import { MenuChapter } from "./MenuChapter";
import router from "next/router";
import { ArrowLeftCircle, ArrowRightCircle, MenuSquare } from "lucide-react";
import { usePageContext } from "./Context";
import { Button } from "antd";
import { globalStore } from "@/shared/stores/global-storage";

export const NavigationChapter = () => {
  const { isMobile } = globalStore();
  const { chapter, comic, chapters } = usePageContext();
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
    <div className="relative z-5 flex justify-center items-center mobile:flex-col mobile:items-start">
      <div className="flex gap-4 mobile:w-[100%] mobile:justify-center">
        <Button
          size={isMobile ? "middle" : "large"}
          color="primary"
          variant="solid"
          title="Chapter trước"
          onClick={() =>
            router.push(`/truyen/${comic?.slug}/${previousChapter?.slug}`)
          }
          icon={<ArrowLeftCircle />}
          disabled={!previousChapter}
        />
        <div className="relative" ref={menuChapterRef}>
          <Button
            size={isMobile ? "middle" : "large"}
            color="primary"
            variant="solid"
            title="Danh sách chương"
            onClick={() => setShowMenuChapter(!showMenuChapter)}
            icon={<MenuSquare />}
          />
          <MenuChapter open={showMenuChapter} />
        </div>
        <Button
          size={isMobile ? "middle" : "large"}
          color="primary"
          variant="solid"
          title="Chapter tiếp theo"
          onClick={() => {
            router.push(`/truyen/${comic?.slug}/${nextChapter?.slug}`);
          }}
          disabled={!nextChapter}
          icon={<ArrowRightCircle />}
        />
      </div>
    </div>
  );
};
