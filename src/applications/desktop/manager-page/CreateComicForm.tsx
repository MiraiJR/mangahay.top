import comicService from "@/shared/services/comicService";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import themeStore from "@/shared/stores/themeStore";

const CreateComicForm = () => {
  const fileUploadComponent = useRef<any>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [comicName, setComicName] = useState<string>("");
  const [comicAnotherName, setComicAnotherName] = useState<string>("");
  const [comicGenres, setComicGenres] = useState<string[]>([]);
  const [comicAuthors, setComicAuthors] = useState<string[]>([]);
  const [comicBriefDescription, setBriefDescription] = useState<string>("");
  const [comicThumb, setComicThumb] = useState<File | null>(null);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const { data } = await comicService.getGenres();

        setGenres(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getGenres();
  }, []);

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

  const handleCreateComic = async () => {
    if (
      comicName.trim() === "" ||
      comicAnotherName.trim() === "" ||
      comicGenres.length === 0 ||
      comicBriefDescription.trim() === "" ||
      !comicThumb
    ) {
      toast.warn("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    let formData = new FormData();
    formData.append("name", comicName);
    formData.append("anotherName", comicAnotherName);
    comicGenres.forEach((genre) => {
      formData.append("genres[]", genre.toLocaleLowerCase());
    });
    comicAuthors.forEach((author) => {
      formData.append("authors[]", author);
    });
    formData.append("briefDescription", comicBriefDescription);
    formData.append("file", comicThumb);

    try {
      await comicService.createComic(formData);

      toast.success("Tạo truyện mới thành công!");
      resetInput();
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const resetInput = () => {
    setComicName("");
    setComicAnotherName("");
    setComicGenres([]);
    setComicAuthors([]);
    setBriefDescription("");
    setComicThumb(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex gap-4 mobile:flex-col text-${themeStore.getOppositeTheme()}`}
      >
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
        <div className="flex flex-col gap-2 w-[100%]">
          <label htmlFor="authors">Tác giả</label>
          <Chips
            pt={{
              container: { className: "w-[100%]" },
            }}
            placeholder="Tên tác giả"
            inputId="authors"
            max={3}
            value={comicAuthors}
            onChange={(e: ChipsChangeEvent) => setComicAuthors(e.value ?? [])}
          />
        </div>
      </div>
      <div
        className={`flex gap-4 flex-col text-${themeStore.getOppositeTheme()}`}
      >
        <div>
          <h1 className="font-bold mb-4">Thể loại</h1>
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
                  checked={comicGenres.includes(genre.name)}
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
          ref={fileUploadComponent}
          onSelect={(event: FileUploadSelectEvent) => handleUploadImage(event)}
          customUpload={true}
          accept="image/*"
          emptyTemplate={<p className="m-0">Có thể kéo thả ảnh vào đây</p>}
        />
      </div>
      <div className="flex items-center justify-center">
        <button className="btn-primary w-fit" onClick={handleCreateComic}>
          Tạo truyện
        </button>
      </div>
    </div>
  );
};

export default CreateComicForm;
