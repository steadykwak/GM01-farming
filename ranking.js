document.addEventListener("DOMContentLoaded", loadRanking);

function loadRanking() {
  const API_BASE =
    "https://script.google.com/macros/s/AKfycbw0EmgiHEGglmTZbilB9-ZnydVHxOIkB9-xYcFiw8f1Qd56Xi3T7D17td08Ll9tbNY/exec";

  const tbody = document.getElementById("ranking-body");
  tbody.innerHTML =
    "<tr><td colspan='4'>⏳ 랭킹 데이터를 불러오는 중...</td></tr>";

  fetch(`${API_BASE}?action=getranking`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .then(showRanking)
    .catch((err) => {
      console.error(err);
      tbody.innerHTML =
        "<tr><td colspan='4'>❌ 랭킹 데이터를 불러올 수 없습니다.</td></tr>";
    });
}

function showRanking(data) {
  const tbody = document.getElementById("ranking-body");
  tbody.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    tbody.innerHTML =
      "<tr><td colspan='4'>⚠️ 표시할 랭킹 데이터가 없습니다.</td></tr>";
    return;
  }

  let lastExp = null,
    lastLv = null,
    lastRank = 0,
    shownCount = 0;

  data.forEach((r) => {
    shownCount++;
    if (r.lv === lastLv && r.exp === lastExp) {
      // 동점자 순위 유지
    } else {
      lastRank = shownCount;
    }
    lastLv = r.lv;
    lastExp = r.exp;

    let medal = "";
    if (lastRank === 1) medal = "🥇";
    else if (lastRank === 2) medal = "🥈";
    else if (lastRank === 3) medal = "🥉";

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${medal} ${r.name}</td>
        <td>Lv ${r.lv}</td>
        <td>⭐ ${r.exp.toLocaleString()}</td>
        <td>${r.remainExp.toLocaleString()}</td>
      `;
    tbody.appendChild(tr);
  });
}
