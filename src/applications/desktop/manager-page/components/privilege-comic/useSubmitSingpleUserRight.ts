import ComicService from "@/shared/services/comicService";
import { ComicPrivilegePermission } from "@/shared/types/enums/ComicPrevilegePermission.enum";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useSubmitSingleUserRight = (comicId: number) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [recommendedUsers, setRecommendedUsers] = useState<string[]>([]);
  const [canUpdateChapter, setCanUpdateChapter] = useState<boolean>(false);
  const [canUpdateComic, setCanUpdateComic] = useState<boolean>(false);
  const [canRemoveChapter, setCanRemoveChapter] = useState<boolean>(false);
  const [canRemoveComic, setCanRemoveComic] = useState<boolean>(false);

  const validate = () => {
    if (
      !canRemoveChapter &&
      !canRemoveComic &&
      !canUpdateChapter &&
      !canUpdateComic
    ) {
      throw new Error(t("notEmptyContent", { ns: "common" }));
    }
  };

  const extractUserIdFromSelectedUser = () => {
    if (selectedUser.split("/").length === 0) {
      throw new Error(t("notEmptyContent", { ns: "common" }));
    }

    const targetUserId = selectedUser.split("/")[0];

    const userIdRegex = /^\d+$/;
    if (!userIdRegex.test(targetUserId) || parseInt(targetUserId, 10) <= 0) {
      throw new Error(t("notEmptyContent", { ns: "common" }));
    }

    return parseInt(targetUserId, 10);
  };

  const handlePermissions = () => {
    const permissions: number[] = [];

    if (canUpdateChapter) {
      permissions.push(ComicPrivilegePermission.UPDATE_CHAPTER);
    }
    if (canUpdateComic) {
      permissions.push(ComicPrivilegePermission.UPDATE_COMIC);
    }
    if (canRemoveChapter) {
      permissions.push(ComicPrivilegePermission.REMOVE_CHAPTER);
    }
    if (canRemoveComic) {
      permissions.push(ComicPrivilegePermission.REMOVE_COMIC);
    }

    return permissions;
  };

  const perRowMutation = useMutation({
    mutationKey: ["comic.privilege", { comicId }],
    mutationFn: async () => {
      validate();
      const targetUserId = extractUserIdFromSelectedUser();
      const permissions = handlePermissions();

      const { data } = await ComicService.updateSingleUserRight(
        comicId,
        targetUserId,
        permissions
      );
      return data;
    },
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ["comic.privileges", { comicId }],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    updateSingleUserRight: perRowMutation.mutate,
    isLoadingUpdateSingleUserRight: perRowMutation.isPending,
    isSuccessUpdateSingleUserRight: perRowMutation.isSuccess,
    selectedUser,
    setSelectedUser,
    recommendedUsers,
    setRecommendedUsers,
    canUpdateChapter,
    setCanUpdateChapter,
    canUpdateComic,
    setCanUpdateComic,
    canRemoveChapter,
    setCanRemoveChapter,
    canRemoveComic,
    setCanRemoveComic,
  };
};
