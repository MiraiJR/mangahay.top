import { InputText } from "primereact/inputtext";

type InputTextType = "password" | "text";

interface InputTextCustomProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputTextType;
}

export const InputTextCustom = ({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputTextCustomProps) => {
  return (
    <InputText
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      className="mobile:w-[235px] w-[455px] p-2 border-[1px] border-neutral-500"
      value={value}
      onChange={onChange}
      aria-label={placeholder}
    />
  );
};
