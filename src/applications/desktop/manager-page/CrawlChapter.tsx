import MyLoading from "@/shared/components/MyLoading";
import { extractComicId } from "@/shared/helpers/helpers";
import comicService from "@/shared/services/comicService";
import themeStore from "@/shared/stores/themeStore";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { toast } from "react-toastify";

interface StatusLoading {
  isCrawling: boolean;
}

const CrawlChapter = () => {
  const [urlPost, setUrlPost] = useState<string>("");
  const [querySelector, setQuerySelector] = useState<string>("");
  const [comicName, setComicName] = useState<string>("");
  const [attribute, setAttribute] = useState<string>("");
  const [chapterName, setChapterName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<StatusLoading>({
    isCrawling: false,
  });
  const [items, setItems] = useState<string[]>([]);

  const handleCrawlChapter = async () => {
    if (
      comicName.trim() === "" ||
      urlPost.trim() === "" ||
      chapterName.trim() === ""
    ) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setErrorMessage(null);
    setLoading((pre) => {
      return {
        ...pre,
        isCrawling: true,
      };
    });

    try {
      const comicId = extractComicId(comicName);
      const { data } = await comicService.crawlChapter(
        comicId,
        urlPost,
        chapterName,
        querySelector,
        attribute
      );

      toast.success(data);
      setLoading((pre) => {
        return {
          ...pre,
          isCrawling: false,
        };
      });
      resetInput();
    } catch (error) {}
  };

  const resetInput = () => {
    setComicName("");
    setChapterName("");
    setQuerySelector("");
    setUrlPost("");
    setAttribute("");
  };

  const getComics = async (name: string): Promise<Comic[]> => {
    const { data } = await comicService.searchComics({ comicName: name });
    return data.comics;
  };

  const handleSearch = async (e: AutoCompleteCompleteEvent) => {
    const comics = await getComics(e.query);
    setItems(comics.map((comic) => `${comic.id}/${comic.name}`));
  };

  return (
    <div
      className={`flex flex-col gap-4 text-${themeStore.getOppositeTheme()}`}
    >
      {errorMessage && <div className="text-red-400">{errorMessage}</div>}
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
        <label htmlFor="urlPost">Link Url</label>
        <InputText
          id="urlPost"
          placeholder="Nhập liên kết"
          aria-describedby="username-help"
          className="w-[100%]"
          value={urlPost}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUrlPost(event.target.value)
          }
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
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-[100%]">
          <label htmlFor="querySelector">Query Selector</label>
          <InputText
            id="querySelector"
            placeholder="Nhập query selector"
            aria-describedby="username-help"
            className="w-[100%]"
            value={querySelector}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setQuerySelector(event.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-2 w-[100%]">
          <label htmlFor="attribute">Attribute</label>
          <InputText
            id="attribute"
            placeholder="Nhập attribute"
            aria-describedby="username-help"
            className="w-[100%]"
            value={attribute}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAttribute(event.target.value)
            }
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        {loading.isCrawling ? (
          <MyLoading />
        ) : (
          <button className="btn-primary w-fit" onClick={handleCrawlChapter}>
            Cào chương
          </button>
        )}
      </div>
    </div>
  );
};

export default CrawlChapter;
