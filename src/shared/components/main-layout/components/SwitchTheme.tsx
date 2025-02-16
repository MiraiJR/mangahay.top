import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";

export const SwitchTheme = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Switch
      id="theme"
      checkedChildren={t(`theme.light`, { ns: "common" })}
      unCheckedChildren={t(`theme.dark`, { ns: "common" })}
      onChange={toggleTheme}
      defaultValue={theme === "light"}
    />
  );
};
