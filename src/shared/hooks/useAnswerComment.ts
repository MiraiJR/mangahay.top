import { useState } from "react";
import { globalStore } from "../stores/global-storage";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CommentService from "../services/commentService";
import { useAnswerCommentContext } from "../contexts/AnswerCommentEditorContext";

export const useAnswerComment = (
  comicId: number,
  commentId: number,
  mentionedUserId: number | null
) => {
  const [contentAnswer, setContentAnswer] = useState<string>("");
  const { isLogined } = globalStore();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { setActiveEditorId } = useAnswerCommentContext();

  const validate = () => {
    if (!isLogined) {
      toast.warn(t("requiredLogin", { ns: "common" }));
      return;
    }

    if (contentAnswer.trim() === "") {
      return;
    }
  };

  const mutation = useMutation({
    mutationKey: ["user.comment.answer", { commentId, comicId }],
    mutationFn: async () => {
      validate();

      await CommentService.answerComment(
        comicId,
        commentId,
        contentAnswer,
        mentionedUserId
      );

      setContentAnswer("");

      queryClient.invalidateQueries({
        queryKey: ["comment.answers", { commentId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["comic.comments", { comicId }],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      setActiveEditorId(null);
    },
  });

  return {
    contentAnswer,
    setContentAnswer,
    handleAnswerCommand: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};
