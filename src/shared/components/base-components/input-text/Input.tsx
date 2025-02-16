import { Input } from "antd";
import { ChangeEventHandler } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { globalStore } from "@/shared/stores/global-storage";
import { useThemeContext } from "@/shared/contexts/ThemeContext";

interface ComponentProps {
  id?: string;
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: ChangeEventHandler;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
}

const Component = ({
  id,
  label,
  required,
  onChange,
  value,
  className,
  placeholder,
  type = "text",
  disabled = false,
}: ComponentProps) => {
  const { oppositeTheme } = useThemeContext();
  const randomId = crypto.randomUUID();
  const { isMobile } = globalStore();

  return (
    <div className="flex flex-col gap-2 min-w-[250px] mobile:text-xs w-full">
      {label && (
        <label
          htmlFor={id ?? randomId}
          className={`${
            required ? "desktop:text-sm text-red-400" : `text-${oppositeTheme}`
          }`}
        >
          {label}
          {required ? " *" : ""}
        </label>
      )}
      {type === "password" ? (
        <Input.Password
          size={isMobile ? "middle" : "large"}
          id={id ?? randomId}
          placeholder={placeholder}
          className={className + " mobile:text-xs"}
          value={value}
          onChange={onChange}
          type={type}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          disabled={disabled}
        />
      ) : (
        <Input
          size={isMobile ? "middle" : "large"}
          id={id ?? randomId}
          placeholder={placeholder}
          className={className + " mobile:text-xs"}
          value={value}
          onChange={onChange}
          type={type}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export { Component as Input };
