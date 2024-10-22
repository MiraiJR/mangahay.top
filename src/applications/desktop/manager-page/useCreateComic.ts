import { StatusComic } from "@/shared/types/enums/StatusComic";
import { useEffect, useState } from "react";
import { useUploadFile } from "./useUploadFile";
import { removeRelatedToColorStyleCss } from "@/shared/helpers/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ComicService from "@/shared/services/comicService";
import { toast } from "react-toastify";
import { useDialogContext } from "@/shared/contexts/DialogContext";

export const useCreateComic = (comic: Comic | null) => {
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
  const { changeVisible } = useDialogContext();
  const {
    fileUploadRef,
    clearUploadedFile,
    handleUploadImage,
    uploadedFile: comicThumb,
    setUploadedFile: setComicThumb,
  } = useUploadFile(comic?.thumb ?? null);

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
      (!comic && !comicThumb) ||
      comicTranslators.length === 0
    ) {
      throw new Error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const buildFormData = () => {
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
      const formData = buildFormData();

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

  const updateMutation = useMutation({
    mutationKey: ["comic.update"],
    mutationFn: async () => {
      validate();

      const formData = buildFormData();

      if (comic) {
        const response = await ComicService.updateComic(comic.id, formData);
        return response;
      }
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

  useEffect(() => {
    if (comic) {
      setComicName(comic.name);
      setComicAnotherName(comic.anotherName);
      setBriefDescription(comic.briefDescription);
      setComicAuthors(comic.authors);
      setComicTranslators(comic.translators);
      setComicGenres(comic.genres);
      setStatusComic(comic.state);
    }
  }, [comic]);

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
    handleUpdateComic: updateMutation.mutate,
    isLoadingUpdateComic: updateMutation.isPending,
  };
};
