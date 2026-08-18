export type PortfolioTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "yami-atelier:color-theme";

export const getInitialTheme = (): PortfolioTheme => {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {
    // Fall back to the visitor's system preference.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const applyTheme = (theme: PortfolioTheme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};
