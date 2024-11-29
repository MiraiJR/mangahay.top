import { useEffect, useState } from "react";
import { useGetListPrivilege } from "./useGetListPrivilege";
import { ComicPrivilegePermission } from "@/shared/types/enums/ComicPrevilegePermission.enum";

export const usePrivilegeTable = (comicId: number) => {
  const { privileges, isLoading } = useGetListPrivilege(comicId);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [permissionsOfUser, updatePermissionsOfUser] = useState<
    Map<number, number[]>
  >(new Map());

  useEffect(() => {
    if (privileges.length > 0) {
      initPermissionsOfUser();
    }
  }, [privileges]);

  const initPermissionsOfUser = () => {
    const permissionsOfUserMap = new Map<number, number[]>();
    privileges.forEach((privilege) => {
      permissionsOfUserMap.set(privilege.user.id, privilege.permissions);
    });
    updatePermissionsOfUser(permissionsOfUserMap);
  };

  const checkPermission = (
    userId: number,
    targetPrivilege: ComicPrivilegePermission
  ) => {
    const permissions = permissionsOfUser.get(userId) ?? [];

    return permissions.includes(targetPrivilege);
  };

  const handleChangeUserRight = (
    isChecked: boolean,
    targetPrivilege: ComicPrivilegePermission,
    userId: number
  ) => {
    const updatedPermissions = new Map(permissionsOfUser);
    let permissions = updatedPermissions.get(userId) || [];

    if (isChecked) {
      permissions = [...permissions, targetPrivilege];
    } else {
      permissions = permissions.filter(
        (permission) => permission !== targetPrivilege
      );
    }

    updatedPermissions.set(userId, permissions);
    updatePermissionsOfUser(updatedPermissions);
  };

  return {
    privileges,
    isLoading,
    permissionsOfUser,
    handleChangeUserRight,
    checkPermission,
    resetEdit: initPermissionsOfUser,
    isEditable,
    setIsEditable,
  };
};
