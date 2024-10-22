import { FileUploadFile, FileUploadSelectEvent } from "primereact/fileupload";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const useUploadFile = (imageUrl: string | null) => {
  const fileUploadRef = useRef<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const clearUploadedFile = () => {
    fileUploadRef.current.clear();
  };

  const handleUploadImage = (e: FileUploadSelectEvent) => {
    if (e.files.length > 1) {
      toast.warn("Ảnh mô tả chỉ cần 1 ảnh thôi!");
      setUploadedFile(null);
      return;
    }

    setUploadedFile(e.files[0]);
  };

  const addExistedImageUrlToUpload = async () => {
    try {
      if (imageUrl) {
        console.log(imageUrl);
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const file = createFileUploadFile(blob);

        if (fileUploadRef.current) {
          fileUploadRef.current.setFiles([file]);

          handleUploadImage({
            originalEvent: {} as DragEvent,
            files: [file],
          });
        }
      }
    } catch (error) {}
  };

  const createFileUploadFile = (blob: Blob): FileUploadFile => {
    const file = new File([blob], `${Date.now()}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });

    const objectURL = URL.createObjectURL(file);

    return Object.assign(file, { objectURL });
  };

  useEffect(() => {
    addExistedImageUrlToUpload();
  }, [imageUrl]);

  return {
    fileUploadRef,
    clearUploadedFile,
    handleUploadImage,
    uploadedFile,
    setUploadedFile,
  };
};
