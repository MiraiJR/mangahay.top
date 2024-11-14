import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { cn } from "@/shared/libs/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

interface itemProps {
  chapters: Chapter[];
}

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const MenuChapter = ({ chapters }: itemProps) => {
  const { slugChapter = "", slugComic = "" } = useParams();
  const { theme, oppositeTheme } = useThemeContext();

  return (
    <motion.nav
      animate={"open"}
      variants={variants}
      className={`fixed left-0 top-0 flex flex-col z-auto bg-${theme} text-${oppositeTheme} h-screen border-r-2 border-red-600`}
    >
      {chapters.map((chapter) => (
        <Link
          rel="preload"
          href={`/truyen/${slugComic}/${chapter.slug}`}
          className={cn(
            `py-4 px-10 mobile:py-2 mobile:px-5 hover:bg-yellow-400`,
            {
              "bg-yellow-400": slugChapter === chapter.slug,
            }
          )}
          title={`${chapter.name} ${chapter.slug}`}
          key={chapter.id}
        >
          {chapter.name}
        </Link>
      ))}
    </motion.nav>
  );
};

export default MenuChapter;
