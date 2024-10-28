import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useListComment } from "@/shared/hooks/useListComment";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { CommentEditor } from "./CommentEditor";
import CardComment from "../card/CardComment";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { THE_NUMBER_OF_COMMENTS_PER_PAGE } from "@/shared/settings/CommonConfig";
import { AnswerCommentEditorProvider } from "@/shared/contexts/AnswerCommentEditorContext";

interface ListCommentProps {
  comic: Comic;
}

export const ListComment = ({ comic }: ListCommentProps) => {
  const { comments, totalComment, setPage } = useListComment(comic.id);
  const { oppositeTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<number>(0);

  return (
    <div className="col-span-8 mt-10 mobile:col-span-12">
      <div className="border-s-4 border-orange-500 pl-4 font-bold">
        <h2 className={`text-2xl mobile:text-xl text-${oppositeTheme}`}>
          {t("listComment.label", {
            ns: "common",
            length: comments.length,
          })}
        </h2>
      </div>
      <CommentEditor comicId={comic.id} />
      <div className="flex flex-col mt-10 w-[100%] mobile:px-2">
        <AnswerCommentEditorProvider>
          <div className="mt-10">
            {comments.map((comment) => (
              <CardComment comment={comment} key={comment.id} />
            ))}
          </div>
        </AnswerCommentEditorProvider>
        {comments.length !== 0 && (
          <div className="card">
            <Paginator
              first={pagination}
              rows={THE_NUMBER_OF_COMMENTS_PER_PAGE}
              totalRecords={totalComment}
              onPageChange={(event: PaginatorPageChangeEvent) => {
                setPagination(event.first);
                setPage(event.page + 1);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
