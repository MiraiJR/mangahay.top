import { useDeleteComic } from "@/applications/desktop/manager-page/hooks/useDeleteComic";
import { useGetMyCreatedComic } from "@/applications/desktop/manager-page/components/comic-manged-by-me/useGetMyCreatedComic";
import { userStore } from "@/shared/stores/user-storage";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useTableComicManagedByMeData = () => {
  const { t } = useTranslation();
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const {
    comics,
    totalComics,
    setPage,
    setSize,
    page,
    size,
    isLoading: isLoadingListMyCreatedComic,
  } = useGetMyCreatedComic();
  const { handleDeleteComic } = useDeleteComic();
  const { userProfile } = userStore();
  const [isShowUserRight, setIsShowUserRight] = useState<boolean>(false);
  const [isShowListManagedChapter, setIsShowListManagedChapter] =
    useState<boolean>(false);
  const [isShowReorderChapter, setIsShowReorderChapter] =
    useState<boolean>(false);
  const [isShowUpdateComic, setIsShowUpdateComic] = useState<boolean>(false);

  const mappingPermission: Record<number, string> = {
    1: t("permission.updateChapter", { ns: "comic" }),
    2: t("permission.updateComicInformation", { ns: "comic" }),
    3: t("permission.removeChapter", { ns: "comic" }),
    4: t("permission.removeComic", { ns: "comic" }),
  };

  const isCreator = (comic: Comic) => {
    return userProfile?.id === comic.creatorId;
  };

  const getPermissionText = (comic: Comic) => {
    if (isCreator(comic)) {
      return [t("permission.super", { ns: "comic" })];
    }

    const { privileges } = comic;

    const permissionText: string[] = [];
    privileges.forEach((privilege) => {
      permissionText.push(mappingPermission[privilege]);
    });

    return permissionText;
  };

  return {
    selectedComic,
    setSelectedComic,
    handleDeleteComic,
    comics,
    totalComics,
    isLoadingListMyCreatedComic,
    isShowUserRight,
    setIsShowUserRight,
    isShowListManagedChapter,
    setIsShowListManagedChapter,
    isShowReorderChapter,
    setIsShowReorderChapter,
    isCreator,
    userProfile,
    isShowUpdateComic,
    setIsShowUpdateComic,
    getPermissionText,
    setPage,
    setSize,
    page,
    size,
  };
};
