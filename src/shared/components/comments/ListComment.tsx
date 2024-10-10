import ListComments from "@/applications/desktop/comic-page/ListComments";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useComment } from "@/shared/hooks/useComment";
import { useListComment } from "@/shared/hooks/useListComment";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useContext } from "react";

interface ListCommentProps {
  comic: Comic;
}

export const ListComment = ({ comic }: ListCommentProps) => {
  const { comments } = useListComment(comic.id);
  const { contentComment, setContentComment, handleComment } = useComment(
    comic.id
  );
  const { oppositeTheme } = useContext(ThemeContext);

  return (
    <div className="col-span-8 mt-10 mobile:col-span-12">
      <div className="border-s-4 border-orange-500 pl-4 font-bold">
        <h2 className={`text-2xl mobile:text-xl text-${oppositeTheme}`}>
          Danh sách bình luận ({comments.length})
        </h2>
      </div>
      <Editor
        value={contentComment}
        onTextChange={(e: EditorTextChangeEvent) => {
          if (e.htmlValue) {
            setContentComment(e.htmlValue);
          }
        }}
        style={{ height: "100px" }}
        className="mt-10"
      />
      <div
        className="w-[100%]"
        onClick={() => {
          handleComment();
        }}
      >
        <button className="btn-primary w-fit mt-2 float-right">
          Bình luận
        </button>
      </div>
      <ListComments comments={comments} />
    </div>
  );
};
