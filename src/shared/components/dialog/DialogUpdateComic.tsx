import CreateComicForm from "@/applications/desktop/manager-page/CreateComicForm";
import { useDialogContext } from "@/shared/contexts/DialogContext";
import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { Dialog } from "primereact/dialog";
import { useContext } from "react";

interface itemProps {
  comic: Comic;
}

const DialogUpdateComic = ({ comic }: itemProps) => {
  const { theme, oppositeTheme } = useContext(ThemeContext);
  const { visible, changeVisible } = useDialogContext();

  return (
    <Dialog
      header={comic.name}
      visible={visible}
      maximizable
      style={{ width: "50vw" }}
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
      <CreateComicForm comic={comic} />
    </Dialog>
  );
};

export default DialogUpdateComic;
