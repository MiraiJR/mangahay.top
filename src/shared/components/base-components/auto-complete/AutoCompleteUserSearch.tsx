import { AutoComplete, AutoCompleteProps } from "antd";
import { useState } from "react";
import { useSearchUserByName } from "../../../hooks/useSearchUserByName";

interface AutoCompleteUserSearchProps {
  onSelect: Function;
  excludedUserIds: number[];
}

export const AutoCompleteUserSearch = ({
  onSelect,
  excludedUserIds,
}: AutoCompleteUserSearchProps) => {
  const { handleSearchUser } = useSearchUserByName();
  const [userOptions, setUserOptions] = useState<AutoCompleteProps["options"]>(
    []
  );

  const onSearchUser = async (text: string) => {
    if (text.trim() === "") {
      setUserOptions([]);
      return;
    }

    const users = await handleSearchUser(text, excludedUserIds);
    if (users) {
      setUserOptions(
        users.map((user) => ({
          value: `${user.id}/${user.fullname}`,
        }))
      );
    }
  };

  return (
    <AutoComplete
      options={userOptions}
      onSelect={(selectedUser) => {
        onSelect(selectedUser);
      }}
      style={{ width: 200, zIndex: 100, display: "block" }}
      onSearch={onSearchUser}
      placeholder="Tìm người dùng"
    />
  );
};
