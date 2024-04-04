import React, { useState, useEffect } from "react";
import { DataScroller } from "primereact/datascroller";
import { Rating } from "primereact/rating";
import Image from "next/image";
import { convertWebpResource, formatDate } from "@/shared/helpers/helpers";
import ComicService from "@/shared/services/comicService";
import themeStore from "@/shared/stores/themeStore";
import DialogUpdateComic from "@/shared/components/dialog/DialogUpdateComic";
import { useDialogContext } from "@/shared/contexts/DialogContext";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { toast } from "react-toastify";

const ListCreatedComics = () => {
  const { changeVisible, isUpdateData, changeIsUpdateData } =
    useDialogContext();
  const [comics, setComics] = useState<Comic[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);

  const getComics = async () => {
    try {
      const { data } = await ComicService.getComicsCreatedByMe();

      setComics(data);
    } catch (error: any) {}
  };

  useEffect(() => {
    if (isUpdateData) {
      getComics();
      changeIsUpdateData(false);
    }
  }, [isUpdateData]);

  useEffect(() => {
    getComics();
  }, []);

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

  const handleDeleteComic = async (comicId: number) => {
    try {
      const { data } = await ComicService.deleteComic(comicId);

      toast.success(data);
      getComics();
    } catch (error: any) {
      toast.error(error.message);
    }
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
                  className={`p-1 bg-${themeStore.getOppositeTheme()} text-${themeStore.getTheme()} rounded-md capitalize`}
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
                  className={`p-1 bg-${themeStore.getOppositeTheme()} text-${themeStore.getTheme()} rounded-md capitalize`}
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
                  changeVisible(true);
                  setSelectedComic(comic);
                }}
              >
                Sửa
              </button>
              <button
                className="btn-primary bg-red-400"
                onClick={(e) => confirmDeleteComic(e, comic.id)}
              >
                Xoá
              </button>
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
            className: `bg-${themeStore.getTheme()} text-${themeStore.getOppositeTheme()}`,
          },
        }}
        value={comics}
        itemTemplate={itemTemplate}
        rows={5}
        buffer={0.4}
        header="Danh sách truyện bạn đã đăng"
        loader={true}
      />
      {selectedComic && <DialogUpdateComic comic={selectedComic} />}
    </div>
  );
};

export default ListCreatedComics;
