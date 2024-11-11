import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import LanguageStorage from "../stores/language-storage";

interface LanguageContextProps {
  currentLanguage: Language;
  changeLanguage: (value: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps>(
  {} as LanguageContextProps
);

export const LanguageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const selectedLanguage = LanguageStorage.getLanguage() ?? "vi";
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] =
    useState<Language>(selectedLanguage);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  const changeLanguage = (value: Language) => {
    setCurrentLanguage(value);
    LanguageStorage.changeLanguage(value);
    i18n.changeLanguage(value);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("Context not found");
  }
  return context;
};
