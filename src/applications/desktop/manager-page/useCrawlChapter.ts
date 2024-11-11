import { extractComicId } from "@/shared/helpers/helpers";
import ComicService from "@/shared/services/comicService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useCrawlChapter = () => {
  const { t } = useTranslation();
  const [urlPost, setUrlPost] = useState<string>("");
  const [querySelector, setQuerySelector] = useState<string>("");
  const [comicName, setComicName] = useState<string>("");
  const [attribute, setAttribute] = useState<string>("");
  const [chapterName, setChapterName] = useState<string>("");

  const resetInput = () => {
    setUrlPost("");
  };

  const validate = () => {
    if (
      comicName.trim() === "" ||
      urlPost.trim() === "" ||
      chapterName.trim() === ""
    ) {
      throw new Error(t("notEmptyContent", { ns: "common" }));
    }
  };

  const mutation = useMutation({
    mutationKey: ["comic.crawlChapter"],
    mutationFn: async () => {
      validate();

      const comicId = extractComicId(comicName);
      const { data } = await ComicService.crawlChapter(
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
    urlPost,
    setUrlPost,
    querySelector,
    setQuerySelector,
    comicName,
    setComicName,
    attribute,
    setAttribute,
    chapterName,
    setChapterName,
    handleCrawlChapter: mutation.mutate,
    isCrawling: mutation.isPending,
    errorMessage: mutation.error?.message,
  };
};
