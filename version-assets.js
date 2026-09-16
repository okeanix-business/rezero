// Run after editing assets and before uploading the static site.
const fs = require("node:fs");
const path = require("node:path");
const { createHash } = require("node:crypto");

function versionAssets(root = __dirname) {
  const origin = "https://static-site.invalid/";
  const hashes = new Map();
  const updates = [];
  let pages = 0;

  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) { visit(file); continue; }
      if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
      pages++;
      const html = fs.readFileSync(file, "utf8");
      const pageUrl = new URL(path.relative(root, file).split(path.sep).join("/"), origin);
      const base = html.match(/<base\b[^>]*\bhref\s*=\s*["']([^"']+)["']/i);
      const baseUrl = base ? new URL(base[1], pageUrl) : pageUrl;
      const updated = html.replace(/<(?:script|link)\b[^>]*>/gi, (tag) => {
        const attribute = /^<script\b/i.test(tag) ? "src" : "href";
        const pattern = new RegExp(`(\\b${attribute}\\s*=\\s*)(["'])([^"']+)\\2`, "i");
        return tag.replace(pattern, (match, prefix, quote, reference) => {
          const url = new URL(reference.replace(/&amp;/g, "&"), baseUrl);
          if (url.origin !== new URL(origin).origin || !/\.(css|js)$/i.test(url.pathname)) return match;
          const asset = path.resolve(root, "." + decodeURIComponent(url.pathname));
          const relative = path.relative(root, asset);
          if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error(`Asset outside site: ${reference}`);
          if (!hashes.has(asset)) {
            hashes.set(asset, createHash("sha256").update(fs.readFileSync(asset)).digest("hex").slice(0, 16));
          }
          url.searchParams.set("v", hashes.get(asset));
          // Preserve relative paths, including paths resolved through <base>.
          const pathname = reference.split(/[?#]/)[0];
          const versioned = (pathname + url.search + url.hash).replace(/&/g, "&amp;");
          return prefix + quote + versioned + quote;
        });
      });
      if (updated !== html) updates.push([file, updated]);
    }
  }

  visit(root);
  // Validate every reference before writing any changes.
  for (const [file, html] of updates) fs.writeFileSync(file, html, "utf8");
  return { pages, assets: hashes.size, updated: updates.length };
}

module.exports = { versionAssets };
if (require.main === module) console.log("[OK] Asset versions:", versionAssets());
