import { formatDate } from "@/shared/helpers/helpers";
import { Link } from "react-router-dom";

interface itemProps {
  chapter: Chapter;
}
const CardChapter = ({ chapter }: itemProps) => {
  return (
    <Link
      to={`${chapter.slug}`}
      className="flex flex-col bg-slate-200 p-2 rounded-md"
    >
      <h1
        title={chapter.name}
        className="font-bold text-lg capitalize mobile:text-sm"
      >
        {chapter.name}
      </h1>
      <h1 className="font-thin text-sm">{formatDate(chapter.updatedAt)}</h1>
    </Link>
  );
};

export default CardChapter;
