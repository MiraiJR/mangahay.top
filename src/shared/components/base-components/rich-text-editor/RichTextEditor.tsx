import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useState } from "react";
import { MentionInput } from "../mention/MentionInput";
import { DataDrivenOptionProps } from "rc-mentions/lib/Mentions";
import { useThemeContext } from "@/shared/contexts/ThemeContext";

interface RichTextEditorProps {
  value: string;
  onTextChange: (value: string) => void;
  showMention: boolean;
  onSelectMentionUser: (value: number) => void;
  selectedMentionUserIds: number[];
}

const modules = {
  toolbar: {
    container: [["bold", "italic", "underline", "strike"]],
  },
};

export const RichTextEditor = ({
  value,
  onTextChange,
  showMention,
  onSelectMentionUser,
  selectedMentionUserIds = [],
}: RichTextEditorProps) => {
  const { theme, oppositeTheme } = useThemeContext();
  const [isShowMention, setIsShowMention] = useState<boolean>(false);

  const extraHeaderTemplate = () => {
    return (
      <div className="mobile:text-xs">
        {showMention && (
          <div
            className="border w-fit cursor-pointer border-gray-300 p-1 border-b-0"
            onClick={() => setIsShowMention(!isShowMention)}
          >
            Mention
          </div>
        )}
        {isShowMention && (
          <MentionInput
            onSelect={(option: DataDrivenOptionProps) => {
              if (option.key) {
                onSelectMentionUser(parseInt(option.key as string));
              }
            }}
            excludedIds={selectedMentionUserIds}
          />
        )}
      </div>
    );
  };

  return (
    <Editor
      pt={{
        toolbar: {
          className: `bg-${theme} text-${oppositeTheme}`,
        },
      }}
      value={value}
      onTextChange={(e: EditorTextChangeEvent) => {
        if (e.htmlValue) {
          onTextChange(e.htmlValue);
        }
      }}
      modules={modules}
      style={{
        height: "100px",
      }}
      className={`mt-10 bg-white`}
      headerTemplate={extraHeaderTemplate()}
    />
  );
};
