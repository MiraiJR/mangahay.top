import { Tag } from "antd";

interface GenreProps {
  genre: string;
}

export const Genre = ({ genre }: GenreProps) => {
  return <Tag color="magenta">{genre}</Tag>;
};
