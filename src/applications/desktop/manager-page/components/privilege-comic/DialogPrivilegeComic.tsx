import { Modal } from "antd";
import { PrivilegeTable } from "./PrivilegeTable";

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
  return (
    <Modal
      title="Cập nhật chương"
      width="100vw"
      open={visible}
      centered
      footer={[]}
      onCancel={() => changeVisible(false)}
      destroyOnClose
    >
      <PrivilegeTable comicId={comicId} />
    </Modal>
  );
};
