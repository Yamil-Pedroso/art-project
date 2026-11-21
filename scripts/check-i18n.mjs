import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createInstance } from "i18next";

const load = (language, namespace) =>
  JSON.parse(
    readFileSync(
      new URL(
        `../src/i18n/locales/${language}/${namespace}.json`,
        import.meta.url,
      ),
      "utf8",
    ),
  );
const resources = Object.fromEntries(
  ["en", "de"].map((language) => [
    language,
    {
      translation: load(language, "translation"),
      content: load(language, "content"),
    },
  ]),
);
const flatten = (value, prefix = "", result = {}) => {
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof child === "string") result[path] = child;
    else flatten(child, path, result);
  }
  return result;
};
const variables = (text) =>
  [...text.matchAll(/\{\{\s*([^}]+)\s*\}\}/g)]
    .map((match) => match[1].trim())
    .sort();
for (const namespace of ["translation", "content"]) {
  const en = flatten(resources.en[namespace]);
  const de = flatten(resources.de[namespace]);
  assert.deepEqual(
    Object.keys(de).sort(),
    Object.keys(en).sort(),
    `${namespace}: English and German keys must match`,
  );
  for (const [key, text] of Object.entries(en)) {
    assert.deepEqual(
      variables(de[key]),
      variables(text),
      `${namespace}.${key}: interpolation values must match`,
    );
    assert.ok(
      de[key].trim() || !text.trim(),
      `${namespace}.${key}: missing German text`,
    );
  }
  console.log(
    `${namespace}: ${Object.keys(en).length} matching translation entries`,
  );
}
const i18n = createInstance();
await i18n.init({
  resources,
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en", "de"],
  initAsync: false,
  returnEmptyString: true,
});
assert.equal(i18n.t("ui.home"), "Home");
await i18n.changeLanguage("de");
assert.equal(i18n.t("ui.home"), "Startseite");
assert.equal(i18n.t("workDetails.stages", { count: 1 }), "1 Phase");
assert.equal(i18n.t("workDetails.stages", { count: 3 }), "3 Phasen");
assert.equal(
  i18n.t("common.viewDetailsFor", { title: "Test" }),
  "Details zu Test ansehen",
);
assert.equal(
  i18n.t("artworks.80.title", { ns: "content" }),
  "Gehörnter Wächter",
);
assert.equal(Object.keys(resources.de.content.artworks).length, 80);
assert.equal(i18n.t("artworks.7.dimensions", { ns: "content" }), "");
await i18n.changeLanguage("en");
assert.equal(i18n.t("artworks.80.title", { ns: "content" }), "Horned Sentinel");
console.log(
  "Language changes, pluralization, interpolation, and artwork content verified.",
);
