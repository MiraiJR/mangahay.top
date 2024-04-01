import React, { useContext, useState } from "react";

type DialogContext = {
  visible: boolean;
  changeVisible: (value: boolean) => void;
  isUpdateData: boolean;
  changeIsUpdateData: (value: boolean) => void;
};
export const DialogContext = React.createContext<DialogContext>(
  {} as DialogContext
);

export const DialogProvider = ({ children }: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isUpdateData, setIsUpdateData] = useState<boolean>(false);
  const changeVisible = (value: boolean) => {
    setVisible(value);
  };
  const changeIsUpdateData = (value: boolean) => {
    setIsUpdateData(value);
  };

  return (
    <DialogContext.Provider
      value={{ visible, changeVisible, isUpdateData, changeIsUpdateData }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => useContext(DialogContext);
