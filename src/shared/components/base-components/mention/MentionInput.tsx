import { useSearchUserByName } from "@/shared/hooks/useSearchUserByName";
import { MinimumUser } from "../../MinimumUser";
import { useState } from "react";
import { Mentions } from "antd";
import { MentionsOptionProps } from "antd/es/mentions";

interface MentionInputProps {
  onSelect: (option: MentionsOptionProps) => void;
  excludedIds?: number[];
}

export const MentionInput = ({
  onSelect,
  excludedIds = [],
}: MentionInputProps) => {
  const { isLoading: isLoadingSearchUser, handleSearchUser } =
    useSearchUserByName();
  const [mentionUserOptions, setMentionUserOptions] = useState<
    SearchUserModel[]
  >([]);
  const onSearchMentionUser = async (text: string, prefix: string) => {
    if (text.trim() === "" || text === "") {
      setMentionUserOptions([]);
      return;
    }

    const users = await handleSearchUser(text, excludedIds);
    setMentionUserOptions(users ?? []);
  };

  return (
    <Mentions
      className="mobile:text-xs"
      style={{ width: "100%", borderRadius: 0 }}
      loading={isLoadingSearchUser}
      onSearch={onSearchMentionUser}
      placeholder="Input @ to mention user"
      prefix={["@"]}
      onSelect={onSelect}
      options={mentionUserOptions.map((mentionedUser) => ({
        key: mentionedUser.id.toString(),
        value: mentionedUser.fullname,
        label: (
          <MinimumUser
            user={{
              ...mentionedUser,
              email: "",
            }}
          />
        ),
      }))}
    />
  );
};
