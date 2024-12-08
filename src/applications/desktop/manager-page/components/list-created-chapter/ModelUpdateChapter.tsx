import { Modal } from "antd";
import { UpdateChapterForm } from "./UpdateChapterForm";

interface ModelUpdateChapterProps {
  isOpen: boolean;
  changeIsOpen: (isOpen: boolean) => void;
  chapter: Chapter;
}

export const ModelUpdateChapter = ({
  isOpen,
  changeIsOpen,
  chapter,
}: ModelUpdateChapterProps) => {
  const handleUpdateChapter = () => {};
  return (
    <Modal
      title="Cập nhật chương"
      width="100vw"
      open={isOpen}
      centered
      mask={false}
      onOk={handleUpdateChapter}
      onCancel={() => changeIsOpen(false)}
      destroyOnClose
    >
      <UpdateChapterForm chapter={chapter} />
    </Modal>
  );
};
