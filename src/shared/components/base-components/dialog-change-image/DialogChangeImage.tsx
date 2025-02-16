import { Modal } from "antd";
import { UploadImage } from "../upload-files/UploadImage";

interface DialogChangeImageProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleOke: Function;
  multiple?: boolean;
  title: string;
}

export const DialogChangeImage = ({
  multiple = false,
  title,
  isOpen,
  setIsOpen,
  handleOke,
}: DialogChangeImageProps) => {
  return (
    <Modal
      centered
      title={title}
      open={isOpen}
      onOk={() => {
        handleOke();
      }}
      onCancel={() => setIsOpen(false)}
    >
      <UploadImage multiple={multiple} />
    </Modal>
  );
};
