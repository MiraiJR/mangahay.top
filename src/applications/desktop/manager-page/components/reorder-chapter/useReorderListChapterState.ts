import { useGetListChapter } from "@/shared/hooks/useGetListChapter";
import { useEffect, useState } from "react";

interface ChapterForView {
  name: string;
  id: number;
  order: number;
}

export const useReorderListChapterState = (comicId: number) => {
  const { chapters, isLoading } = useGetListChapter(comicId, true);
  const [listChapterForView, setListChapterForView] = useState<
    ChapterForView[]
  >([]);

  const handleReorder = (result: any) => {
    if (!result.destination) return;

    const sourceChapter = listChapterForView.find(
      (chapter) => chapter.id === result.source.index
    );

    const destinatonChapter = listChapterForView.find(
      (chapter) => chapter.id === result.destination.index
    );

    if (!sourceChapter || !destinatonChapter) {
      return;
    }

    const newChapterForView = listChapterForView.map((chapter) => {
      switch (chapter.id) {
        case sourceChapter.id:
          return {
            ...chapter,
            order: destinatonChapter.order,
          };
        case destinatonChapter.id:
          return {
            ...chapter,
            order: sourceChapter.order,
          };
        default:
          return chapter;
      }
    });

    setListChapterForView(
      newChapterForView.sort(
        (chapterA, chapterB) => chapterA.order - chapterB.order
      )
    );
  };

  useEffect(() => {
    if (chapters.length > 0) {
      const chaptersWithOrder = chapters.map((chapter) => ({
        name: chapter.name,
        id: chapter.id,
        order: chapter.order,
      }));
      setListChapterForView(chaptersWithOrder);
    }
  }, [chapters]);

  return { listChapterForView, isLoading, handleReorder };
};
