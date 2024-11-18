import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import MetaTags from "@/shared/components/MetaTags";
import { originalURL } from "@/shared/libs/config";
import { useTranslation } from "react-i18next";

const BoxSearch = dynamic(() => import("./BoxSearch"), { ssr: false });
const ListComics = dynamic(
  () => import("@/shared/components/list-comics/ListComics"),
  { ssr: false }
);

const SearchPage = () => {
  const resultRef = useRef<any>(null);
  const [comics, setComics] = useState<Comic[]>([]);
  const { t } = useTranslation();

  return (
    <div>
      <MetaTags
        title={"Tìm kiếm truyện"}
        description={
          "Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày. Đa dạng thể loại từ manga (truyện Nhật), manhwa (truyện Hàn), manhua (Truyện trung)."
        }
        image={""}
        url={`${originalURL}/tim-kiem`}
      />
      <BoxSearch resultRef={resultRef} setComics={setComics} />
      <div ref={resultRef}>
        <ListComics
          title={t("searchResult", { ns: "search" })}
          comics={comics}
        />
      </div>
    </div>
  );
};

export default SearchPage;
