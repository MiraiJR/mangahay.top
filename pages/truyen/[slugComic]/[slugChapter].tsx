import ChapterPage from "@/applications/desktop/chapter-page/Page";
import MetaTags from "@/shared/components/MetaTags";
import { getNextPreAofChapterFromId } from "@/shared/helpers/ChapterHelper";
import { originalURL } from "@/shared/libs/config";
import ChapterService from "@/shared/services/chapterService";
import ComicService from "@/shared/services/comicService";

interface itemProps {
  detailComic: Comic;
  detailChapter: DetailChapter;
}

export async function getServerSideProps(context: any) {
  try {
    const { slugComic, slugChapter } = context.query;
    const { data: comic } = await ComicService.getComicBySlug(slugComic);
    const { data: chapter } = await ChapterService.getChapter(slugChapter);

    return {
      props: {
        detailComic: comic,
        detailChapter: getNextPreAofChapterFromId(chapter.id, comic.chapters),
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
        url={`${originalURL}/truyen/${detailComic.slug}/${currentChapter.slug}`}
      />
      <ChapterPage detailComic={detailComic} />
    </>
  );
}
