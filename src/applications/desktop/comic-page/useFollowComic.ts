import { globalStore } from "@/shared/stores/globalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useInteractionComic } from "./useInteractionComic";
import MeService, { TypeComicInteraction } from "@/shared/services/meService";

export const useFollowComic = (comicId: number) => {
  const { isLogined } = globalStore();
  const { t } = useTranslation();
  const { statusInteractComic } = useInteractionComic(comicId);
  const queryClient = useQueryClient();

  const validate = () => {
    if (!isLogined) {
      toast.warn(t("requiredLogin", { ns: "common" }));
      return false;
    }

    return true;
  };

  const mutation = useMutation({
    mutationKey: ["comic.follow", { comicId }],
    mutationFn: async () => {
      if (!validate()) {
        return;
      }

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
