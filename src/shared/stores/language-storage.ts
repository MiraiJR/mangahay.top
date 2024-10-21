const isClient = typeof window !== "undefined";

const LanguageStorage = () => {
  let currentLanguage = "vi";
  const LANGUAGE_STORAGE = "language";

  const getCurrentLanguage = () => {
    if (isClient) {
      const languageFromStorage = window.localStorage.getItem(LANGUAGE_STORAGE);
      if (languageFromStorage) {
        currentLanguage = languageFromStorage;
      }
    }
    return currentLanguage;
  };

  const changeLanguage = (targetLanguage: string) => {
    if (isClient) {
      window.localStorage.setItem(LANGUAGE_STORAGE, targetLanguage);
      currentLanguage = targetLanguage;
    }
  };

  return {
    getCurrentLanguage,
    changeLanguage,
  };
};

export default LanguageStorage;
