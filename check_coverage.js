const ar = require("./src/locales/ar.json");
const de = require("./src/locales/de.json");
const tr = require("./src/locales/tr.json");
const ur = require("./src/locales/ur.json");
const en = require("./src/locales/en.json");

const all = Object.keys(en.serviceSubpages || {}).filter(k => k !== "common");
console.log("All services:", all.length, all.join(", "));

const locales = [["ar", ar], ["de", de], ["tr", tr], ["ur", ur]];
for (const [name, data] of locales) {
  const translated = Object.keys(data.serviceSubpages || {}).filter(k => k !== "common");
  const missing = all.filter(s => !translated.includes(s));
  console.log(`${name}: ${translated.length}/13, missing: ${missing.join(", ") || "NONE"}`);
}
