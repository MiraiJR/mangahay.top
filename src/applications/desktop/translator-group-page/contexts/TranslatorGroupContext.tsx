import React, { useContext } from "react";
import { translatorGroup } from "../constant";

type TranslatorGroupContext = {
  translatorGroup: TranslatorGroup;
};

export const TranslatorGroupContext =
  React.createContext<TranslatorGroupContext>({} as TranslatorGroupContext);

export const TranslatorGroupProvider = ({ children }: any) => {
  return (
    <TranslatorGroupContext.Provider value={{ translatorGroup }}>
      {children}
    </TranslatorGroupContext.Provider>
  );
};

export const useTranslatorGroupContext = () => {
  const context = useContext(TranslatorGroupContext);
  if (!context) {
    throw new Error("Context not found");
  }

  return context;
};
