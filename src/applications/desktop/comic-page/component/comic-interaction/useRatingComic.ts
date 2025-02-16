import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ComicService from "@/shared/services/comicService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/shared/contexts/AuthContext";
import { usePageContext } from "../../Context";

export const useRatingComic = () => {
  const { comic, statusInteraction } = usePageContext();
  const [scoreStar, setScoreStar] = useState<number>(comic.star);
  const { isLoggedIn } = useAuthContext();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const validate = () => {
    if (!isLoggedIn) {
      throw new Error(t("requiredLogin", { ns: "common" }));
    }

    if (statusInteraction && statusInteraction.isEvaluated) {
      throw new Error(t("comicInteraction.evaluated", { ns: "common" }));
    }
  };

  const mutation = useMutation({
    mutationKey: ["comic.rating"],
    mutationFn: async (comicId: number) => {
      validate();

      const { data } = await ComicService.evaluateComic(comicId, scoreStar);

      return {
        message: data,
        comicId,
      };
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["comic.interaction", { comicId: response.comicId }],
      });
      toast.success(response.message);
    },
  });

  return {
    setScoreStar,
    scoreStar,
    handleRatingComic: mutation.mutate,
  };
};
