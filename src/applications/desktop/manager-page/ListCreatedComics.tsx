import React, { useState } from "react";
import { DataScroller } from "primereact/datascroller";
import { Rating } from "primereact/rating";
import Image from "next/image";
import { formatDate } from "@/shared/helpers/helpers";
import DialogUpdateComic from "@/shared/components/dialog/DialogUpdateComic";
import { useDialogContext } from "@/shared/contexts/DialogContext";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useGetMyCreatedComic } from "./useGetMyCreatedComic";
import { useDeleteComic } from "./useDeleteComic";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const THE_DEFAULT_AMOUNT_COMICS: number = 10;

const ListCreatedComics = () => {
  const { t } = useTranslation();
  const { theme, oppositeTheme } = useThemeContext();
  const { changeVisible: changeVisibleDialogUpdateComic } = useDialogContext();
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const { comics } = useGetMyCreatedComic();
  const { handleDeleteComic, isLoading: isLoadingDeleteComic } =
    useDeleteComic();
  const router = useRouter();

  const confirmDeleteComic = (event: any, comicId: number) => {
    confirmPopup({
      target: event.currentTarget,
      message: t("confirmDelete", { ns: "common" }),
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        handleDeleteComic(comicId);
      },
    });
  };

  const itemTemplate = (comic: Comic) => {
    return (
      <>
        <div className="grid grid-cols-12 gap-4 p-2">
          <div className="col-span-1">
            <Image
              width={0}
              height={0}
              className="w-[100%]"
              src={comic.thumb}
              alt={comic.name}
            />
          </div>
          <div className="col-span-8 flex flex-col gap-4">
            <div className="font-bold">{comic.name}</div>
            <div className="flex flex-wrap items-center gap-2">
              {comic.genres.map((genre, _index) => (
                <span
                  key={_index}
                  className={`p-1 bg-${oppositeTheme} text-${theme} rounded-md capitalize`}
                  title={genre}
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {comic.authors.map((author, _index) => (
                <span
                  key={_index}
                  className={`p-1 bg-${oppositeTheme} text-${theme} rounded-md capitalize`}
                  title={author}
                >
                  {author}
                </span>
              ))}
            </div>
            <div className="flex gap-4 items-center">
              <Rating value={comic.star} cancel={false} readOnly />
              <span>{comic.star}</span>
            </div>
          </div>
          <div className="col-span-3 flex flex-col items-end justify-center gap-4">
            <span>{formatDate(comic.updatedAt)}</span>
            <div className="flex gap-4">
              <button
                className="btn-primary bg-green-400"
                onClick={() => router.push(`/truyen/${comic.slug}`)}
              >
                {t("comicAction.view", { ns: "common" })}
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  changeVisibleDialogUpdateComic(true);
                  setSelectedComic(comic);
                }}
              >
                {t("comicAction.modify", { ns: "common" })}
              </button>
              <Button
                className="btn-primary bg-red-400"
                onClick={(e) => confirmDeleteComic(e, comic.id)}
                loading={isLoadingDeleteComic}
              >
                {t("comicAction.delete", { ns: "common" })}
              </Button>
              <ConfirmPopup />
            </div>
            <span className="text-orange-400">{comic.state}</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="card">
      <DataScroller
        pt={{
          item: {
            className: `bg-${theme} text-${oppositeTheme}`,
          },
          header: {
            className: `bg-${theme} text-${oppositeTheme}`,
          },
          list: {
            className: `bg-${theme}`,
          },
          content: {
            className: `bg-${theme}`,
          },
        }}
        value={comics}
        itemTemplate={itemTemplate}
        rows={THE_DEFAULT_AMOUNT_COMICS}
        header={t("listCreatedComic", { ns: "common" })}
        inline
        scrollHeight="1000px"
      />
      {selectedComic && <DialogUpdateComic comic={selectedComic} />}
    </div>
  );
};

export default ListCreatedComics;
