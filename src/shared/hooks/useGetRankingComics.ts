import { useQuery } from "@tanstack/react-query";
import ComicService from "../services/comicService";

export const useGetRankingComics = (field: string, amount: number) => {
  const {
    data: comics = [],
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["comic.ranking", { field, amount }],
    queryFn: async () => {
      const { data } = await ComicService.getRankingComics({
        field,
        page: 1,
        size: amount,
      });

      return data.comics;
    },
    gcTime: 0,
  });

  return {
    comics,
    isLoading,
    error,
    isSuccess,
  };
};
