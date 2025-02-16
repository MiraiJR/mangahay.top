import { useMutation } from "@tanstack/react-query";
import ComicService from "../services/comicService";

export const useIncreaseViewComic = () => {
  const mutation = useMutation({
    mutationKey: ["comic.increaseView"],
    mutationFn: async (comicId: number) => {
      if (comicId) {
        await ComicService.increaseView(comicId);
      }
    },
  });

  return {
    increaseView: mutation.mutate,
  };
};
