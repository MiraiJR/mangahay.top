import { usePrivilegeTable } from "./usePrivilegeTable";
import { Button, Checkbox, Table, TableColumnsType } from "antd";
import {
  CheckOutlined,
  EditOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { MinimumUser } from "@/shared/components/MinimumUser";
import { ComicPrivilegePermission } from "@/shared/types/enums/ComicPrevilegePermission.enum";
import { AutoCompleteUserSearch } from "@/shared/components/base-components/auto-complete/AutoCompleteUserSearch";

interface PrivilegeTableProps {
  comicId: number;
}

export type ComicPrivilegeForView = ComicPrivilege & {
  isNew?: boolean;
  isEditable?: boolean;
};

export const PrivilegeTable = ({ comicId }: PrivilegeTableProps) => {
  const {
    privileges,
    excludedUserIds,
    handleAddNewRow,
    handleRemoveRow,
    listNewPrivileges,
    setListNewPrivileges,
    handleChangePrivilege,
    handleEditableRow,
    handleUpdatePrivilege,
  } = usePrivilegeTable(comicId);

  const columns: TableColumnsType<ComicPrivilegeForView> = [
    {
      title: "User",
      key: "user",
      render: (privilege: ComicPrivilegeForView) => {
        if (privilege.isNew) {
          return (
            <AutoCompleteUserSearch
              onSelect={(selectedUser: string) => {
                setListNewPrivileges((previousState) => {
                  return previousState.map((oldPrivilege) => {
                    if (oldPrivilege === privilege) {
                      return {
                        ...oldPrivilege,
                        user: {
                          ...oldPrivilege.user,
                          id: parseInt(selectedUser.split("/")[0]),
                          fullname: selectedUser.split("/")[1],
                        },
                      };
                    }

                    return oldPrivilege;
                  });
                });
              }}
              excludedUserIds={excludedUserIds}
            />
          );
        }

        return (
          <MinimumUser
            user={{
              id: privilege.user.id,
              email: "",
              fullname: privilege.user.fullname,
              avatar: privilege.user.avatar,
            }}
          />
        );
      },
    },
    {
      title: "Update chapter",
      key: "updateChapter",
      render: (privilege: ComicPrivilegeForView) => {
        const checked = privilege.permissions.includes(
          ComicPrivilegePermission.UPDATE_CHAPTER
        );

        return (
          <Checkbox
            checked={checked}
            onChange={(event) => {
              handleChangePrivilege(
                privilege,
                event.target.checked,
                ComicPrivilegePermission.UPDATE_CHAPTER
              );
            }}
            disabled={!privilege.isEditable && !privilege.isNew}
          />
        );
      },
    },
    {
      title: "Remove chapter",
      key: "removeChapter",
      render: (privilege: ComicPrivilegeForView) => {
        const checked = privilege.permissions.includes(
          ComicPrivilegePermission.REMOVE_CHAPTER
        );

        return (
          <Checkbox
            checked={checked}
            onChange={(event) => {
              handleChangePrivilege(
                privilege,
                event.target.checked,
                ComicPrivilegePermission.REMOVE_CHAPTER
              );
            }}
            disabled={!privilege.isEditable && !privilege.isNew}
          />
        );
      },
    },
    {
      title: "Update comic",
      key: "updateComic",
      render: (privilege: ComicPrivilegeForView) => {
        const checked = privilege.permissions.includes(
          ComicPrivilegePermission.UPDATE_COMIC
        );

        return (
          <Checkbox
            checked={checked}
            onChange={(event) => {
              handleChangePrivilege(
                privilege,
                event.target.checked,
                ComicPrivilegePermission.UPDATE_COMIC
              );
            }}
            disabled={!privilege.isEditable && !privilege.isNew}
          />
        );
      },
    },
    {
      title: "Remove comic",
      key: "removeComic",
      render: (privilege: ComicPrivilegeForView) => {
        const checked = privilege.permissions.includes(
          ComicPrivilegePermission.REMOVE_COMIC
        );

        return (
          <Checkbox
            checked={checked}
            onChange={(event) => {
              handleChangePrivilege(
                privilege,
                event.target.checked,
                ComicPrivilegePermission.REMOVE_COMIC
              );
            }}
            disabled={!privilege.isEditable && !privilege.isNew}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (privilege) => actionTemplate(privilege),
    },
  ];

  const actionTemplate = (privilege: ComicPrivilegeForView) => {
    return (
      <div className="flex gap-2">
        {!privilege.isNew && (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              handleEditableRow(privilege);
            }}
          />
        )}
        {(privilege.isNew || privilege.isEditable) && (
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            icon={<CheckOutlined />}
            onClick={() => {
              handleUpdatePrivilege(privilege);
            }}
          />
        )}
        <Button
          danger
          type="primary"
          icon={<MinusOutlined />}
          onClick={() => {
            handleRemoveRow(privilege);
          }}
        />
      </div>
    );
  };

  return (
    <>
      <Button
        color="primary"
        variant="solid"
        icon={<PlusOutlined />}
        onClick={handleAddNewRow}
      />
      <Table<ComicPrivilege>
        columns={columns}
        dataSource={privileges.concat(listNewPrivileges)}
        pagination={false}
      />
    </>
  );
};
