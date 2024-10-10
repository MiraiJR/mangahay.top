import CardChapter from "@/shared/components/card/CardChapter";
import EmptyComic from "@/shared/components/EmptyComic";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

interface itemProps {
  chapters: Chapter[];
}
const ListChapters = ({ chapters }: itemProps) => {
  const { oppositeTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <div>
      <div className="border-s-4 border-orange-500 pl-4 font-bold">
        <div className={`text-2xl mobile:text-xl text-${oppositeTheme}`}>
          {t("listChapter.label", { ns: "chapter" })} ({chapters.length})
        </div>
      </div>
      {chapters.length === 0 ? (
        <EmptyComic content="Không có chương!" />
      ) : (
        <div className="grid grid-cols-3 mobile:grid-cols-2 gap-3 mt-5 max-h-[800px] overflow-y-scroll">
          {chapters.map((chapter) => (
            <CardChapter chapter={chapter} key={chapter.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListChapters;
