import { useContext, useRef, useState } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import dynamic from "next/dynamic";
import MyLoading from "@/shared/components/MyLoading";
import MetaTags from "@/shared/components/MetaTags";

const BoxSearch = dynamic(() => import("./BoxSearch"));
const ListComics = dynamic(
  () => import("../../../shared/components/ListComics")
);

const SearchPage = () => {
  const resultRef = useRef<any>(null);
  const [comics, setComics] = useState<Comic[] | null>(null);
  const {} = useContext(ThemeContext);

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
      <BoxSearch resultRef={resultRef} setComics={setComics} />
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
