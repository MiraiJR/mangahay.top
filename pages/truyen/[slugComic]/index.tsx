import ComicPage from "@/applications/desktop/comic-page/Page";
import MetaTags from "@/shared/components/MetaTags";
import ComicService from "@/shared/services/comicService";

interface itemProps {
  detailComic: ComicDetail;
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
  const { comic } = detailComic;

  return (
    <>
      <MetaTags
        title={`${comic.name} | MangaHay - Đọc truyện tranh mới nhất`}
        description={`Đọc truyện tranh ${comic.name} [${comic.anotherName}] vietsub, chất lượng cao, không quảnq cáo tại mangahay.top`}
        image={comic.thumb}
        url={`https://mangahay.top/truyen/${comic.slug}`}
      />
      <ComicPage detailComic={detailComic} />;
    </>
  );
}
