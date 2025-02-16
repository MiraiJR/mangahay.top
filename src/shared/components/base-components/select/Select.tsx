import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { globalStore } from "@/shared/stores/global-storage";
import { Select } from "antd";

export interface OptionItem {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ComponentProps {
  defaultValue?: string;
  options: OptionItem[];
  onChange?: (value: string) => void;
  className?: string;
  required?: boolean;
  label?: string;
  id?: string;
  placeholder?: string;
  value: string;
}

const Component = ({
  className,
  defaultValue,
  options,
  onChange,
  label,
  required,
  id,
  placeholder,
  value,
}: ComponentProps) => {
  const { oppositeTheme } = useThemeContext();
  const randomId = crypto.randomUUID();
  const { isMobile } = globalStore();

  return (
    <div className="mobile:text-xs flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id ?? randomId}
          className={`${
            required ? "desktop:text-sm text-red-400" : `text-${oppositeTheme}`
          } mobile:text-xs`}
        >
          {label}
          {required ? " *" : ""}
        </label>
      )}
      <Select
        size={isMobile ? "middle" : "large"}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full ${className}`}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export { Component as Select };
