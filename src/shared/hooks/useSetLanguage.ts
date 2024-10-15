import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

let defaultlanguage = "vi";
const LANGUAGE_STORAGE = "language";

export const useSetLanguage = () => {
  const [currentLanguage, setCurrentLanguage] =
    useState<string>(defaultlanguage);
  const { i18n } = useTranslation();

  const changedLanguage = (targetLanguage: string) => {
    const isClient = typeof window !== "undefined";
    isClient && localStorage.setItem(LANGUAGE_STORAGE, targetLanguage);
    setCurrentLanguage(targetLanguage);
    i18n.changeLanguage(targetLanguage);
  };

  const getCurrentLanguage = () => {
    const isClient = typeof window !== "undefined";

    if (!isClient) {
      return defaultlanguage;
    }

    setCurrentLanguage(
      localStorage.getItem(LANGUAGE_STORAGE) ?? defaultlanguage
    );

    return localStorage.getItem(LANGUAGE_STORAGE) ?? defaultlanguage;
  };

  useEffect(() => {
    setCurrentLanguage(
      localStorage.getItem(LANGUAGE_STORAGE) ?? defaultlanguage
    );
  }, [setCurrentLanguage]);

  const initLanguage = () => {
    const currentLanguage = getCurrentLanguage();
    i18n.changeLanguage(currentLanguage);
  };

  return {
    changedLanguage,
    getCurrentLanguage,
    initLanguage,
    currentLanguage,
  };
};
