import ComicService from "@/shared/services/comicService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteComic = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["comic.delete"],
    mutationFn: async (comicId: number) => {
      const { data } = await ComicService.deleteComic(comicId);

      return data;
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ["comic.myCreatedComic"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    handleDeleteComic: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
