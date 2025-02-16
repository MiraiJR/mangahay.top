import { useTranslation } from "react-i18next";
import { AnswerEditor } from "../comments/AnswerEditor";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useAnswerCommentContext } from "@/shared/contexts/AnswerCommentEditorContext";
import { useGetListAnswerOfComment } from "@/shared/hooks/useGetListAnswerOfComment";
import { ChevronUp } from "lucide-react";
import { Mention } from "../base-components/mention/Mention";
import { formatDate } from "@/shared/helpers/formatter";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { globalStore } from "@/shared/stores/global-storage";

interface itemProps {
  comment: UserCommentResponse;
}
const CardComment = ({ comment }: itemProps) => {
  const { isMobile } = globalStore();
  const { t } = useTranslation();
  const { activeEditorId, setActiveEditorId } = useAnswerCommentContext();
  const { oppositeTheme } = useThemeContext();
  const isAnswerEditorVisible = activeEditorId
    ? activeEditorId === comment.id
    : false;

  const toggleAnswerEditor = () => {
    setActiveEditorId(isAnswerEditorVisible ? null : comment.id);
  };
  const { answers, fetchNextPage, reset } = useGetListAnswerOfComment(
    comment.id
  );

  return (
    <div className="flex gap-4 mb-5 mobile:text-xs">
      <div>
        <Avatar
          size={isMobile ? "small" : "large"}
          shape="square"
          src={comment.user?.avatar}
          icon={<UserOutlined />}
        />
      </div>
      <div className="flex flex-col w-[100%] h-fit">
        <div className="flex justify-between">
          <h2
            className={`font-bold text-lg mobile:text-xs text-${oppositeTheme}`}
            title={comment.user?.fullname}
          >
            {comment.user?.fullname ?? t("deletedUser", { ns: "common" })}
          </h2>
          <h2 className={`text-right mobile:text-xs text-${oppositeTheme}`}>
            {formatDate(comment.updatedAt)}
          </h2>
        </div>
        <div>
          {comment.mentionedUsers.map((mentionedUser) => (
            <Mention
              user={{
                ...mentionedUser,
                email: "",
              }}
              key={mentionedUser.id}
            />
          ))}
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
            fetchNextPage={fetchNextPage}
          />
        )}
        {!comment.parentCommentId &&
          comment.theNumberOfAnswer !== 0 &&
          answers.length === comment.theNumberOfAnswer && (
            <div
              className={`text-${oppositeTheme} cursor-pointer
               hover:text-blue-600 w-fit border-b-[1px] border-${oppositeTheme} hover:border-blue-600 mb-2 flex items-center`}
              onClick={() => {
                reset();
              }}
            >
              <span>{t("collapse", { ns: "common" })}</span>
              <ChevronUp />
            </div>
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
