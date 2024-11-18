import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useAnswerComment } from "@/shared/hooks/useAnswerComment";
import { Button } from "primereact/button";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useTranslation } from "react-i18next";

interface AnswerEditorProps {
  commentId: number;
  comicId: number;
  mentionedUserId: number | null;
  fetchNextPage: any;
}

export const AnswerEditor = ({
  commentId,
  comicId,
  mentionedUserId,
  fetchNextPage,
}: AnswerEditorProps) => {
  const { t } = useTranslation();
  const { oppositeTheme } = useThemeContext();
  const {
    contentAnswer,
    setContentAnswer,
    handleAnswerCommand,
    isSuccess,
    isLoading,
  } = useAnswerComment(comicId, commentId, mentionedUserId);

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
        <Button
          className="btn-primary w-fit mt-2 float-right"
          onClick={() => {
            handleAnswerCommand();
            if (isSuccess) {
              fetchNextPage();
            }
          }}
          disabled={isLoading}
          loading={isLoading}
        >
          {t("listComment.answer", { ns: "common" })}
        </Button>
      </div>
    </>
  );
};
