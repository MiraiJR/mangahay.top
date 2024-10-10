import { FileUploadSelectEvent } from "primereact/fileupload";
import { useState } from "react";

export const useUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUploadImage = (event: FileUploadSelectEvent) => {
    if (event.files.length > 1) {
      setFile(null);
      return;
    }

    setFile(event.files[0]);
  };

  return {
    file,
    setFile,
    handleUploadImage,
  };
};
