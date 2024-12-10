import { useGetListChapter } from "@/shared/hooks/useGetListChapter";
import ChapterService from "@/shared/services/chapterService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useReorderListChapterState = (comicId: number) => {
  const queryClient = useQueryClient();
  const { chapters, isLoading } = useGetListChapter(comicId, true);
  const [listChapterForView, setListChapterForView] = useState<Chapter[]>([]);

  const getListReorderedChapter = () => {
    const listReorderedChapter: ReorderChapter[] = [];

    chapters.map((chapter, index) => {
      if (chapter.id !== listChapterForView[index].id) {
        listReorderedChapter.push({
          chapterId: listChapterForView[index].id,
          newOrder: chapter.order,
        });
      }
    });

    return listReorderedChapter;
  };

  const reorderChapterMutation = useMutation({
    mutationKey: ["comic.chapter.reorder", { comicId }],
    mutationFn: async () => {
      const { data } = await ChapterService.reorderListChapter(
        comicId,
        getListReorderedChapter()
      );

      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data: string) => {
      queryClient.invalidateQueries({
        queryKey: ["comic.chapters", { comicId }],
      });
      toast.success(data);
    },
  });

  const handleReorder = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(listChapterForView);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setListChapterForView(items);
  };

  useEffect(() => {
    if (chapters.length > 0) {
      setListChapterForView(chapters);
    }
  }, [chapters]);

  return {
    listChapterForView,
    isLoading,
    handleReorder,
    handlePostReorderChapter: reorderChapterMutation.mutate,
    isLoadingReorderChapter: reorderChapterMutation.isPending,
  };
};
