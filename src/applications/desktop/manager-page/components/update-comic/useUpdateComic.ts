import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUploadFile } from "../../useUploadFile";
import { useDialogContext } from "@/shared/contexts/DialogContext";
import { toast } from "react-toastify";
import ComicService from "@/shared/services/comicService";

export const useUpdateComic = (comic: Comic) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [comicName, setComicName] = useState<string>(comic.name);
  const [comicAnotherName, setComicAnotherName] = useState<string>(
    comic.anotherName
  );
  const [comicGenres, setComicGenres] = useState<string[]>(comic.genres);
  const [comicAuthors, setComicAuthors] = useState<string[]>(comic.authors);
  const [comicTranslators, setComicTranslators] = useState<string[]>(
    comic.translators
  );
  const [comicBriefDescription, setBriefDescription] = useState<string>(
    comic.briefDescription
  );
  const [isUpdateImage, setIsUpdateImage] = useState<string>("0");
  const [statusComic, setStatusComic] = useState<string>(comic.state);
  const { changeVisible } = useDialogContext();
  const {
    fileUploadRef,
    clearUploadedFile,
    handleUploadImage,
    uploadedFile: comicThumb,
    setUploadedFile: setComicThumb,
  } = useUploadFile(comic.thumb);

  const validate = () => {
    if (
      comicName.trim() === "" ||
      comicAnotherName.trim() === "" ||
      comicGenres.length === 0 ||
      comicBriefDescription.trim() === "" ||
      (isUpdateImage === "1" && !comicThumb)
    ) {
      throw new Error(t("notEmptyContent", { ns: "common" }));
    }
  };

  const detectChangedFields = () => {
    const changedFields = [];
    const changedData = [];
    if (comic.name !== comicName) {
      changedFields.push("name");
      changedData.push(comicName);
    }

    if (comic.anotherName !== comicAnotherName) {
      changedFields.push("anotherName");
      changedData.push(comicAnotherName);
    }

    if (
      comicGenres.length !== comic.genres.length ||
      comicGenres.filter((genre) => !comic.genres.includes(genre)).length > 0
    ) {
      changedFields.push("genres");
      changedData.push(JSON.stringify(comicGenres));
    }

    if (
      comicAuthors.length !== comic.authors.length ||
      comicAuthors.filter((author) => !comic.authors.includes(author)).length >
        0
    ) {
      changedFields.push("authors");
      changedData.push(JSON.stringify(comicAuthors));
    }

    if (
      comicTranslators.length !== comic.translators.length ||
      comicTranslators.filter(
        (translator) => !comic.translators.includes(translator)
      ).length > 0
    ) {
      changedFields.push("translators");
      changedData.push(JSON.stringify(comicTranslators));
    }

    if (comicBriefDescription !== comic.briefDescription) {
      changedFields.push("briefDescription");
      changedData.push(comicBriefDescription);
    }

    if (statusComic !== comic.state) {
      changedFields.push("state");
      changedData.push(statusComic);
    }

    return { changedFields, changedData };
  };

  const buildFormDataForUpdating = () => {
    let formData = new FormData();
    const { changedFields, changedData } = detectChangedFields();

    if (changedFields.length === 0 && isUpdateImage === "0") {
      throw new Error("Chưa thay đổi bất kỳ thông tin nào cả!");
    }

    changedFields.forEach((changedField) => {
      formData.append("changedFields[]", changedField);
    });

    changedData.forEach((data) => {
      formData.append("changedData[]", data);
    });

    if (isUpdateImage === "1" && comicThumb) {
      formData.append("thumb", comicThumb);
    }

    return formData;
  };

  const updateMutation = useMutation({
    mutationKey: ["comic.update"],
    mutationFn: async () => {
      validate();

      const formData = buildFormDataForUpdating();

      const response = await ComicService.updateComic(comic.id, formData);
      return response;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(`Cập nhật truyện ${comic?.id} thành công!`);
      changeVisible(false);
      queryClient.invalidateQueries({
        queryKey: ["comic.myCreatedComic"],
      });
    },
  });

  return {
    setComicName,
    setComicAnotherName,
    setComicGenres,
    setComicAuthors,
    setComicTranslators,
    setBriefDescription,
    setIsUpdateImage,
    setStatusComic,
    comicName,
    comicAnotherName,
    comicGenres,
    comicAuthors,
    comicTranslators,
    comicBriefDescription,
    isUpdateImage,
    statusComic,
    fileUploadRef,
    handleUploadImage,
    comicThumb,
    setComicThumb,
    handleUpdateComic: updateMutation.mutate,
    isLoadingUpdateComic: updateMutation.isPending,
  };
};
