import MyLoading from "@/shared/components/MyLoading";
import { useGetListChapter } from "@/shared/hooks/useGetListChapter";
import { TemplateCardChapter } from "./TemplateCardChapter";
import { useGetListPrivilege } from "../privilege-comic/useGetListPrivilege";
import { userStore } from "@/shared/stores/user-storage";
import { Dialog } from "primereact/dialog";
import { useThemeContext } from "@/shared/contexts/ThemeContext";

interface DialogListManagedChapterProps {
  visible: boolean;
  changeVisible: Function;
  comicId: number;
  comicSlug: string;
  isCreatorComic: boolean;
}

export const DialogListManagedChapter = ({
  visible,
  changeVisible,
  comicId,
  comicSlug,
  isCreatorComic,
}: DialogListManagedChapterProps) => {
  const { chapters, isLoading } = useGetListChapter(comicId);
  const { privileges } = useGetListPrivilege(comicId);
  const { userProfile } = userStore();
  const { theme, oppositeTheme } = useThemeContext();

  if (isLoading) {
    return <MyLoading />;
  }

  return (
    <Dialog
      header={"User right"}
      visible={visible}
      maximizable
      onHide={() => changeVisible(false)}
      dismissableMask={true}
      pt={{
        header: {
          className: `bg-${theme} text-${oppositeTheme}`,
        },
        content: {
          className: `bg-${theme} text-${oppositeTheme}`,
        },
        footer: {
          className: `bg-${theme} text-${oppositeTheme}`,
        },
      }}
    >
      {chapters.map((chapter) => (
        <TemplateCardChapter
          chapter={chapter}
          privileges={
            privileges.find(
              (privilege) => privilege.user.id === userProfile?.id
            )?.permissions ?? []
          }
          comicSlug={comicSlug}
          isCreatorComic={isCreatorComic}
        />
      ))}
    </Dialog>
  );
};
