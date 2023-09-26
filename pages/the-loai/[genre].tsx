import ListComicsPage from "@/applications/desktop/list-comics-page/Page";
import MetaTags from "@/shared/components/MetaTags";
import ComicService from "@/shared/services/comicService";
import { useParams } from "next/navigation";
import { useEffect } from "react";

interface itemProps {
  genres: Genre[];
  currentGenre: string;
  comics: Comic[];
}

export async function getServerSideProps(context: any) {
  try {
    const genres = await ComicService.getGenres();
    const comics = await ComicService.searchComics({
      filterGenres: [context.query.genre],
      page: 1,
      limit: 10000000,
    });

    return {
      props: {
        genres: genres.data,
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

export default function GenreRoute({
  genres,
  currentGenre,
  comics,
}: itemProps) {
  return (
    <>
      <MetaTags
        title={`Thể loại - ${currentGenre.toLocaleUpperCase()} | MangaHay - Web truyện tranh mới nhất`}
        description={`Đọc truyện thể loại ${currentGenre} vietsub, chất lượng cao, không quản cáo tai mangahay.top`}
        url={`https://mangahay.top/the-loại/${currentGenre}`}
        image=""
      />
      <ListComicsPage genres={genres} dataComics={comics} />;
    </>
  );
}
