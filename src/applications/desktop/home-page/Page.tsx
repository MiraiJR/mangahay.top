"use client";

import dynamic from "next/dynamic";
import MyLoading from "@/shared/components/MyLoading";
import { useTranslation } from "react-i18next";
// import PageFacebookPlugin from "@/shared/components/socials/PageFacebookPlugin";

const SlideComicsComponent = dynamic(
  () => import("./components/slide-comic/SlideComics"),
  {
    loading: () => <MyLoading />,
  }
);
const BoxComicsComponent = dynamic(
  () => import("./components/box-comic/BoxComics"),
  {
    loading: () => <MyLoading />,
  }
);
const ListComicsRankingComponent = dynamic(
  () => import("./components/comic-ranking/ListComicsRanking"),
  {
    loading: () => <MyLoading />,
  }
);
const RecommendedComicsComponent = dynamic(
  () => import("./components/recommended-comic/RecommendedComics"),
  {
    loading: () => <MyLoading />,
  }
);

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <SlideComicsComponent />
      <div className="grid grid-cols-12 grid-rows-1 my-5 gap-3">
        <div className="col-span-8 mobile:col-span-12">
          <BoxComicsComponent
            title={t("homePage.newComicLabel", { ns: "common" })}
            field={"createdAt"}
          />
          <BoxComicsComponent
            title={t("homePage.newUpdatedComicLabel", { ns: "common" })}
            field={"updatedAt"}
          />
        </div>
        <div className="col-span-4 mobile:col-span-12 mobile:mb-10">
          <ListComicsRankingComponent
            title={t("homePage.trendComic", { ns: "common" })}
            field={"view"}
            amountComic={10}
          />
          {/* <PageFacebookPlugin /> */}
        </div>
      </div>
      <div>
        <RecommendedComicsComponent
          genre={"manga"}
          title={t("homePage.newJapanComic", { ns: "common" })}
        />
        <RecommendedComicsComponent
          genre={"manhwa"}
          title={t("homePage.newKoreaComic", { ns: "common" })}
        />
        <RecommendedComicsComponent
          genre={"manhua"}
          title={t("homePage.newChinaComic", { ns: "common" })}
        />
      </div>
    </div>
  );
};

export default HomePage;
