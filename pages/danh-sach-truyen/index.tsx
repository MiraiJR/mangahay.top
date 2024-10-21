import MetaTags from "@/shared/components/MetaTags";
import { originalURL } from "@/shared/libs/config";
import dynamic from "next/dynamic";

const ListComicsPage = dynamic(
  () => import("@/applications/desktop/list-comics-page/Page"),
  { ssr: false }
);

export default function ListRoute() {
  return (
    <>
      <MetaTags
        title={`Danh sách truyện - MangaHay`}
        description=""
        url={`${originalURL}/danh-sach-truyen`}
        image=""
      />
      <ListComicsPage />;
    </>
  );
}
