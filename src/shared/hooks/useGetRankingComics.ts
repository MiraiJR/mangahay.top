import { useQuery } from "@tanstack/react-query";
import ComicService from "../services/comicService";

export const useGetRankingComics = (field: string, amount: number) => {
  const {
    data: comics = [],
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["comics.ranking", { field, amount }],
    queryFn: async () => {
      const { data } = await ComicService.getRankingComics(field, amount);

      return data.comics;
    },
  });

  return {
    comics,
    isLoading,
    error,
    isSuccess,
  };
};
