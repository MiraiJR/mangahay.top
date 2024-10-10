import { useState } from "react";
import { globalStore } from "../stores/globalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ComicService from "../services/comicService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useComment = (comicId: number) => {
  const [contentComment, setContentComment] = useState<string>("");
  const { isLogined } = globalStore();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const validate = () => {
    if (!isLogined) {
      toast.warn(t("requiredLogin", { ns: "common" }));
      return;
    }

    if (contentComment.trim() === "") {
      return;
    }
  };

  const mutation = useMutation({
    mutationKey: ["user.comment", { comicId }],
    mutationFn: async () => {
      validate();

      await ComicService.commentOnComic(comicId, contentComment);

      setContentComment("");

      queryClient.invalidateQueries({
        queryKey: ["comic.comments", { comicId }],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    contentComment,
    setContentComment,
    handleComment: mutation.mutate,
  };
};
