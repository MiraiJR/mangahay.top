import React, { useState, useContext } from "react";
import { DataScroller } from "primereact/datascroller";
import { Rating } from "primereact/rating";
import Image from "next/image";
import { convertWebpResource, formatDate } from "@/shared/helpers/helpers";
import DialogUpdateComic from "@/shared/components/dialog/DialogUpdateComic";
import { useDialogContext } from "@/shared/contexts/DialogContext";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { useGetMyCreatedComic } from "./useGetMyCreatedComic";
import { useDeleteComic } from "./useDeleteComic";
import { Button } from "primereact/button";

const THE_DEFAULT_AMOUNT_COMICS: number = 10;

const ListCreatedComics = () => {
  const { theme, oppositeTheme } = useContext(ThemeContext);
  const { changeVisible: changeVisibleDialogUpdateComic } = useDialogContext();
  const [_showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const { comics } = useGetMyCreatedComic();
  const { handleDeleteComic, isLoading: isLoadingDeleteComic } =
    useDeleteComic();

  const confirmDeleteComic = (event: any, comicId: number) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
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
              src={convertWebpResource(comic.thumb)}
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
                onClick={() => setShowDetail(true)}
              >
                Xem
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  changeVisibleDialogUpdateComic(true);
                  setSelectedComic(comic);
                }}
              >
                Sửa
              </button>
              <Button
                className="btn-primary bg-red-400"
                onClick={(e) => confirmDeleteComic(e, comic.id)}
                loading={isLoadingDeleteComic}
              >
                Xoá
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
        }}
        value={comics}
        itemTemplate={itemTemplate}
        rows={THE_DEFAULT_AMOUNT_COMICS}
        header="Danh sách truyện bạn đã đăng"
        inline
        scrollHeight="1000px"
      />
      {selectedComic && <DialogUpdateComic comic={selectedComic} />}
    </div>
  );
};

export default ListCreatedComics;
