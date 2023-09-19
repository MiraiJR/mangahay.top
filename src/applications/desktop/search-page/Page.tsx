import { useEffect, useRef, useState } from "react";
import BoxSearch from "./BoxSearch";
import ListComics from "./ListComics";
import { Helmet } from "react-helmet";

const SearchPage = () => {
  const resultRef = useRef<any>(null);
  const [comics, setComics] = useState<Comic[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const genres =
      currentUrl.searchParams.get("filterGenres")?.split(",") ?? [];
    setSelectedGenres(genres);
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Tìm kiếm truyện`}</title>
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
        <meta property="og:site_name" content="MangaHay"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://mangahay.top"></meta>
      </Helmet>
      <BoxSearch
        resultRef={resultRef}
        setComics={setComics}
        selectedGenres={selectedGenres}
      />
      <div ref={resultRef}>
        <ListComics title="Kết quả tìm kiếm" comics={comics} />
      </div>
    </div>
  );
};

export default SearchPage;
