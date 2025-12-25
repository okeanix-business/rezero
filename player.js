/* ================================
   MULTI-SEASON PLAYER (DATA DRIVEN)
   - seasons-data.js -> window.REZERO_SEASONS
   - seasonX.html -> window.SEASON_NUMBER = X
   - driveId boşsa: video açılmaz, overlay görünür
   - Title / üst başlıkta "yayınlanmadı" yazmaz (overlay zaten anlatıyor)
   - ✅ Index'teki "Devam Et" için: en son açılan bölüm GLOBAL olarak kaydedilir
================================ */

const SEASON_NUMBER = Number(window.SEASON_NUMBER || 1);

// Bu key "izleme ilerlemesi" gibi davranır (watch/watched boyaması için)
const STORAGE_KEY = `rezero_s${SEASON_NUMBER}_last_episode`;

// ✅ En son açılan bölüm (sezon fark etmeksizin index'te bunu gösteriyoruz)
const GLOBAL_LAST_OPEN_KEY = "rezero_last_open";
// İstersen sadece yayınlananlarda da ayrıca tut:
const GLOBAL_LAST_WATCH_KEY = "rezero_last_watch";

const episodes = window.REZERO_SEASONS?.buildEpisodes
  ? window.REZERO_SEASONS.buildEpisodes(SEASON_NUMBER)
  : [];

let currentEpisode = 0;

/* ================================
   ELEMENTS
================================ */
const player = document.getElementById("videoPlayer");
const downloadBtn = document.getElementById("downloadBtn");
const episodeListContainer = document.querySelector(".episode-list");
const utterancesContainer = document.getElementById("utterances-container");
const unreleasedOverlay = document.getElementById("unreleasedOverlay");

/* ================================
   URL
================================ */
function getIndexFromURL() {
  const params = new URLSearchParams(window.location.search);
  const i = params.get("i");
  return i !== null ? parseInt(i, 10) : null;
}

/* ================================
   HELPERS
================================ */
function isAvailable(ep) {
  return !!ep.driveId;
}

function setDownloadState(ep) {
  if (!downloadBtn) return;

  if (isAvailable(ep)) {
    downloadBtn.classList.remove("disabled");
    downloadBtn.href = `https://drive.google.com/uc?export=download&id=${ep.driveId}`;
    downloadBtn.setAttribute("target", "_blank");
  } else {
    downloadBtn.classList.add("disabled");
    downloadBtn.removeAttribute("href");
  }
}

function setVideoState(ep) {
  if (!player) return;

  if (isAvailable(ep)) {
    if (unreleasedOverlay) unreleasedOverlay.style.display = "none";
    player.style.visibility = "visible";
    player.src = `https://drive.google.com/file/d/${ep.driveId}/preview`;
  } else {
    player.src = "about:blank";
    player.style.visibility = "hidden";
    if (unreleasedOverlay) unreleasedOverlay.style.display = "flex";
  }
}

// ✅ Üst başlıkta "yayınlanmadı" YAZMA
function makeSeasonLine(ep) {
  if (ep.isFinal) return `${SEASON_NUMBER}. Sezon Final Bölümü`;
  if (ep.kind === "break") return `${SEASON_NUMBER}. Sezon ${ep.number}. Ara Bölüm`;
  if (ep.kind === "special") return `${SEASON_NUMBER}. Sezon Özel Bölüm`;
  return `${SEASON_NUMBER}. Sezon ${ep.number}. Bölüm`;
}

function makeTitleLine(ep) {
  if (ep.kind === "break") return `${ep.number}. Mola Zamanı`;
  return ep.title || `Bölüm ${ep.number}`;
}

/* ================================
   RENDER EPISODE LIST
================================ */
function renderEpisodeList() {
  if (!episodeListContainer) return;

  episodeListContainer.innerHTML = "";
  const savedIndex = parseInt(localStorage.getItem(STORAGE_KEY) || -1, 10);

  episodes.forEach((ep, index) => {
    const btn = document.createElement("button");

    // normal bölüm
    if (!ep.isExtra) btn.textContent = ep.number;

    // final rengi
    if (ep.isFinal) btn.classList.add("final-episode");

    // extras
    if (ep.isExtra) {
      if (ep.kind === "break") {
        btn.innerHTML = `${ep.number}<span class="break-icon">☕</span>`;
        btn.classList.add("special-episode");
      } else if (ep.extraType === "snow") {
        btn.innerHTML = `${ep.number}<span class="snow-icon">❄</span>`;
        btn.classList.add("special-snow");
      } else {
        btn.innerHTML = `${ep.number}<span class="snow-icon">❄</span>`;
        btn.classList.add("special-snow");
      }
    }

    // yayınlanmamış / çevirilmemiş (gri buton)
    if (!isAvailable(ep)) btn.classList.add("unreleased");

    // watched (sadece yayınlananlarda kaydedilmiş index'e göre)
    if (index < savedIndex) btn.classList.add("watched");

    // active
    if (index === currentEpisode) btn.classList.add("active");

    btn.onclick = () => loadEpisode(index);
    episodeListContainer.appendChild(btn);
  });
}

/* ================================
   COMMENTS (UTTERANCES)
================================ */
function loadComments() {
  if (!utterancesContainer) return;

  utterancesContainer.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";

  script.setAttribute("repo", "okeanix-business/rezero");
  script.setAttribute("issue-term", `s${SEASON_NUMBER}-i${currentEpisode}`);
  script.setAttribute("theme", "github-dark");
  script.setAttribute("label", "comment");
  script.async = true;

  utterancesContainer.appendChild(script);
}

/* ================================
   SEO (TITLE / META / OG / CANONICAL)
   - canonical + og:url => ?i= ile güncellenir
================================ */
function upsertJsonLd(id, obj) {
  let s = document.getElementById(id);
  if (!s) {
    s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = id;
    document.head.appendChild(s);
  }
  s.textContent = JSON.stringify(obj);
}

function applySEO(ep) {
  const desc = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  const canonical = document.querySelector('link[rel="canonical"]');

  const isBreak = ep.kind === "break";
  const isSpecial = ep.kind === "special";
  const isSnow = ep.extraType === "snow";
  const unavailable = !isAvailable(ep);

  // Title
  if (isSnow) {
    document.title = `Re:Zero Memory Snow – Türkçe İzle | rezeroizle.com`;
  } else if (isBreak) {
    document.title = `Re:Zero ${SEASON_NUMBER}. Sezon ${ep.number}. Ara Bölüm Türkçe İzle | rezeroizle.com`;
  } else if (isSpecial) {
    document.title = `Re:Zero ${SEASON_NUMBER}. Sezon Özel Bölüm Türkçe İzle | rezeroizle.com`;
  } else {
    document.title = `Re:Zero ${SEASON_NUMBER}. Sezon ${ep.number}. Bölüm Türkçe Altyazılı İzle (Full HD) | rezeroizle.com`;
  }

  // Description
  let descText = "";
  if (unavailable) {
    descText = `Bu bölüm henüz hazır değil. Güncellemeler için siteyi takip edin.`;
  } else if (isSnow) {
    descText = `Re:Zero Memory Snow özel bölümünü Türkçe altyazılı Full HD olarak izleyin.`;
  } else if (isBreak) {
    descText = `Re:Zero ${SEASON_NUMBER}. sezon ${ep.number}. ara bölümü (mola zamanı) Türkçe altyazılı Full HD izle.`;
  } else if (isSpecial) {
    descText = `Re:Zero ${SEASON_NUMBER}. sezon özel bölümünü Türkçe altyazılı Full HD izle.`;
  } else {
    descText = `Re:Zero ${SEASON_NUMBER}. sezon ${ep.number}. bölümü Türkçe altyazılı Full HD izle: ${ep.title}`;
  }
  if (desc) desc.setAttribute("content", descText);

  // OG title/desc
  if (ogTitle) {
    ogTitle.setAttribute(
      "content",
      isBreak
        ? `Re:Zero ${SEASON_NUMBER}. Sezon ${ep.number}. Ara Bölüm Türkçe İzle`
        : isSpecial
        ? `Re:Zero ${SEASON_NUMBER}. Sezon Özel Bölüm Türkçe İzle`
        : `Re:Zero ${SEASON_NUMBER}. Sezon ${ep.number}. Bölüm Türkçe İzle`
    );
  }

  if (ogDesc) {
    ogDesc.setAttribute(
      "content",
      unavailable
        ? "Bu bölüm henüz hazır değil."
        : isBreak
        ? `Re:Zero ${SEASON_NUMBER}. sezon ${ep.number}. ara bölümünü izle.`
        : isSpecial
        ? `Re:Zero ${SEASON_NUMBER}. sezon özel bölümünü izle.`
        : `Re:Zero ${SEASON_NUMBER}. sezon ${ep.number}. bölümü Türkçe izle: ${ep.title}`
    );
  }

  // canonical + og:url => ?i=
  // Not: canonical genelde build-time daha iyi; ama sen JS ile istedin.
  const currentParamUrl = `${window.location.origin}${window.location.pathname}?i=${currentEpisode}`;
  if (canonical) {
    const base = canonical.getAttribute("href") || currentParamUrl;
    const clean = base.split("?")[0].split("#")[0];
    canonical.setAttribute("href", `${clean}?i=${currentEpisode}`);
  }
  if (ogUrl) {
    const base = ogUrl.getAttribute("content") || (canonical ? canonical.getAttribute("href") : currentParamUrl);
    const clean = String(base).split("?")[0].split("#")[0];
    ogUrl.setAttribute("content", `${clean}?i=${currentEpisode}`);
  }

  // TVEpisode JSON-LD
  const pageUrl = (canonical && canonical.getAttribute("href")) ? canonical.getAttribute("href") : currentParamUrl;

  const episodeName = isBreak
    ? `Re:Zero S${SEASON_NUMBER} Ara Bölüm ${ep.number}`
    : isSpecial
    ? `Re:Zero S${SEASON_NUMBER} Özel Bölüm`
    : `Re:Zero S${SEASON_NUMBER}E${ep.number}: ${ep.title}`;

  upsertJsonLd("rz-episode-jsonld", {
    "@context": "https://schema.org",
    "@type": "TVEpisode",
    "name": episodeName,
    "episodeNumber": isSpecial ? undefined : ep.number,
    "url": pageUrl,
    "description": descText,
    "partOfSeason": {
      "@type": "TVSeason",
      "seasonNumber": SEASON_NUMBER,
      "partOfSeries": {
        "@type": "TVSeries",
        "name": "Re:Zero kara Hajimeru Isekai Seikatsu"
      }
    }
  });
}

/* ================================
   LOAD EPISODE
================================ */
function loadEpisode(index) {
  if (index < 0 || index >= episodes.length) return;

  currentEpisode = index;
  const ep = episodes[index];

  // Video / Download / UI
  setVideoState(ep);
  setDownloadState(ep);

  const seasonText = makeSeasonLine(ep);
  const episodeText = makeTitleLine(ep);

  const seasonEl = document.querySelector(".season-episode");
  const titleEl = document.querySelector(".episode-title");
  if (seasonEl) seasonEl.textContent = seasonText;
  if (titleEl) titleEl.textContent = episodeText;

  // URL (paylaşmak için)
  history.replaceState(null, "", `?i=${index}`);

  // ✅ En son açılanı global kaydet (yayınlanmamış olsa bile)
  const now = Date.now();
  try {
    localStorage.setItem(GLOBAL_LAST_OPEN_KEY, JSON.stringify({ season: SEASON_NUMBER, i: index, t: now }));
    localStorage.setItem(`rezero_s${SEASON_NUMBER}_last_seen_at`, String(now));
    localStorage.setItem(`rezero_s${SEASON_NUMBER}_last_open`, String(index));
  } catch (e) {
    // localStorage kapalıysa sessiz geç
  }

  // ✅ Yayınlanmışsa "izleme ilerlemesi" olarak da kaydet (watched boyaması için)
  if (isAvailable(ep)) {
    try {
      localStorage.setItem(STORAGE_KEY, String(index));
      localStorage.setItem(GLOBAL_LAST_WATCH_KEY, JSON.stringify({ season: SEASON_NUMBER, i: index, t: now }));
    } catch (e) {}
  }

  // comments reset (varsa)
  const spoiler = document.getElementById("spoiler-warning");
  const commentsBox = document.getElementById("commentsContainer");
  if (spoiler && commentsBox) {
    spoiler.style.display = "block";
    commentsBox.style.display = "none";
  }

  loadComments();
  applySEO(ep);
  renderEpisodeList();
}

/* ================================
   INIT
================================ */
renderEpisodeList();

const urlIndex = getIndexFromURL();
const saved = localStorage.getItem(STORAGE_KEY);

if (urlIndex !== null && !isNaN(urlIndex)) {
  loadEpisode(urlIndex);
} else if (saved !== null) {
  loadEpisode(parseInt(saved, 10));
} else {
  loadEpisode(0);
}
