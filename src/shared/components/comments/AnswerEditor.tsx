import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useAnswerComment } from "@/shared/hooks/useAnswerComment";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

interface AnswerEditorProps {
  commentId: number;
  comicId: number;
  mentionedUserId: number | null;
}

export const AnswerEditor = ({
  commentId,
  comicId,
  mentionedUserId,
}: AnswerEditorProps) => {
  const { t } = useTranslation();
  const { oppositeTheme } = useContext(ThemeContext);
  const { contentAnswer, setContentAnswer, handleAnswerCommand } =
    useAnswerComment(comicId, commentId, mentionedUserId);

  return (
    <>
      <Editor
        value={contentAnswer}
        onTextChange={(e: EditorTextChangeEvent) => {
          if (e.htmlValue) {
            setContentAnswer(e.htmlValue);
          }
        }}
        style={{ height: "100px" }}
        className={`mt-10 text-${oppositeTheme}`}
      />
      <div className="w-[100%]">
        <button
          className="btn-primary w-fit mt-2 float-right"
          onClick={() => handleAnswerCommand()}
        >
          {t("listComment.answer", { ns: "common" })}
        </button>
      </div>
    </>
  );
};
