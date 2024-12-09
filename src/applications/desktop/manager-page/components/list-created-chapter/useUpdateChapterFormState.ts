import { useGetChapter } from "@/shared/hooks/useGetChapter";
import ChapterService from "@/shared/services/chapterService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useUpdateChapterFormState = (slug: string) => {
  const { chapter, isLoading } = useGetChapter(slug);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [chapterImagesForView, setChapterImagesForView] = useState<
    ChapterImage[]
  >([]);
  const [chapterName, setChapterName] = useState<string>("");
  const [imageIdsNeedDelete, setImageIdsNeedDelete] = useState<number[]>([]);
  const [newUploadFiles, setNewUploadFiles] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (chapter) {
      setChapterImagesForView(chapter.images);
      setChapterName(chapter.name);
    }
  }, [chapter]);

  const addImageIdToListNeedDelete = (imageId: number) => {
    if (!imageIdsNeedDelete.includes(imageId)) {
      setImageIdsNeedDelete((prev) => [...prev, imageId]);
      setChapterImagesForView((prevImages) =>
        prevImages.filter((image) => image.id !== imageId)
      );
    }
  };

  const handleChangeUploadFiles: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setNewUploadFiles(newFileList);
  };

  const validateData = () => {
    if (chapterName.trim().length === 0) {
      throw new Error(t("notEmptyContent", { ns: "common" }));
    }

    if (chapterImagesForView.length === 0 && newUploadFiles.length === 0) {
      throw new Error(t("chapterMustHaveImage", { ns: "common" }));
    }
  };

  const buildFormDataForUpdatingChapter = () => {
    validateData();

    const formData = new FormData();
    formData.append("chapterName", chapterName);
    imageIdsNeedDelete.forEach((imageId) => {
      formData.append("imageIdsNeedDelete[]", imageId.toString());
    });

    newUploadFiles.forEach((file) => {
      if (file.originFileObj) {
        formData.append("newImages", file.originFileObj);
      }
    });

    return formData;
  };

  const updateChapterMutation = useMutation({
    mutationKey: ["chapter.update", { chapterId: chapter?.id }],
    mutationFn: async () => {
      const formData = buildFormDataForUpdatingChapter();

      const { data } = await ChapterService.updateChapter(
        chapter!.id,
        formData
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comic.chapters", { comicId: chapter?.comicId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["chapter", { slugChapter: slug }],
      });
      reset();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          t("unknownError", { ns: "common" })
      );
    },
  });

  const reset = () => {
    setChapterImagesForView(chapter?.images || []);
    setChapterName(chapter?.name || "");
    setNewUploadFiles([]);
    setImageIdsNeedDelete([]);
  };

  return {
    chapterName,
    setChapterName,
    imageIdsNeedDelete,
    setImageIdsNeedDelete,
    chapterImagesForView,
    addImageIdToListNeedDelete,
    newUploadFiles,
    handleChangeUploadFiles,
    handleUpdateChapter: updateChapterMutation.mutate,
    isLoadingUpdateChapter: updateChapterMutation.isPending,
    isSuccessUpdateChapter: updateChapterMutation.isSuccess,
    isLoading,
  };
};
