import { useMutation } from "@tanstack/react-query";
import ComicService from "../services/comicService";

export const useIncreaseViewComic = (comicId: number) => {
  const mutation = useMutation({
    mutationKey: ["comic.increaseView", { comicId }],
    mutationFn: async () => {
      await ComicService.increaseField(comicId, "view", 1);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    increaseView: mutation.mutate,
  };
};
