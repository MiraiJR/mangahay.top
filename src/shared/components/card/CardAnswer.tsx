import { formatDate } from "@/shared/helpers/helpers";
import { Avatar } from "primereact/avatar";

interface itemProps {
  answer: Answer;
}
const CardAnswer = ({ answer }: itemProps) => {
  return (
    <div className="flex gap-4 mt-5">
      <Avatar image={answer.user.avatar} label="P" size="xlarge" />
      <div className="flex flex-col w-[100%]">
        <div className="flex justify-between">
          <h1 className="font-bold text-lg" title={answer.user.fullname}>
            {answer.user.fullname}
          </h1>
          <h2 className="text-right">{formatDate(answer.updatedAt)}</h2>
        </div>
        <h2 title={answer.content}>
          <span className="text-red-600 mr-2">@{answer.mentionedPerson}</span>
          <span
            title={answer.content}
            dangerouslySetInnerHTML={{ __html: answer.content }}
          ></span>
        </h2>
        <div className="text-blue-600 text-right cursor-pointer">Trả lời</div>
      </div>
    </div>
  );
};

export default CardAnswer;
