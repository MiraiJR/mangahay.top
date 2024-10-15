import { globalStore } from "@/shared/stores/global-storage";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useInteractionComic } from "./useInteractionComic";
import ComicService from "@/shared/services/comicService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRatingComic = (comic: Comic) => {
  const [scoreStar, setScoreStar] = useState<number>(comic.star);
  const { isLogined } = globalStore();
  const { t } = useTranslation();
  const { statusInteractComic } = useInteractionComic(comic.id);
  const queryClient = useQueryClient();

  const validate = () => {
    if (!isLogined) {
      toast.warn(t("requiredLogin", { ns: "common" }));
      return false;
    }

    if (statusInteractComic.isEvaluated) {
      toast.warn(t("comicInteraction.evaluated", { ns: "common" }));
      return false;
    }

    return true;
  };

  const mutation = useMutation({
    mutationKey: ["comic.rating", { comicId: comic.id }],
    mutationFn: async () => {
      if (!validate()) {
        return;
      }

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
