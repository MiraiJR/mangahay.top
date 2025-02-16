import Image from "next/image";
import Link from "next/link";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useRouter } from "next/router";
import { ComicInteraction } from "./comic-interaction/ComicIntertion";
import { useTranslation } from "react-i18next";
import { usePageContext } from "../Context";
import {
  GenreTag,
  PersonTag,
  StatusTag,
} from "@/shared/components/base-components";
import { Button } from "antd";

export const Description = () => {
  const { t } = useTranslation();
  const { oppositeTheme } = useThemeContext();
  const router = useRouter();
  const { comic } = usePageContext();
  const firstChapter = comic?.chapters[0] ?? null;
  const lastChapter = comic?.chapters[comic.chapters.length - 1] ?? null;

  const handleReadNow = () => {
    if (firstChapter) {
      router.push(`/truyen/${comic?.slug}/${firstChapter?.slug}`);
    } else {
      router.push(`/truyen/${comic?.slug}`);
    }
  };

  return (
    <div
      className={`grid grid-cols-12 gap-2 text-${oppositeTheme} mobile:text-xs`}
    >
      <Image
        priority
        width={0}
        height={0}
        className="col-span-3 shadow-lg p-5 mobile:col-span-12 w-[100%] max-h-[800px] object-cover object-top mobile:text-xs"
        src={comic.thumb}
        alt={comic.name}
      />
      <div className="col-span-7 flex flex-col gap-4 mobile:col-span-12 mobile:mx-4">
        <div className="mobile:flex mobile:flex-col gap-2">
          <h1 className="font-bold text-2xl mobile:text-xl" title={comic.name}>
            <span>{comic.name}</span>
          </h1>
          <StatusTag status={comic.state} />
        </div>
        <div className="flex flex-wrap gap-2 items-center mobile:flex-col mobile:items-start">
          <h2 className="font-bold">
            {t("comicProperty.anotherName", { ns: "common" })}
          </h2>
          <span>{comic.anotherName}</span>
        </div>
        <div className="flex gap-2 flex-wrap items-center mobile:flex-col mobile:items-start">
          <h2 className="font-bold">
            {t("comicProperty.author", { ns: "common" })}
          </h2>
          <ul className="flex gap-2">
            {comic.authors.map((author, _index) => (
              <Link
                key={_index}
                href={`/tim-kiem?filterAuthor=${author}`}
                prefetch={false}
              >
                <PersonTag name={author} />
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 flex-wrap items-center mobile:flex-col mobile:items-start">
          <h2 className="font-bold">
            {t("comicProperty.translors", { ns: "common" })}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {comic.translators.map((translator, _index) => (
              <Link
                key={_index}
                href={`/nhom-dich/${translator}`}
                prefetch={false}
              >
                <PersonTag name={translator} />
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 flex-wrap items-center mobile:flex-col mobile:items-start">
          <h2 className="font-bold">
            {t("comicProperty.genres", { ns: "common" })}
          </h2>
          <ul className="flex gap-1 flex-wrap">
            {comic.genres.map((genre, _index) => (
              <Link
                key={_index}
                href={`/tim-kiem?filterGenres=${genre.toLocaleLowerCase()}`}
                className="text-xl"
                prefetch={false}
              >
                <GenreTag genre={genre} />
              </Link>
            ))}
          </ul>
        </div>
        <h2
          title={comic.briefDescription}
          dangerouslySetInnerHTML={{ __html: comic.briefDescription }}
        ></h2>
        <div className="flex gap-2">
          <Button
            color="primary"
            variant="solid"
            className="mobile:text-xs"
            onClick={() => handleReadNow()}
            disabled={!firstChapter}
          >
            {t("readNow", { ns: "common" })}
          </Button>
          <Button
            color="primary"
            variant="solid"
            className="btn-primary !bg-green-600 mobile:text-xs"
            onClick={() =>
              router.push(`/truyen/${comic.slug}/${lastChapter?.slug}`)
            }
            disabled={!lastChapter}
          >
            {t("readTheNewestChapter", { ns: "common" })}
          </Button>
        </div>
      </div>

      <ComicInteraction />
    </div>
  );
};
