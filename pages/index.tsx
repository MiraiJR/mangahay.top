import HomePage from "@/applications/desktop/home-page/Page";
import comicService from "@/shared/services/comicService";
import Head from "next/head";

export async function getServerSideProps(context: any) {
  try {
    const rankingView = await comicService.getRankingComics("view", 1000);
    const rankingCreatedAt = await comicService.getRankingComics(
      "createdAt",
      1000
    );
    const rankingUpdatedAt = await comicService.getRankingComics(
      "updatedAt",
      1000
    );
    const mangaComics = await comicService.searchComics({
      filterGenres: ["manga"],
      page: 1,
      limit: 1000,
    });
    const manhuaComics = await comicService.searchComics({
      filterGenres: ["manhua"],
      page: 1,
      limit: 1000,
    });
    const manhwaComics = await comicService.searchComics({
      filterGenres: ["manhwa"],
      page: 1,
      limit: 1000,
    });

    return {
      props: {
        comicsForSlide: rankingView.data,
        newestCreatedComics: rankingCreatedAt.data,
        newestUpdatedComics: rankingUpdatedAt.data,
        mangaComics: mangaComics.data.comics,
        manhuaComics: manhuaComics.data.comics,
        manhwaComics: manhwaComics.data.comics,
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

export default function HomeRoute() {
  return (
    <>
      <Head>
        <title>MangaHay - Trang web đọc truyện tranh mới nhất</title>
        <meta
          name="description"
          content="Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày. Đa dạng thể loại từ manga (truyện Nhật), manhwa (truyện Hàn), manhua (Truyện trung)."
        />
        <meta
          name="keywords"
          content="1 tranh online1 mangahay truyn1 tranh mi1 nhtng nhptt1 truyn quyn1 manghaytop1 quyn1 manghaytop1 c truyn tranh1 online mangahay truyn1 tranh mi nhtng1 nhptt truyn quyn1 manghaytop1 manghaytop1 quyn1 manghaytop1 c truyn tranh online1 mangahay truyn tranh mi1 nhtng nhptt truyn quyn1 manghaytop1 manghaytop1 manghaytop1 quyn1 manghaytop"
        />
        <meta
          property="og:title"
          content="Đọc truyện tranh online - Mangahay - Truyện tranh mới nhất"
        />
      </Head>
      <HomePage />
    </>
  );
}
