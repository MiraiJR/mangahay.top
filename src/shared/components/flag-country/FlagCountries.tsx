import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { countryMapping } from "./constant";
import { useSetLanguage } from "@/shared/hooks/useSetLanguage";

export const FlagCountries = () => {
  const { changedLanguage, currentLanguage } = useSetLanguage();
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryMapping[currentLanguage]
  );

  useEffect(() => {
    return setSelectedCountry(countryMapping[currentLanguage]);
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
