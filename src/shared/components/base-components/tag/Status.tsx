import { Tag } from "antd";

interface StatusProps {
  status: string;
}

export const Status = ({ status }: StatusProps) => {
  return (
    <Tag className="w-fit" color="yellow">
      {status}
    </Tag>
  );
};
