import ComicService from "@/shared/services/comicService";
import { useQuery } from "@tanstack/react-query";

export const useGetMyCreatedComic = () => {
  const { data: comics = [], isLoading } = useQuery({
    queryKey: ["comic.myCreatedComic"],
    queryFn: async () => {
      const { data } = await ComicService.getComicsCreatedByMe();
      return data;
    },
  });

  return {
    comics,
    isLoading,
  };
};
