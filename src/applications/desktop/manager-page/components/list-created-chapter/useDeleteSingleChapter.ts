import ChapterService from "@/shared/services/chapterService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteSingleChapter = (comicId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["chapter.delete"],
    mutationFn: async (chapterId: number) => {
      const { data } = await ChapterService.deleteSingleChapter(chapterId);
      return data;
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries({
        queryKey: ["comic.chapters", { comicId }],
      });
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    handleDeleteSingleChapter: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
