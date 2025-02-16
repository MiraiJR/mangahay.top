import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useListComment } from "@/shared/hooks/useListComment";
import { useTranslation } from "react-i18next";
import { CommentEditor } from "./CommentEditor";
import CardComment from "../card/CardComment";
import { AnswerCommentEditorProvider } from "@/shared/contexts/AnswerCommentEditorContext";
import { Pagination, PaginationProps } from "antd";

interface ListCommentProps {
  comicId: number;
}

export const ListComment = ({ comicId }: ListCommentProps) => {
  const { comments, totalComment, setPage, page, size } =
    useListComment(comicId);
  const { oppositeTheme } = useThemeContext();
  const { t } = useTranslation();
  const onChange: PaginationProps["onChange"] = (page) => {
    setPage(page);
  };

  return (
    <div className="col-span-8 mt-10 mobile:col-span-12 mobile:text-xs">
      <div className="border-s-4 border-orange-500 pl-4 font-bold">
        <h2 className={`text-2xl mobile:text-sm text-${oppositeTheme}`}>
          {t("listComment.label", {
            ns: "common",
            length: totalComment,
          })}
        </h2>
      </div>
      <CommentEditor comicId={comicId} />
      <div className="flex flex-col mt-10 w-[100%] mobile:px-2">
        <AnswerCommentEditorProvider>
          <div className="mt-10">
            {comments.map((comment) => (
              <CardComment comment={comment} key={comment.id} />
            ))}
          </div>
        </AnswerCommentEditorProvider>
        {comments.length !== 0 && (
          <Pagination
            align="center"
            current={page}
            onChange={onChange}
            total={totalComment}
            pageSize={size}
          />
        )}
      </div>
    </div>
  );
};
