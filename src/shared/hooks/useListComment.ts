import { useQuery } from "@tanstack/react-query";
import ComicService from "../services/comicService";

export const useListComment = (comicId: number) => {
  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comic.comments", { comicId }],
    queryFn: async () => {
      const { data } = await ComicService.getListComment(comicId);

      return data;
    },
    enabled: !!comicId,
  });

  return {
    comments,
    isLoading,
    error,
  };
};
