import themeStore from "@/shared/stores/theme-storage";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useCrawlChapter } from "./useCrawlChapter";
import { useRecommendedComicByName } from "@/shared/hooks/useRecommendedComicByName";
import { useTranslation } from "react-i18next";

const CrawlChapter = () => {
  const { t } = useTranslation();
  const {
    urlPost,
    setUrlPost,
    querySelector,
    setQuerySelector,
    comicName,
    setComicName,
    attribute,
    setAttribute,
    chapterName,
    setChapterName,
    handleCrawlChapter,
    isCrawling,
    errorMessage,
  } = useCrawlChapter();
  const { recommendedComics, handleGetRecommendedComics } =
    useRecommendedComicByName();

  return (
    <div
      className={`flex flex-col gap-4 text-${themeStore.getOppositeTheme()}`}
    >
      {errorMessage && <div className="text-red-400">{errorMessage}</div>}
      <div className="flex flex-col gap-4 w-[100%]">
        <div className="font-bold">
          {t("crawlChapter.comicName.label", { ns: "common" })}
        </div>
        <AutoComplete
          placeholder={t("crawlChapter.comicName.placeholder", {
            ns: "common",
          })}
          inputStyle={{
            width: "100%",
          }}
          value={comicName}
          suggestions={recommendedComics}
          completeMethod={(e: AutoCompleteCompleteEvent) =>
            handleGetRecommendedComics(e.query)
          }
          onChange={(e) => setComicName(e.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-[100%]">
        <label htmlFor="urlPost">
          {t("crawlChapter.linkUrl.label", { ns: "common" })}
        </label>
        <InputText
          id="urlPost"
          placeholder={t("crawlChapter.linkUrl.placeholder", { ns: "common" })}
          aria-describedby="username-help"
          className="w-[100%]"
          value={urlPost}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUrlPost(event.target.value)
          }
        />
      </div>
      <div className="flex flex-col gap-2 w-[100%]">
        <label htmlFor="chapterName">
          {t("crawlChapter.chapterName.label", { ns: "common" })}
        </label>
        <InputText
          id="chapterName"
          placeholder={t("crawlChapter.chapterName.placeholder", {
            ns: "common",
          })}
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
          <label htmlFor="querySelector">
            {t("crawlChapter.querySelector.label", { ns: "common" })}
          </label>
          <InputText
            id="querySelector"
            placeholder={t("crawlChapter.querySelector.placeholder", {
              ns: "common",
            })}
            aria-describedby="username-help"
            className="w-[100%]"
            value={querySelector}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setQuerySelector(event.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-2 w-[100%]">
          <label htmlFor="attribute">
            {t("crawlChapter.attribute.label", { ns: "common" })}
          </label>
          <InputText
            id="attribute"
            placeholder={t("crawlChapter.attribute.placeholder", {
              ns: "common",
            })}
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
        <Button
          label={t("crawlChapter.button.label", { ns: "common" })}
          icon="pi pi-check"
          loading={isCrawling}
          onClick={() => handleCrawlChapter()}
        />
      </div>
    </div>
  );
};

export default CrawlChapter;
