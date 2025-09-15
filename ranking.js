document.addEventListener("DOMContentLoaded", loadRanking);

function loadRanking() {
  // TODO: API 엔드포인트 수정
  fetch("/api/ranking")
    .then((res) => res.json())
    .then(showRanking)
    .catch(() => {
      document.getElementById("ranking-body").innerHTML =
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

    // 동점자 처리
    if (r.lv === lastLv && r.exp === lastExp) {
      // rank 그대로 유지
    } else {
      lastRank = shownCount;
    }
    lastLv = r.lv;
    lastExp = r.exp;

    let medal = "";
    if (lastRank === 1) medal = "🥇";
    else if (lastRank === 2) medal = "🥈";
    else if (lastRank === 3) medal = "🥉";

    // 행 생성
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
