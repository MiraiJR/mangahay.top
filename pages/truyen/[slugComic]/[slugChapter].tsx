import ChapterPage from "@/applications/desktop/chapter-page/Page";
import MetaTags from "@/shared/components/MetaTags";
import { getNextPreAofChapterFromId } from "@/shared/helpers/chapter";
import { originalURL } from "@/shared/libs/config";
import ChapterService from "@/shared/services/chapterService";
import ComicService from "@/shared/services/comicService";

interface RouteProps {
  comic: Comic;
  chapter: DetailChapter;
}

export async function getServerSideProps(context: any) {
  try {
    const { slugComic, slugChapter } = context.query;
    const { data: comic } = await ComicService.getComicBySlug(slugComic);
    const { data: chapter } = await ChapterService.getChapter(slugChapter);

    return {
      props: {
        comic,
        chapter: getNextPreAofChapterFromId(chapter.id, comic.chapters),
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
}

export default function ChapterRoute({ comic, chapter }: RouteProps) {
  const { currentChapter } = chapter;

  return (
    <>
      <MetaTags
        title={`${comic.name} - ${currentChapter.name} | MangaHay - Đọc truyện tranh mới nhất`}
        description={`Đọc truyện tranh ${comic.name} [${comic.anotherName}] - ${currentChapter.name}  vietsub, chất lượng cao, không quảng cáo tại mangahay.top`}
        image={comic.thumb}
        url={`${originalURL}/truyen/${comic.slug}/${currentChapter.slug}`}
      />
      <ChapterPage />
    </>
  );
}
