import CardChapter from "@/shared/components/card/CardChapter";
import themeStore from "@/shared/stores/themeStore";

interface itemProps {
  chapters: Chapter[];
}
const ListChapters = ({ chapters }: itemProps) => {
  return (
    <div>
      <div className="border-s-4 border-orange-500 pl-4 font-bold">
        <div
          className={`text-2xl mobile:text-xl text-${themeStore.getOppositeTheme()}`}
        >
          Danh sách chương ({chapters.length})
        </div>
      </div>
      <div className="grid grid-cols-3 mobile:grid-cols-2 gap-3 mt-5 max-h-[800px] overflow-y-scroll">
        {chapters.map((chapter) => (
          <CardChapter chapter={chapter} key={chapter.id} />
        ))}
      </div>
    </div>
  );
};

export default ListChapters;
