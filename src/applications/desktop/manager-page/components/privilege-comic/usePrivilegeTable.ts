import { useEffect, useState } from "react";
import { useGetListPrivilege } from "./useGetListPrivilege";
import { ComicPrivilegeForView } from "./PrivilegeTable";
import { ComicPrivilegePermission } from "@/shared/types/enums/ComicPrevilegePermission.enum";
import ComicService from "@/shared/services/comicService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { userStore } from "@/shared/stores/user-storage";

export const usePrivilegeTable = (comicId: number) => {
  const { privileges: rawPrivileges, isLoading } = useGetListPrivilege(comicId);
  const [privileges, setPrivileges] = useState<ComicPrivilegeForView[]>([]);
  const { userProfile } = userStore();

  useEffect(() => {
    if (rawPrivileges.length > 0) {
      setPrivileges(rawPrivileges);
    }
  }, [rawPrivileges]);

  const [listNewPrivileges, setListNewPrivileges] = useState<
    ComicPrivilegeForView[]
  >([]);

  const excludedUserIds = privileges
    .map((privilege) => privilege.user.id)
    .concat(listNewPrivileges.map((privilege) => privilege.user.id));

  if (userProfile) {
    excludedUserIds.push(userProfile.id);
  }

  const handleRemoveRow = async (targetPrivilege: ComicPrivilegeForView) => {
    if (targetPrivilege.isNew) {
      setListNewPrivileges((previousState) =>
        previousState.filter((privilege) => privilege !== targetPrivilege)
      );
    } else {
      handleDeletePrivilege.mutate(targetPrivilege);
    }
  };

  const handleDeletePrivilege = useMutation({
    mutationKey: ["comic.privilege.delete", { comicId }],
    mutationFn: async (targetPrivilege: ComicPrivilegeForView) => {
      const { data } = await ComicService.deleteSingleUserRight(
        comicId,
        targetPrivilege.id
      );

      setPrivileges((previousState) =>
        previousState.filter((privilege) => privilege !== targetPrivilege)
      );

      return data;
    },
    onSuccess: (message: string) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChangePrivilege = (
    privilege: ComicPrivilegeForView,
    isChecked: boolean,
    targetPrivilege: ComicPrivilegePermission
  ) => {
    if (privilege.isNew) {
      setListNewPrivileges((previousState) => {
        return previousState.map((oldPrivilege) => {
          if (oldPrivilege === privilege) {
            return {
              ...oldPrivilege,
              permissions: isChecked
                ? [...oldPrivilege.permissions, targetPrivilege]
                : oldPrivilege.permissions.filter(
                    (permission) => permission !== targetPrivilege
                  ),
            };
          }

          return oldPrivilege;
        });
      });
    } else if (privilege.isEditable) {
      setPrivileges((previousState) => {
        return previousState.map((oldPrivilege) => {
          if (oldPrivilege === privilege) {
            return {
              ...oldPrivilege,
              permissions: isChecked
                ? [...oldPrivilege.permissions, targetPrivilege]
                : oldPrivilege.permissions.filter(
                    (permission) => permission !== targetPrivilege
                  ),
            };
          }

          return oldPrivilege;
        });
      });
    }
  };

  const handleAddNewRow = () => {
    setListNewPrivileges((previous) => [
      ...previous,
      {
        id: Date.now(),
        comicId,
        permissions: [],
        user: {
          fullname: "",
          avatar: "",
          id: -1,
          email: "",
        },
        isNew: true,
      },
    ]);
  };

  const handleEditableRow = (privilege: ComicPrivilegeForView) => {
    setPrivileges((previousState) => {
      return previousState.map((oldPrivilege) => {
        if (oldPrivilege === privilege) {
          return {
            ...oldPrivilege,
            isEditable: !privilege.isEditable,
          };
        }

        return oldPrivilege;
      });
    });
  };

  const validateBeforeUpdatingPrivilege = (
    privilege: ComicPrivilegeForView
  ) => {
    if (privilege.isNew || privilege.isEditable) {
      return;
    }

    if (privilege.isNew && privilege.user.id === -1) {
      throw new Error("Chưa nhập người dùng muốn cập nhật quyền!");
    }

    throw new Error("Không thể cập nhật!");
  };

  const updatePrivilegeMutation = useMutation({
    mutationKey: ["comic.privilege", { comicId }],
    mutationFn: async (privilege: ComicPrivilegeForView) => {
      validateBeforeUpdatingPrivilege(privilege);

      const { data } = await ComicService.updateSingleUserRight(
        comicId,
        privilege.user.id,
        privilege.permissions
      );

      // remove from state for new row
      if (privilege.isNew) {
        setListNewPrivileges((previousState) =>
          previousState.filter((oldPrivilege) => oldPrivilege !== privilege)
        );
        setPrivileges((previousState) => [
          ...previousState,
          {
            ...privilege,
            isNew: false,
            isEditable: false,
          },
        ]);
      } else if (privilege.isEditable) {
        setPrivileges((previousState) =>
          previousState.map((oldPrivilege) => {
            if (oldPrivilege === privilege) {
              return {
                ...oldPrivilege,
                isEditable: false,
              };
            }

            return oldPrivilege;
          })
        );
      }

      return data;
    },
    onSuccess: (message) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    privileges,
    setPrivileges,
    isLoading,
    excludedUserIds,
    handleAddNewRow,
    handleRemoveRow,
    handleChangePrivilege,
    handleEditableRow,
    handleUpdatePrivilege: updatePrivilegeMutation.mutate,
    listNewPrivileges,
    setListNewPrivileges,
  };
};
