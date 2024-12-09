import { Input, List, Upload, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { ImageInteraction } from "./ImageInteraction";
import { useUpdateChapterFormState } from "./useUpdateChapterFormState";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";

interface ModelUpdateChapterProps {
  isOpen: boolean;
  changeIsOpen: (isOpen: boolean) => void;
  chapterSlug: string;
}

export const ModelUpdateChapter = ({
  isOpen,
  changeIsOpen,
  chapterSlug,
}: ModelUpdateChapterProps) => {
  const { t } = useTranslation();
  const {
    chapterName,
    setChapterName,
    chapterImagesForView,
    addImageIdToListNeedDelete,
    handleChangeUploadFiles,
    newUploadFiles,
    handleUpdateChapter,
    isSuccessUpdateChapter,
  } = useUpdateChapterFormState(chapterSlug);

  useEffect(() => {
    if (isSuccessUpdateChapter) {
      changeIsOpen(false);
    }
  }, [isSuccessUpdateChapter]);

  return (
    <Modal
      title="Cập nhật chương"
      width="100vw"
      open={isOpen}
      centered
      mask={false}
      onOk={() => handleUpdateChapter()}
      onCancel={() => changeIsOpen(false)}
      destroyOnClose
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 w-[100%]">
          <label htmlFor="chapterName">
            {t("chapterName", { ns: "chapter" })}
          </label>
          <Input
            id="chapterName"
            size="large"
            placeholder={t("chapterName", { ns: "chapter" })}
            value={chapterName}
            onChange={(event) => {
              setChapterName(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-[100%]">
          <div>Danh sách ảnh</div>
          <List
            grid={{ gutter: 3, xs: 3, sm: 5, md: 6, lg: 6, xl: 10, xxl: 10 }}
            dataSource={chapterImagesForView}
            renderItem={(chapterImage) => (
              <List.Item>
                <ImageInteraction
                  handleDeleleImage={addImageIdToListNeedDelete}
                  chapterImage={chapterImage}
                />
              </List.Item>
            )}
          />
          <Upload
            listType="picture-card"
            fileList={newUploadFiles}
            onPreview={() => false}
            onChange={handleChangeUploadFiles}
            multiple
            beforeUpload={() => false}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </div>
      </div>
    </Modal>
  );
};
