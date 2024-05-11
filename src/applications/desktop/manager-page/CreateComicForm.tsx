import comicService from "@/shared/services/comicService";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import themeStore from "@/shared/stores/themeStore";
import { globalStore } from "@/shared/stores/globalStore";
import {
  removeAccentsAndLowerCase,
  removeAccentsAndLowerCaseArray,
} from "@/shared/helpers/StringHelper";
import { useDialogContext } from "@/shared/contexts/DialogContext";
import { Button } from "primereact/button";

interface itemProps {
  comic?: Comic | null;
}

const CreateComicForm = ({ comic = null }: itemProps) => {
  const { changeVisible, changeIsUpdateData } = useDialogContext();
  const fileUploadRef = useRef<any>(null);
  const { genres } = globalStore();
  const [comicName, setComicName] = useState<string>("");
  const [comicAnotherName, setComicAnotherName] = useState<string>("");
  const [comicGenres, setComicGenres] = useState<string[]>([]);
  const [comicAuthors, setComicAuthors] = useState<string[]>([]);
  const [comicTranslators, setComicTranslators] = useState<string[]>([]);
  const [comicBriefDescription, setBriefDescription] = useState<string>("");
  const [comicThumb, setComicThumb] = useState<File | null>(null);
  const [isUpdateImage, setIsUpdateImage] = useState<string>("0");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  useEffect(() => {
    if (comic) {
      setComicName(comic.name);
      setComicAnotherName(comic.anotherName);
      setBriefDescription(comic.briefDescription);
      setComicAuthors(comic.authors);
      setComicTranslators(comic.translators);
      setComicGenres(comic.genres);
      addExistedImageUrlToUpload(comic.thumb);
    }
  }, [comic]);

  const handleUploadImage = (e: FileUploadSelectEvent) => {
    if (e.files.length > 1) {
      toast.warn("Ảnh mô tả chỉ cần 1 ảnh thôi!");
      setComicThumb(null);
      return;
    }

    setComicThumb(e.files[0]);
  };

  const onIngredientsChange = (e: CheckboxChangeEvent) => {
    let _filterGenres = [...comicGenres];

    if (e.checked) _filterGenres.push(e.value);
    else _filterGenres.splice(_filterGenres.indexOf(e.value), 1);

    setComicGenres(_filterGenres);
  };

  const handleBriefDescription = (): string => {
    let temp = comicBriefDescription;
    temp = temp.replace(/background-color: rgb\(255, 255, 255\)/g, "");
    temp = temp.replace(/background-color: rgb\(0, 0, 0\)/g, "");
    temp = temp.replace(/color: rgb\(0, 0, 0\)/g, "");
    temp = temp.replace(/color: rgb\(5, 5, 5\)/g, "");
    temp = temp.replace(/color/g, "");
    temp = temp.replace(/background-color/g, "");
    temp += `\n Đọc truyện ${comicName};${comicAnotherName} tiếng việt chất lượng tại mangahay.top`;
    return temp;
  };

  const handleCreateComic = async () => {
    if (
      comicName.trim() === "" ||
      comicAnotherName.trim() === "" ||
      comicGenres.length === 0 ||
      comicBriefDescription.trim() === "" ||
      !comicThumb ||
      comicTranslators.length === 0
    ) {
      toast.warn("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setIsCreating(true);

    let formData = new FormData();
    formData.append("name", comicName.replaceAll("/", ""));
    formData.append("anotherName", comicAnotherName);
    comicGenres.forEach((genre) => {
      formData.append("genres[]", genre.toLocaleLowerCase());
    });
    comicAuthors.forEach((author) => {
      formData.append("authors[]", author);
    });
    comicTranslators.forEach((translator) => {
      formData.append("translators[]", translator);
    });
    formData.append("briefDescription", handleBriefDescription());
    formData.append("isUpdateImage", isUpdateImage);
    formData.append("file", comicThumb);

    try {
      if (comic) {
        await comicService.updateComic(comic.id, formData);
        changeVisible(false);
        changeIsUpdateData(true);
      } else {
        await comicService.createComic(formData);
        toast.success("Tạo truyện mới thành công!");
        resetInput();
      }

      setIsCreating(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsCreating(false);
    }
  };

  const resetInput = () => {
    setComicName("");
    setComicAnotherName("");
    setComicGenres([]);
    setComicAuthors([]);
    setBriefDescription("");
    setComicThumb(null);
    setComicTranslators([]);
    fileUploadRef.current.clear();
  };

  const addExistedImageUrlToUpload = async (urlImage: string) => {
    try {
      const response = await fetch(urlImage);
      const blob = await response.blob();

      const file = new File([blob], `${comic!.id}.jpg`, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      if (fileUploadRef.current) {
        fileUploadRef.current.setFiles([file]);

        handleUploadImage({
          originalEvent: {} as DragEvent,
          files: [file],
        });
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex gap-4 flex-col text-${themeStore.getOppositeTheme()}`}
      >
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
      <div
        className={`flex gap-4 flex-col text-${themeStore.getOppositeTheme()}`}
      >
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
                  onChange={onIngredientsChange}
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
      <div
        className={`flex flex-col gap-2 text-${themeStore.getOppositeTheme()}`}
      >
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
      <div
        className={`flex flex-col gap-2 text-${themeStore.getOppositeTheme()}`}
      >
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
        <Button
          label={comic ? "Cập nhật truyện" : "Tạo truyện"}
          icon="pi pi-check"
          loading={isCreating}
          onClick={handleCreateComic}
        />
      </div>
    </div>
  );
};

export default CreateComicForm;
