import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { namespaces, resources } from "@/locale-recourse/resources";

i18n.use(initReactI18next).init({
  lng: "vi",
  ns: namespaces,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
