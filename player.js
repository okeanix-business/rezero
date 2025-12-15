const seasons = [
  {
    season: 1,
    episodes: [
      { number: 1, title: "Başlangıcın Sonu Ve Sonun Başlangıcı", driveId: "180nR6WRoc2exM94QUcFeL-f7cRTv83i9" },
      { number: 2, title: "Cadıyla Yeniden Buluşma", driveId: "1lcSpoiUiB8BbD4uebRiJAbHxH7qVCTv_" },
      { number: 3, title: "Hayat Başka Bir Dünyada Sıfırdan Başladı", driveId: "1_9C-W6tnw5TocE4WoWXG1LKQ6Uy7_50o" },
      { number: 4, title: "Mutlu Roswaal Malikanesi Ailesi", driveId: "1dnklu9BqCZFO5_WwtKR7KFM9XC1g5klw" },
      { number: 5, title: "Sözümüzün Sabahı Hala Uzak", driveId: "1XyWrB_Zkz6jQW4--nUGnxflgSU97xGxL" },
      { number: 6, title: "Zincirlerin Sesi", driveId: "1mNujsOoATisKdH2Lue5Sf0qmMGIKelcf" },
	  { number: 7, title: "Natsuki Subaru'nun Yeniden Başlaması", driveId: "1xPAGPMtpWQUrhvJl-2t-BDvVOrvy4r92" }
    ]
  },
  {
    season: 2,
    episodes: [
      { number: 1, title: "deneme", driveId: "..." },
      { number: 2, title: "deneme", driveId: "..." }
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

// Google Drive iframe video tam ekran moduna geçtiğinde
const iframe = document.getElementById("videoPlayer");

iframe.addEventListener("fullscreenchange", function() {
  if (document.fullscreenElement && iframe === document.fullscreenElement) {
    // Sadece video tam ekran modundayken ekranı yataya döndür
    screen.orientation.lock("landscape").catch((err) => {
      console.log("Yatay ekran geçişi başarısız:", err);
    });
  } else {
    // Ekran tam ekran modundan çıktığında normal kaydırmayı sağla
    screen.orientation.unlock();
  }
});

iframe.addEventListener("webkitfullscreenchange", function() {
  if (document.webkitFullscreenElement && iframe === document.webkitFullscreenElement) {
    screen.orientation.lock("landscape").catch((err) => {
      console.log("Yatay ekran geçişi başarısız:", err);
    });
  } else {
    screen.orientation.unlock();
  }
});

// Başlangıç
renderEpisodeList();
loadEpisode(0);
