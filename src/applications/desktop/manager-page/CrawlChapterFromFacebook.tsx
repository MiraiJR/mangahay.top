import comicService from "@/shared/services/comicService";
import themeStore from "@/shared/stores/themeStore";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";

const CrawlChapterFromFacebook = () => {
  const [urlPostFb, setUrlPostFb] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const handleCrawlChapterOnFacebook = async () => {
    try {
      const { data } = await comicService.getCrawlImages(urlPostFb);

      console.log(data);
      setImages(data);
    } catch (error) {}
  };

  return (
    <div
      className={`flex flex-col gap-4 text-${themeStore.getOppositeTheme()}`}
    >
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
          Cào chương
        </button>
      </div>
      <InputTextarea value={images.reverse().join("\n")} rows={5} cols={30} />
    </div>
  );
};

export default CrawlChapterFromFacebook;
