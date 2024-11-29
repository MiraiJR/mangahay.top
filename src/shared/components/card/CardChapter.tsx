import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { isNewChapter } from "@/shared/helpers/ChapterHelper";
import { formatDate } from "@/shared/helpers/helpers";
import { Sparkle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

interface itemProps {
  chapter: Chapter;
}
const CardChapter = ({ chapter }: itemProps) => {
  const { theme, oppositeTheme } = useThemeContext();
  const router = useRouter();
  const { slugComic } = router.query;
  const isNew = isNewChapter(chapter.updatedAt);

  return (
    <Link
      rel="preload"
      href={`/truyen/${slugComic}/${chapter.slug}`}
      hrefLang="vi"
      title={`${chapter.slug}`}
      className={`flex flex-col bg-${theme} p-2 rounded-md text-${
        isNew ? "yellow-600" : oppositeTheme
      } border-${isNew ? "yellow-600" : oppositeTheme} border-[1px] relative`}
    >
      <h2
        title={chapter.name}
        className="font-bold text-lg capitalize mobile:text-sm"
      >
        {chapter.name}
      </h2>
      <h3 className="font-thin text-sm">{formatDate(chapter.updatedAt)}</h3>
      {isNew && (
        <Sparkle
          size={"30"}
          className=" text-yellow-600 absolute top-0 -translate-y-1/2 right-0 translate-x-1/2"
        />
      )}
    </Link>
  );
};

export default CardChapter;
