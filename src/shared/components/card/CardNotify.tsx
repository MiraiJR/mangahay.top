import { formatDate } from "@/shared/helpers/helpers";
import { cn } from "@/shared/libs/utils";
import { Link } from "react-router-dom";

interface itemProps {
  notify: Notify;
}

const CardNotify = ({ notify }: itemProps) => {
  return (
    <div
      className={cn("grid grid-cols-12 gap-4", {
        "bg-slate-400": notify.isRead,
      })}
    >
      <Link to={`/${notify.redirectUrl}`} lang="vi">
        <img className="col-span-2 col" src={notify.thumb} alt="" />
        <div className="col-span-10 flex flex-col">
          <h1 title={notify.title} className="capitalize font-bold text-md">
            {notify.title}
          </h1>
          <h2 title={notify.body} className="capitalize font-thin text-md">
            {notify.body}
          </h2>
          <span className="text-sm w-[100%] text-right">
            {formatDate(notify.createdAt)}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default CardNotify;
