import CreateComicForm from "@/applications/desktop/manager-page/CreateComicForm";
import { useDialogContext } from "@/shared/contexts/DialogContext";
import { Dialog } from "primereact/dialog";

interface itemProps {
  comic: Comic;
}

const DialogUpdateComic = ({ comic }: itemProps) => {
  const { visible, changeVisible } = useDialogContext();

  return (
    <Dialog
      header={comic.name}
      visible={visible}
      maximizable
      style={{ width: "50vw" }}
      onHide={() => changeVisible(false)}
      dismissableMask={true}
    >
      <CreateComicForm comic={comic} />
    </Dialog>
  );
};

export default DialogUpdateComic;
