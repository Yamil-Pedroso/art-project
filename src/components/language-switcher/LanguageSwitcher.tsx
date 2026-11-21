import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher = ({ dark = false }: { dark?: boolean }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage === "de" ? "de" : "en";

  return (
    <div
      role="group"
      aria-label={t("language.choose")}
      className={`${styles.switcher} ${dark ? styles.dark : ""}`}
    >
      {(["en", "de"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => void i18n.changeLanguage(option)}
          aria-pressed={language === option}
          aria-label={option === "en" ? "English" : "Deutsch"}
          lang={option}
          title={option === "en" ? "English" : "Deutsch"}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
