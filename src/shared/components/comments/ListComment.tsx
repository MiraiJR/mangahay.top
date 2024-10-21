import ListComments from "@/applications/desktop/comic-page/ListComments";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useListComment } from "@/shared/hooks/useListComment";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { CommentEditor } from "./CommentEditor";

interface ListCommentProps {
  comic: Comic;
}

export const ListComment = ({ comic }: ListCommentProps) => {
  const { comments } = useListComment(comic.id);
  const { oppositeTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

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
      <ListComments comments={comments} />
    </div>
  );
};
