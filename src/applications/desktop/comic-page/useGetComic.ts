import ComicService from "@/shared/services/comicService";
import { useQuery } from "@tanstack/react-query";

export const useGetComic = (slugComic: string, initialData?: Comic) => {
  const {
    data: comic,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comic", { slugComic }],
    queryFn: async () => {
      const { data } = await ComicService.getComicBySlug(slugComic);
      return data;
    },
    enabled: !!slugComic,
    initialData,
  });

  return {
    comic,
    isLoading,
    error,
  };
};
