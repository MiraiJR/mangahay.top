import React, { useState } from "react";
import { DataScroller } from "primereact/datascroller";
import Image from "next/image";
import { formatDate } from "@/shared/helpers/helpers";
import DialogUpdateComic from "@/applications/desktop/manager-page/components/update-comic/DialogUpdateComic";
import { useDialogContext } from "@/shared/contexts/DialogContext";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { ComicPrivilegePermission } from "@/shared/types/enums/ComicPrevilegePermission.enum";
import { userStore } from "@/shared/stores/user-storage";
import { useGetMyCreatedComic } from "../../useGetMyCreatedComic";
import { useDeleteComic } from "../../useDeleteComic";
import { DialogPrivilegeComic } from "../privilege-comic/DialogPrivilegeComic";
import { SplitButton } from "primereact/splitbutton";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DialogListManagedChapter } from "../list-created-chapter/DialogListManagedChapter";
import MyLoading from "@/shared/components/MyLoading";
import { ReorderListChapter } from "../reorder-chapter/ReorderListChapter";

const THE_DEFAULT_AMOUNT_COMICS: number = 10;

const ListCreatedComics = () => {
  const { t } = useTranslation();
  const { theme, oppositeTheme } = useThemeContext();
  const { changeVisible: changeVisibleDialogUpdateComic } = useDialogContext();
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const { comics, isLoading: isLoadingListMyCreatedComic } =
    useGetMyCreatedComic();
  const { handleDeleteComic, isLoading: isLoadingDeleteComic } =
    useDeleteComic();
  const router = useRouter();
  const { userProfile } = userStore();
  const [isShowUserRight, setIsShowUserRight] = useState<boolean>(false);
  const [isShowListManagedChapter, setIsShowListManagedChapter] =
    useState<boolean>(false);
  const [isShowReorderChapter, setIsShowReorderChapter] =
    useState<boolean>(false);

  if (isLoadingListMyCreatedComic) {
    return <MyLoading />;
  }

  const mappingPermission: Record<number, string> = {
    1: t("permission.updateChapter", { ns: "comic" }),
    2: t("permission.updateComicInformation", { ns: "comic" }),
    3: t("permission.removeChapter", { ns: "comic" }),
    4: t("permission.removeComic", { ns: "comic" }),
  };

  const confirmDeleteComic = (comicId: number, comicName: string) => {
    confirmDialog({
      message: t("confirmDelete", { ns: "common", comicName }),
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        handleDeleteComic(comicId);
      },
    });
  };

  const isCreator = (comic: Comic) => {
    return userProfile?.id === comic.creatorId;
  };

  const getPermissionText = (comic: Comic) => {
    if (isCreator(comic)) {
      return [t("permission.super", { ns: "comic" })];
    }

    const { privileges } = comic;

    const permissionText: string[] = [];
    privileges.forEach((privilege) => {
      permissionText.push(mappingPermission[privilege]);
    });

    return permissionText;
  };

  const itemTemplate = (comic: Comic) => {
    const isCreatorComic = isCreator(comic);
    const canInteractionWithChapter =
      isCreatorComic ||
      comic.privileges.includes(ComicPrivilegePermission.REMOVE_CHAPTER) ||
      comic.privileges.includes(ComicPrivilegePermission.UPDATE_CHAPTER);
    const canRemove =
      isCreatorComic ||
      comic.privileges.includes(ComicPrivilegePermission.REMOVE_COMIC);
    const canUpdate =
      isCreatorComic ||
      comic.privileges.includes(ComicPrivilegePermission.UPDATE_COMIC);

    const isMe = userProfile?.id === comic.creatorId;

    const items = [
      {
        label: "List chapter",
        icon: "pi pi-list",
        command: () => {
          setIsShowListManagedChapter(true);
        },
        visible: canInteractionWithChapter,
      },
      {
        label: "Reorder chapter",
        icon: "pi pi-sort",
        command: () => {
          setIsShowReorderChapter(true);
        },
        visible: canInteractionWithChapter,
      },
      {
        label: t("comicAction.modify", { ns: "common" }),
        icon: "pi pi-pencil",
        command: () => {
          changeVisibleDialogUpdateComic(true);
          setSelectedComic(comic);
        },
        visible: canUpdate,
      },
      {
        label: t("comicAction.delete", { ns: "common" }),
        icon: "pi pi-trash",
        command: () => {
          confirmDeleteComic(comic.id, comic.name);
        },
        visible: canRemove,
      },
      {
        label: "User right",
        icon: "pi pi-user-edit",
        command: () => {
          setIsShowUserRight(true);
        },
        visible: isCreator(comic),
      },
    ];

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
              <h2>{t("property.author", { ns: "comic" })}</h2>
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
            <div className="flex flex-wrap items-center gap-2">
              <h2>{t("property.creator", { ns: "comic" })}</h2>
              <span className="font-bold">
                {isMe
                  ? comic.creator.fullname +
                    ` ${t("youAreCreator", { ns: "comic" })}`
                  : comic.creator.fullname}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <h2>{t("property.theTotalOfChapter", { ns: "comic" })}</h2>
              <span className="font-bold">
                {comic.chapters.length} ({t("chapter", { ns: "comic" })})
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <h2>{t("permission.label", { ns: "comic" })}</h2>
              <span className="text-red-500 font-bold">
                {getPermissionText(comic).join(", ")}
              </span>
            </div>
          </div>
          <div className="col-span-3 flex flex-col items-end justify-center gap-4">
            <span>{formatDate(comic.updatedAt)}</span>
            <div className="flex gap-4">
              <SplitButton
                label={t("comicAction.view", { ns: "common" })}
                onClick={() => router.push(`/truyen/${comic.slug}`)}
                model={items}
              />
              <ConfirmDialog />
              <DialogPrivilegeComic
                comicId={comic.id}
                visible={isShowUserRight}
                changeVisible={setIsShowUserRight}
              />
              <DialogListManagedChapter
                visible={isShowListManagedChapter}
                changeVisible={setIsShowListManagedChapter}
                comicId={comic.id}
                isCreatorComic={isCreator(comic)}
              />
              <ReorderListChapter
                visible={isShowReorderChapter}
                changeVisible={setIsShowReorderChapter}
                comicId={comic.id}
              />
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
