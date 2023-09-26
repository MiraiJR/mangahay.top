import { useContext, useEffect, useRef, useState } from "react";
import BoxSearch from "./BoxSearch";
import ListComics from "./ListComics";
import { Helmet } from "react-helmet";
import { ProgressSpinner } from "primereact/progressspinner";
import { ThemeContext } from "@/shared/contexts/ThemeContext";

const SearchPage = () => {
  const resultRef = useRef<any>(null);
  const [comics, setComics] = useState<Comic[] | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const {} = useContext(ThemeContext);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const genres =
      currentUrl.searchParams.get("filterGenres")?.split(",") ?? [];
    const author = currentUrl.searchParams.get("filterAuthor") ?? null;

    if (author) {
      setSelectedAuthor(author);
    }

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
        selectedAuthor={selectedAuthor}
      />
      <div ref={resultRef}>
        {comics ? (
          <ListComics title="Kết quả tìm kiếm" comics={comics} />
        ) : (
          <div className="flex items-center justify-center w-[100%] col-span-12">
            <ProgressSpinner
              style={{ width: "100px", height: "100px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
