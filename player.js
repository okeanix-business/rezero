const seasons = [
  {
    season: 1,
    episodes: [
      { number: 1, title: "Başlangıcın Sonu Ve Sonun Başlangıcı", driveId: "1IRoumgrfF9L901hZa0DmVG6FTiXOxLTW" },
      { number: 2, title: "Cadıyla Yeniden Buluşma", driveId: "1Q6GZsTB5aADk6l8sOgWmq2QDvASYikDS" },
      { number: 3, title: "Hayat Başka Bir Dünyada Sıfırdan Başladı", driveId: "1efyo-5cpEJZL0M14qWp_UdNCdeYFIsZP" },
      { number: 4, title: "Mutlu Roswaal Malikanesi Ailesi", driveId: "1RoAKrXq7oBvzU9iFn_mywfrp8TDqGzLT" },
      { number: 5, title: "Sözümüzün Sabahı Hala Uzak", driveId: "19dhRuU8RQqoukjZQrJAjciAIXdlRd2dz" },
      { number: 6, title: "Zincirlerin Sesi", driveId: "19wz0YmTb7w5j_tpq9tZh3OIA3_6wVmrK" },
      { number: 7, title: "Natsuki Subaru'nun Yeniden Başlaması", driveId: "1nKAAcB8XoxU2byOmPg3-m4ojzZ__kJwl" },
      { number: 8, title: "Ağladım, Ciğerlerim Çıkana Kadar Ağladım ve Ağlamayı Bıraktım", driveId: "1WjaRK4eP7j5FRLm5D90BWlhaopK8_oSj" },
      { number: 9, title: "Cesaretin Anlamı", driveId: "12KVdQF7TN0XznqlQzjU8wTyjmm5ZiEFH" }
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
    btn.classList.add("episode-button");
    btn.setAttribute("data-episode-id", ep.number);
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

  // Sezon ve Bölüm Başlıklarını Güncelleme
  const seasonText = `${seasons[currentSeason].season}. Sezon ${episode.number}. Bölüm`; 
  const episodeText = episode.title;

  // Başlıkları HTML'de güncelle
  document.querySelector('.season-episode').textContent = seasonText;
  document.querySelector('.episode-title').textContent = episodeText;

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

  // Kuralları tekrar göster
  document.getElementById("spoiler-warning").style.display = "block"; // Kuralları yeniden göster
  document.getElementById("commentsContainer").style.display = "none"; // Yorumları gizle
}

// Butonlar
function nextEpisode() { loadEpisode(currentEpisode + 1); }
function prevEpisode() { loadEpisode(currentEpisode - 1); }

// Google Drive iframe video tam ekran moduna geçtiğinde
const iframe = document.getElementById("videoPlayer");

iframe.addEventListener("fullscreenchange", function() {
  if (document.fullscreenElement && iframe === document.fullscreenElement) {
    // Yatay ekran geçişi
    screen.orientation.lock("landscape").catch((err) => {
      console.log("Yatay ekran geçişi başarısız:", err);
    });
  } else {
    screen.orientation.unlock();
  }
});

// Bölüm seçildiğinde kaydet
document.querySelectorAll('.episode-button').forEach(button => {
  button.addEventListener('click', function() {
    const episodeId = this.getAttribute('data-episode-id');
    localStorage.setItem('lastWatchedEpisode', episodeId); // Son izlenen bölümü kaydet
    loadEpisode(episodeId - 1); // Seçilen bölümü yükle (id 1'den başlıyor, sıfır tabanlı index)
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const lastWatchedEpisode = localStorage.getItem('lastWatchedEpisode');
  
  if (lastWatchedEpisode) {
    // Son izlenen bölümü bul ve video oynatmaya başla
    const episodeButton = document.querySelector(`.episode-button[data-episode-id="${lastWatchedEpisode}"]`);
    if (episodeButton) {
      episodeButton.classList.add('active'); // Seçili yap
      loadEpisode(lastWatchedEpisode - 1); // Son izlenen bölümü oynat (sıfır tabanlı indeks)
    }
  } else {
    // İlk defa gelen kullanıcı için, varsayılan olarak ilk bölümü başlat
    loadEpisode(0); // İlk bölüm
  }
});

// Kuralları kabul etme butonuna tıklama
document.getElementById("acceptRulesBtn").addEventListener("click", function() {
  document.getElementById("spoiler-warning").style.display = "none";
  document.getElementById("commentsContainer").style.display = "block";
});

// Başlangıçta bölüm listesi oluştur
renderEpisodeList();
loadEpisode(0);