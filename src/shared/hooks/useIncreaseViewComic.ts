import { useMutation } from "@tanstack/react-query";
import ComicService from "../services/comicService";

export const useIncreaseViewComic = (comicId?: number) => {
  const mutation = useMutation({
    mutationKey: ["comic.increaseView", { comicId }],
    mutationFn: async () => {
      if (comicId) {
        await ComicService.increaseView(comicId);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    increaseView: mutation.mutate,
  };
};
