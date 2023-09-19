import { formatDate } from "@/shared/helpers/helpers";
import { Avatar } from "primereact/avatar";
import CardAnswer from "./CardAnswer";
import themeStore from "@/shared/stores/themeStore";

interface itemProps {
  comment: UserComment;
}
const CardComment = ({ comment }: itemProps) => {
  return (
    <div className="flex gap-4">
      <Avatar image={comment.user.avatar} label="P" size="xlarge" />
      <div className="flex flex-col w-[100%]">
        <div className="flex justify-between">
          <h1
            className={`font-bold text-lg mobile:text-sm text-${themeStore.getOppositeTheme()}`}
            title={comment.user.fullname}
          >
            {comment.user.fullname}
          </h1>
          <h2
            className={`text-right mobile:text-sm text-${themeStore.getOppositeTheme()}`}
          >
            {formatDate(comment.updatedAt)}
          </h2>
        </div>
        <h2
          className={`text-${themeStore.getOppositeTheme()}`}
          title={comment.content}
          dangerouslySetInnerHTML={{ __html: comment.content }}
        ></h2>
        <div className="text-blue-600 text-right cursor-pointer">Trả lời</div>
        <div>
          {comment.answers.map((answer) => (
            <CardAnswer answer={answer} key={answer.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardComment;
