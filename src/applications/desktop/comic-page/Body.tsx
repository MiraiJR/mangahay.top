import { ListComment } from "@/shared/components/comments/ListComment";
import { useTranslation } from "react-i18next";
import { usePageContext } from "./Context";
import { Description } from "./component/Description";
import ListChapters from "./component/ListChapters";
import { ListComicOfAuthor } from "@/shared/components/list/ListComicOfAuthor";
import { ListRankComic } from "@/shared/components/list/ListRankComic";

export const Body = () => {
  const { t } = useTranslation();
  const { comic } = usePageContext();

  return (
    <>
      <Description />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 mt-10 mobile:col-span-12">
          <ListChapters chapters={comic.chapters} />
          <ListComment comicId={comic.id} />
        </div>
        <div className="col-span-4 mt-10 mobile:col-span-12">
          <ListComicOfAuthor
            title={t("comicWithTheSameAuthor", { ns: "common" })}
            author={comic.authors[0]}
          />
          <ListRankComic
            title={t("newestMangaga", { ns: "common" })}
            field={"createdAt"}
            amountComic={5}
          />
        </div>
      </div>
    </>
  );
};
