import comicService from "@/shared/services/comicService";
import themeStore from "@/shared/stores/themeStore";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { toast } from "react-toastify";

const CrawlChapterFromFacebook = () => {
  const [comicName, setComicName] = useState<string>("");
  const [chapterName, setChapterName] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);
  const [urlPostFb, setUrlPostFb] = useState<string>("");

  const getComics = async (name: string): Promise<Comic[]> => {
    const { data } = await comicService.searchComics({ comicName: name });
    return data.comics;
  };

  const handleSearch = async (e: AutoCompleteCompleteEvent) => {
    const comics = await getComics(e.query);
    setItems(comics.map((comic) => `${comic.id}/${comic.name}`));
  };
  const handleCrawlChapterOnFacebook = async () => {
    if (
      comicName.trim() === "" ||
      !comicName.includes("/") ||
      chapterName.trim() === "" ||
      urlPostFb.trim() === ""
    ) {
      toast.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const comicId = extractComicId();
      const { data } = await comicService.crawlChapterOnFacebook(
        comicId,
        urlPostFb,
        chapterName
      );

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
    setUrlPostFb("");
  };

  return (
    <div
      className={`flex flex-col gap-4 text-${themeStore.getOppositeTheme()}`}
    >
      <div className="flex flex-col gap-4 w-[100%]">
        <h1 className="font-bold">Đăng chapter mới cho truyện</h1>
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
        <label htmlFor="urlPostFb">Đường dẫn Page Post Facebook (Mobile)</label>
        <InputText
          id="urlPostFb"
          placeholder="Nhập đường dẫn post facebook"
          aria-describedby="username-help"
          className="w-[100%]"
          value={urlPostFb}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUrlPostFb(event.target.value)
          }
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="btn-primary w-fit"
          onClick={handleCrawlChapterOnFacebook}
        >
          Tạo truyện
        </button>
      </div>
    </div>
  );
};

export default CrawlChapterFromFacebook;
