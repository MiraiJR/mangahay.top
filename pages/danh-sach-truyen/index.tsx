import MetaTags from "@/shared/components/MetaTags";
import { originalURL } from "@/shared/libs/config";
import ComicService from "@/shared/services/comicService";
import dynamic from "next/dynamic";

interface itemProps {
  genres: Genre[];
}

const ListComicsPage = dynamic(
  () => import("@/applications/desktop/list-comics-page/Page")
);

export async function getServerSideProps(context: any) {
  try {
    const { data } = await ComicService.getGenres();

    return {
      props: {
        genres: data,
      },
    };
  } catch (error: any) {
    return {
      redirect: {
        permanent: false,
        destination: "/page-not-found",
      },
    };
  }
}

export default function ListRoute({ genres }: itemProps) {
  return (
    <>
      <MetaTags
        title={`Danh sách truyện - MangaHay`}
        description=""
        url={`${originalURL}/danh-sach-truyen`}
        image=""
      />
      <ListComicsPage genres={genres} />;
    </>
  );
}
