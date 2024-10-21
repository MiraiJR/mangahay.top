import { useState } from "react";
import { globalStore } from "../stores/global-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import CommentService from "../services/commentService";

export const useComment = (comicId: number) => {
  const [contentComment, setContentComment] = useState<string>("");
  const { isLogined } = globalStore();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const validate = () => {
    if (!isLogined) {
      throw new Error(t("requiredLogin", { ns: "common" }));
    }

    if (contentComment.trim() === "") {
      throw new Error(t("notEmptyContent", { ns: "common" }));
    }
  };

  const mutation = useMutation({
    mutationKey: ["user.comment", { comicId }],
    mutationFn: async () => {
      validate();

      await CommentService.commentOnComic(comicId, contentComment);

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
