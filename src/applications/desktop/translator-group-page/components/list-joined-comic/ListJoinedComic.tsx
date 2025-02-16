import { ListComicNew } from "./ListComicNew";
import { comics } from "../../constant";

interface ListJoinedComicProps {}

export const ListJoinedComic = ({}: ListJoinedComicProps) => {
  return (
    <>
      <ListComicNew comics={comics} title={"Đang tiến hành"} />
      <ListComicNew comics={comics} title={"Đã hoàn thành"} />
      <ListComicNew comics={comics} title={"Tạm ngưng"} />
    </>
  );
};
