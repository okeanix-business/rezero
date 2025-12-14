const episodes = [
  {
    title: "Bölüm 1 – Başlangıcın Sonu",
    driveId: "VIDEO_ID_1"
  },
  {
    title: "Bölüm 2 – Yeniden Başlangıç",
    driveId: "VIDEO_ID_2"
  },
  {
    title: "Bölüm 3 – Umutsuzluk",
    driveId: "VIDEO_ID_3"
  }
];

let currentEpisode = 0;

const player = document.getElementById("videoPlayer");
const title = document.getElementById("episodeTitle");

function loadEpisode(index) {
  if (index < 0 || index >= episodes.length) return;

  currentEpisode = index;
  player.src = `https://drive.google.com/file/d/${episodes[index].driveId}/preview`;
  title.textContent = episodes[index].title;
}

function nextEpisode() {
  loadEpisode(currentEpisode + 1);
}

function prevEpisode() {
  loadEpisode(currentEpisode - 1);
}

const buttons = document.querySelectorAll(".episode-list button");

function loadEpisode(index) {
  if (index < 0 || index >= episodes.length) return;

  currentEpisode = index;
  player.src = `https://drive.google.com/file/d/${episodes[index].driveId}/preview`;
  title.textContent = episodes[index].title;

  buttons.forEach(b => b.classList.remove("active"));
  buttons[index].classList.add("active");
}
