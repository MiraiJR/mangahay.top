import ComicPage from "@/applications/desktop/comic-page/Page";
import MetaTags from "@/shared/components/MetaTags";
import { originalURL } from "@/shared/libs/config";
import ComicService from "@/shared/services/comicService";

interface RouteProps {
  comic: Comic;
}

export const getServerSideProps = async (context: any) => {
  const { slugComic } = context.params;

  try {
    const { data: comic } = await ComicService.getComicBySlug(slugComic);

    return {
      props: {
        comic,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: "/page-not-found",
      },
    };
  }
};

export default function ComicRoute({ comic }: RouteProps) {
  return (
    <>
      <MetaTags
        title={`${comic.name} | MangaHay - Đọc truyện tranh mới nhất`}
        description={`Đọc truyện tranh ${comic.name} [${comic.anotherName}] vietsub, chất lượng cao, không quảnq cáo tại mangahay.top`}
        image={comic.thumb}
        url={`${originalURL}/truyen/${comic.slug}`}
      />
      <ComicPage />
    </>
  );
}
