import { Popover, Tag } from "antd";
import { useState } from "react";
import { MinimumUser } from "../../MinimumUser";

interface MentionProps {
  user: ShortUserInfo;
}

export const Mention = ({ user }: MentionProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <Popover
      content={<MinimumUser user={user} />}
      trigger="hover"
      open={isShow}
      onOpenChange={() => {
        setIsShow(!isShow);
      }}
    >
      <Tag color="magenta">@{user.fullname}</Tag>
    </Popover>
  );
};
