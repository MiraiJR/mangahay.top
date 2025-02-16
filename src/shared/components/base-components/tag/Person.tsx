import { Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface PersonProps {
  name: string;
  showIcon?: boolean;
}

export const Person = ({ name, showIcon = true }: PersonProps) => {
  return (
    <Tag icon={showIcon && <UserOutlined />} color="green">
      {name}
    </Tag>
  );
};
