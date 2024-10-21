import dynamic from "next/dynamic";
import Head from "next/head";

const HomePage = dynamic(
  () => import("@/applications/desktop/home-page/Page"),
  { ssr: false }
);

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
