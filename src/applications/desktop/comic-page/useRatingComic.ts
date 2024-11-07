import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useInteractionComic } from "./useInteractionComic";
import ComicService from "@/shared/services/comicService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/shared/contexts/AuthContext";

export const useRatingComic = (comic: Comic) => {
  const [scoreStar, setScoreStar] = useState<number>(comic.star);
  const { isLoggedIn } = useAuthContext();
  const { t } = useTranslation();
  const { statusInteractComic } = useInteractionComic(comic.id);
  const queryClient = useQueryClient();

  const validate = () => {
    if (!isLoggedIn) {
      throw new Error(t("requiredLogin", { ns: "common" }));
    }

    if (statusInteractComic.isEvaluated) {
      throw new Error(t("comicInteraction.evaluated", { ns: "common" }));
    }
  };

  const mutation = useMutation({
    mutationKey: ["comic.rating", { comicId: comic.id }],
    mutationFn: async () => {
      validate();

      await ComicService.evaluateComic(comic.id, scoreStar);

      queryClient.invalidateQueries({
        queryKey: ["comic.interaction", { comicId: comic.id }],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    setScoreStar,
    scoreStar,
    handleRatingComic: mutation.mutate,
  };
};
