import { Theme } from "../contexts/ThemeContext";

const ThemeStoreManager = () => {
  let theme: Theme = "light";
  const THEME_STORAGE = "theme";

  const getTheme = () => {
    const themeTemp = window.localStorage.getItem(THEME_STORAGE) as Theme;
    if (themeTemp) {
      theme = themeTemp;
    }

    return theme;
  };

  const changeTheme = () => {
    const themeTemp = theme === "light" ? "dark" : "light";
    window.localStorage.setItem(THEME_STORAGE, themeTemp);
    theme = themeTemp;
  };

  const getOppositeTheme = () => {
    return theme === "light" ? "dark" : "light";
  };

  return {
    getTheme,
    changeTheme,
    getOppositeTheme,
  };
};

export default ThemeStoreManager();
