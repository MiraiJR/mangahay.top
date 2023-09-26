import ChapterPage from "@/applications/desktop/chapter-page/Page";
import MetaTags from "@/shared/components/MetaTags";
import { extractIdFromSlugChapter } from "@/shared/helpers/helpers";
import ComicService from "@/shared/services/comicService";
interface itemProps {
  detailComic: ComicDetail;
  detailChapterA: DetailChapter;
}
export async function getServerSideProps(context: any) {
  try {
    const { slugComic, slugChapter } = context.query;
    const { data } = await ComicService.getComicBySlug(slugComic);
    const chapter = await ComicService.getChapterOfComic(
      data.comic.id,
      extractIdFromSlugChapter(slugChapter as string)
    );

    return {
      props: {
        detailComic: data,
        detailChapterA: chapter.data,
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

export default function ChapterRoute({
  detailComic,
  detailChapterA,
}: itemProps) {
  const { currentChapter } = detailChapterA;
  const { comic } = detailComic;
  return (
    <>
      <MetaTags
        title={`${comic.name} - ${currentChapter.name} | MangaHay - Đọc truyện tranh mới nhất`}
        description={`Đọc truyện tranh ${comic.name} [${comic.anotherName}] - ${currentChapter.name}  vietsub, chất lượng cao, không quảng cáo tại mangahay.top`}
        image={comic.thumb}
        url={`https://mangahay.top/truyen/${comic.slug}/${currentChapter.slug}`}
      />
      <ChapterPage detailComic={detailComic} detailChapterA={detailChapterA} />
    </>
  );
}
