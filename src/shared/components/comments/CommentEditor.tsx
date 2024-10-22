import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useComment } from "@/shared/hooks/useComment";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

interface CommentEditorProps {
  comicId: number;
}

export const CommentEditor = ({ comicId }: CommentEditorProps) => {
  const { t } = useTranslation();
  const { contentComment, setContentComment, handleComment } =
    useComment(comicId);
  const { oppositeTheme } = useContext(ThemeContext);

  return (
    <>
      <Editor
        pt={{
          toolbar: {
            className: `bg-white`,
          },
        }}
        value={contentComment}
        onTextChange={(e: EditorTextChangeEvent) => {
          if (e.htmlValue) {
            setContentComment(e.htmlValue);
          }
        }}
        style={{ height: "100px" }}
        className={`mt-10 text-${oppositeTheme}`}
      />
      <div
        className="w-[100%]"
        onClick={() => {
          handleComment();
        }}
      >
        <button className="btn-primary w-fit mt-2 float-right">
          {t("listComment.comment", { ns: "common" })}
        </button>
      </div>
    </>
  );
};
