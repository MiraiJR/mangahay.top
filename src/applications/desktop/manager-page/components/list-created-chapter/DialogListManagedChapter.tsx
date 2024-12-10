import { TableChapter } from "./TableChapter";
import { Modal } from "antd";

interface DialogListManagedChapterProps {
  visible: boolean;
  changeVisible: Function;
  comicId: number;
  isCreatorComic: boolean;
}

export const DialogListManagedChapter = ({
  visible,
  changeVisible,
  comicId,
  isCreatorComic,
}: DialogListManagedChapterProps) => {
  return (
    <Modal
      width="100vw"
      title="Danh sách chương"
      open={visible}
      centered
      onOk={() => changeVisible(false)}
      onCancel={() => changeVisible(false)}
    >
      <TableChapter comicId={comicId} isCreatorComic={isCreatorComic} />
    </Modal>
  );
};
