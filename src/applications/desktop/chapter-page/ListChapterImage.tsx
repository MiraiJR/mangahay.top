import EmptyComic from "@/shared/components/EmptyComic";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { usePageContext } from "./Context";
import { ChapterViewTypeIndex } from "./chapter-view-type";

export const ListChapterImage = () => {
  const { t } = useTranslation();
  const { theme, oppositeTheme } = useThemeContext();
  const { comic, chapter } = usePageContext();

  return (
    <div
      className={`flex flex-col items-center justify-center m-5 bg-${theme}`}
    >
      {chapter?.images ? (
        <ChapterViewTypeIndex />
      ) : (
        <EmptyComic content="Không có ảnh!" />
      )}

      <div
        className={`text-${oppositeTheme} w-[100%] bg-${theme} p-4 text-xl text-center border-${oppositeTheme} border-[1px] mobile:text-xs mt-1`}
      >
        <div>{t("endChapter", { ns: "chapter" })}</div>
        <h2>
          {t("recommendedFollowTranslator", {
            ns: "chapter",
            translator: comic?.translators.join(", "),
          })}
        </h2>
      </div>
    </div>
  );
};
