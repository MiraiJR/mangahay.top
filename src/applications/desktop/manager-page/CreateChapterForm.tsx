import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { Button } from "primereact/button";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useCreateChapter } from "./useCreateChapter";
import { useTranslation } from "react-i18next";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { useRecommendedComics } from "./useRecommendedComics";

const CreateChapterForm = () => {
  const { t } = useTranslation();
  const { oppositeTheme } = useThemeContext();
  const { recommendedComics, handleSearchRecommendedComics } =
    useRecommendedComics();
  const {
    comicName,
    setComicName,
    chapterName,
    setChapterName,
    isEnd,
    setIsEnd,
    fileUploadRef,
    handleUploadMultipleFile,
    handleCreateChapter,
    isLoading,
  } = useCreateChapter();

  return (
    <div className={`flex flex-col gap-4 text-${oppositeTheme}`}>
      <div className="flex flex-col gap-4 w-[100%]">
        <div className="font-bold">
          {t("createNewChapter", { ns: "chapter" })}
        </div>
        <AutoComplete
          placeholder={t("createNewChapter", { ns: "chapter" })}
          inputStyle={{
            width: "100%",
          }}
          value={comicName}
          suggestions={recommendedComics}
          completeMethod={(e: AutoCompleteCompleteEvent) => {
            handleSearchRecommendedComics(e.query);
          }}
          onChange={(e) => {
            setComicName(e.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 w-[100%]">
        <label htmlFor="chapterName">
          {t("chapterName", { ns: "chapter" })}
        </label>
        <InputText
          id="chapterName"
          placeholder={t("chapterName", { ns: "chapter" })}
          aria-describedby="username-help"
          className="w-[100%]"
          value={chapterName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setChapterName(event.target.value)
          }
        />
      </div>
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
          <FileUpload
            ref={fileUploadRef}
            multiple
            onSelect={(event: FileUploadSelectEvent) =>
              handleUploadMultipleFile(event)
            }
            customUpload={true}
            accept="image/*"
            emptyTemplate={
              <p className="m-0">
                {t("canDragAndDropImage", { ns: "common" })}
              </p>
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button
          label={t("createChapterButton", { ns: "chapter" })}
          icon="pi pi-check"
          loading={isLoading}
          onClick={() => handleCreateChapter()}
        />
      </div>
    </div>
  );
};

export default CreateChapterForm;
