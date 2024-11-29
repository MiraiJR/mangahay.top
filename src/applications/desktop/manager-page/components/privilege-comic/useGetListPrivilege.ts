import ComicService from "@/shared/services/comicService";
import { useQuery } from "@tanstack/react-query";

export const useGetListPrivilege = (comicId: number) => {
  const { data: privileges = [], isLoading } = useQuery({
    queryKey: ["comic.privileges", { comicId }],
    queryFn: async () => {
      const { data } = await ComicService.getListPrivilege(comicId);
      return data;
    },
  });

  return {
    privileges,
    isLoading,
  };
};
