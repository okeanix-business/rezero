(function () {
  const data = window.REZERO_DLE_DATA || [];

  const $input = document.getElementById("guessInput");
  const $btn = document.getElementById("guessBtn");
  const $rows = document.getElementById("rows");
  const $toast = document.getElementById("toast");
  const $scoreLine = document.getElementById("scoreLine");
  const $autoBox = document.getElementById("autoBox");
  const $arcHint = document.getElementById("arcHint");

  const $modal = document.getElementById("winModal");
  const $newRound = document.getElementById("newRoundBtn");
  const $winCard = document.getElementById("winCard");

	if (!$input || !$btn || !$rows || !$toast || !$autoBox || !$modal || !$newRound || !$winCard) {
	  console.error("Karakter Bul: Gerekli HTML elemanları bulunamadı.");
	  return;
	}


  if (!Array.isArray(data) || data.length === 0) {
    $toast.textContent = "Karakter verisi yüklenemedi (karakter-data.js).";
    return;
  }
  
    const norm = (s) => String(s ?? "").trim().toLowerCase();
  const toast = (t) => { $toast.textContent = t || ""; };

	function updateAutocomplete(query) {
	  if (!$autoBox) return;

	  $autoBox.innerHTML = "";
	  const q = norm(query);

	  if (q.length < 1) {
		$autoBox.style.display = "none";
		return;
	  }

	  const matches = data
		.filter(c => norm(c.name).startsWith(q))
		.slice(0, 10);

	  if (matches.length === 0) {
		$autoBox.style.display = "none";
		return;
	  }

	  matches.forEach(c => {
		const item = document.createElement("div");
		item.className = "dle-autoItem";

		const img = document.createElement("img");
		img.src = c.portrait || "";
		img.alt = c.name;

		const label = document.createElement("span");
		label.textContent = c.name;

		item.appendChild(img);
		item.appendChild(label);

		item.addEventListener("click", () => {
		  $input.value = c.name;
		  $autoBox.style.display = "none";
		  $input.focus();
		});

		$autoBox.appendChild(item);
	  });

	  $autoBox.style.display = "block";
	}

$input.addEventListener("input", () => {
  updateAutocomplete($input.value);
});


$input.addEventListener("focus", () => {
  updateAutocomplete($input.value);
});

$input.addEventListener("blur", () => {
  setTimeout(() => {
    if ($autoBox) $autoBox.style.display = "none";
  }, 150);
});

  // ====== SKOR SİSTEMİ ======
  const MAX_ATTEMPTS = 5;

  // Deneme puanları: 1. deneme 100, sonra 80/60/40/20
  const POINTS_BY_TRY = [0, 100, 75, 50, 25];

  // Bilemezse ceza (skor düşsün istedin)
  const FAIL_PENALTY = 10000;

  const SCORE_KEY = "rezero_karakter_bul_score";
  const SOLVED_KEY = "rezero_karakter_bul_solved";

  let score = Number(localStorage.getItem(SCORE_KEY) || "0");
  if (Number.isNaN(score)) score = 0;
  
	const BEST_KEY = "rezero_karakter_bul_best";
	let bestScore = Number(localStorage.getItem(BEST_KEY) || "0");
	if (Number.isNaN(bestScore)) bestScore = 0;
  

  const solved = new Set(JSON.parse(localStorage.getItem(SOLVED_KEY) || "[]"));

  let answer = pickNew();
  let attemptsLeft = MAX_ATTEMPTS;
  let guessesThisRound = 0;
  let roundLocked = false;

  function updateScoreUI() {
    if (!$scoreLine) return;
    const used = guessesThisRound;
    $scoreLine.textContent =
  `Güncel Skorun: ${score} • Rekor Skorun: ${bestScore}`;

  }

  function saveScore() {
    localStorage.setItem(SCORE_KEY, String(score));
  }

	function addScore(points) {
	  score = Math.max(0, score + points);

	  if (score > bestScore) {
		bestScore = score;
		localStorage.setItem(BEST_KEY, String(bestScore));
	  }

	  saveScore();
	  updateScoreUI();
	}


  function pickNew() {
    const pool = data.filter((c) => !solved.has(c.id));
    if (pool.length === 0) {
      solved.clear();
      localStorage.setItem(SOLVED_KEY, "[]");
      return data[Math.floor(Math.random() * data.length)];
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function lockRound() {
    roundLocked = true;
    $input.disabled = true;
    $btn.disabled = true;
  }

  function unlockRound() {
    roundLocked = false;
    $input.disabled = false;
    $btn.disabled = false;
  }

  function startRound() {
    answer = pickNew();
    $rows.innerHTML = "";
    attemptsLeft = MAX_ATTEMPTS;
    guessesThisRound = 0;
    unlockRound();
    $input.value = "";
    $input.focus();
    toast("Tahmin etmeye başla!");
    updateScoreUI();
	
	  if ($arcHint) {
		$arcHint.style.display = "none";
		$arcHint.textContent = "";
	  }
  }

  // Compare rules
  function clsText(a, b) {
    return norm(a) === norm(b) && norm(a) ? "dle-ok" : "dle-bad";
  }

  function clsBool(a, b) {
    return !!a === !!b ? "dle-ok" : "dle-bad";
  }
  
function parsePlusNumber(v) {
  if (v == null) return NaN;

  const s = String(v).trim();

  // "400+" → 400
  if (s.endsWith("+")) {
    const n = Number(s.replace("+", ""));
    return Number.isNaN(n) ? NaN : n;
  }

  const n = Number(s);
  return Number.isNaN(n) ? NaN : n;
}
  

	function numCmp(g, a, near) {
	  g = parsePlusNumber(g);
	  a = parsePlusNumber(a);

	  if (Number.isNaN(g) || Number.isNaN(a)) {
		return { cls: "dle-bad", dir: null };
	  }

	  if (g === a) return { cls: "dle-ok", dir: null };

	  const diff = Math.abs(g - a);
	  const dir = g < a ? "up" : "down";

	  return { cls: diff <= near ? "dle-mid" : "dle-bad", dir };
	}

function showArcHint(arcValue){
  if (!$arcHint) return;

  const arc = parsePlusNumber(arcValue);
  if (Number.isNaN(arc)) return;

  const names = data
    .filter(c => parsePlusNumber(c.firstArc) === arc)
    .map(c => c.name)
    .filter(Boolean)
    .sort((a,b) => a.localeCompare(b, "tr"));

  $arcHint.textContent =
    `Bu Arc Çıkan Karakterler (Arc ${arc}):\n` + names.join(" • ");

  $arcHint.style.display = "block";
}

function hideArcHint(){
  if (!$arcHint) return;
  $arcHint.style.display = "none";
  $arcHint.textContent = "";
}


  function elCmp(gArr, aArr) {
    const g = (gArr || []).map(norm);
    const a = (aArr || []).map(norm);
    const A = new Set(a);
    const inter = g.filter((x) => A.has(x));
    const sameLen = g.length === a.length;
    const sameAll = sameLen && inter.length === a.length && a.every((x) => new Set(g).has(x));
    if (sameAll) return "dle-ok";
    if (inter.length) return "dle-mid";
    return "dle-bad";
  }

  // UI
	function formatMultiline(text) {
	  if (!text) return "-";

	  // Virgül varsa: Ateş, Su, Rüzgar → alt alta
	  if (String(text).includes(",")) {
		return String(text)
		  .split(",")
		  .map(s => s.trim())
		  .join("\n");
	  }

	  // Boşluk varsa: Crusch Kampı → alt alta
	  if (String(text).includes(" ")) {
		return String(text)
		  .split(" ")
		  .join("\n");
	  }

	  return String(text);
	}
  
  
  function tile(text, cls) {
    const d = document.createElement("div");
    d.className = `dle-tile ${cls || ""}`;
    d.textContent = text ?? "-";
    return d;
  }

  function tileArrow(text, cls, dir) {
    const d = document.createElement("div");
    d.className = `dle-tile ${cls || ""}`;
    d.textContent = text ?? "Yok";
    if (dir) {
      const a = document.createElement("div");
      a.className = `dle-arrow ${dir === "up" ? "dle-up" : "dle-down"}`;
      d.appendChild(a);
    }
    return d;
  }

  function charTile(c) {
    const d = document.createElement("div");
    d.className = "dle-tile dle-charTile";

    if (c.portrait) {
      const img = document.createElement("img");
      img.src = c.portrait;
      img.alt = "Karakter";
      img.loading = "lazy";
      d.appendChild(img);
    }
    return d;
  }

  function addRow(g) {
    const r = document.createElement("div");
    r.className = "dle-row";

    // Karakter (avatar)
    r.appendChild(charTile(g));

    // SIRA: Cinsiyet, Irk, Yaş, Boy, Taraf, Element, İlahi Koruma, Otorite, İlk Arc
    r.appendChild(tile(g.gender, clsText(g.gender, answer.gender)));
    r.appendChild(tile(g.race, clsText(g.race, answer.race)));

    const ag = numCmp(g.age, answer.age, 2);
    r.appendChild(tileArrow(String(g.age ?? "-"), ag.cls, ag.dir));

    const hg = numCmp(g.heightCm, answer.heightCm, 5);
    r.appendChild(tileArrow(`${g.heightCm ?? "-"}`, hg.cls, hg.dir));

	r.appendChild(
	  tile(formatMultiline(g.affiliation), clsText(g.affiliation, answer.affiliation))
	);

	const el = elCmp(g.elements, answer.elements);
	const elTile = tile(formatMultiline((g.elements || []).join(", ")), el);
	elTile.classList.add("dle-elementTile");
	r.appendChild(elTile);

    r.appendChild(tile(g.divineProtection ? "Var" : "Yok", clsBool(g.divineProtection, answer.divineProtection)));
    r.appendChild(tile(g.authority ? "Var" : "Yok", clsBool(g.authority, answer.authority)));

    const ar = numCmp(g.firstArc, answer.firstArc, 1);
    r.appendChild(tileArrow(String(g.firstArc ?? "-"), ar.cls, ar.dir));

    $rows.prepend(r);
  }

  function openModal(isWin, pointsOrPenalty) {
    const img = answer.portrait ? `<img src="${answer.portrait}" alt="${answer.name}">` : "";
    const title = isWin ? "✅ Doğru Bildin!" : "❌ Bilemedin!";
	const extra =
	  isWin
		? (
			pointsOrPenalty === 0
			  ? `<div class="dle-winSub">🎯 İlk denemede bildin! Şans olduğu için puan veremem.</div>`
			  : `<div class="dle-winSub">🎯 +${pointsOrPenalty} puan kazandın.</div>`
		  )
		: `<div class="dle-winSub">Güncel skorun sıfırlandı.</div>`;


    // modal başlığını güncelle
    const titleEl = $modal.querySelector(".dle-modalTitle");
    if (titleEl) titleEl.textContent = title;

    $winCard.innerHTML = `
      ${img}
      <div>
        <div class="dle-winName">${answer.name ?? "-"}</div>
        <div class="dle-winSub">${answer.gender ?? "-"} • ${answer.race ?? "-"} • ${answer.affiliation ?? "-"}</div>
        <div class="dle-winSub">Yaş: ${answer.age ?? "-"} • Boy: ${answer.heightCm ?? "-"}cm • İlk Arc: ${answer.firstArc ?? "-"}</div>
        ${extra}
      </div>
    `;
    $modal.classList.add("dle-open");
    $modal.setAttribute("aria-hidden", "false");
  }

  function endAsWin() {
    const tryIndex = Math.max(0, Math.min(MAX_ATTEMPTS - 1, guessesThisRound - 1));
    const points = POINTS_BY_TRY[tryIndex] ?? 20;

    // skor ekle
    addScore(points);

    // çözülenlere ekle (aynı karakter tekrar gelmesin)
    solved.add(answer.id);
    localStorage.setItem(SOLVED_KEY, JSON.stringify([...solved]));

    // kilitle ve modal
    lockRound();
    toast(`✅ Doğru! +${points} puan. Devam etmek için "Yeni Karakter"e bas.`);
    openModal(true, points);
  }

  function endAsFail() {
    // ceza uygula
    addScore(-FAIL_PENALTY);

    // çözülenlere ekleme (istersen ekleyebiliriz ama genelde eklenmez)
    lockRound();
    toast(`❌ Deneme hakkın bitti. -${FAIL_PENALTY} puan. Devam etmek için "Yeni Karakter"e bas.`);
    openModal(false, FAIL_PENALTY);
  }

  function submit() {
    if (roundLocked) return;

    const name = norm($input.value);
    const g = data.find((c) => norm(c.name) === name);
    if (!g) {
      toast("Bu isim listede yok. Yazımı kontrol et veya listeden seç.");
      return;
    }

    guessesThisRound += 1;
    attemptsLeft = MAX_ATTEMPTS - guessesThisRound;

    addRow(g);
    $input.value = "";
	
	// Arc doğruysa ipucu göster
	if (parsePlusNumber(g.firstArc) === parsePlusNumber(answer.firstArc)) {
	  showArcHint(answer.firstArc);
	} else {
	  hideArcHint();
	}	

    updateScoreUI();

    if (g.id === answer.id) {
      endAsWin();
      return;
    }

    if (guessesThisRound >= MAX_ATTEMPTS) {
      endAsFail();
      return;
    }

    toast(`Yanlış. Kalan deneme: ${attemptsLeft}`);
  }

  $btn.addEventListener("click", submit);
  $input.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });

  // Modal: sadece Yeni Karakter ile ilerle
  $newRound.addEventListener("click", () => {
    $modal.classList.remove("dle-open");
    $modal.setAttribute("aria-hidden", "true");
    startRound();
  });

  // başlangıç
  toast("Tahmin etmeye başla!");
  updateScoreUI();
})();
