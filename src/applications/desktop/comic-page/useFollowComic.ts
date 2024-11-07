import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useInteractionComic } from "./useInteractionComic";
import MeService, { TypeComicInteraction } from "@/shared/services/meService";
import { useAuthContext } from "@/shared/contexts/AuthContext";

export const useFollowComic = (comicId: number) => {
  const { isLoggedIn } = useAuthContext();
  const { t } = useTranslation();
  const { statusInteractComic } = useInteractionComic(comicId);
  const queryClient = useQueryClient();

  const validate = () => {
    if (!isLoggedIn) {
      throw new Error(t("requiredLogin", { ns: "common" }));
    }
  };

  const mutation = useMutation({
    mutationKey: ["comic.follow", { comicId }],
    mutationFn: async () => {
      validate();

      await MeService.interactWithComic(
        comicId,
        statusInteractComic.isFollowed
          ? TypeComicInteraction.unfollow
          : TypeComicInteraction.follow
      );

      queryClient.invalidateQueries({
        queryKey: ["comic.interaction", { comicId }],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    handleFollow: mutation.mutate,
  };
};
