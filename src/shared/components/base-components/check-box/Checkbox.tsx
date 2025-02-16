import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { Checkbox, CheckboxProps } from "antd";

interface ComponentProps {
  onChange?: (value: boolean) => void;
  label?: string;
  value?: boolean;
}

const Component = ({
  onChange: onChangeInject,
  label,
  value,
}: ComponentProps) => {
  const { oppositeTheme } = useThemeContext();

  const onChange: CheckboxProps["onChange"] = (e) => {
    if (onChangeInject) {
      onChangeInject(e.target.checked);
    }
  };

  return (
    <Checkbox
      className={`mobile:text-xs !text-${oppositeTheme}`}
      checked={value}
      onChange={onChange}
    >
      {label}
    </Checkbox>
  );
};

export { Component as Checkbox };
