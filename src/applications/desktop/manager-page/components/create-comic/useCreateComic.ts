import { StatusComic } from "@/shared/types/enums/StatusComic";
import { useState } from "react";
import { removeRelatedToColorStyleCss } from "@/shared/helpers/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ComicService from "@/shared/services/comicService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useUploadImageContext } from "@/shared/components/base-components/upload-files/UploadImageContext";

export const useCreateComic = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [comicName, setComicName] = useState<string>("");
  const [comicAnotherName, setComicAnotherName] = useState<string>("");
  const [comicGenres, setComicGenres] = useState<string[]>([]);
  const [comicAuthors, setComicAuthors] = useState<string[]>([]);
  const [comicTranslators, setComicTranslators] = useState<string[]>([]);
  const [comicBriefDescription, setBriefDescription] = useState<string>("");
  const [statusComic, setStatusComic] = useState<string>(
    StatusComic.PROCESSING
  );
  const { uploadedFile: thumb, reset: resetUploadImage } =
    useUploadImageContext();

  const reset = () => {
    setComicName("");
    setComicAnotherName("");
    setComicGenres([]);
    setComicAuthors([]);
    setBriefDescription("");
    resetUploadImage();
    setComicTranslators([]);
    setStatusComic(StatusComic.PROCESSING);
  };

  const validate = () => {
    if (
      comicName.trim() === "" ||
      comicAnotherName.trim() === "" ||
      comicGenres.length === 0 ||
      comicBriefDescription.trim() === "" ||
      !thumb
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
    if (thumb) {
      formData.append("thumb", thumb);
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
    setStatusComic,
    comicName,
    comicAnotherName,
    comicGenres,
    comicAuthors,
    comicTranslators,
    comicBriefDescription,
    statusComic,
    handleCreateComic: createMutation.mutate,
    isLoadingCreateComic: createMutation.isPending,
  };
};
