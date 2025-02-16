import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

interface MinimumUserProps {
  user: ShortUserInfo;
}

export const MinimumUser = ({ user }: MinimumUserProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Avatar src={user?.avatar} size={24} icon={<UserOutlined />} />
      <p className="m-0">{user.fullname}</p>
    </div>
  );
};
