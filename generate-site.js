/* generate-site.js (V9 - OPEN SUMMARY + KEYED SUMMARIES)
 *
 * ✅ HUB sayfaları: sezon/<S>/index.html (SEO arşivi)
 * ✅ Episode sayfaları: base "../../../"
 * ✅ Episode summary: episode-summaries.js’den statik gömülür
 *    - KEY destek: "ep:1", "break:1", "special:snow", "special:frozenbond"
 *    - Eski format destek: summaries[season][index]
 *    - Ayrıca object format destek: { teaserHtml, fullHtml } (geri uyum)
 * ✅ Özet TAMAMEN AÇIK (details yok)
 * ✅ H1/H2 boş değil: statik içerik basılır (SEO için kritik)
 * ✅ Episode SEO: hreflang(tr-TR) + canonical + rel=prev/next (episode)
 * ✅ HUB SEO: hreflang(tr-TR) + rel=prev/next (sezonlar arası)
 * ✅ driveId boş olan sayfalar: HİÇ ÜRETİLMEZ + sitemap’ten çıkar
 * ✅ sitemap lastmod: gerçek dosya mtime (YYYY-MM-DD)
 * ✅ robots.txt + episode-pages-map.js + 404.html üretir
 * ✅ Meta description: summary’den otomatik zenginleşir (≈160 char)
 * ✅ JSON-LD: image + inLanguage + timeRequired eklendi
 * ✅ HUB: Yakında satırları şişmez (tek satır: Yakında: X içerik)
 *
 * Usage: node generate-site.js
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const BASE = "https://rezeroizle.com";
const OUT_ROOT = path.join(__dirname, "sezon");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function escXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function escAttr(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function ymdFromDate(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function getFileLastmod(filePath) {
  try {
    const st = fs.statSync(filePath);
    return ymdFromDate(st.mtime);
  } catch {
    return ymdFromDate(new Date());
  }
}
function urlBlock(loc, lastmod, changefreq, priority) {
  const webLoc = loc.startsWith("/") ? loc : `/${loc}`;
  return `  <url>
    <loc>${escXml(BASE + webLoc)}</loc>
    <lastmod>${escXml(lastmod)}</lastmod>
    <changefreq>${escXml(changefreq)}</changefreq>
    <priority>${escXml(priority)}</priority>
  </url>`;
}

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "ozel";
}

// ✅ KEYED SUMMARY: index bağımlılığını bitirir
function makeSummaryKey(ep, index) {
  if (!ep) return `idx:${index}`;
  if (ep.kind === "episode") return `ep:${ep.number}`;
  if (ep.kind === "break") return `break:${ep.number}`;
  if (ep.kind === "special") {
    if (ep.extraType) return `special:${ep.extraType}`; // snow, frozenbond vs
    return `special:${slugify(ep.title) || index}`;
  }
  return `idx:${index}`;
}

// --- helpers (meta enrichment) ---
function stripHtml(s) {
  return String(s || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function cut(s, n) {
  const t = String(s || "").trim();
  if (!t) return "";
  return t.length > n ? t.slice(0, n - 1).trimEnd() + "…" : t;
}

function makeRelUrl(season, ep, index) {
  if (ep.kind === "episode") return `sezon/${season}/bolum/${ep.number}.html`;
  if (ep.kind === "break") return `sezon/${season}/arabolum/${ep.number}.html`;
  if (ep.kind === "special") {
    if (ep.extraType === "snow") return `sezon/${season}/ozel/memory-snow.html`;
    if (ep.extraType === "frozenbond") return `sezon/${season}/ozel/frozen-bond.html`;
    const slug = slugify(ep.title) || `ozel-${index}`;
    return `sezon/${season}/ozel/${slug}.html`;
  }
  return `sezon/${season}/ozel/icerik-${index}.html`;
}
function makeHubRelUrl(season) {
  return `sezon/${season}/index.html`;
}

function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": it.url
    }))
  };
}

// ✅ SEO için: sayfa üst başlığını statik bas (JS'e bırakma)
function makeSeasonLineStatic(season, ep) {
  if (ep.isFinal) return `${season}. Sezon Final Bölümü`;
  if (ep.kind === "break") return `${season}. Sezon ${ep.number}. Ara Bölüm`;
  if (ep.kind === "special") return `${season}. Sezon Özel Bölüm`;
  return `${season}. Sezon ${ep.number}. Bölüm`;
}
function makeTitleLineStatic(ep) {
  if (ep.kind === "break") return `${ep.number}. Mola Zamanı`;
  return ep.title || `Bölüm ${ep.number}`;
}

// --- meta ---
function makeMetaForEpisode(season, ep, pageUrl, summaryText = "") {
  const isBreak = ep.kind === "break";
  const isSpecial = ep.kind === "special";
  const isSnow = ep.extraType === "snow";
  const isFrozenBond = ep.extraType === "frozenbond";

  let title = "";
  if (isSnow) title = `Re:Zero Memory Snow – Türkçe İzle`;
  else if (isFrozenBond) title = `Re:Zero The Frozen Bond – Türkçe İzle`;
  else if (isBreak) title = `Re:Zero ${season}. Sezon ${ep.number}. Ara Bölüm Türkçe İzle`;
  else if (isSpecial) title = `Re:Zero ${season}. Sezon Özel Bölüm Türkçe İzle`;
  else title = `Re:Zero ${season}. Sezon ${ep.number}. Bölüm Türkçe Altyazılı İzle (Full HD)`;

  let desc = "";
  if (isSnow) desc = `Re:Zero Memory Snow özel bölümünü Türkçe altyazılı Full HD olarak izleyin.`;
  else if (isFrozenBond) desc = `Re:Zero The Frozen Bond özel bölümünü Türkçe altyazılı Full HD olarak izleyin.`;
  else if (isBreak) desc = `Re:Zero ${season}. sezon ${ep.number}. ara bölümü (mola zamanı) Türkçe altyazılı Full HD izle.`;
  else if (isSpecial) desc = `Re:Zero ${season}. sezon özel bölümünü Türkçe altyazılı Full HD izle.`;
  else desc = `Re:Zero ${season}. sezon ${ep.number}. bölümü Türkçe altyazılı Full HD izle: ${ep.title || ""}`.trim();

  const extra = cut(stripHtml(summaryText), 120);
  // breaktime ve normal bölümler için summary’den zenginleştir
  if (!isSnow && !isSpecial && extra) {
    desc = cut(`${desc} ${extra}`, 160);
  } else {
    desc = cut(desc, 160);
  }

  const ogTitle = isBreak
    ? `Re:Zero ${season}. Sezon ${ep.number}. Ara Bölüm Türkçe İzle`
    : isSpecial
    ? `Re:Zero ${season}. Sezon Özel Bölüm Türkçe İzle`
    : `Re:Zero ${season}. Sezon ${ep.number}. Bölüm Türkçe İzle`;

  const ogDesc = isBreak
    ? `Re:Zero ${season}. sezon ${ep.number}. ara bölümünü izle.`
    : isSpecial
    ? `Re:Zero ${season}. sezon özel bölümünü izle.`
    : `Re:Zero ${season}. sezon ${ep.number}. bölümü Türkçe izle: ${ep.title || ""}`.trim();

  return { title, desc, ogTitle, ogDesc, pageUrl };
}

function makeMetaForHub(season, pageUrl) {
  const title = `Re:Zero ${season}. Sezon Bölümleri – Türkçe Altyazılı İzle`;
  const desc = `Re:Zero ${season}. sezon bölüm arşivi: tüm bölümler, ara bölümler (breaktime/mola zamanı) ve özel bölümler (OVA) listesi.`;
  const ogTitle = `Re:Zero ${season}. Sezon Bölüm Arşivi`;
  const ogDesc = desc;
  return { title, desc, ogTitle, ogDesc, pageUrl };
}

function shouldGenerateEpisodePage(ep) {
  return !!(ep && ep.driveId);
}

function navLabelForEp(ep) {
  if (!ep) return "";
  if (ep.kind === "episode") return `${ep.number}. Bölüm`;
  if (ep.kind === "break") return `${ep.number}. Ara Bölüm`;
  if (ep.kind === "special") {
    if (ep.extraType === "snow") return "Memory Snow";
    if (ep.extraType === "frozenbond") return "Frozen Bond";
    return "Özel Bölüm";
  }
  return "İçerik";
}

function buildEpisodePageHtml({
  season,
  epIndex,
  ep,
  relUrl,
  summaryHtml, // string OR { teaserHtml, fullHtml }
  prevRel,
  nextRel,
  prevEp,
  nextEp
}) {
  const pageUrl = `${BASE}/${relUrl}`;
  const twitterImg = `${BASE}/images/s${season}.jpg`;

  const isBreak = ep.kind === "break";
  const isSpecial = ep.kind === "special";

  const episodeName = isBreak
    ? `Re:Zero S${season} Ara Bölüm ${ep.number}`
    : isSpecial
    ? `Re:Zero S${season} Özel Bölüm`
    : `Re:Zero S${season}E${ep.number}: ${ep.title || ""}`.trim();

  // ✅ Summary: supports object OR string
  let teaserHtml = "";
  let fullHtml = "";
  if (summaryHtml && typeof summaryHtml === "object") {
    teaserHtml = String(summaryHtml.teaserHtml || "");
    fullHtml = String(summaryHtml.fullHtml || "");
  } else {
    fullHtml = String(summaryHtml || "");
  }

  // ✅ OPEN summary: full varsa full, yoksa teaser
  const openSummaryHtml = (fullHtml && fullHtml.trim()) ? fullHtml : teaserHtml;

  const meta = makeMetaForEpisode(season, ep, pageUrl, stripHtml(openSummaryHtml).trim());

  const jsonLdEpisode = {
    "@context": "https://schema.org",
    "@type": "TVEpisode",
    "name": episodeName,
    ...(isSpecial ? {} : { "episodeNumber": ep.number }),
    "url": meta.pageUrl,
    "description": meta.desc,
    "image": twitterImg,
    "inLanguage": "tr-TR",
    "timeRequired": "PT25M",
    "partOfSeason": {
      "@type": "TVSeason",
      "seasonNumber": season,
      "url": `${BASE}/${makeHubRelUrl(season)}`,
      "partOfSeries": {
        "@type": "TVSeries",
        "name": "Re:Zero kara Hajimeru Isekai Seikatsu",
        "url": `${BASE}/`
      }
    },
    "potentialAction": { "@type": "WatchAction", "target": meta.pageUrl }
  };

  const crumbs = breadcrumbJsonLd([
    { name: "rezeroizle.com", url: `${BASE}/` },
    { name: `${season}. Sezon`, url: `${BASE}/${makeHubRelUrl(season)}` },
    {
      name: isSpecial ? "Özel Bölüm" : (isBreak ? `${ep.number}. Ara Bölüm` : `${ep.number}. Bölüm`),
      url: meta.pageUrl
    }
  ]);

  const seasonLine = makeSeasonLineStatic(season, ep);
  const titleLine = makeTitleLineStatic(ep);

  const summaryBlock = (openSummaryHtml && String(openSummaryHtml).trim())
    ? `
  <section class="episode-summary-section">
    <h2 class="episode-summary-title">Bölüm Özeti</h2>
    <div class="episode-summary-open">
      ${openSummaryHtml}
    </div>
  </section>
`
    : ``;

  const prevAbs = prevRel ? `${BASE}/${prevRel}` : null;
  const nextAbs = nextRel ? `${BASE}/${nextRel}` : null;

  const prevText = prevEp ? `← ${navLabelForEp(prevEp)}` : "← Önceki";
  const nextText = nextEp ? `${navLabelForEp(nextEp)} →` : "Sonraki →";

	const prevBtnHtml = prevAbs
	  ? `<a class="ep-nav-btn" href="${escAttr(prevAbs)}">${escAttr(prevText)}</a>`
	  : `<span class="ep-nav-btn disabled" aria-disabled="true">←</span>`;

	const nextBtnHtml = nextAbs
	  ? `<a class="ep-nav-btn" href="${escAttr(nextAbs)}">${escAttr(nextText)}</a>`
	  : `<span class="ep-nav-btn disabled" aria-disabled="true">→</span>`;


  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <base href="../../../">
  <title>${escAttr(meta.title)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escAttr(meta.desc)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${escAttr(meta.pageUrl)}">
  <link rel="alternate" hreflang="tr-TR" href="${escAttr(meta.pageUrl)}">
  <link rel="alternate" hreflang="x-default" href="${escAttr(meta.pageUrl)}">
  ${prevAbs ? `<link rel="prev" href="${escAttr(prevAbs)}">` : ``}
  ${nextAbs ? `<link rel="next" href="${escAttr(nextAbs)}">` : ``}

  <meta property="og:type" content="video.tv_show">
  <meta property="og:site_name" content="rezeroizle.com">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:title" content="${escAttr(meta.ogTitle)}">
  <meta property="og:description" content="${escAttr(meta.ogDesc)}">
  <meta property="og:url" content="${escAttr(meta.pageUrl)}">
  <meta property="og:image" content="${escAttr(twitterImg)}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${escAttr(meta.pageUrl)}">
  <meta name="twitter:title" content="${escAttr(meta.ogTitle)}">
  <meta name="twitter:description" content="${escAttr(meta.desc)}">
  <meta name="twitter:image" content="${escAttr(twitterImg)}">

  <link rel="stylesheet" href="style.css">
  <link rel="icon" type="image/png" href="images/icon.png">

  <script type="application/ld+json">${JSON.stringify(jsonLdEpisode)}</script>
  <script type="application/ld+json">${JSON.stringify(crumbs)}</script>
</head>
<body>

<nav class="navbar">
  <div class="nav-logo">
    <a href="index.html">
      <img src="images/icon.png" alt="Logo" class="nav-icon">
      rezeroizle.com
    </a>
  </div>
</nav>

<header class="player-header">
  <h1 id="episodeTitle">
    <span class="season-episode">${escAttr(seasonLine)}</span>
    <span class="episode-title">${escAttr(titleLine)}</span>
  </h1>

  <noscript>
    <div style="max-width:900px;margin:8px auto 0;text-align:center;color:rgba(234,234,255,0.75);">
      JavaScript kapalı. Bölüm başlığı ve liste yine de görüntülenebilir; video oynatıcı için JavaScript gerekebilir.
    </div>
  </noscript>
</header>

<main class="player-container">
  <div class="video-wrapper">
    <div id="unreleasedOverlay" class="unreleased-overlay" style="display:none;">
      <div class="unreleased-box">
        <div class="unreleased-title">Bu bölümün çevirisini henüz tamamlamadım.</div>
        <div class="unreleased-sub">Daha sonra tekrar kontrol edebilirsin.</div>
      </div>
    </div>

    <iframe
      id="videoPlayer"
      src="about:blank"
      allow="autoplay; fullscreen"
      allowfullscreen
      style="width: 100%; height: 100%; border: none;">
    </iframe>
  </div>

  <div class="episode-toolbar">
    <div class="episode-nav-left">${prevBtnHtml}</div>
    <h2 class="episode-section-title">Bölüm Seç</h2>
    <div class="episode-nav-right">${nextBtnHtml}</div>
  </div>

  <div class="episode-download-box">
    <span>► Daha yüksek görüntü kalitesi için bölümü indirebilirsiniz.</span>
    <a id="downloadBtn" href="#" target="_blank" class="episode-download-btn">⬇ İndir</a>
  </div>

  <div class="episode-list"></div>

  <section class="comments-section">
    <h2>Bölüm Yorumları</h2>

    <div id="spoiler-warning" class="spoiler-warning">
      <p><strong>Uyarı:</strong> Gelecek bölümler hakkında konuşmak yasaktır, sadece izlediğiniz bölümle alakalı yorum giriniz. Saygılı olunuz.</p>
      <button id="acceptRulesBtn">Yorumları Aç</button>
    </div>

    <div id="commentsContainer" class="comments-container" style="display: none;">
      <div id="utterances-container"></div>
    </div>
  </section>

  ${summaryBlock}
</main>

<script src="seasons-data.js"></script>
<script src="episode-pages-map.js"></script>
<script>window.SEASON_NUMBER = ${season}; window.EPISODE_INDEX = ${epIndex};</script>
<script src="player.js"></script>

<style>
  @media (max-width: 768px) { #downloadBtn { display: none; } }

  .episode-toolbar{
    width: 100%;
    margin: 18px 0 10px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 12px;
  }
  .episode-toolbar .episode-section-title{
    margin: 0;
    justify-self: center;
  }
  .episode-nav-left{ justify-self: start; }
  .episode-nav-right{ justify-self: end; }

  .ep-nav-btn{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 9px 12px;
    border-radius: 12px;
    font-weight: 800;
    text-decoration: none;
    color: rgba(234,234,255,0.92);
    background: rgba(21,25,51,0.45);
    border: 1px solid rgba(255,255,255,0.10);
    box-shadow: 0 10px 26px rgba(0,0,0,0.22);
    user-select: none;
    white-space: nowrap;
  }
  .ep-nav-btn:hover{
    background: rgba(31,36,80,0.55);
    border-color: rgba(143,155,255,0.35);
  }
  .ep-nav-btn.disabled,
  .ep-nav-btn[aria-disabled="true"]{
    opacity: 0.45;
    pointer-events: none;
  }

  @media (max-width: 768px){
    .episode-toolbar{
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
      gap: 10px;
    }
    .episode-nav-left, .episode-nav-right{
      justify-self: center;
    }
  }

  /* ✅ Açık Özet */
  .episode-summary-section { width: 100%; margin: 12px 0 18px; max-width: none; }
  .episode-summary-title{
    margin: 14px 0 8px;
    font-size: 18px;
    font-weight: 900;
  }
  .episode-summary-open{
    background: rgba(21,25,51,0.55);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 12px 14px;
    color: #cfd6ff;
    line-height: 1.75;
  }
  .episode-summary-open p { margin: 8px 0; }
</style>

<script>
document.getElementById("acceptRulesBtn").addEventListener("click", () => {
  const warning = document.getElementById("spoiler-warning");
  const container = document.getElementById("commentsContainer");
  warning.style.display = "none";
  container.style.display = "block";
  setTimeout(() => container.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
});
</script>

</body>
</html>`;
}

function buildHubPageHtml({ season, episodes, relUrl, prevHubRel, nextHubRel }) {
  const pageUrl = `${BASE}/${relUrl}`;
  const meta = makeMetaForHub(season, pageUrl);
  const twitterImg = `${BASE}/images/s${season}.jpg`;

  const prevAbs = prevHubRel ? `${BASE}/${prevHubRel}` : null;
  const nextAbs = nextHubRel ? `${BASE}/${nextHubRel}` : null;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Re:Zero ${season}. Sezon Bölüm Listesi`,
    "itemListElement": episodes
      .filter((ep) => shouldGenerateEpisodePage(ep))
      .map((ep, idx) => {
        const rel = makeRelUrl(season, ep, idx);
        const url = `${BASE}/${rel}`;
        const name =
          ep.kind === "break"
            ? `${ep.number}. Ara Bölüm`
            : ep.kind === "special"
            ? (ep.title || "Özel Bölüm")
            : `${ep.number}. Bölüm`;
        return { "@type": "ListItem", "position": idx + 1, "name": name, "url": url };
      })
  };

  const seasonJsonLd = {
    "@context": "https://schema.org",
    "@type": "TVSeason",
    "seasonNumber": season,
    "url": pageUrl,
    "name": `Re:Zero ${season}. Sezon`,
    "partOfSeries": {
      "@type": "TVSeries",
      "name": "Re:Zero kara Hajimeru Isekai Seikatsu",
      "url": `${BASE}/`
    }
  };

  const crumbs = breadcrumbJsonLd([
    { name: "rezeroizle.com", url: `${BASE}/` },
    { name: `${season}. Sezon`, url: pageUrl }
  ]);

  let unreleasedCount = 0;

  const links = episodes
    .map((ep, idx) => {
      const label =
        ep.kind === "break"
          ? `${ep.number}. Ara Bölüm (Mola Zamanı)`
          : ep.kind === "special"
          ? (ep.title || "Özel Bölüm")
          : `${ep.number}. Bölüm – ${ep.title || ""}`.trim();

      if (!shouldGenerateEpisodePage(ep)) {
        unreleasedCount++;
        return null;
      }

      const rel = makeRelUrl(season, ep, idx);
      const href = rel.replace(`sezon/${season}/`, "");
      return `<li><a href="${escAttr(href)}">${escAttr(label)}</a></li>`;
    })
    .filter(Boolean)
    .join("\n        ");

  const unreleasedLine = unreleasedCount
    ? `<li><span class="hub-unreleased">Yakında: ${unreleasedCount} içerik</span></li>`
    : "";

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>${escAttr(meta.title)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escAttr(meta.desc)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${escAttr(pageUrl)}">
  <link rel="alternate" hreflang="tr-TR" href="${escAttr(pageUrl)}">
  <link rel="alternate" hreflang="x-default" href="${escAttr(pageUrl)}">
  ${prevAbs ? `<link rel="prev" href="${escAttr(prevAbs)}">` : ``}
  ${nextAbs ? `<link rel="next" href="${escAttr(nextAbs)}">` : ``}

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="rezeroizle.com">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:title" content="${escAttr(meta.ogTitle)}">
  <meta property="og:description" content="${escAttr(meta.ogDesc)}">
  <meta property="og:url" content="${escAttr(pageUrl)}">
  <meta property="og:image" content="${escAttr(twitterImg)}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${escAttr(pageUrl)}">
  <meta name="twitter:title" content="${escAttr(meta.ogTitle)}">
  <meta name="twitter:description" content="${escAttr(meta.desc)}">
  <meta name="twitter:image" content="${escAttr(twitterImg)}">

  <link rel="stylesheet" href="../../style.css">
  <link rel="icon" type="image/png" href="../../images/icon.png">

  <script type="application/ld+json">${JSON.stringify(seasonJsonLd)}</script>
  <script type="application/ld+json">${JSON.stringify(itemListJsonLd)}</script>
  <script type="application/ld+json">${JSON.stringify(crumbs)}</script>

  <style>
    .hub-wrap { max-width: 980px; margin: 0 auto; padding: 24px 20px 40px; }
    .hub-title { text-align: center; margin: 12px 0 8px; font-size: 34px; }
    .hub-sub { text-align: center; color: rgba(234,234,255,0.75); margin: 0 0 22px; }
    .hub-card { background: rgba(21,25,51,0.55); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 18px; }
    .hub-card ul { margin: 0; padding-left: 18px; line-height: 1.9; }
    .hub-card a { color: #dfe2ff; text-decoration: underline; text-underline-offset: 3px; }
    .hub-unreleased { color: rgba(234,234,255,0.55); }
    .hub-cta { display:flex; justify-content:center; margin-top:16px; }
    .hub-cta a { background: rgba(143,155,255,0.18); border: 1px solid rgba(143,155,255,0.45); padding: 10px 16px; border-radius: 12px; font-weight: 800; }
  </style>
</head>
<body>

<nav class="navbar">
  <div class="nav-logo">
    <a href="../../index.html">
      <img src="../../images/icon.png" alt="Logo" class="nav-icon">
      rezeroizle.com - ${season}. Sezon Arşiv
    </a>
  </div>
</nav>

<main class="hub-wrap">
  <h1 class="hub-title">Re:Zero ${season}. Sezon Bölümleri</h1>
  <p class="hub-sub">Bölümler • Ara Bölümler • Özel Bölümler</p>

  <div class="hub-card">
    <ul>
        ${links}
        ${unreleasedLine}
    </ul>

    <div class="hub-cta">
      <a href="bolum/1.html">İzlemeye Başla → (1. Bölüm)</a>
    </div>
  </div>
</main>

</body>
</html>`;
}

// ---- Load seasons-data.js + episode-summaries.js in VM ----
const seasonsCode = fs.readFileSync(path.join(__dirname, "seasons-data.js"), "utf8");
const summariesCode = fs.existsSync(path.join(__dirname, "episode-summaries.js"))
  ? fs.readFileSync(path.join(__dirname, "episode-summaries.js"), "utf8")
  : "window.REZERO_EP_SUMMARIES = {};";

const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(seasonsCode, sandbox);
vm.runInContext(summariesCode, sandbox);

const rz = sandbox.window.REZERO_SEASONS;
const summaries = sandbox.window.REZERO_EP_SUMMARIES || {};
if (!rz || typeof rz.buildEpisodes !== "function") {
  throw new Error("REZERO_SEASONS not found.");
}

ensureDir(OUT_ROOT);

const map = {};
const sitemapItems = [];

sitemapItems.push({
  loc: "/",
  filePath: path.join(__dirname, "index.html"),
  changefreq: "daily",
  priority: "1.0"
});

// ✅ Karakter Bul (mini oyun) sayfası
sitemapItems.push({
  loc: "/karakter-bul.html",
  filePath: path.join(__dirname, "karakter-bul.html"),
  changefreq: "weekly",
  priority: "0.9"
});

const seasons = Object.keys(rz.configs || {}).map(Number).sort((a, b) => a - b);

for (let si = 0; si < seasons.length; si++) {
  const season = seasons[si];
  const eps = rz.buildEpisodes(season);

  const prevSeason = seasons[si - 1] || null;
  const nextSeason = seasons[si + 1] || null;

  const prevHubRel = prevSeason ? makeHubRelUrl(prevSeason) : null;
  const nextHubRel = nextSeason ? makeHubRelUrl(nextSeason) : null;

  const hubRel = makeHubRelUrl(season);
  const hubPath = path.join(__dirname, hubRel);
  ensureDir(path.dirname(hubPath));
  fs.writeFileSync(
    hubPath,
    buildHubPageHtml({ season, episodes: eps, relUrl: hubRel, prevHubRel, nextHubRel }),
    "utf8"
  );

  sitemapItems.push({
    loc: hubRel,
    filePath: hubPath,
    changefreq: "weekly",
    priority: "0.9"
  });

  map[season] = {};

  const generatedIdxs = [];
  for (let i = 0; i < eps.length; i++) {
    if (shouldGenerateEpisodePage(eps[i])) generatedIdxs.push(i);
  }

  for (let i = 0; i < eps.length; i++) {
    const ep = eps[i];

    if (!shouldGenerateEpisodePage(ep)) {
      map[season][i] = null;
      continue;
    }

    const relUrl = makeRelUrl(season, ep, i);
    const outPath = path.join(__dirname, relUrl);
    ensureDir(path.dirname(outPath));

    const pos = generatedIdxs.indexOf(i);
    const prevI = pos > 0 ? generatedIdxs[pos - 1] : null;
    const nextI = (pos >= 0 && pos < generatedIdxs.length - 1) ? generatedIdxs[pos + 1] : null;

    const prevRel = (prevI !== null) ? makeRelUrl(season, eps[prevI], prevI) : null;
    const nextRel = (nextI !== null) ? makeRelUrl(season, eps[nextI], nextI) : null;

    const prevEp = (prevI !== null) ? eps[prevI] : null;
    const nextEp = (nextI !== null) ? eps[nextI] : null;

    // ✅ KEY önce, yoksa index fallback
    const seasonSumm = summaries?.[season] || {};
    const key = makeSummaryKey(ep, i);

    const summaryHtml =
      (typeof seasonSumm[key] !== "undefined")
        ? (seasonSumm[key] || "")
        : (typeof seasonSumm[i] !== "undefined")
          ? (seasonSumm[i] || "")
          : "";

    const html = buildEpisodePageHtml({
      season,
      epIndex: i,
      ep,
      relUrl,
      summaryHtml,
      prevRel,
      nextRel,
      prevEp,
      nextEp
    });

    fs.writeFileSync(outPath, html, "utf8");
    map[season][i] = relUrl;

    sitemapItems.push({
      loc: relUrl,
      filePath: outPath,
      changefreq: "monthly",
      priority: "0.7"
    });
  }
}

const mapJs = `/* AUTO-GENERATED by generate-site.js */
window.REZERO_EP_PAGES = ${JSON.stringify(map, null, 2)};
console.log("[OK] episode-pages-map.js loaded");
`;
fs.writeFileSync(path.join(__dirname, "episode-pages-map.js"), mapJs, "utf8");

const urlBlocks = sitemapItems.map((item) => {
  const lastmod = getFileLastmod(item.filePath);
  return urlBlock(item.loc, lastmod, item.changefreq, item.priority);
});
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks.join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(__dirname, "sitemap.xml"), xml, "utf8");

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`;
fs.writeFileSync(path.join(__dirname, "robots.txt"), robotsTxt, "utf8");

const notFound = `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <title>Sayfa Bulunamadı (404) | rezeroizle.com</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="${BASE}/404.html">
  <link rel="alternate" hreflang="tr-TR" href="${BASE}/404.html">
  <link rel="alternate" hreflang="x-default" href="${BASE}/404.html">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar">
    <div class="nav-logo">
      <a href="index.html">
        <img src="images/icon.png" alt="Logo" class="nav-icon">
        rezeroizle.com
      </a>
    </div>
  </nav>

  <main class="player-container" style="max-width:800px;text-align:center;padding-top:40px;">
    <h1 style="font-size:34px;margin:0 0 10px;">404 — Sayfa Bulunamadı</h1>
    <p style="color:rgba(234,234,255,0.75);line-height:1.8;">
      Aradığın sayfa yok veya taşınmış olabilir. Ana sayfaya dönüp sezon/bölüm seçebilirsin.
    </p>
    <p style="margin-top:18px;">
      <a class="continue-action" href="index.html">Ana Sayfa →</a>
    </p>
  </main>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, "404.html"), notFound, "utf8");

console.log("[OK] generate-site.js done (V9 - OPEN SUMMARY + KEYED SUMMARIES)");
console.log("[OK] Summaries: key-first (ep: / break: / special:) then index fallback.");