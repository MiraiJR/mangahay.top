import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { countryMapping } from "./constant";
import { useThemeContext } from "@/shared/contexts/ThemeContext";
import { useLanguageContext } from "@/shared/contexts/LanguageContext";

export const FlagCountries = () => {
  const { theme } = useThemeContext();
  const { currentLanguage, changeLanguage } = useLanguageContext();
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryMapping["vi"]
  );

  useEffect(() => {
    setSelectedCountry(countryMapping[currentLanguage]);
  }, [currentLanguage]);

  const countryOptionTemplate = (option: Country) => {
    return (
      <ReactCountryFlag
        countryCode={option.name}
        svg
        style={{
          width: "1.5em",
          height: "1.5em",
        }}
      />
    );
  };

  return (
    <Dropdown
      className={`bg-${theme}`}
      value={selectedCountry}
      onChange={(e) => {
        setSelectedCountry(e.value);
        changeLanguage(e.value.code);
      }}
      options={Object.values(countryMapping)}
      valueTemplate={countryOptionTemplate}
      itemTemplate={countryOptionTemplate}
    />
  );
};
