/* ================================
   CONFIG
================================ */
const CURRENT_SEASON_INDEX = 0;
const STORAGE_KEY = `rezero_s${CURRENT_SEASON_INDEX + 1}_last_episode`;

/* ================================
   SEASONS DATA (AUTO GENERATED)
================================ */
const seasons = [
  {
    season: 1,
    episodes: generateSeason1()
  }
];

function generateSeason1() {
  const list = [];

  const mainEpisodes = [
    "Başlangıcın Sonu Ve Sonun Başlangıcı",
    "Cadıyla Yeniden Buluşma",
    "Hayat Başka Bir Dünyada Sıfırdan Başladı",
    "Mutlu Roswaal Malikanesi Ailesi",
    "Sözümüzün Sabahı Hala Uzak",
    "Zincirlerin Sesi",
    "Natsuki Subaru'nun Yeniden Başlaması",
    "Ağladım, Ciğerlerim Çıkana Kadar Ağladım ve Ağlamayı Bıraktım",
    "Cesaretin Anlamı",
    "Bir Oni Gibi Fanatik Yöntemler",
    "Rem"
  ];

  const driveIds = [
    ["1IRoumgrfF9L901hZa0DmVG6FTiXOxLTW", "1CGapULNS1POrTmYmXnKBlO_wDkKHaeMe"],
    ["1Q6GZsTB5aADk6l8sOgWmq2QDvASYikDS", "1dwYy4k2U81Q8y1vUC8Ey6pIjCIFo1scR"],
    ["1efyo-5cpEJZL0M14qWp_UdNCdeYFIsZP", "15Iwc2XhEmtdzPRP_o5lddjgnF39ClIt9"],
    ["1RoAKrXq7oBvzU9iFn_mywfrp8TDqGzLT", "1gKCWIRI9t3LyjgnQubgRdCWhjsbWJu-H"],
    ["19dhRuU8RQqoukjZQrJAjciAIXdlRd2dz", "1lv7LdOzUdXCoF_Elnf3kdnBeiWhP573g"],
    ["19wz0YmTb7w5j_tpq9tZh3OIA3_6wVmrK", "1RKzi37yb1xByAy-ZQi5zHpveBAxpyGjD"],
    ["1nKAAcB8XoxU2byOmPg3-m4ojzZ__kJwl", "1-GYhbc3uCN5nUCG21B40vuE91OMa9dIv"],
    ["1WjaRK4eP7j5FRLm5D90BWlhaopK8_oSj", "1B-SZgEam7BccEorYHdwwE8GLVqnS6LtC"],
    ["12KVdQF7TN0XznqlQzjU8wTyjmm5ZiEFH", "1mZT2EmXn-Ag3ZBc4g5D1Na-g_DCAPkuP"],
    ["1pUE8LgLo24MM09fvXtGMaNa5n5-l13Pe", "1elORZUp1fXF1_83i8qXHLPNNNJzVh4Vv"],
    ["1MsxjPwysXdvdKuPVfRzwsgpZ-XeKq_ab", "1_Yf-yO5LIU-3mDKiWTpesUFVdvREGCNv"]
  ];

  mainEpisodes.forEach((title, i) => {
    const epNum = i + 1;

    list.push({
      number: epNum,
      title,
      driveId: driveIds[i][0],
      isExtra: false
    });

    list.push({
      number: epNum,
      title: `${epNum}. Mola Zamanı`,
      driveId: driveIds[i][1],
      isExtra: true
    });
  });

  return list;
}

/* ================================
   STATE
================================ */
let currentEpisode = 0;

/* ================================
   ELEMENTS
================================ */
const player = document.getElementById("videoPlayer");
const downloadBtn = document.getElementById("downloadBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const episodeListContainer = document.querySelector(".episode-list");
const utterancesContainer = document.getElementById("utterances-container");

/* ================================
   URL
================================ */
function getIndexFromURL() {
  const params = new URLSearchParams(window.location.search);
  const i = params.get("i");
  return i !== null ? parseInt(i, 10) : null;
}

/* ================================
   RENDER EPISODE LIST
================================ */
function renderEpisodeList() {
  episodeListContainer.innerHTML = "";

  const savedIndex = parseInt(localStorage.getItem(STORAGE_KEY) || -1, 10);

  seasons[CURRENT_SEASON_INDEX].episodes.forEach((ep, index) => {
    const btn = document.createElement("button");

    if (ep.isExtra) {
      btn.innerHTML = `${ep.number}<span class="break-icon">☕</span>`;
      btn.classList.add("special-episode");
    } else {
      btn.textContent = ep.number;
    }

    if (index < savedIndex) {
      btn.classList.add("watched");
    }

    if (index === currentEpisode) {
      btn.classList.add("active");
    }

    btn.onclick = () => loadEpisode(index);
    episodeListContainer.appendChild(btn);
  });
}

/* ================================
   LOAD EPISODE
================================ */
function loadEpisode(index) {
  const episodes = seasons[CURRENT_SEASON_INDEX].episodes;
  if (index < 0 || index >= episodes.length) return;

  currentEpisode = index;
  const ep = episodes[index];

  player.src = `https://drive.google.com/file/d/${ep.driveId}/preview`;
  downloadBtn.href = `https://drive.google.com/uc?export=download&id=${ep.driveId}`;

  // Title
  const seasonText = ep.isExtra
    ? `1. Sezon ${ep.number}. Ara Bölüm`
    : `1. Sezon ${ep.number}. Bölüm`;

  const episodeText = ep.isExtra ? `${ep.number}. Mola Zamanı` : ep.title;

  document.querySelector(".season-episode").textContent = seasonText;
  document.querySelector(".episode-title").textContent = episodeText;

	// === SEO + OG ===
	const ogTitle = document.querySelector('meta[property="og:title"]');
	const ogDesc = document.querySelector('meta[property="og:description"]');

	const seoTitle = ep.isExtra
	  ? `Re:Zero 1. Sezon ${ep.number}. Ara Bölüm`
	  : `Re:Zero 1. Sezon ${ep.number}. Bölüm`;

	const seoDesc = ep.isExtra
	  ? `${ep.number}. Mola Zamanı – Re:Zero canon ara bölümü.`
	  : ep.title;

	document.title = `${seoTitle} | rezeroizle.com`;
	document
	  .querySelector('meta[name="description"]')
	  ?.setAttribute("content", seoDesc);

	if (ogTitle) ogTitle.setAttribute("content", seoTitle);
	if (ogDesc) ogDesc.setAttribute("content", seoDesc);


  // Buttons
  prevBtn.style.display = index === 0 ? "none" : "inline-block";
  nextBtn.style.display = index === episodes.length - 1 ? "none" : "inline-block";

  // Active state
  [...episodeListContainer.children].forEach((b, i) =>
    b.classList.toggle("active", i === index)
  );

  // URL + storage
  history.replaceState(null, "", `?i=${index}`);
  localStorage.setItem(STORAGE_KEY, index);

  // Comments
  if (utterancesContainer) {
    utterancesContainer.innerHTML = "";
    const s = document.createElement("script");
    s.src = "https://utteranc.es/client.js";
    s.setAttribute("repo", "okeanix-business/rezero");
    s.setAttribute("issue-term", `s1-i${index}`);
    s.setAttribute("label", "yorum");
    s.setAttribute("theme", "github-dark");
    s.crossOrigin = "anonymous";
    s.async = true;
    utterancesContainer.appendChild(s);
  }

  document.getElementById("spoiler-warning").style.display = "block";
  document.getElementById("commentsContainer").style.display = "none";
  
  // 🔥 EKLE
  renderEpisodeList();
}

/* ================================
   CONTROLS
================================ */
function nextEpisode() {
  loadEpisode(currentEpisode + 1);
}

function prevEpisode() {
  loadEpisode(currentEpisode - 1);
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