import { cn } from "@/shared/libs/utils";
import themeStore from "@/shared/stores/themeStore";
import { useParams } from "react-router-dom";

interface itemProps {
  chapters: Chapter[];
}
const MenuChapter = ({ chapters }: itemProps) => {
  const { slugChapter } = useParams();

  return (
    <div
      className={`absolute w-max flex flex-col max-h-[400px] overflow-y-scroll top-13 right-0 translate-x-12 mobile:translate-x-6 scrollbar-hide bg-${themeStore.getOppositeTheme()} text-${themeStore.getTheme()} shadow-outer-lg-${themeStore.getOppositeTheme()}`}
    >
      {chapters.map((chapter) => (
        <a
          href={`${chapter.slug}`}
          className={cn(`py-4 px-10 mobile:py-2 mobile:px-5`, {
            "bg-yellow-400": slugChapter === chapter.slug,
          })}
          title={`${chapter.name} ${chapter.slug}`}
          key={chapter.id}
        >
          {chapter.name}
        </a>
      ))}
    </div>
  );
};

export default MenuChapter;
