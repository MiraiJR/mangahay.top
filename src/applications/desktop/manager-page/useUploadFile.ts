import axios from "axios";
import { FileUploadFile, FileUploadSelectEvent } from "primereact/fileupload";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const useUploadFile = (imageUrl: string | null) => {
  const fileUploadRef = useRef<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedMultipleFile, setUploadMultipleFile] = useState<File[]>([]);

  const clearUploadedFile = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.clear();
    }
  };

  const handleUploadImage = (e: FileUploadSelectEvent) => {
    if (e.files.length > 1) {
      toast.warn("Ảnh mô tả chỉ cần 1 ảnh thôi!");
      setUploadedFile(null);
      return;
    }

    setUploadedFile(e.files[0]);
  };

  const handleUploadMultipleFile = (e: FileUploadSelectEvent) => {
    setUploadMultipleFile(e.files);
  };

  const addExistedImageUrlToUpload = useCallback(async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = createFileUploadFile(blob);

      if (fileUploadRef.current) {
        fileUploadRef.current.setFiles([file]);

        handleUploadImage({
          originalEvent: {} as DragEvent,
          files: [file],
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    clearUploadedFile();
    if (imageUrl) {
      addExistedImageUrlToUpload(imageUrl);
    }
  }, [imageUrl]);

  const createFileUploadFile = (blob: Blob): FileUploadFile => {
    const file = new File([blob], `${Date.now()}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });

    const objectURL = URL.createObjectURL(file);

    return Object.assign(file, { objectURL });
  };

  return {
    fileUploadRef,
    clearUploadedFile,
    handleUploadImage,
    uploadedFile,
    setUploadedFile,
    handleUploadMultipleFile,
    uploadedMultipleFile,
    setUploadMultipleFile,
  };
};
