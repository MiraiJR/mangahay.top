import { Alert, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { useUploadImageContext } from "./UploadImageContext";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

interface UploadImageProps {
  listInitialImageLink?: string[];
  multiple?: boolean;
}

export const UploadImage = ({
  listInitialImageLink = [],
  multiple = false,
}: UploadImageProps) => {
  const {
    fileList,
    setFileList,
    addSingleFile,
    addFileToFileListInModeMultiple,
    addFileToUploadedImagesInModeMultiple,
    deleteFile,
    initFileList,
  } = useUploadImageContext();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (listInitialImageLink && listInitialImageLink.length > 0) {
      initFileList(listInitialImageLink);
    }
  }, []);

  const validate = (file: File) => {
    if (!file.type.includes("image")) {
      throw new Error("Chỉ chấp nhận ảnh!");
    }
  };

  const handleUploadSingleFile = (file: UploadFile) => {
    if (file.status === "removed") {
      deleteFile(file.uid, multiple);
      return;
    }

    const { originFileObj } = file;
    if (!originFileObj) {
      throw new Error("Không có file nào được tải lên!");
    }
    validate(originFileObj);

    if (multiple) {
      if (file.status === "done") {
        addFileToUploadedImagesInModeMultiple(originFileObj);
      }
      getBase64(originFileObj, (url) => {
        addFileToFileListInModeMultiple({
          uid: file.uid,
          name: file.name,
          status: file.status,
          url,
        });
      });
    } else {
      if (file.status === "done") {
        addSingleFile(originFileObj);
      }
      getBase64(originFileObj, (url) => {
        setFileList([
          {
            uid: file.uid,
            name: file.name,
            status: file.status,
            url,
          },
        ]);
      });
    }
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    try {
      handleUploadSingleFile(info.file);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {error.length !== 0 && <Alert message={error} type="error" />}
      <Upload
        accept="image/*"
        listType="picture-card"
        className="avatar-uploader"
        fileList={fileList}
        multiple={multiple}
        onChange={handleChange}
      >
        <button style={{ border: 0, background: "none" }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      </Upload>
    </div>
  );
};
