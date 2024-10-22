import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { useContext } from "react";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import {
  removeAccentsAndLowerCase,
  removeAccentsAndLowerCaseArray,
} from "@/shared/helpers/StringHelper";
import { Button } from "primereact/button";
import { StatusComic } from "@/shared/types/enums/StatusComic";
import { RadioButton } from "primereact/radiobutton";
import { useGetGenres } from "@/shared/hooks/useGetGenres";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useCreateComic } from "./useCreateComic";

interface itemProps {
  comic?: Comic | null;
}

const CreateComicForm = ({ comic = null }: itemProps) => {
  const { oppositeTheme, theme } = useContext(ThemeContext);
  const { genres } = useGetGenres();
  const {
    setComicName,
    setComicAnotherName,
    setComicGenres,
    setComicAuthors,
    setComicTranslators,
    setBriefDescription,
    setIsUpdateImage,
    setStatusComic,
    comicName,
    comicAnotherName,
    comicGenres,
    comicAuthors,
    comicTranslators,
    comicBriefDescription,
    statusComic,
    fileUploadRef,
    handleUploadImage,
    handleCreateComic,
    isLoadingCreateComic,
    handleUpdateComic,
    isLoadingUpdateComic,
  } = useCreateComic(comic);

  const setSelectedGenres = (e: CheckboxChangeEvent) => {
    let _filterGenres = [...comicGenres];

    if (e.checked) _filterGenres.push(e.value);
    else _filterGenres.splice(_filterGenres.indexOf(e.value), 1);

    setComicGenres(_filterGenres);
  };

  return (
    <div className={`flex flex-col gap-4 bg-${theme} p-2`}>
      <div className={`flex gap-4 flex-col text-${oppositeTheme}`}>
        <div className="flex gap-4  mobile:flex-col">
          <div className="flex flex-col gap-2 w-[100%] ">
            <label htmlFor="comicName">Tên truyện</label>
            <InputText
              id="comicName"
              placeholder="Nhập tên truyện"
              aria-describedby="username-help"
              className="w-[100%]"
              value={comicName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setComicName(event.target.value)
              }
            />
          </div>
          <div className="flex flex-col gap-2 w-[100%]">
            <label htmlFor="anotherName">Tên khác của truyện</label>
            <InputText
              id="anotherName"
              placeholder="Nhập tên khác của truyện"
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
            <label htmlFor="authors">Tác giả</label>
            <Chips
              pt={{
                container: { className: "w-[100%]" },
              }}
              placeholder="Tên tác giả"
              inputId="authors"
              max={10}
              value={comicAuthors}
              onChange={(e: ChipsChangeEvent) => {
                setComicAuthors(e.value ?? []);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-[100%]">
            <label htmlFor="translators">Nhóm dịch</label>
            <Chips
              pt={{
                container: { className: "w-[100%]" },
              }}
              placeholder="Tên nhóm dịch"
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
        <label htmlFor="translators">Trạng thái truyện</label>
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
          <h2 className="font-bold mb-4">Thể loại</h2>
          <div className="grid grid-cols-6 mobile:grid-cols-3 gap-2">
            {genres.map((genre) => (
              <div
                className="flex align-items-center"
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
                <label htmlFor={genre.slug} className="ml-2 mobile:text-xs">
                  {genre.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`flex flex-col gap-2 text-${oppositeTheme}`}>
        <label htmlFor="briefDescription">Mô tả</label>
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
        <label htmlFor="iamge">Ảnh mô tả</label>
        <FileUpload
          ref={fileUploadRef}
          onSelect={(event: FileUploadSelectEvent) => {
            handleUploadImage(event);
            setIsUpdateImage("1");
          }}
          customUpload={true}
          accept="image/*"
          emptyTemplate={<p className="m-0">Có thể kéo thả ảnh vào đây</p>}
        />
      </div>
      <div className="flex items-center justify-center">
        {comic ? (
          <Button
            label={"Cập nhật truyện"}
            icon="pi pi-check"
            loading={isLoadingUpdateComic}
            onClick={() => handleUpdateComic()}
          />
        ) : (
          <Button
            label={"Tạo truyện"}
            icon="pi pi-check"
            loading={isLoadingCreateComic}
            onClick={() => handleCreateComic()}
          />
        )}
      </div>
    </div>
  );
};

export default CreateComicForm;
