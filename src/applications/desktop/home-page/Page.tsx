"use client";

import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useContext } from "react";
import dynamic from "next/dynamic";
import MyLoading from "@/shared/components/MyLoading";

const SlideComicsComponent = dynamic(() => import("./SlideComics"), {
  loading: () => <MyLoading />,
});
const BoxComicsComponent = dynamic(() => import("./BoxComics"), {
  loading: () => <MyLoading />,
});
const ListComicsRankingComponent = dynamic(
  () => import("./ListComicsRanking"),
  {
    loading: () => <MyLoading />,
  }
);
const RecommendedComicsComponent = dynamic(
  () => import("./RecommendedComics"),
  {
    loading: () => <MyLoading />,
  }
);

const HomePage = () => {
  const {} = useContext(ThemeContext);

  return (
    <div>
      <SlideComicsComponent />
      <div className="grid grid-cols-12 grid-rows-1 my-5 gap-3">
        <div className="col-span-8 mobile:col-span-12">
          <BoxComicsComponent title={"Truyện mới"} field={"createdAt"} />
          <BoxComicsComponent
            title={"Truyện mới cập nhật"}
            field={"updatedAt"}
          />
        </div>
        <div className="col-span-4 mobile:col-span-12 mobile:mb-10">
          <ListComicsRankingComponent
            title={"Top thịnh hành"}
            field={"view"}
            amountComic={10}
          />
        </div>
      </div>
      <div>
        <RecommendedComicsComponent genre={"manga"} title="Truyện Nhật" />
        <RecommendedComicsComponent genre={"manhwa"} title="Truyện Hàn" />
        <RecommendedComicsComponent
          genre={"manhua"}
          title="Truyện Trung Quốc"
        />
      </div>
    </div>
  );
};

export default HomePage;
