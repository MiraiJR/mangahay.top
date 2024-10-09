import { useState } from "react";
import { globalStore } from "../stores/globalStore";
import { useMutation } from "@tanstack/react-query";
import ComicService from "../services/comicService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useComment = (comicId: number, setComments: Function) => {
  const [contentComment, setContentComment] = useState<string>("");
  const { isLogined } = globalStore();
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

      const { data } = await ComicService.commentOnComic(
        comicId,
        contentComment
      );

      setContentComment("");
      setComments((pre: UserComment[]) => [data, ...pre]);
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
