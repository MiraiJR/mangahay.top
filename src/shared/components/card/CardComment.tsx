import { formatDate } from "@/shared/helpers/helpers";
import { Avatar } from "primereact/avatar";
import { useTranslation } from "react-i18next";
import { AnswerEditor } from "../comments/AnswerEditor";
import { useContext } from "react";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useAnswerCommentContext } from "@/shared/contexts/AnswerCommentEditorContext";
import { useGetListAnswerOfComment } from "@/shared/hooks/useGetListAnswerOfComment";

interface itemProps {
  comment: UserCommentResponse;
}
const CardComment = ({ comment }: itemProps) => {
  const { t } = useTranslation();
  const { activeEditorId, setActiveEditorId } = useAnswerCommentContext();
  const { oppositeTheme } = useContext(ThemeContext);
  const isAnswerEditorVisible = activeEditorId
    ? activeEditorId === comment.id
    : false;

  const toggleAnswerEditor = () => {
    setActiveEditorId(isAnswerEditorVisible ? null : comment.id);
  };
  const { answers, fetchNextPage } = useGetListAnswerOfComment(comment.id);

  return (
    <div className="flex gap-4 mb-5">
      <div>
        <Avatar
          pt={{
            image: {
              className: "object-cover rounded",
            },
          }}
          icon="pi pi-user"
          image={comment.user?.avatar}
          label="P"
          size="xlarge"
        />
      </div>
      <div className="flex flex-col w-[100%] h-fit">
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
              toggleAnswerEditor();
            }}
          >
            {t("listComment.answer", { ns: "common" })}
          </button>
        </div>

        {isAnswerEditorVisible && (
          <AnswerEditor
            commentId={comment.parentCommentId ?? comment.id}
            comicId={comment.comicId}
            mentionedUserId={comment.user?.id ?? null}
            fetchNextPage={fetchNextPage}
          />
        )}
        <div>
          {answers.map((answer) => (
            <CardComment comment={answer} key={answer.id} />
          ))}
        </div>
        {!comment.parentCommentId &&
          answers.length !== comment.theNumberOfAnswer && (
            <div
              className={`text-${oppositeTheme} cursor-pointer
             hover:text-blue-600 w-fit border-b-[1px] border-${oppositeTheme} hover:border-blue-600 mb-2`}
              onClick={() => {
                fetchNextPage();
              }}
            >
              {t("listComment.viewListAnswer", {
                ns: "common",
                length: comment.theNumberOfAnswer - answers.length,
              })}
            </div>
          )}
      </div>
    </div>
  );
};

export default CardComment;
