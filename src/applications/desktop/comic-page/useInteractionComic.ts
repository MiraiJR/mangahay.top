import { useAuthContext } from "@/shared/contexts/AuthContext";
import MeService from "@/shared/services/meService";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_INTERACTION = {
  isEvaluated: false,
  isLiked: false,
  isFollowed: false,
};

export const useInteractionComic = (comicId: number) => {
  const { isLoggedIn } = useAuthContext();
  const { data: statusInteractComic = DEFAULT_INTERACTION } = useQuery({
    queryKey: ["comic.interaction", { comicId }],
    queryFn: async () => {
      if (comicId) {
        const { data } = await MeService.getInteractionWithComic(comicId);
        return data;
      }
    },
    enabled: comicId !== 0 && isLoggedIn,
  });

  return {
    statusInteractComic,
  };
};
