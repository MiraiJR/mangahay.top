import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ChapterService from "@/shared/services/chapterService";
import { useUploadImageContext } from "@/shared/components/base-components/upload-files/UploadImageContext";

export const useCreateChapter = () => {
  const { t } = useTranslation();
  const [comicId, setComicId] = useState<number>(-1);
  const [chapterName, setChapterName] = useState<string>("");
  const { uploadedFiles: chapterImages, reset: resetUploadImages } =
    useUploadImageContext();
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const validate = () => {
    if (
      comicId === -1 ||
      chapterName.trim() === "" ||
      chapterImages.length === 0
    ) {
      throw new Error(t("notEmptyContent", { ns: "common" }));
    }
  };

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("name", chapterName.replaceAll("/", ""));
    formData.append("comicId", comicId.toString());
    formData.append("isEnd", isEnd ? "1" : "0");
    chapterImages.forEach((image) => {
      formData.append("images", image);
    });

    return formData;
  };

  const reset = () => {
    setChapterName("");
    setIsEnd(false);
    resetUploadImages(true);
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
    setComicId,
    chapterName,
    setChapterName,
    isEnd,
    setIsEnd,
    chapterImages,
    handleCreateChapter: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
