import ListComicsPage from "@/applications/desktop/list-comics-page/Page";
import MetaTags from "@/shared/components/MetaTags";
import ComicService from "@/shared/services/comicService";

interface itemProps {
  genres: Genre[];
}

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
        url="https://mangahay.top/danh-sach-truyen"
        image=""
      />
      <ListComicsPage genres={genres} />;
    </>
  );
}
