import MeService from "@/shared/services/meService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetListFollowedComic = () => {
  const queryClient = useQueryClient();

  const { data: comics = [], isLoading } = useQuery({
    queryKey: ["me.comics.followed"],
    queryFn: async () => {
      const { data } = await MeService.getFollowingComics();

      return data;
    },
  });

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ["me.comics.followed"],
    });
  };

  return { comics, isLoading, refetch };
};
