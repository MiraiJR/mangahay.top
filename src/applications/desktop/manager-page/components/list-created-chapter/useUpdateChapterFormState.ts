import { UploadFile } from "antd";
import { useState } from "react";

export const useUpdateChapterFormState = (chapter: Chapter) => {
  const [chapterImagesForView, setChapterImagesForView] = useState<
    ChapterImage[]
  >(chapter.images);
  const [chapterName, setChapterName] = useState<string>(chapter.name);
  const [chapterPosition, setChapterPosition] = useState<number>(chapter.order);
  const [imageIdsNeedDelete, setImageIdsNeedDelete] = useState<number[]>([]);
  const [newUploadFiles, setNewUploadFiles] = useState<UploadFile[]>([]);

  const addImageIdToListNeedDelete = (imageId: number) => {
    if (!imageIdsNeedDelete.includes(imageId)) {
      setImageIdsNeedDelete([...imageIdsNeedDelete, imageId]);
      setChapterImagesForView(
        [...chapterImagesForView].filter(
          (chapterImage) =>
            ![...imageIdsNeedDelete, imageId].includes(chapterImage.id)
        )
      );
    }
  };

  return {
    chapterName,
    setChapterName,
    chapterPosition,
    setChapterPosition,
    imageIdsNeedDelete,
    setImageIdsNeedDelete,
    chapterImagesForView,
    addImageIdToListNeedDelete,
    setNewUploadFiles,
    newUploadFiles,
  };
};
