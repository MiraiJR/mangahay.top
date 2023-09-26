import comicService from "@/shared/services/comicService";
import themeStore from "@/shared/stores/themeStore";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const CreateChapterForm = () => {
  const fileUploadRef = useRef<any>(null);
  const [comicName, setComicName] = useState<string>("");
  const [chapterName, setChapterName] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);
  const [chapterImages, setChapterImages] = useState<File[]>([]);

  const getComics = async (name: string): Promise<Comic[]> => {
    const { data } = await comicService.searchComics({ comicName: name });
    return data.comics;
  };

  const handleSearch = async (e: AutoCompleteCompleteEvent) => {
    const comics = await getComics(e.query);
    setItems(comics.map((comic) => `${comic.id}/${comic.name}`));
  };
  const handleCreateChapter = async () => {
    if (
      comicName.trim() === "" ||
      !comicName.includes("/") ||
      chapterName.trim() === "" ||
      chapterImages.length === 0
    ) {
      toast.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append("nameChapter", chapterName);
    chapterImages.forEach((image) => {
      formData.append("files", image);
    });

    try {
      const comicId = extractComicId();
      const { data } = await comicService.createChapter(comicId, formData);

      toast.success(data);
      resetInput();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const extractComicId = (): number => {
    const array = comicName.split("/");
    return parseInt(array[0]);
  };

  const resetInput = () => {
    setComicName("");
    setChapterName("");
    fileUploadRef?.current.clear();
  };

  const handleUploadImage = (e: FileUploadSelectEvent) => {
    setChapterImages(e.files);
  };

  return (
    <div
      className={`flex flex-col gap-4 text-${themeStore.getOppositeTheme()}`}
    >
      <div className="flex flex-col gap-4 w-[100%]">
        <div className="font-bold">Đăng chapter mới cho truyện</div>
        <AutoComplete
          placeholder="Nhập tên truyện"
          inputStyle={{
            width: "100%",
          }}
          value={comicName}
          suggestions={items}
          completeMethod={(e: AutoCompleteCompleteEvent) => handleSearch(e)}
          onChange={(e) => setComicName(e.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-[100%]">
        <label htmlFor="chapterName">Tên chapter</label>
        <InputText
          id="chapterName"
          placeholder="Nhập tên chapter"
          aria-describedby="username-help"
          className="w-[100%]"
          value={chapterName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setChapterName(event.target.value)
          }
        />
      </div>
      <div className="flex flex-col gap-2 w-[100%]">
        <div
          className={`flex flex-col gap-2 text-${themeStore.getOppositeTheme()}`}
        >
          <label htmlFor="iamge">Ảnh mô tả</label>
          <FileUpload
            ref={fileUploadRef}
            multiple
            onSelect={(event: FileUploadSelectEvent) =>
              handleUploadImage(event)
            }
            customUpload={true}
            accept="image/*"
            emptyTemplate={<p className="m-0">Có thể kéo thả ảnh vào đây</p>}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button className="btn-primary w-fit" onClick={handleCreateChapter}>
          Tạo chương
        </button>
      </div>
    </div>
  );
};

export default CreateChapterForm;
