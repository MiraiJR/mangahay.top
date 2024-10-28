import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { Button } from "primereact/button";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { useContext } from "react";
import { useRecommendedComicByName } from "@/shared/hooks/useRecommendedComicByName";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useCreateChapter } from "./useCreateChapter";
import { useTranslation } from "react-i18next";

const CreateChapterForm = () => {
  const { t } = useTranslation();
  const { oppositeTheme } = useContext(ThemeContext);
  const { recommendedComics, handleGetRecommendedComics } =
    useRecommendedComicByName();
  const {
    comicName,
    setComicName,
    chapterName,
    setChapterName,
    fileUploadRef,
    handleUploadMultipleFile,
    chapterImages,
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
            handleGetRecommendedComics(e.query);
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
          label={"Tạo chương"}
          icon="pi pi-check"
          loading={isLoading}
          onClick={() => handleCreateChapter()}
        />
      </div>
    </div>
  );
};

export default CreateChapterForm;
