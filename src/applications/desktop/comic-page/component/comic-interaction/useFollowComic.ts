import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import MeService, { TypeComicInteraction } from "@/shared/services/meService";
import { useAuthContext } from "@/shared/contexts/AuthContext";
import { usePageContext } from "../../Context";

export const useFollowComic = () => {
  const { isLoggedIn } = useAuthContext();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { statusInteraction } = usePageContext();

  const validate = () => {
    if (!isLoggedIn) {
      throw new Error(t("requiredLogin", { ns: "common" }));
    }
  };

  const mutation = useMutation({
    mutationKey: ["comic.follow"],
    mutationFn: async (comicId: number) => {
      validate();

      await MeService.interactWithComic(
        comicId,
        statusInteraction?.isFollowed
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
    isSuccess: mutation.isSuccess,
  };
};
