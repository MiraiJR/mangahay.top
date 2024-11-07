import { useState } from "react";
import { useUploadFile } from "./useUploadFile";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { extractComicId } from "@/shared/helpers/helpers";
import ChapterService from "@/shared/services/chapterService";

export const useCreateChapter = () => {
  const { t } = useTranslation();
  const [comicName, setComicName] = useState<string>("");
  const [chapterName, setChapterName] = useState<string>("");
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const {
    fileUploadRef,
    handleUploadMultipleFile,
    uploadedMultipleFile: chapterImages,
    clearUploadedFile,
  } = useUploadFile(null);

  const validate = () => {
    if (
      comicName.trim() === "" ||
      !comicName.includes("/") ||
      chapterName.trim() === "" ||
      chapterImages.length === 0
    ) {
      throw new Error(t("notEmptyContent", { ns: "common" }));
    }
  };

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("name", chapterName.replaceAll("/", ""));
    const comicId = extractComicId(comicName);
    formData.append("comicId", comicId as unknown as string);
    formData.append("isEnd", isEnd ? "1" : "0");
    chapterImages.forEach((image) => {
      formData.append("images", image);
    });

    return formData;
  };

  const reset = () => {
    setComicName("");
    setChapterName("");
    setIsEnd(false);
    clearUploadedFile();
  };

  const mutation = useMutation({
    mutationKey: ["chapter.create"],
    mutationFn: async () => {
      validate();
      const formData = buildFormData();
      const { data } = await ChapterService.createChapter(formData);
      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  return {
    comicName,
    setComicName,
    chapterName,
    setChapterName,
    isEnd,
    setIsEnd,
    fileUploadRef,
    handleUploadMultipleFile,
    chapterImages,
    handleCreateChapter: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
