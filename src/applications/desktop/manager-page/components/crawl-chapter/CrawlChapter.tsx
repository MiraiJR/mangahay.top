import { useCrawlChapter } from "./useCrawlChapter";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Button } from "antd";
import { AutoCompleteManagedComic } from "@/shared/components/base-components/auto-complete/AutoCompleteManagedComic";
import { extractComicId } from "@/shared/helpers/helpers";
import { Input } from "@/shared/components/base-components";

const CrawlChapter = () => {
  const { oppositeTheme } = useThemeContext();
  const { t } = useTranslation();
  const {
    urlPost,
    setUrlPost,
    querySelector,
    setQuerySelector,
    setComicId,
    attribute,
    setAttribute,
    chapterName,
    setChapterName,
    handleCrawlChapter,
    isCrawling,
    errorMessage,
  } = useCrawlChapter();

  return (
    <div className={`flex flex-col gap-4 text-${oppositeTheme}`}>
      {errorMessage && <div className="text-red-400">{errorMessage}</div>}
      <AutoCompleteManagedComic
        label={t("crawlChapter.comicName.label", { ns: "common" })}
        onSelect={(selectedComic: string) => {
          setComicId(extractComicId(selectedComic));
        }}
        required
      />
      <Input
        label={t("crawlChapter.linkUrl.label", { ns: "common" })}
        id="urlPost"
        placeholder={t("crawlChapter.linkUrl.placeholder", { ns: "common" })}
        className="w-[100%]"
        value={urlPost}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setUrlPost(event.target.value)
        }
        required
      />
      <Input
        label={t("crawlChapter.chapterName.label", { ns: "common" })}
        id="chapterName"
        placeholder={t("crawlChapter.chapterName.placeholder", {
          ns: "common",
        })}
        className="w-[100%]"
        value={chapterName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setChapterName(event.target.value)
        }
        required
      />
      <div className="flex gap-4">
        <Input
          label={t("crawlChapter.querySelector.label", { ns: "common" })}
          id="querySelector"
          placeholder={t("crawlChapter.querySelector.placeholder", {
            ns: "common",
          })}
          className="w-[100%]"
          value={querySelector}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setQuerySelector(event.target.value)
          }
        />
        <Input
          label={t("crawlChapter.attribute.label", { ns: "common" })}
          id="attribute"
          placeholder={t("crawlChapter.attribute.placeholder", {
            ns: "common",
          })}
          className="w-[100%]"
          value={attribute}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setAttribute(event.target.value)
          }
        />
      </div>
      <div className="flex items-center justify-center">
        <Button
          type="primary"
          loading={isCrawling}
          onClick={() => handleCrawlChapter()}
        >
          {t("crawlChapter.button.label", { ns: "common" })}
        </Button>
      </div>
    </div>
  );
};

export default CrawlChapter;
