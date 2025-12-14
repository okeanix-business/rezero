const seasonNumber = 1; // Bulunduğun sezon numarası

const episodes = [
  { number: 1, title: "Başlangıcın Sonu", driveId: "1u4nTZDBpHl1tX1uDS-AyKR8IRzFu4yqs" },
  { number: 2, title: "Yeniden Başlangıç", driveId: "1U7s7CT9UXCmlCneAN5X0Ol8H8aw2mwkV" },
  { number: 3, title: "Umutsuzluk", driveId: "1iOXvuMeRZ9J54R2p_XrVIKhK-U1-7zQ3" }
];

let currentEpisode = 0;

const player = document.getElementById("videoPlayer");
const downloadBtn = document.getElementById("downloadBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const episodeListContainer = document.querySelector(".episode-list");

// Dinamik olarak episode listesi oluştur
episodes.forEach((ep, index) => {
  const btn = document.createElement("button");
  btn.textContent = `${ep.number}. Bölüm`;
  btn.addEventListener("click", () => loadEpisode(index));
  episodeListContainer.appendChild(btn);
});

const buttons = episodeListContainer.querySelectorAll("button");

function loadEpisode(index) {
  if (index < 0 || index >= episodes.length) return;

  currentEpisode = index;
  player.src = `https://drive.google.com/file/d/${episodes[index].driveId}/preview`;
  downloadBtn.href = `https://drive.google.com/uc?export=download&id=${episodes[index].driveId}`;

  // Episode list active class
  buttons.forEach(b => b.classList.remove("active"));
  buttons[index].classList.add("active");

  // Önceki ve sonraki butonları kontrol et
  prevBtn.style.display = index === 0 ? "none" : "inline-block";
  nextBtn.style.display = index === episodes.length - 1 ? "none" : "inline-block";

  // Başlığı güncelle
  const episodeTitle = document.getElementById("episodeTitle");
  if (episodeTitle) {
    episodeTitle.textContent = `${seasonNumber}. Sezon ${episodes[index].number}. Bölüm - ${episodes[index].title}`;
  }

  // Utterances yorumları için hash ekle
  const utterancesContainer = document.getElementById("utterances-container");
  if (utterancesContainer) {
    utterancesContainer.innerHTML = ""; // önceki yorumları temizle
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "okeanix-business/rezero");
    script.setAttribute("issue-term", `season${seasonNumber}-episode${episodes[index].number}`);
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
