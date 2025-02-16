import MetaTags from "@/shared/components/MetaTags";
import { originalURL } from "@/shared/libs/config";
import { Body } from "./Body";

const SearchPage = () => {
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
      <Body />
    </div>
  );
};

export default SearchPage;
