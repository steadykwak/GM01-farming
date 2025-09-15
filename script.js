document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    searchInfo();
  });
});

function searchInfo() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) {
    alert("이름과 휴대폰 뒷자리 4자리를 입력해 주세요.");
    return;
  }

  const resultDiv = document.getElementById("result");
  const invDiv = document.getElementById("inventory");
  resultDiv.innerHTML = "<p class='loading'>⏳ 데이터를 불러오는 중...</p>";
  invDiv.innerHTML = "<p class='loading'>⏳ 인벤토리를 불러오는 중...</p>";

  // TODO: API 엔드포인트 수정 (Apps Script JSON API로 교체)
  const API_BASE =
    "https://script.google.com/macros/s/AKfycbw0EmgiHEGglmTZbilB9-ZnydVHxOIkB9-xYcFiw8f1Qd56Xi3T7D17td08Ll9tbNY/exec";

  fetch(
    `${API_BASE}?action=getstudentinfo&name=${encodeURIComponent(
      name
    )}&phone=${encodeURIComponent(phone)}`
  )
    .then((res) => res.json())
    .then(showResult)
    .catch((err) => {
      resultDiv.innerHTML = "<p>❌ 데이터를 불러올 수 없습니다.</p>";
      invDiv.innerHTML = "";
    });
}

function repeatEmoji(emoji, count) {
  count = Number(count) || 0;
  if (count <= 0) return "—";
  return emoji.repeat(Math.min(count, 20)) + (count > 20 ? ` (x${count})` : "");
}

function showResult(res) {
  const resultDiv = document.getElementById("result");
  const invDiv = document.getElementById("inventory");

  if (!res || res.error) {
    resultDiv.innerHTML = "<p>❌ 일치하는 수강생을 찾을 수 없습니다.</p>";
    renderInventory(res);
    return;
  }

  const levelTable = [
    0, 675, 1600, 2775, 4200, 5875, 7800, 9975, 12400, 15075, 18000,
  ];
  const prevExp = levelTable[res.lv - 1] || 0;
  const nextExp = levelTable[res.lv] || res.exp + 1;
  const progress = Math.min(
    100,
    Math.round(((res.exp - prevExp) / (nextExp - prevExp)) * 100)
  );

  resultDiv.innerHTML = `
    <div class="player-card">
        <h2 class="player-title">🎮 플레이어 ${res.name}의 파밍 현황</h2>
        
        <div class="gold-section">
        <p>💰 남은 GOLD: <span class="highlight">${res.goldLeft}</span></p>
        <p class="sub">(획득 ${res.goldGet} - 사용 ${res.goldUse})</p>
        </div>

        <div class="exp-section">
        <p>⭐ 경험치: <span class="highlight">${res.exp}</span></p>
        <p>현재 레벨: <span class="highlight">Lv ${res.lv}</span></p>
        <p>다음 레벨까지 필요: <span class="highlight">${res.remainExp}</span></p>
        </div>

        <div class="progress-container">
        <div class="progress-bar" style="width:${progress}%;">
            ${progress}%
        </div>
        </div>

        <table class="status-table">
        <thead>
            <tr>
            <th>획득 GOLD</th>
            <th>소비 GOLD</th>
            <th>남은 GOLD</th>
            <th>EXP</th>
            <th>Lv</th>
            <th>남은 경험치</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>${res.goldGet}</td>
            <td>${res.goldUse}</td>
            <td>${res.goldLeft}</td>
            <td>${res.exp}</td>
            <td>Lv ${res.lv}</td>
            <td>${res.remainExp}</td>
            </tr>
        </tbody>
        </table>
    </div>`;
  renderInventory(res);
}

function renderInventory(res) {
  const invDiv = document.getElementById("inventory");

  const items = [
    { name: "GM 식사권", icon: "🎫", count: res.itemMeal },
    { name: "멘토링 추가권", icon: "🎟️", count: res.itemMentor },
    { name: "도서 구매권", icon: "📚", count: res.itemBook },
  ];

  const slots = items
    .map((item) => {
      if (!item.count || item.count <= 0) {
        return `
          <div class="inv-slot inv-empty">
            <span class="inv-icon">${item.icon}</span>
            <span class="inv-count">빈 슬롯</span>
          </div>
        `;
      }
      return `
        <div class="inv-slot">
          <span class="inv-icon">${item.icon}</span>
          <span class="inv-count">x${item.count}</span>
        </div>
      `;
    })
    .join("");

  invDiv.innerHTML = `
    <h2>🎒 인벤토리</h2>
    <div class="inv-grid">
      ${slots}
    </div>
  `;
}
