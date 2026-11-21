import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import de from "./locales/de/translation.json";
import enContent from "./locales/en/content.json";
import deContent from "./locales/de/content.json";

export type SupportedLanguage = "en" | "de";
export const LANGUAGE_STORAGE_KEY = "yami-atelier:language";

export const getInitialLanguage = (): SupportedLanguage => {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "en" || saved === "de") return saved;
  } catch {
    // Language selection also works when storage is unavailable.
  }
  return (
    navigator.languages
      .map((language) => language.toLowerCase().split("-")[0])
      .find(
        (language): language is SupportedLanguage =>
          language === "en" || language === "de",
      ) || "en"
  );
};

const applyLanguage = (language: string) => {
  const supported = language.startsWith("de") ? "de" : "en";
  document.documentElement.lang = supported;
  document.title =
    supported === "de"
      ? "Yami Atelier | Kunst & Design"
      : "Yami Atelier | Art & Design";
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, supported);
  } catch {
    // Keep the chosen language in memory for this visit.
  }
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en, content: enContent },
    de: { translation: de, content: deContent },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  supportedLngs: ["en", "de"],
  load: "languageOnly",
  returnEmptyString: true,
  initAsync: false,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

applyLanguage(i18n.resolvedLanguage || "en");
i18n.on("languageChanged", applyLanguage);

export default i18n;
