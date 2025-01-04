import { UploadFile } from "antd";
import React, { useContext, useState } from "react";

type UploadImageContext = {
  uploadedFile: File | null;
  addSingleFile: (value: File) => void;
  uploadedFiles: File[];
  addFileToUploadedImagesInModeMultiple: (value: File) => void;
  reset: (isMultiple?: boolean) => void;
  fileList: UploadFile[];
  setFileList: (value: UploadFile[]) => void;
  addFileToFileListInModeMultiple: (value: UploadFile) => void;
  deleteFile: (uidNeedToDelete: string, isMultiple: boolean) => void;
  initFileList: (listImageLink: string[]) => void;
};

export const UploadImageContext = React.createContext<UploadImageContext>(
  {} as UploadImageContext
);

export const UploadImageProvider = ({ children }: any) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const addSingleFile = (value: File) => {
    reset();
    setUploadedFile(value);
  };

  const initFileList = (listImageLink: string[]) => {
    setFileList(
      listImageLink.map((imageLink) => {
        return {
          uid: Date.now().toString(),
          name: Date.now().toString(),
          status: "done",
          url: imageLink,
        };
      })
    );
  };

  const addFileToUploadedImagesInModeMultiple = (value: File) => {
    setUploadedFiles((previousFiles) => [...previousFiles, value]);
  };

  const addFileToFileListInModeMultiple = (value: UploadFile) => {
    if (isExistedInFileList(value.uid)) {
      setFileList((previousFileList) =>
        previousFileList.map((file) =>
          file.uid === value.uid ? { ...file, status: "done" } : file
        )
      );
      return;
    }

    setFileList((previousFileList) => [...previousFileList, value]);
  };

  const isExistedInFileList = (uid: string) =>
    fileList.some((file) => file.uid === uid);

  const reset = (isMultiple: boolean = false) => {
    if (isMultiple) {
      setUploadedFiles([]);
    } else {
      setUploadedFile(null);
    }
    setFileList([]);
  };

  const deleteFile = (uidNeedToDelete: string, isMultiple: boolean = false) => {
    if (isMultiple) {
      const fileNeedToDelete = fileList.find(
        (file) => file.uid === uidNeedToDelete
      );

      if (!fileNeedToDelete) {
        throw new Error("Không thể tìm thấy ảnh!");
      }

      setFileList((previousFileList) =>
        previousFileList.filter((file) => file.uid !== uidNeedToDelete)
      );
      setUploadedFiles((previousUploadedFiles) =>
        previousUploadedFiles.filter(
          (uploadedFile) => uploadedFile !== fileNeedToDelete.originFileObj
        )
      );

      return;
    }

    setFileList([]);
    setUploadedFile(null);
  };

  return (
    <UploadImageContext.Provider
      value={{
        uploadedFile,
        addSingleFile,
        uploadedFiles,
        addFileToUploadedImagesInModeMultiple,
        reset,
        fileList,
        setFileList,
        addFileToFileListInModeMultiple,
        deleteFile,
        initFileList,
      }}
    >
      {children}
    </UploadImageContext.Provider>
  );
};

export const useUploadImageContext = () => {
  const context = useContext(UploadImageContext);
  if (!context) {
    throw new Error("Context not found");
  }
  return context;
};
