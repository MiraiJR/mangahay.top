import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Dialog } from "primereact/dialog";
import { PrivilegeTable } from "./PrivilegeTable";
import { PrivilegeContextProvider } from "./PrivilegeContext";

interface DialogPrivilegeComicProps {
  visible: boolean;
  changeVisible: Function;
  comicId: number;
}

export const DialogPrivilegeComic = ({
  visible,
  changeVisible,
  comicId,
}: DialogPrivilegeComicProps) => {
  const { theme, oppositeTheme } = useThemeContext();

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
      <PrivilegeContextProvider>
        <PrivilegeTable comicId={comicId} />
      </PrivilegeContextProvider>
    </Dialog>
  );
};
