import { useAuthContext } from "@/shared/contexts/AuthContext";
import MeService from "@/shared/services/meService";
import { useQuery } from "@tanstack/react-query";

export const useGetMyCreatedComic = () => {
  const { isLoggedIn } = useAuthContext();
  const { data: comics = [], isLoading } = useQuery({
    queryKey: ["comic.myCreatedComic"],
    queryFn: async () => {
      const { data } = await MeService.getComicsManagedByMe();
      return data;
    },
    enabled: isLoggedIn,
  });

  return {
    comics,
    isLoading,
  };
};
