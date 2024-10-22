import { formatDate, reduceQualityImage } from "@/shared/helpers/helpers";
import { Avatar } from "primereact/avatar";
import { useTranslation } from "react-i18next";
import { AnswerEditor } from "../comments/AnswerEditor";
import { useContext, useState } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";

interface itemProps {
  comment: UserCommentResponse;
}
const CardComment = ({ comment }: itemProps) => {
  const { t } = useTranslation();
  const [showAnswerEditor, setShowAnswerEditor] = useState<boolean>(false);
  const { oppositeTheme } = useContext(ThemeContext);

  return (
    <div className="flex gap-4">
      <Avatar
        icon="pi pi-user"
        image={comment.user?.avatar}
        label="P"
        size="xlarge"
      />
      <div className="flex flex-col w-[100%]">
        <div className="flex justify-between">
          <h2
            className={`font-bold text-lg mobile:text-sm text-${oppositeTheme}`}
            title={comment.user?.fullname}
          >
            {comment.user?.fullname ?? t("deletedUser", { ns: "common" })}
          </h2>
          <h2 className={`text-right mobile:text-sm text-${oppositeTheme}`}>
            {formatDate(comment.updatedAt)}
          </h2>
        </div>
        <div>
          {comment.mentionedUser && (
            <span className="text-red-600 mr-2">
              @{comment.mentionedUser.fullname}
            </span>
          )}
          <span
            className={`text-${oppositeTheme}`}
            title={comment.content}
            dangerouslySetInnerHTML={{ __html: comment.content }}
          ></span>
        </div>
        <div className="flex justify-end">
          <button
            className="text-blue-600 text-right cursor-pointer w-fit"
            onClick={() => {
              setShowAnswerEditor(!showAnswerEditor);
            }}
          >
            {t("listComment.answer", { ns: "common" })}
          </button>
        </div>
        {showAnswerEditor && (
          <AnswerEditor
            commentId={comment.parentCommentId ?? comment.id}
            comicId={comment.comicId}
            mentionedUserId={comment.user?.id ?? null}
          />
        )}
        <div>
          {comment.answers.map((answer) => (
            <CardComment comment={answer} key={answer.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardComment;
