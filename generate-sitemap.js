/**
 * generate-sitemap.js
 * Runs in Node (no deps). Reads seasons-data.js by executing it in a sandbox,
 * then uses window.REZERO_SEASONS.buildEpisodes() to derive exact ?i= pages.
 *
 * Usage:
 *   node generate-sitemap.js
 * Output:
 *   ./sitemap.xml
 */
const fs = require("fs");
const vm = require("vm");

const BASE = "https://rezeroizle.com";
const TODAY = new Date().toISOString().slice(0, 10);

function esc(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function urlBlock(loc, changefreq, priority) {
  return `  <url>
    <loc>${esc(BASE + loc)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Load seasons-data.js into a sandbox with a fake window
const code = fs.readFileSync("./seasons-data.js", "utf8");
const sandbox = { window: {}, console, SEASON_CONFIGS: undefined };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const rz = sandbox.window.REZERO_SEASONS;
if (!rz || typeof rz.buildEpisodes !== "function") {
  throw new Error("REZERO_SEASONS not found. Did seasons-data.js set window.REZERO_SEASONS ?");
}

const urlBlocks = [];
urlBlocks.push(urlBlock("/", "daily", "1.0"));

for (const s of [1,2,3,4]) {
  urlBlocks.push(urlBlock(`/season${s}.html`, "weekly", "0.9"));
  const eps = rz.buildEpisodes(s);
  for (let i = 0; i < eps.length; i++) {
    urlBlocks.push(urlBlock(`/season${s}.html?i=${i}`, "monthly", "0.7"));
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks.join("\n")}
</urlset>
`;

fs.writeFileSync("./sitemap.xml", xml, "utf8");
console.log("[OK] sitemap.xml generated");
