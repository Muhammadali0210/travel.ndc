import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "uz", "ru"],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: typeof window !== "undefined" 
        ? "/locales/{{lng}}/translation.json"
        : undefined, // buildda ishlatilmaydi
    },
    ns: ["translation"],
    defaultNS: "translation",
  });

export default i18n;

