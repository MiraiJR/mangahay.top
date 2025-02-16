import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import {
  removeAccentsAndLowerCase,
  removeAccentsAndLowerCaseArray,
} from "@/shared/helpers/string-handler";
import { StatusComic } from "@/shared/types/enums/StatusComic";
import { RadioButton } from "primereact/radiobutton";
import { useGetGenres } from "@/shared/hooks/useGetGenres";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useCreateComic } from "./useCreateComic";
import { useTranslation } from "react-i18next";
import { UploadImage } from "@/shared/components/base-components/upload-files/UploadImage";
import { Button } from "antd";

const CreateComicForm = () => {
  const { t } = useTranslation();
  const { oppositeTheme, theme } = useThemeContext();
  const { genres } = useGetGenres();
  const {
    setComicName,
    setComicAnotherName,
    setComicGenres,
    setComicAuthors,
    setComicTranslators,
    setBriefDescription,
    setStatusComic,
    comicName,
    comicAnotherName,
    comicGenres,
    comicAuthors,
    comicTranslators,
    comicBriefDescription,
    statusComic,
    handleCreateComic,
    isLoadingCreateComic,
  } = useCreateComic();

  const setSelectedGenres = (e: CheckboxChangeEvent) => {
    const currentSelectedGenres = [...comicGenres];

    if (e.checked) {
      currentSelectedGenres.push(e.value);
    } else {
      currentSelectedGenres.splice(currentSelectedGenres.indexOf(e.value), 1);
    }

    setComicGenres(currentSelectedGenres);
  };

  return (
    <div className={`flex flex-col gap-4 bg-${theme} p-2`}>
      <div className={`flex gap-4 flex-col text-${oppositeTheme}`}>
        <div className="flex gap-4  mobile:flex-col">
          <div className="flex flex-col gap-2 w-[100%] ">
            <label htmlFor="comicName">
              {t("createComic.name.label", { ns: "common" })}
            </label>
            <InputText
              id="comicName"
              placeholder={t("createComic.name.placeholder", { ns: "common" })}
              aria-describedby="username-help"
              className="w-[100%]"
              value={comicName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setComicName(event.target.value)
              }
            />
          </div>
          <div className="flex flex-col gap-2 w-[100%]">
            <label htmlFor="anotherName">
              {t("createComic.anotherName.label", { ns: "common" })}
            </label>
            <InputText
              id="anotherName"
              placeholder={t("createComic.anotherName.placeholder", {
                ns: "common",
              })}
              aria-describedby="username-help"
              className="w-[100%]"
              value={comicAnotherName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setComicAnotherName(event.target.value)
              }
            />
          </div>
        </div>
        <div className="flex gap-4 mobile:flex-col">
          <div className="flex flex-col gap-2 w-[100%]">
            <label htmlFor="authors">
              {t("createComic.author.label", { ns: "common" })}
            </label>
            <Chips
              pt={{
                container: { className: "w-[100%]" },
              }}
              placeholder={t("createComic.author.placeholder", {
                ns: "common",
              })}
              inputId="authors"
              max={10}
              value={comicAuthors}
              onChange={(e: ChipsChangeEvent) => {
                setComicAuthors(e.value ?? []);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-[100%]">
            <label htmlFor="translators">
              {t("createComic.translator.label", { ns: "common" })}
            </label>
            <Chips
              pt={{
                container: { className: "w-[100%]" },
              }}
              placeholder={t("createComic.translator.placeholder", {
                ns: "common",
              })}
              inputId="translators"
              max={10}
              value={comicTranslators}
              onChange={(e: ChipsChangeEvent) =>
                setComicTranslators(e.value ?? [])
              }
            />
          </div>
        </div>
      </div>
      <div className={`flex flex-col gap-4 text-${oppositeTheme}`}>
        <label>{t("createComic.status.label", { ns: "common" })}</label>
        <div className="flex flex-wrap gap-3">
          {Object.values(StatusComic).map((status, _index) => (
            <div className="flex align-items-center" key={_index}>
              <RadioButton
                inputId={`status-${_index}`}
                name={`status-${_index}`}
                value={status}
                onChange={(e) => setStatusComic(e.value)}
                checked={status === statusComic}
              />
              <label htmlFor={`status-${_index}`} className="ml-2">
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className={`flex gap-4 flex-col text-${oppositeTheme}`}>
        <div>
          <h2 className="font-bold mb-4">
            {t("createComic.genre.label", { ns: "common" })}
          </h2>
          <div className="grid grid-cols-6 mobile:grid-cols-3 gap-2">
            {genres.map((genre) => (
              <div
                className="flex align-items-center "
                title={`${genre.name} ${genre.slug}`}
                key={genre.slug}
              >
                <Checkbox
                  inputId={genre.slug}
                  value={genre.name}
                  onChange={setSelectedGenres}
                  checked={removeAccentsAndLowerCaseArray(comicGenres).includes(
                    removeAccentsAndLowerCase(genre.name)
                  )}
                />
                <label
                  htmlFor={genre.slug}
                  className="ml-2 mobile:text-xs cursor-pointer"
                >
                  {genre.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`flex flex-col gap-2 text-${oppositeTheme}`}>
        <label htmlFor="briefDescription">
          {t("createComic.description.label", { ns: "common" })}
        </label>
        <Editor
          value={comicBriefDescription}
          onTextChange={(e: EditorTextChangeEvent) => {
            if (e.htmlValue) {
              setBriefDescription(e.htmlValue);
            }
          }}
          style={{ height: "100px" }}
          id="briefDescription"
        />
      </div>
      <div className={`flex flex-col gap-2 text-${oppositeTheme}`}>
        <label htmlFor="iamge">
          {t("createComic.images.label", { ns: "common" })}
        </label>
        <UploadImage />
      </div>
      <div className="flex items-center justify-center">
        <Button
          type="primary"
          loading={isLoadingCreateComic}
          onClick={() => handleCreateComic()}
        >
          {t("createComic.createComic", { ns: "common" })}
        </Button>
      </div>
    </div>
  );
};

export default CreateComicForm;
