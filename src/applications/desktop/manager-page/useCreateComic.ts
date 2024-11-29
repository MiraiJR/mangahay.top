import { StatusComic } from "@/shared/types/enums/StatusComic";
import { useState } from "react";
import { useUploadFile } from "./useUploadFile";
import { removeRelatedToColorStyleCss } from "@/shared/helpers/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ComicService from "@/shared/services/comicService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useCreateComic = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [comicName, setComicName] = useState<string>("");
  const [comicAnotherName, setComicAnotherName] = useState<string>("");
  const [comicGenres, setComicGenres] = useState<string[]>([]);
  const [comicAuthors, setComicAuthors] = useState<string[]>([]);
  const [comicTranslators, setComicTranslators] = useState<string[]>([]);
  const [comicBriefDescription, setBriefDescription] = useState<string>("");
  const [isUpdateImage, setIsUpdateImage] = useState<string>("0");
  const [statusComic, setStatusComic] = useState<string>(
    StatusComic.PROCESSING
  );
  const {
    fileUploadRef,
    clearUploadedFile,
    handleUploadImage,
    uploadedFile: comicThumb,
    setUploadedFile: setComicThumb,
  } = useUploadFile(null);

  const reset = () => {
    setComicName("");
    setComicAnotherName("");
    setComicGenres([]);
    setComicAuthors([]);
    setBriefDescription("");
    setComicThumb(null);
    setComicTranslators([]);
    setStatusComic(StatusComic.PROCESSING);
    clearUploadedFile();
  };

  const validate = () => {
    if (
      comicName.trim() === "" ||
      comicAnotherName.trim() === "" ||
      comicGenres.length === 0 ||
      comicBriefDescription.trim() === "" ||
      !comicThumb
    ) {
      throw new Error(t("notEmptyContent", { ns: "common" }));
    }
  };

  const buildFormDataForCreating = () => {
    let formData = new FormData();
    formData.append("name", comicName.replaceAll("/", ""));
    formData.append("anotherName", comicAnotherName);
    comicGenres.forEach((genre) => {
      formData.append("genres[]", genre.toLocaleLowerCase());
    });
    comicAuthors.forEach((author) => {
      formData.append("authors[]", author);
    });
    comicTranslators.forEach((translator) => {
      formData.append("translators[]", translator);
    });
    formData.append(
      "briefDescription",
      removeRelatedToColorStyleCss(comicBriefDescription)
    );
    formData.append("isUpdateImage", isUpdateImage);
    if (comicThumb) {
      formData.append("thumb", comicThumb);
    }
    formData.append("state", statusComic);

    return formData;
  };

  const createMutation = useMutation({
    mutationKey: ["comic.create"],
    mutationFn: async () => {
      validate();
      const formData = buildFormDataForCreating();

      const resposne = await ComicService.createComic(formData);
      reset();
      return resposne;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Tạo truyện thành công!");
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
    handleCreateComic: createMutation.mutate,
    isLoadingCreateComic: createMutation.isPending,
  };
};
