import { ListComment } from "@/shared/components/comments/ListComment";
import { t } from "i18next";
import { usePageContext } from "./Context";
import { ListChapterImage } from "./ListChapterImage";
import { NavigationChapter } from "./NavigationChapter";
import { ListComicOfAuthor } from "@/shared/components/list/ListComicOfAuthor";
import { ListRankComic } from "@/shared/components/list/ListRankComic";

export const Body = () => {
  const { comic, chapter } = usePageContext();

  return (
    <div className="mobile:text-xs">
      {comic && chapter && (
        <>
          <NavigationChapter />
          <ListChapterImage />
          <NavigationChapter />
          <div className="retive grid grid-cols-12 gap-4">
            <ListComment comicId={comic.id} />
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
      )}
    </div>
  );
};
