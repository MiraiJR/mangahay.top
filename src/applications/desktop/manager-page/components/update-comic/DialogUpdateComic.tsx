import { useDialogContext } from "@/shared/contexts/DialogContext";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Dialog } from "primereact/dialog";
import { UpdateComicForm } from "./UpdateComicForm";

interface itemProps {
  comic: Comic;
}

const DialogUpdateComic = ({ comic }: itemProps) => {
  const { theme, oppositeTheme } = useThemeContext();
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
      <UpdateComicForm comic={comic} />
    </Dialog>
  );
};

export default DialogUpdateComic;
