import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Chip } from "primereact/chip";
import { useContext } from "react";

interface ChipWithThemeProps {
  label: string;
  removable?: boolean;
}

export const ChipWithTheme = ({
  label,
  removable = false,
}: ChipWithThemeProps) => {
  const { theme, oppositeTheme } = useThemeContext();

  return (
    <Chip
      label={label}
      removable={removable}
      pt={{
        label: {
          className: `text-${oppositeTheme}`,
        },
        root: {
          className: `bg-${theme} border-${oppositeTheme} border-[1px]`,
        },
      }}
    />
  );
};
