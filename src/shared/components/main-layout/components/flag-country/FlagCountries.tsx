import ReactCountryFlag from "react-country-flag";
import { useLanguageContext } from "@/shared/contexts/LanguageContext";
import { Select } from "antd";
import { LIST_LANGUAGE } from "./constant";

export const FlagCountries = () => {
  const { currentLanguage, changeLanguage } = useLanguageContext();

  const items = [
    {
      label: (
        <ReactCountryFlag
          countryCode={"VN"}
          svg
          style={{
            width: "1.5em",
            height: "1.5em",
          }}
        />
      ),
      value: "vi",
    },
    {
      label: (
        <ReactCountryFlag
          countryCode={"US"}
          svg
          style={{
            width: "1.5em",
            height: "1.5em",
          }}
        />
      ),
      value: "en",
    },
  ];

  const handleChangeLanguage = (value: string) => {
    if (LIST_LANGUAGE.includes(value as Language)) {
      changeLanguage(value as Language);
    }
  };

  return (
    <Select
      defaultValue={currentLanguage}
      options={items}
      onChange={handleChangeLanguage}
    />
  );
};
