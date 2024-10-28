import { useState } from "react";
import { useUploadFile } from "./useUploadFile";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { extractComicId } from "@/shared/helpers/helpers";
import ComicService from "@/shared/services/comicService";

export const useCreateChapter = () => {
  const { t } = useTranslation();
  const [comicName, setComicName] = useState<string>("");
  const [chapterName, setChapterName] = useState<string>("");
  const {
    fileUploadRef,
    handleUploadMultipleFile,
    uploadedMultipleFile: chapterImages,
    clearUploadedFile,
  } = useUploadFile();

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
    formData.append("nameChapter", chapterName.replaceAll("/", ""));
    chapterImages.forEach((image) => {
      formData.append("files", image);
    });

    return formData;
  };

  const reset = () => {
    setComicName("");
    setChapterName("");
    clearUploadedFile();
  };

  const mutation = useMutation({
    mutationKey: ["chapter.create"],
    mutationFn: async () => {
      validate();

      const formData = buildFormData();
      const comicId = extractComicId(comicName);
      const { data } = await ComicService.createChapter(comicId, formData);
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
    fileUploadRef,
    handleUploadMultipleFile,
    chapterImages,
    handleCreateChapter: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
