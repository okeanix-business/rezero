const seasons = [
  {
    season: 1,
    episodes: [
      { number: 1, title: "Başlangıcın Sonu", driveId: "1u4nTZDBpHl1tX1uDS-AyKR8IRzFu4yqs" },
      { number: 2, title: "Yeniden Başlangıç", driveId: "1U7s7CT9UXCmlCneAN5X0Ol8H8aw2mwkV" },
      { number: 3, title: "Umutsuzluk", driveId: "1iOXvuMeRZ9J54R2p_XrVIKhK-U1-7zQ3" }
    ]
  },
  {
    season: 2,
    episodes: [
      { number: 1, title: "Yeni Başlangıç", driveId: "..." },
      { number: 2, title: "Zorluklar", driveId: "..." }
    ]
  }
];

let currentSeason = 0;
let currentEpisode = 0;

const player = document.getElementById("videoPlayer");
const downloadBtn = document.getElementById("downloadBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const utterancesContainer = document.getElementById("utterances-container");
const episodeListContainer = document.querySelector(".episode-list");
const episodeTitle = document.getElementById("episodeTitle");

// Episode listini oluştur
function renderEpisodeList() {
  episodeListContainer.innerHTML = "";
  const episodes = seasons[currentSeason].episodes;
  episodes.forEach((ep, i) => {
    const btn = document.createElement("button");
    btn.textContent = `${ep.number}. Bölüm`;
    btn.classList.toggle("active", i === currentEpisode);
    btn.addEventListener("click", () => loadEpisode(i));
    episodeListContainer.appendChild(btn);
  });
}

// Bölüm yükleme
function loadEpisode(index) {
  const episodes = seasons[currentSeason].episodes;
  if (index < 0 || index >= episodes.length) return;

  currentEpisode = index;
  const episode = episodes[index];

  // Video ve download linki
  player.src = `https://drive.google.com/file/d/${episode.driveId}/preview`;
  downloadBtn.href = `https://drive.google.com/uc?export=download&id=${episode.driveId}`;

  // Başlık güncelle
  episodeTitle.textContent = `${seasons[currentSeason].season}. Sezon ${episode.number}. Bölüm - ${episode.title}`;

  // Episode list active class
  Array.from(episodeListContainer.children).forEach((b, i) => {
    b.classList.toggle("active", i === index);
  });

  // Prev / Next butonları
  prevBtn.style.display = index === 0 ? "none" : "inline-block";
  nextBtn.style.display = index === episodes.length - 1 ? "none" : "inline-block";

  // Utterances yorumları
  if (utterancesContainer) {
    utterancesContainer.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "okeanix-business/rezero");
    script.setAttribute("issue-term", `season${seasons[currentSeason].season}-episode${episode.number}`);
    script.setAttribute("label", "yorum");
    script.setAttribute("theme", "github-dark");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    utterancesContainer.appendChild(script);
  }
}

// Butonlar
function nextEpisode() { loadEpisode(currentEpisode + 1); }
function prevEpisode() { loadEpisode(currentEpisode - 1); }

// Başlangıç
renderEpisodeList();
loadEpisode(0);
