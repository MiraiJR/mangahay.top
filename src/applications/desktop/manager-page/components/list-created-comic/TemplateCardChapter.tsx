import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { ComicPrivilegePermission } from "@/shared/types/enums/ComicPrevilegePermission.enum";
import router from "next/router";
import { SplitButton } from "primereact/splitbutton";
import { useTranslation } from "react-i18next";

interface CardManagedChapterProps {
  chapter: Chapter;
  privileges: number[];
  comicSlug: string;
  isCreatorComic?: boolean;
}

export const TemplateCardChapter = ({
  chapter,
  privileges,
  comicSlug,
  isCreatorComic = false,
}: CardManagedChapterProps) => {
  const { theme, oppositeTheme } = useThemeContext();
  const { t } = useTranslation();
  const canRemove =
    isCreatorComic ||
    privileges.includes(ComicPrivilegePermission.REMOVE_CHAPTER);

  const canUpdate =
    isCreatorComic ||
    privileges.includes(ComicPrivilegePermission.UPDATE_CHAPTER);

  const items = [
    {
      label: t("comicAction.modify", { ns: "common" }),
      icon: "pi pi-pencil",
      command: () => {},
      visible: canUpdate,
    },
    {
      label: t("comicAction.delete", { ns: "common" }),
      icon: "pi pi-trash",
      command: () => {},
      visible: canRemove,
    },
  ];

  return (
    <div
      className={`border border-${oppositeTheme} w-fit rounded-sm flex gap-2 p-2`}
    >
      <div>{chapter.name}</div>
      <SplitButton
        label={t("comicAction.view", { ns: "common" })}
        onClick={() => router.push(`/truyen/${comicSlug}/${chapter.slug}`)}
        model={items}
        text
        pt={{
          root: {
            className: "w-fit h-[20px]",
          },
        }}
      />
    </div>
  );
};
