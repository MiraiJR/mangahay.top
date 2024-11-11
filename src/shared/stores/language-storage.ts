const isClient = typeof window !== "undefined";

const LanguageStorage = () => {
  let currentLanguage: Language = "vi";
  const LANGUAGE_STORAGE = "language";

  const getLanguage = () => {
    if (isClient) {
      const languageFromStorage = window.localStorage.getItem(
        LANGUAGE_STORAGE
      ) as Language;
      if (languageFromStorage) {
        currentLanguage = languageFromStorage;
      }
    }
    return currentLanguage;
  };

  const changeLanguage = (targetLanguage: Language) => {
    if (isClient) {
      window.localStorage.setItem(LANGUAGE_STORAGE, targetLanguage);
      currentLanguage = targetLanguage;
    }
  };

  return {
    getLanguage,
    changeLanguage,
  };
};

export default LanguageStorage();
