import { globalStore } from "@/shared/stores/globalStore";
import { useTranslation } from "react-i18next";
import { useInteractionComic } from "./useInteractionComic";
import { toast } from "react-toastify";
import MeService, { TypeComicInteraction } from "@/shared/services/meService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLikeComic = (comicId: number) => {
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
    mutationKey: ["comic.like", { comicId }],
    mutationFn: async () => {
      if (!validate()) {
        return;
      }

      await MeService.interactWithComic(
        comicId,
        statusInteractComic.isLiked
          ? TypeComicInteraction.unlike
          : TypeComicInteraction.like
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
    handleLike: mutation.mutate,
  };
};
