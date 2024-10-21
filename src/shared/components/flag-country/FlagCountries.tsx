import { Dropdown } from "primereact/dropdown";
import { useContext, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { countryMapping } from "./constant";
import { useSetLanguage } from "@/shared/hooks/useSetLanguage";
import { ThemeContext } from "@/shared/contexts/ThemeContext";

export const FlagCountries = () => {
  const { theme } = useContext(ThemeContext);
  const { changedLanguage, currentLanguage, initLanguage } = useSetLanguage();
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryMapping[currentLanguage]
  );

  useEffect(() => {
    initLanguage();
  }, []);

  useEffect(() => {
    if (currentLanguage) {
      setSelectedCountry(countryMapping[currentLanguage]);
    }
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
        changedLanguage(e.value.code);
      }}
      options={Object.values(countryMapping)}
      valueTemplate={countryOptionTemplate}
      itemTemplate={countryOptionTemplate}
    />
  );
};
