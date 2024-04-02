import ComicPage from "@/applications/desktop/comic-page/Page";
import MetaTags from "@/shared/components/MetaTags";
import ComicService from "@/shared/services/comicService";

interface itemProps {
  detailComic: Comic;
}

export async function getServerSideProps(context: any) {
  const slugComic = context.query.slugComic;
  try {
    const { data } = await ComicService.getComicBySlug(slugComic);

    return {
      props: {
        detailComic: data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/page-not-found",
      },
    };
  }
}

export default function ComicRoute({ detailComic }: itemProps) {
  return (
    <>
      <MetaTags
        title={`${detailComic.name} | MangaHay - Đọc truyện tranh mới nhất`}
        description={`Đọc truyện tranh ${detailComic.name} [${detailComic.anotherName}] vietsub, chất lượng cao, không quảnq cáo tại mangahay.top`}
        image={detailComic.thumb}
        url={`https://mangahay.top/truyen/${detailComic.slug}`}
      />
      <ComicPage detailComic={detailComic} />
    </>
  );
}
