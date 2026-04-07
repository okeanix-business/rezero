/* player.js — URL çözümleme + yönlendirme + yorum issue-term stabil */

const SEASON_NUMBER = Number(window.SEASON_NUMBER || 1);
const EPISODE_INDEX = Number(window.EPISODE_INDEX ?? 0);

const STORAGE_KEY = `rezero_s${SEASON_NUMBER}_last_episode`;
const GLOBAL_LAST_OPEN_KEY = "rezero_last_open";
const GLOBAL_LAST_WATCH_KEY = "rezero_last_watch";

const episodes = window.REZERO_SEASONS?.buildEpisodes
  ? window.REZERO_SEASONS.buildEpisodes(SEASON_NUMBER)
  : [];

let currentEpisode = Math.min(
  Math.max(EPISODE_INDEX, 0),
  Math.max(episodes.length - 1, 0)
);

const player = document.getElementById("videoPlayer");
const downloadBtn = document.getElementById("downloadBtn");
const episodeListContainer = document.querySelector(".episode-list");
const unreleasedOverlay = document.getElementById("unreleasedOverlay");
const sourceSelectorBar = document.getElementById("sourceSelectorBar");
const playerSelectContainer = document.querySelector(".player-select-container");
const coverOverlay = document.getElementById("coverOverlay");
const coverButtons = document.getElementById("coverButtons");
let coverDismissed = false;
let currentSourcePref = localStorage.getItem("rezero_source_pref") || "tau";

/* ================================
   FULLSCREEN FIX (MOBILE)
================================ */

// ✅ iframe fullscreen izinleri (HTML'de kaybolsa bile JS basar)
(function ensureIframeFullscreen() {
  if (!player) return;

  player.setAttribute("allowfullscreen", "");
  player.setAttribute("webkitallowfullscreen", "");
  player.setAttribute("mozallowfullscreen", "");

  const prev = (player.getAttribute("allow") || "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

  const need = ["autoplay", "fullscreen", "picture-in-picture"];
  const merged = Array.from(new Set([...prev, ...need])).join("; ");
  player.setAttribute("allow", merged);
})();

function getFsEl() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement ||
    null
  );
}

async function lockLandscape() {
  try {
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock("landscape");
    }
  } catch (e) {
    // iOS Safari vb. çoğu durumda izin vermez
  }
}

function unlockOrientation() {
  try {
    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
  } catch (e) {}
}

function onFullscreenChange() {
  const fsEl = getFsEl();
  if (fsEl) lockLandscape();
  else unlockOrientation();
}

document.addEventListener("fullscreenchange", onFullscreenChange);
document.addEventListener("webkitfullscreenchange", onFullscreenChange);
document.addEventListener("mozfullscreenchange", onFullscreenChange);
document.addEventListener("MSFullscreenChange", onFullscreenChange);

/* ================================
   HELPERS
================================ */

function isAvailable(ep) {
  return !!(ep.driveId || ep.animecix);
}

function slugifyLite(s) {
  return (
    String(s || "")
      .toLowerCase()
      .replace(/ı/g, "i")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "ozel"
  );
}

// ✅ Yorumlar: index'e bağlı olmayan sabit anahtar
function getIssueTerm(ep) {
  if (!ep) return `s${SEASON_NUMBER}-unknown`;

  if (ep.kind === "episode") return `s${SEASON_NUMBER}-e${ep.number}`;
  if (ep.kind === "break") return `s${SEASON_NUMBER}-b${ep.number}`;

  if (ep.kind === "special") {
    if (ep.extraType === "snow") return `s${SEASON_NUMBER}-sp-memory-snow`;
    if (ep.extraType === "special0") return `s${SEASON_NUMBER}-sp-frozen-bond`;
    const slug = slugifyLite(ep.title || "ozel");
    return `s${SEASON_NUMBER}-sp-${slug}`;
  }

  // fallback
  return `s${SEASON_NUMBER}-x${ep.number || currentEpisode}`;
}

function getEpisodePageUrl(season, index) {
  try {
    const rel = window.REZERO_EP_PAGES?.[season]?.[index] || null;
    if (!rel) return null;
    return new URL(rel, document.baseURI).toString();
  } catch (e) {
    return null;
  }
}

/* ================================
   VIDEO/DOWNLOAD STATE
================================ */

function switchSource(ep, sourceKey) {
  currentSourcePref = sourceKey;
  localStorage.setItem("rezero_source_pref", sourceKey);
  setVideoState(ep);
  setDownloadState(ep);
  renderSourceSelectors(ep);
}

function renderSourceSelectors(ep) {
  if (!sourceSelectorBar) return;
  sourceSelectorBar.innerHTML = "";
  if (!ep) return;

  const sources = [];
  const hasDrive = ep.driveId;
  const hasTau = ep.animecix;

  // TAU ve Google
  if (hasTau) sources.push({ key: "tau", label: "TAU" });
  if (hasDrive) sources.push({ key: "google", label: "Google" });

  if (sources.length <= 1) {
    if (playerSelectContainer) playerSelectContainer.style.display = "none";
    sourceSelectorBar.style.display = "none";
    return;
  }

  if (playerSelectContainer) playerSelectContainer.style.display = "block";
  sourceSelectorBar.style.display = "flex";

  sources.forEach(src => {
    const btn = document.createElement("button");
    btn.className = "source-selector-btn";
    if (currentSourcePref === src.key) btn.classList.add("active");
    btn.textContent = src.label;
    btn.onclick = () => switchSource(ep, src.key);
    sourceSelectorBar.appendChild(btn);
  });
}

function setDownloadState(ep) {
  if (!downloadBtn) return;

  // Her zaman Google ID'sine yönlendir, player seçimi fark etmez
  let activeDriveId = ep.driveId;

  if (activeDriveId) {
    downloadBtn.classList.remove("disabled");
    downloadBtn.style.display = "inline-flex";
    downloadBtn.href = `https://drive.google.com/uc?export=download&id=${activeDriveId}`;
    downloadBtn.setAttribute("target", "_blank");
  } else {
    downloadBtn.classList.add("disabled");
    downloadBtn.style.display = "none";
    downloadBtn.removeAttribute("href");
  }
}

function setVideoState(ep) {
  if (!player) return;

  // Don't load video if cover is still showing
  if (!coverDismissed) {
    player.src = "about:blank";
    player.style.visibility = "hidden";
    return;
  }

  const driveUrl = ep.driveId
    ? `https://drive.google.com/file/d/${ep.driveId}/preview`
    : null;
  const tauUrl = ep.animecix ? ep.animecix : null;

  let playUrl = null;

  // Normalde eski kayıtlarda "drive1" vb. kalmış olabilir, onu temizleyelim
  if (currentSourcePref !== "tau" && currentSourcePref !== "google") {
    currentSourcePref = "tau";
  }

  // Fallback mantığıyla source seçimi
  if (currentSourcePref === "tau") {
    if (tauUrl) playUrl = tauUrl;
    else if (driveUrl) { playUrl = driveUrl; currentSourcePref = "google"; }
  } else if (currentSourcePref === "google") {
    if (driveUrl) playUrl = driveUrl;
    else if (tauUrl) { playUrl = tauUrl; currentSourcePref = "tau"; }
  }

  if (playUrl) {
    if (unreleasedOverlay) unreleasedOverlay.style.display = "none";
    player.style.visibility = "visible";
    player.src = playUrl;
  } else {
    player.src = "about:blank";
    if (unreleasedOverlay) {
      unreleasedOverlay.style.display = "flex";
    }
  }
}

/* ================================
   COVER OVERLAY
================================ */

function renderCoverButtons(ep) {
  if (!coverButtons || !coverOverlay) return;
  coverButtons.innerHTML = "";

  if (!ep || !isAvailable(ep)) {
    // No sources available, hide cover and show unreleased
    coverOverlay.style.display = "none";
    coverDismissed = true;
    setVideoState(ep);
    return;
  }

  const sources = [];
  if (ep.animecix) sources.push({ key: "tau", label: "TAU Player", icon: "▶" });
  if (ep.driveId) sources.push({ key: "google", label: "Google Drive", icon: "▶" });

  if (sources.length === 0) {
    coverOverlay.style.display = "none";
    coverDismissed = true;
    setVideoState(ep);
    return;
  }

  sources.forEach(src => {
    const btn = document.createElement("button");
    btn.className = "cover-source-btn";
    btn.innerHTML = `<span class="cover-btn-icon">${src.icon}</span> ${src.label}`;
    btn.onclick = () => dismissCover(ep, src.key);
    coverButtons.appendChild(btn);
  });
}

function dismissCover(ep, sourceKey) {
  coverDismissed = true;
  currentSourcePref = sourceKey;
  localStorage.setItem("rezero_source_pref", sourceKey);

  if (coverOverlay) {
    coverOverlay.style.opacity = "0";
    setTimeout(() => { coverOverlay.style.display = "none"; }, 400);
  }

  // Re-trigger loadEpisode so localStorage saves now that cover is dismissed
  loadEpisode(currentEpisode, true);
}

/* ================================
   UI TEXT
================================ */

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

    if (!ep.isExtra) btn.textContent = ep.number;

    if (ep.isFinal) btn.classList.add("final-episode");

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

    if (!isAvailable(ep)) btn.classList.add("unreleased");
    if (index < savedIndex) btn.classList.add("watched");
    if (index === currentEpisode) btn.classList.add("active");

    btn.onclick = () => {
      const absUrl = getEpisodePageUrl(SEASON_NUMBER, index);
      if (absUrl) window.location.href = absUrl;
      else loadEpisode(index, true);
    };

    episodeListContainer.appendChild(btn);
  });
}

/* ================================
   LOAD EPISODE
================================ */

function loadEpisode(index, userInitiated = true) {
  if (index < 0 || index >= episodes.length) return;

  currentEpisode = index;
  const ep = episodes[index];

  setVideoState(ep);
  setDownloadState(ep);
  renderSourceSelectors(ep);

  const seasonText = makeSeasonLine(ep);
  const episodeText = makeTitleLine(ep);

  const seasonEl = document.querySelector(".season-episode");
  const titleEl = document.querySelector(".episode-title");
  if (seasonEl) seasonEl.textContent = seasonText;
  if (titleEl) titleEl.textContent = episodeText;

  if (userInitiated && coverDismissed && isAvailable(ep)) {
    const now = Date.now();
    try {
      localStorage.setItem(
        GLOBAL_LAST_OPEN_KEY,
        JSON.stringify({ season: SEASON_NUMBER, i: index, t: now })
      );
      localStorage.setItem(`rezero_s${SEASON_NUMBER}_last_seen_at`, String(now));
      localStorage.setItem(`rezero_s${SEASON_NUMBER}_last_open`, String(index));
      localStorage.setItem(STORAGE_KEY, String(index));
      localStorage.setItem(
        GLOBAL_LAST_WATCH_KEY,
        JSON.stringify({ season: SEASON_NUMBER, i: index, t: now })
      );
    } catch (e) {}
  }


  renderEpisodeList();
}

/* ================================
   INIT
================================ */

renderEpisodeList();
const initEp = episodes[currentEpisode];
if (initEp && isAvailable(initEp) && coverOverlay) {
  renderCoverButtons(initEp);
  loadEpisode(currentEpisode, true);
} else {
  coverDismissed = true;
  if (coverOverlay) coverOverlay.style.display = "none";
  loadEpisode(currentEpisode, true);
}