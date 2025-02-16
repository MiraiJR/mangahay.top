import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useCreateChapter } from "./useCreateChapter";
import { useTranslation } from "react-i18next";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { UploadImage } from "@/shared/components/base-components/upload-files/UploadImage";
import { Button } from "antd";
import { AutoCompleteManagedComic } from "@/shared/components/base-components/auto-complete/AutoCompleteManagedComic";
import { extractComicId } from "@/shared/helpers/helpers";
import { Input } from "@/shared/components/base-components";

const CreateChapterForm = () => {
  const { t } = useTranslation();
  const { oppositeTheme } = useThemeContext();
  const {
    setComicId,
    chapterName,
    setChapterName,
    isEnd,
    setIsEnd,
    handleCreateChapter,
    isLoading,
  } = useCreateChapter();

  return (
    <div className={`flex flex-col gap-4 text-${oppositeTheme}`}>
      <AutoCompleteManagedComic
        label={t("createNewChapter", { ns: "chapter" })}
        onSelect={(selectedComic: string) => {
          setComicId(extractComicId(selectedComic));
        }}
        required
      />
      <Input
        label={t("chapterName", { ns: "chapter" })}
        id="chapterName"
        placeholder={t("chapterName", { ns: "chapter" })}
        aria-describedby="username-help"
        className="w-[100%]"
        value={chapterName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChapterName(event.target.value)
        }
        required
      />
      <div className="flex flex-row gap-2 w-[100%] items-center">
        <label htmlFor="isChapterEnd">
          {t("theLastChapter", { ns: "chapter" })}
        </label>
        <Checkbox
          id="isChapterEnd"
          onChange={(event: CheckboxChangeEvent) => {
            setIsEnd(event.checked ?? false);
          }}
          checked={isEnd}
        ></Checkbox>
      </div>
      <div className="flex flex-col gap-2 w-[100%]">
        <div className={`flex flex-col gap-2 text-${oppositeTheme}`}>
          <label htmlFor="iamge">{t("chapterImages", { ns: "chapter" })}</label>
          <UploadImage multiple />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button
          type="primary"
          loading={isLoading}
          onClick={() => handleCreateChapter()}
        >
          {t("createChapterButton", { ns: "chapter" })}
        </Button>
      </div>
    </div>
  );
};

export default CreateChapterForm;
