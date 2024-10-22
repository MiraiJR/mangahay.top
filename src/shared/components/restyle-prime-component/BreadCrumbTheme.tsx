import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { useContext } from "react";

interface BreadCrumbThemeProps {
  items: MenuItem[];
  home: MenuItem;
}

export const BreadCrumbTheme = ({ items, home }: BreadCrumbThemeProps) => {
  const { theme, oppositeTheme } = useContext(ThemeContext);

  return (
    <BreadCrumb
      pt={{
        label: {
          className: `text-${oppositeTheme}`,
        },
        icon: {
          className: `text-${oppositeTheme}`,
        },
        root: {
          className: `bg-${theme} border-${oppositeTheme}`,
        },
      }}
      model={items}
      home={home}
    />
  );
};
