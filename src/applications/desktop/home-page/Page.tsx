import SlideComics from "./components/slide-comic/SlideComics";
import BoxComics from "./components/box-comic/BoxComics";
import ListComicsRanking from "./components/comic-ranking/ListComicsRanking";
import RecommendedComics from "./components/recommended-comic/RecommendedComics";
import { useTranslation } from "react-i18next";
// import PageFacebookPlugin from "@/shared/components/socials/PageFacebookPlugin";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <SlideComics />
      <div className="grid grid-cols-12 grid-rows-1 my-5 gap-3">
        <div className="col-span-8 mobile:col-span-12">
          <BoxComics
            title={t("homePage.newComicLabel", { ns: "common" })}
            field={"createdAt"}
          />
          <BoxComics
            title={t("homePage.newUpdatedComicLabel", { ns: "common" })}
            field={"updatedAt"}
          />
        </div>
        <div className="col-span-4 mobile:col-span-12 mobile:mb-10">
          <ListComicsRanking
            title={t("homePage.trendComic", { ns: "common" })}
            field={"view"}
            amountComic={10}
          />
          {/* <PageFacebookPlugin /> */}
        </div>
      </div>
      <div>
        <RecommendedComics
          genre={"manga"}
          title={t("homePage.newJapanComic", { ns: "common" })}
        />
        <RecommendedComics
          genre={"manhwa"}
          title={t("homePage.newKoreaComic", { ns: "common" })}
        />
        <RecommendedComics
          genre={"manhua"}
          title={t("homePage.newChinaComic", { ns: "common" })}
        />
      </div>
    </div>
  );
};

export default HomePage;
