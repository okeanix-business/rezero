const episodes = [
  { title: "Bölüm 1 – Başlangıcın Sonu", driveId: "1u4nTZDBpHl1tX1uDS-AyKR8IRzFu4yqs" },
  { title: "Bölüm 2 – Yeniden Başlangıç", driveId: "1U7s7CT9UXCmlCneAN5X0Ol8H8aw2mwkV" },
  { title: "Bölüm 3 – Umutsuzluk", driveId: "1iOXvuMeRZ9J54R2p_XrVIKhK-U1-7zQ3" }
];

let currentEpisode = 0;

const player = document.getElementById("videoPlayer");
const buttons = document.querySelectorAll(".episode-list button");
const downloadBtn = document.getElementById("downloadBtn");

function loadEpisode(index) {
  if (index < 0 || index >= episodes.length) return;

  currentEpisode = index;
  player.src = `https://drive.google.com/file/d/${episodes[index].driveId}/preview`;

  // Sağ üst indir butonu güncelle
  downloadBtn.href = `https://drive.google.com/uc?export=download&id=${episodes[index].driveId}`;

  // Episode list active class
  buttons.forEach(b => b.classList.remove("active"));
  buttons[index].classList.add("active");
}

function nextEpisode() { loadEpisode(currentEpisode + 1); }
function prevEpisode() { loadEpisode(currentEpisode - 1); }

// Başlangıçta ilk bölümü yükle
loadEpisode(0);
