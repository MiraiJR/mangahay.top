import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { cn } from "@/shared/libs/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext } from "react";

interface itemProps {
  chapters: Chapter[];
}
const MenuChapter = ({ chapters }: itemProps) => {
  const { slugChapter, slugComic } = useParams();
  const { theme, oppositeTheme } = useContext(ThemeContext);

  return (
    <div
      className={`z-[100] absolute w-max flex flex-col max-h-[400px]
       overflow-y-scroll top-13 right-0 translate-x-12 mobile:translate-x-6 
       scrollbar-hide bg-${oppositeTheme} text-${theme} shadow-outer-lg-${oppositeTheme}`}
    >
      {chapters.map((chapter) => (
        <Link
          rel="preload"
          href={`/truyen/${slugComic}/${chapter.slug}`}
          className={cn(`py-4 px-10 mobile:py-2 mobile:px-5`, {
            "bg-yellow-400": slugChapter === chapter.slug,
          })}
          title={`${chapter.name} ${chapter.slug}`}
          key={chapter.id}
        >
          {chapter.name}
        </Link>
      ))}
    </div>
  );
};

export default MenuChapter;
