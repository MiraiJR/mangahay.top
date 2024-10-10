import ComicService from "../services/comicService";
import { useQuery } from "@tanstack/react-query";

export const useGetGenres = () => {
  const { data: genres = [], isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const { data } = await ComicService.getGenres();
      return data;
    },
  });

  return { genres, isLoading };
};
