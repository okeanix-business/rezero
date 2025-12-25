/* player.js — URL çözümleme + yönlendirme + yorum issue-term stabil */

const SEASON_NUMBER = Number(window.SEASON_NUMBER || 1);
const EPISODE_INDEX = Number(window.EPISODE_INDEX ?? 0);

const STORAGE_KEY = `rezero_s${SEASON_NUMBER}_last_episode`;
const GLOBAL_LAST_OPEN_KEY = "rezero_last_open";
const GLOBAL_LAST_WATCH_KEY = "rezero_last_watch";

const episodes = window.REZERO_SEASONS?.buildEpisodes
  ? window.REZERO_SEASONS.buildEpisodes(SEASON_NUMBER)
  : [];

let currentEpisode = Math.min(Math.max(EPISODE_INDEX, 0), Math.max(episodes.length - 1, 0));

const player = document.getElementById("videoPlayer");
const downloadBtn = document.getElementById("downloadBtn");
const episodeListContainer = document.querySelector(".episode-list");
const utterancesContainer = document.getElementById("utterances-container");
const unreleasedOverlay = document.getElementById("unreleasedOverlay");

function isAvailable(ep) { return !!ep.driveId; }

function slugifyLite(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "ozel";
}

// ✅ (3) Yorumlar: index'e bağlı olmayan sabit anahtar
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

    // iframe ASLA gizlenmez
    player.style.visibility = "visible";

    // Kaynak sadece değişir
    player.src = `https://drive.google.com/file/d/${ep.driveId}/preview`;
  } else {
    // iframe boş kalır ama görünür kalır
    player.src = "about:blank";

    if (unreleasedOverlay) {
      unreleasedOverlay.style.display = "flex";
    }
  }
}


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

function loadComments() {
  if (!utterancesContainer) return;
  utterancesContainer.innerHTML = "";

  const ep = episodes[currentEpisode];
  const issueTerm = getIssueTerm(ep);

  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.setAttribute("repo", "okeanix-business/rezero");
  script.setAttribute("issue-term", issueTerm); // ✅ stabil
  script.setAttribute("theme", "github-dark");
  script.setAttribute("label", "comment");
  script.async = true;

  utterancesContainer.appendChild(script);
}

function loadEpisode(index, userInitiated = true) {
  if (index < 0 || index >= episodes.length) return;

  currentEpisode = index;
  const ep = episodes[index];

  setVideoState(ep);
  setDownloadState(ep);

  const seasonText = makeSeasonLine(ep);
  const episodeText = makeTitleLine(ep);

  const seasonEl = document.querySelector(".season-episode");
  const titleEl = document.querySelector(".episode-title");
  if (seasonEl) seasonEl.textContent = seasonText;
  if (titleEl) titleEl.textContent = episodeText;

  if (userInitiated && isAvailable(ep)) {
    const now = Date.now();
    try {
      localStorage.setItem(GLOBAL_LAST_OPEN_KEY, JSON.stringify({ season: SEASON_NUMBER, i: index, t: now }));
      localStorage.setItem(`rezero_s${SEASON_NUMBER}_last_seen_at`, String(now));
      localStorage.setItem(`rezero_s${SEASON_NUMBER}_last_open`, String(index));
      localStorage.setItem(STORAGE_KEY, String(index));
      localStorage.setItem(GLOBAL_LAST_WATCH_KEY, JSON.stringify({ season: SEASON_NUMBER, i: index, t: now }));
    } catch (e) {}
  }

  const spoiler = document.getElementById("spoiler-warning");
  const commentsBox = document.getElementById("commentsContainer");
  if (spoiler && commentsBox) {
    spoiler.style.display = "block";
    commentsBox.style.display = "none";
  }

  loadComments();
  renderEpisodeList();
}

renderEpisodeList();
loadEpisode(currentEpisode, true);