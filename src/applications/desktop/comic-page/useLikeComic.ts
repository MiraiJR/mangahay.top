import { useTranslation } from "react-i18next";
import { useInteractionComic } from "./useInteractionComic";
import { toast } from "react-toastify";
import MeService, { TypeComicInteraction } from "@/shared/services/meService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/shared/contexts/AuthContext";

export const useLikeComic = (comicId: number) => {
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
    mutationKey: ["comic.like", { comicId }],
    mutationFn: async () => {
      validate();

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
