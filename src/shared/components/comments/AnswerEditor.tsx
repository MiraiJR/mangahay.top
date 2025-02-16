import { useAnswerComment } from "@/shared/hooks/useAnswerComment";
import { useTranslation } from "react-i18next";
import { RichTextEditor } from "../base-components/rich-text-editor/RichTextEditor";
import { useAuthContext } from "@/shared/contexts/AuthContext";
import { Button } from "antd";

interface AnswerEditorProps {
  commentId: number;
  comicId: number;
  fetchNextPage: any;
}

export const AnswerEditor = ({
  commentId,
  comicId,
  fetchNextPage,
}: AnswerEditorProps) => {
  const { t } = useTranslation();
  const {
    contentAnswer,
    setContentAnswer,
    handleAnswerCommand,
    isSuccess,
    isLoading,
    onSelectMentionUser,
    mentionUserIds,
  } = useAnswerComment(comicId, commentId);
  const { loggedInUserId } = useAuthContext();

  return (
    <div>
      <RichTextEditor
        value={contentAnswer}
        onTextChange={(value: string) => {
          setContentAnswer(value);
        }}
        showMention
        onSelectMentionUser={(value: number) => {
          onSelectMentionUser(value);
        }}
        selectedMentionUserIds={[...mentionUserIds, loggedInUserId]}
      />
      <div className="w-[100%]">
        <Button
          color="primary"
          variant="solid"
          className="w-fit mt-2 float-right mobile:text-xs"
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
    </div>
  );
};
