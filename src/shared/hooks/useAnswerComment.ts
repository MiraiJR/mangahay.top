import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CommentService from "../services/commentService";
import { useAnswerCommentContext } from "../contexts/AnswerCommentEditorContext";
import { useAuthContext } from "../contexts/AuthContext";

export const useAnswerComment = (comicId: number, commentId: number) => {
  const [mentionUserIds, setMentionUserIds] = useState<number[]>([]);
  const onSelectMentionUser = (value: number) => {
    setMentionUserIds((previousState) => [...previousState, value]);
  };
  const [contentAnswer, setContentAnswer] = useState<string>("");
  const { isLoggedIn } = useAuthContext();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { setActiveEditorId } = useAnswerCommentContext();

  const validate = () => {
    if (!isLoggedIn) {
      toast.warn(t("requiredLogin", { ns: "common" }));
      return;
    }

    if (contentAnswer.trim() === "") {
      return;
    }
  };

  const reset = () => {
    setActiveEditorId(null);
    setContentAnswer("");
    setMentionUserIds([]);
  };

  const mutation = useMutation({
    mutationKey: ["user.comment.answer", { commentId, comicId }],
    mutationFn: async () => {
      validate();

      await CommentService.commentOnComic(
        comicId,
        contentAnswer,
        mentionUserIds,
        commentId
      );

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
      reset();
    },
  });

  return {
    contentAnswer,
    setContentAnswer,
    handleAnswerCommand: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    mentionUserIds,
    onSelectMentionUser,
  };
};
