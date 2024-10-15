import React, { useState } from "react";
import themeStore from "../stores/theme-storage";
export type Theme = "light" | "dark";
type ThemeContext = {
  theme: Theme;
  toggleTheme: () => void;
  oppositeTheme: Theme;
};

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
);

export const ThemProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<Theme>(themeStore.getTheme());
  const oppositeTheme = themeStore.getOppositeTheme();
  const toggleTheme = () => {
    themeStore.changeTheme();
    setTheme(themeStore.getTheme());
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, oppositeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
