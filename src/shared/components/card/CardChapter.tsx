import { formatDate } from "@/shared/helpers/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface itemProps {
  chapter: Chapter;
}
const CardChapter = ({ chapter }: itemProps) => {
  const router = useRouter();
  const { slugComic } = router.query;

  return (
    <Link
      rel="preload"
      href={`/truyen/${slugComic}/${chapter.slug}`}
      hrefLang="vi"
      title={`${chapter.slug}`}
      className="flex flex-col bg-slate-200 p-2 rounded-md"
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
