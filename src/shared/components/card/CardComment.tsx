import { formatDate, reduceQualityImage } from "@/shared/helpers/helpers";
import { Avatar } from "primereact/avatar";
import themeStore from "@/shared/stores/theme-storage";
import { useTranslation } from "react-i18next";
import { useAnswerComment } from "@/shared/hooks/useAnswerComment";
import { AnswerEditor } from "../comments/AnswerEditor";
import { useState } from "react";

interface itemProps {
  comment: UserCommentResponse;
}
const CardComment = ({ comment }: itemProps) => {
  const { t } = useTranslation();
  const [showAnswerEditor, setShowAnswerEditor] = useState<boolean>(false);

  return (
    <div className="flex gap-4">
      <Avatar
        image={reduceQualityImage(comment.user.avatar)}
        label="P"
        size="xlarge"
      />
      <div className="flex flex-col w-[100%]">
        <div className="flex justify-between">
          <h2
            className={`font-bold text-lg mobile:text-sm text-${themeStore.getOppositeTheme()}`}
            title={comment.user.fullname}
          >
            {comment.user.fullname}
          </h2>
          <h2
            className={`text-right mobile:text-sm text-${themeStore.getOppositeTheme()}`}
          >
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
            className={`text-${themeStore.getOppositeTheme()}`}
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
            mentionedUserId={comment.user.id}
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
