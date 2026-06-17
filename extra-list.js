(function () {
  var list = document.getElementById("extraEpisodeList");
  var episodes = window.REZERO_EXTRA_EPISODES || [];
  if (!list || !episodes.length) return;

  function getDriveId(value) {
    var raw = String(value || "").trim();
    if (!raw || raw.indexOf("GOOGLE_DRIVE_FILE_ID") !== -1) return "";

    var fileMatch = raw.match(/\/file\/d\/([^/?#]+)/);
    if (fileMatch) return fileMatch[1];

    var idMatch = raw.match(/[?&]id=([^&#]+)/);
    if (idMatch) return idMatch[1];

    return raw;
  }

  list.innerHTML = "";

  episodes.forEach(function (ep) {
    var available = !!getDriveId(ep.driveId);
    var item = document.createElement(available ? "a" : "div");
    item.className = "extra-episode-link" + (available ? "" : " locked");

    if (available) {
      item.href = ep.page;
    } else {
      item.setAttribute("aria-disabled", "true");
    }

    item.innerHTML =
      '<span class="extra-episode-number">' + ep.number + '</span>' +
      '<span class="extra-episode-title">' +
        '<strong>' + ep.title + '</strong>' +
        '<small>' + (ep.description || (available ? "Google Drive ile site içinde izle." : "Henüz hazır değil.")) + '</small>' +
      '</span>' +
      '<span class="extra-episode-source">' + (available ? "İzle" : "Yakında") + '</span>';

    list.appendChild(item);
  });
})();
