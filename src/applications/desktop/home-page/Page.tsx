import { ThemeContext } from "@/shared/contexts/ThemeContext";
import BoxComics from "./BoxComics";
import ListComicsRanking from "./ListComicsRanking";
import RecommendedComics from "./RecommendedComics";
import SlideComics from "./SlideComics";
import { useContext } from "react";

const HomePage = () => {
  const {} = useContext(ThemeContext);

  return (
    <div>
      <SlideComics />
      <div className="grid grid-cols-12 grid-rows-1 my-5 gap-3">
        <div className="col-span-8 mobile:col-span-12">
          <BoxComics title={"Truyện mới"} field={"createdAt"} />
          <BoxComics title={"Truyện mới cập nhật"} field={"updatedAt"} />
        </div>
        <div className="col-span-4 mobile:col-span-12 mobile:mb-10">
          <ListComicsRanking
            title={"Top thịnh hành"}
            field={"view"}
            amountComic={10}
          />
        </div>
      </div>
      <div>
        <RecommendedComics genre={"manga"} title="Truyện Nhật" />
        <RecommendedComics genre={"manhwa"} title="Truyện Hàn" />
        <RecommendedComics genre={"manhua"} title="Truyện Trung Quốc" />
      </div>
    </div>
  );
};

export default HomePage;
