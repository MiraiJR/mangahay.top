import MetaTags from "@/shared/components/MetaTags";
import { originalURL } from "@/shared/libs/config";
import ComicService from "@/shared/services/comicService";
import dynamic from "next/dynamic";

interface itemProps {
  genres: Genre[];
  currentGenre: string;
  comics: Comic[];
}

const ListComicsPage = dynamic(
  () => import("@/applications/desktop/list-comics-page/Page")
);

export async function getServerSideProps(context: any) {
  try {
    const comics = await ComicService.searchComics({
      filterGenres: [context.query.genre],
      page: 1,
      limit: 10000000,
    });

    return {
      props: {
        comics: comics.data.comics,
        currentGenre: context.query.genre,
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

export default function GenreRoute({ currentGenre, comics }: itemProps) {
  return (
    <>
      <MetaTags
        title={`Thể loại - ${currentGenre.toLocaleUpperCase()} | MangaHay - Web truyện tranh mới nhất`}
        description={`Đọc truyện thể loại ${currentGenre} vietsub, chất lượng cao, không quản cáo tai mangahay.top`}
        url={`${originalURL}/the-loại/${currentGenre}`}
        image=""
      />
      <ListComicsPage dataComics={comics} />;
    </>
  );
}
