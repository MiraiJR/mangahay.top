import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { formatDate } from "@/shared/helpers/helpers";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

interface itemProps {
  chapter: Chapter;
}
const CardChapter = ({ chapter }: itemProps) => {
  const { theme, oppositeTheme } = useContext(ThemeContext);
  const router = useRouter();
  const { slugComic } = router.query;

  return (
    <Link
      rel="preload"
      href={`/truyen/${slugComic}/${chapter.slug}`}
      hrefLang="vi"
      title={`${chapter.slug}`}
      className={`flex flex-col bg-${theme} p-2 rounded-md text-${oppositeTheme} border-${oppositeTheme} border-[1px]`}
    >
      <h2
        title={chapter.name}
        className="font-bold text-lg capitalize mobile:text-sm"
      >
        {chapter.name}
      </h2>
      <h3 className="font-thin text-sm">{formatDate(chapter.updatedAt)}</h3>
    </Link>
  );
};

export default CardChapter;
