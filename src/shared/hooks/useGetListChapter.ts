import { useQuery } from "@tanstack/react-query";
import ComicService from "../services/comicService";

export const useGetListChapter = (comicId: number) => {
  const {
    data: chapters = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comic.chapters", { comicId }],
    queryFn: async () => {
      const { data } = await ComicService.getListChapters(comicId);
      return data;
    },
    enabled: !!comicId,
  });

  return {
    chapters,
    isLoading,
    error,
  };
};
