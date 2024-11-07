import ComicService from "@/shared/services/comicService";
import { useQuery } from "@tanstack/react-query";

export const useListComicsOfAuthor = (author: string) => {
  const {
    data: comics = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "comic.author",
      {
        author,
        page: 1,
        limit: 5,
      },
    ],
    queryFn: async () => {
      const { data } = await ComicService.searchComics({
        author,
        page: 1,
        size: 5,
      });

      return data.comics;
    },
  });

  return {
    comics,
    isLoading,
    error,
  };
};
