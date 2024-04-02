import ChapterPage from "@/applications/desktop/chapter-page/Page";
import MetaTags from "@/shared/components/MetaTags";
import { getNextPreAofChapterFromId } from "@/shared/helpers/ChapterHelper";
import { extractIdFromSlugChapter } from "@/shared/helpers/helpers";
import ComicService from "@/shared/services/comicService";

interface itemProps {
  detailComic: Comic;
  detailChapter: DetailChapter;
}

export async function getServerSideProps(context: any) {
  try {
    const { slugComic, slugChapter } = context.query;
    const { data: comic } = await ComicService.getComicBySlug(slugComic);
    const currentChapterId = extractIdFromSlugChapter(slugChapter as string);

    return {
      props: {
        detailComic: comic,
        detailChapter: getNextPreAofChapterFromId(
          currentChapterId,
          comic.chapters
        ),
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
  detailChapter,
}: itemProps) {
  const { currentChapter } = detailChapter;
  return (
    <>
      <MetaTags
        title={`${detailComic.name} - ${currentChapter.name} | MangaHay - Đọc truyện tranh mới nhất`}
        description={`Đọc truyện tranh ${detailComic.name} [${detailComic.anotherName}] - ${currentChapter.name}  vietsub, chất lượng cao, không quảng cáo tại mangahay.top`}
        image={detailComic.thumb}
        url={`https://mangahay.top/truyen/${detailComic.slug}/${currentChapter.slug}`}
      />
      <ChapterPage detailComic={detailComic} detailChapterA={detailChapter} />
    </>
  );
}
