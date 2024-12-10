import { Button, Upload, UploadFile, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

interface UploadMultipleFileProps {
  listExistedImages: UploadFile[];
}

export const UploadMultipleFile = ({
  listExistedImages = [],
}: UploadMultipleFileProps) => {
  const [fileList, setFileList] = useState<File[]>();

  const onChange: UploadProps["onChange"] = ({ fileList: uploadedFiles }) => {
    const files: File[] = [];

    uploadedFiles.forEach((file) => {
      if (file.originFileObj) {
        files.push(file.originFileObj);
      }
    });

    setFileList(files);
  };

  return (
    <Upload listType="picture" multiple accept="image/*" onChange={onChange}>
      <Button type="primary" icon={<UploadOutlined />}>
        Upload
      </Button>
    </Upload>
  );
};
