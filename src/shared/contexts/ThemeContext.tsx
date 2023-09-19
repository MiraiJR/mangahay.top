import React, { useState } from "react";
import themeStore from "../stores/themeStore";
export type Theme = "light" | "dark";
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
);

export const ThemProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<Theme>(themeStore.getTheme());
  const toggleTheme = () => {
    themeStore.changeTheme();
    setTheme(themeStore.getTheme());
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
