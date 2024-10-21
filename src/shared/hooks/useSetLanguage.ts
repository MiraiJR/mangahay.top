import { useState } from "react";
import LanguageStorage from "../stores/language-storage";
import { useTranslation } from "react-i18next";

const defaultLanguage = "vi";
const languageStorage = LanguageStorage();

export const useSetLanguage = () => {
  const [currentLanguage, setCurrentLanguage] =
    useState<string>(defaultLanguage);
  const { i18n } = useTranslation();

  const changedLanguage = (targetLanguage: string) => {
    languageStorage.changeLanguage(targetLanguage);
    setCurrentLanguage(targetLanguage);
    i18n.changeLanguage(targetLanguage);
  };

  const initLanguage = () => {
    const languageFromStorage = languageStorage.getCurrentLanguage();
    setCurrentLanguage(languageFromStorage);
    i18n.changeLanguage(languageFromStorage);
  };

  return {
    changedLanguage,
    currentLanguage,
    initLanguage,
  };
};
