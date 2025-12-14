const episodes = [
  { number: 1, title: "Başlangıcın Sonu", driveId: "1u4nTZDBpHl1tX1uDS-AyKR8IRzFu4yqs" },
  { number: 2, title: "Yeniden Başlangıç", driveId: "1U7s7CT9UXCmlCneAN5X0Ol8H8aw2mwkV" },
  { number: 3, title: "Umutsuzluk", driveId: "1iOXvuMeRZ9J54R2p_XrVIKhK-U1-7zQ3" }
];

const seasonNumber = 1; // Burayı sezona göre değiştir
const episodes = [
  { number: 1, title: "Başlangıcın Sonu", driveId: "1u4nTZDBpHl1tX1uDS-AyKR8IRzFu4yqs" },
  { number: 2, title: "Yeniden Başlangıç", driveId: "1U7s7CT9UXCmlCneAN5X0Ol8H8aw2mwkV" },
  { number: 3, title: "Umutsuzluk", driveId: "1iOXvuMeRZ9J54R2p_XrVIKhK-U1-7zQ3" }
];

let currentEpisode = 0;

const player = document.getElementById("videoPlayer");
const buttons = document.querySelectorAll(".episode-list button");
const downloadBtn = document.getElementById("downloadBtn");

function loadEpisode(index) {
  if (index < 0 || index >= episodes.length) return;
  const episode = episodes[index];
  currentEpisode = index;

  // Video ve indir linki
  player.src = `https://drive.google.com/file/d/${episode.driveId}/preview`;
  downloadBtn.href = `https://drive.google.com/uc?export=download&id=${episode.driveId}`;

  // Active button
  buttons.forEach(b => b.classList.remove("active"));
  buttons[index].classList.add("active");

  // Prev / Next
  document.getElementById("prevBtn").style.display = index === 0 ? "none" : "inline-block";
  document.getElementById("nextBtn").style.display = index === episodes.length - 1 ? "none" : "inline-block";

  // Episode title
  const episodeTitle = document.getElementById("episodeTitle");
  if (episodeTitle) {
    episodeTitle.textContent = `${seasonNumber}. Sezon ${episode.number}. Bölüm - ${episode.title}`;
  }

  // Utterances yorumları (her bölüm için ayrı)
  const utterancesContainer = document.getElementById("utterances-container");
  if (utterancesContainer) {
    utterancesContainer.innerHTML = ""; // Önceki yorumları temizle
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "okeanix-business/rezero");
    script.setAttribute("issue-term", `season${seasonNumber}-episode${episode.number}`);
    script.setAttribute("label", "yorum");
    script.setAttribute("theme", "github-dark");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    utterancesContainer.appendChild(script);
  }
}

function nextEpisode() { loadEpisode(currentEpisode + 1); }
function prevEpisode() { loadEpisode(currentEpisode - 1); }

// Başlangıçta ilk bölümü yükle
loadEpisode(0);