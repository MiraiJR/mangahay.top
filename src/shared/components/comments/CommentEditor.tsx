import { useComment } from "@/shared/hooks/useComment";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { RichTextEditor } from "../base-components/rich-text-editor/RichTextEditor";
import { useAuthContext } from "@/shared/contexts/AuthContext";

interface CommentEditorProps {
  comicId: number;
}

export const CommentEditor = ({ comicId }: CommentEditorProps) => {
  const { t } = useTranslation();
  const {
    contentComment,
    setContentComment,
    handleComment,
    isLoading,
    mentionUserIds,
    onSelectMentionUser,
  } = useComment(comicId);
  const { loggedInUserId } = useAuthContext();

  return (
    <>
      <RichTextEditor
        value={contentComment}
        onTextChange={(value: string) => {
          setContentComment(value);
        }}
        showMention
        onSelectMentionUser={onSelectMentionUser}
        selectedMentionUserIds={[...mentionUserIds, loggedInUserId]}
      />
      <div
        className="w-[100%]"
        onClick={() => {
          handleComment();
        }}
      >
        <Button
          color="primary"
          variant="solid"
          className="btn-primary w-fit mt-2 float-right mobile:text-xs"
          loading={isLoading}
        >
          {t("listComment.comment", { ns: "common" })}
        </Button>
      </div>
    </>
  );
};
