import ChapterService from "@/shared/services/chapterService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useCrawlChapter = () => {
  const { t } = useTranslation();
  const [comicId, setComicId] = useState<number>(-1);
  const [urlPost, setUrlPost] = useState<string>("");
  const [querySelector, setQuerySelector] = useState<string>("");
  const [attribute, setAttribute] = useState<string>("");
  const [chapterName, setChapterName] = useState<string>("");

  const resetInput = () => {
    setUrlPost("");
  };

  const validate = () => {
    if (comicId === -1 || urlPost.trim() === "" || chapterName.trim() === "") {
      throw new Error(t("notEmptyContent", { ns: "common" }));
    }
  };

  const mutation = useMutation({
    mutationKey: ["chapter.crawlSingle"],
    mutationFn: async () => {
      validate();

      const { data } = await ChapterService.crawlSingleChapter(
        comicId,
        urlPost,
        chapterName,
        querySelector,
        attribute
      );

      return data;
    },
    onSuccess: (data) => {
      toast.success(data);
      resetInput();
    },
  });

  return {
    setComicId,
    urlPost,
    setUrlPost,
    querySelector,
    setQuerySelector,
    attribute,
    setAttribute,
    chapterName,
    setChapterName,
    handleCrawlChapter: mutation.mutate,
    isCrawling: mutation.isPending,
    errorMessage: mutation.error?.message,
  };
};
