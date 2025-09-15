document.addEventListener("DOMContentLoaded", loadRanking);

function loadRanking() {
  // TODO: API 엔드포인트 수정
  fetch("/api/ranking")
    .then((res) => res.json())
    .then(showRanking)
    .catch((err) => {
      document.getElementById("ranking-body").innerHTML =
        "<tr><td colspan='4'>❌ 랭킹 데이터를 불러올 수 없습니다.</td></tr>";
    });
}

function showRanking(data) {
  const tbody = document.getElementById("ranking-body");
  tbody.innerHTML = "";

  let lastExp = null,
    lastLv = null,
    lastRank = 0,
    shownCount = 0;

  data.forEach((r) => {
    shownCount++;
    if (r.lv === lastLv && r.exp === lastExp) {
      // 같은 순위 유지
    } else {
      lastRank = shownCount;
    }
    lastLv = r.lv;
    lastExp = r.exp;

    let medal = "";
    if (lastRank === 1) medal = "🥇";
    else if (lastRank === 2) medal = "🥈";
    else if (lastRank === 3) medal = "🥉";

    tbody.innerHTML += `
      <tr>
        <td>${medal} ${r.name}</td>
        <td>Lv ${r.lv}</td>
        <td>⭐ ${r.exp}</td>
        <td>${r.remainExp}</td>
      </tr>
    `;
  });
}
