import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import MeService, { TypeComicInteraction } from "@/shared/services/meService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/shared/contexts/AuthContext";
import { usePageContext } from "../../Context";

export const useLikeComic = () => {
  const { isLoggedIn } = useAuthContext();
  const { t } = useTranslation();
  const { statusInteraction } = usePageContext();
  const queryClient = useQueryClient();

  const validate = () => {
    if (!isLoggedIn) {
      throw new Error(t("requiredLogin", { ns: "common" }));
    }
  };

  const mutation = useMutation({
    mutationKey: ["comic.like"],
    mutationFn: async (comicId: number) => {
      validate();

      await MeService.interactWithComic(
        comicId,
        statusInteraction?.isLiked
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
