import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ComicService from "@/shared/services/comicService";
import { useGetComic } from "@/shared/hooks/useGetComic";
import { useUploadImageContext } from "@/shared/components/base-components/upload-files/UploadImageContext";

export const useUpdateComic = (
  comicSlug: string,
  callBackSuccess: Function = () => {}
) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { comic, isLoading: isLoadingComic } = useGetComic(comicSlug);
  const [comicName, setComicName] = useState<string>("");
  const [comicAnotherName, setComicAnotherName] = useState<string>("");
  const [comicGenres, setComicGenres] = useState<string[]>([]);
  const [comicAuthors, setComicAuthors] = useState<string[]>([]);
  const [comicTranslators, setComicTranslators] = useState<string[]>([]);
  const [comicBriefDescription, setBriefDescription] = useState<string>("");
  const [statusComic, setStatusComic] = useState<string>("");
  const { uploadedFile: comicThumb, fileList, reset } = useUploadImageContext();
  const isUpdateThumb = fileList.length > 0 && comicThumb;

  useEffect(() => {
    if (comic) {
      setComicName(comic.name ?? "");
      setComicAnotherName(comic.anotherName ?? "");
      setComicGenres(comic.genres ?? []);
      setComicAuthors(comic.authors ?? []);
      setComicTranslators(comic.translators ?? []);
      setBriefDescription(comic.briefDescription ?? "");
      setStatusComic(comic.state ?? "");
    }
  }, [comic]);

  const validate = () => {
    if (
      comicName.trim() === "" ||
      comicAnotherName.trim() === "" ||
      comicGenres.length === 0 ||
      comicBriefDescription.trim() === ""
    ) {
      throw new Error(t("notEmptyContent", { ns: "common" }));
    }

    if (fileList.length === 0) {
      throw new Error("Ảnh mô tả là bắt buộc");
    }
  };

  const detectChangedFields = () => {
    const changedFields = [];
    const changedData = [];
    if (comic?.name !== comicName) {
      changedFields.push("name");
      changedData.push(comicName);
    }

    if (comic?.anotherName !== comicAnotherName) {
      changedFields.push("anotherName");
      changedData.push(comicAnotherName);
    }

    if (
      comicGenres.length !== comic?.genres.length ||
      comicGenres.filter((genre) => !comic.genres.includes(genre)).length > 0
    ) {
      changedFields.push("genres");
      changedData.push(JSON.stringify(comicGenres));
    }

    if (
      comicAuthors.length !== comic?.authors.length ||
      comicAuthors.filter((author) => !comic.authors.includes(author)).length >
        0
    ) {
      changedFields.push("authors");
      changedData.push(JSON.stringify(comicAuthors));
    }

    if (
      comicTranslators.length !== comic?.translators.length ||
      comicTranslators.filter(
        (translator) => !comic.translators.includes(translator)
      ).length > 0
    ) {
      changedFields.push("translators");
      changedData.push(JSON.stringify(comicTranslators));
    }

    if (comicBriefDescription !== comic?.briefDescription) {
      changedFields.push("briefDescription");
      changedData.push(comicBriefDescription);
    }

    if (statusComic !== comic?.state) {
      changedFields.push("state");
      changedData.push(statusComic);
    }

    return { changedFields, changedData };
  };

  const buildFormDataForUpdating = () => {
    let formData = new FormData();
    const { changedFields, changedData } = detectChangedFields();

    if (changedFields.length === 0 && !isUpdateThumb) {
      throw new Error("Chưa thay đổi bất kỳ thông tin nào cả!");
    }

    changedFields.forEach((changedField) => {
      formData.append("changedFields[]", changedField);
    });

    changedData.forEach((data) => {
      formData.append("changedData[]", data);
    });

    if (isUpdateThumb && comicThumb) {
      formData.append("thumb", comicThumb);
    }

    return formData;
  };

  const updateMutation = useMutation({
    mutationKey: ["comic.update"],
    mutationFn: async () => {
      validate();
      if (!comic) {
        throw new Error("Error");
      }

      const formData = buildFormDataForUpdating();

      const { data } = await ComicService.updateComic(comic.id, formData);
      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(`Cập nhật truyện ${comic?.id} thành công!`);
      queryClient.invalidateQueries({
        queryKey: ["comic.myCreatedComic"],
      });
      queryClient.invalidateQueries({
        queryKey: ["comic", { slugComic: comicSlug }],
      });
      reset();
      callBackSuccess();
    },
  });

  return {
    comic,
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
    comicThumb,
    handleUpdateComic: updateMutation.mutate,
    isLoadingUpdateComic: updateMutation.isPending,
    isSuccessUpdateComic: updateMutation.isSuccess,
    isLoadingComic,
  };
};
