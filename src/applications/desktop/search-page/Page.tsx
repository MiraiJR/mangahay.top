import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import dynamic from "next/dynamic";
import MyLoading from "@/shared/components/MyLoading";
import MetaTags from "@/shared/components/MetaTags";

const BoxSearch = dynamic(() => import("./BoxSearch"));
const ListComics = dynamic(() => import("./ListComics"));

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
      <MetaTags
        title={"Tìm kiếm truyện"}
        description={
          "Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày. Đa dạng thể loại từ manga (truyện Nhật), manhwa (truyện Hàn), manhua (Truyện trung)."
        }
        image={""}
        url={"https://mangahay.top/tim-kiem"}
      />
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
          <MyLoading />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
