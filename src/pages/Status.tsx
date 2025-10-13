import { Helmet } from "react-helmet";
import { CButton } from "@/components/_common";
import { ROUTE_PATH } from "@/routes";
import "./styles/Status.style.scss";
import type { ChangeEvent } from "react";

const Status = () => {
  // const [user, setUser] = useState();
  const [userInfo, setUserInfo] = useState({ name: "", phone: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState(null);

  const handleUserInfo = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const { id, value } = e.target as HTMLInputElement;
    setUserInfo((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    if (userInfo.name === "" || userInfo.phone === "") {
      alert("이름과 휴대폰 뒷자리 4자리를 모두 입력해주세요.");
      return false;
    }

    if (!/^\d{4}$/.test(userInfo.phone)) {
      alert("휴대폰 뒷자리 4자리를 정확히 입력해주세요.");
      return false;
    }

    return true;
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;
    const API_BASE =
      "https://script.google.com/macros/s/AKfycbw0EmgiHEGglmTZbilB9-ZnydVHxOIkB9-xYcFiw8f1Qd56Xi3T7D17td08Ll9tbNY/exec";

    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE}?action=getstudentinfo&name=${encodeURIComponent(
          userInfo.name
        )}&phone=${encodeURIComponent(userInfo.phone)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setResult(data);
    } catch (error: unknown) {
      // alert("정보를 불러오는 데 실패했습니다. 다시 시도해주세요.");
      if (error instanceof Error) {
        setError(error.message);
      }
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="This is the status page." />
        <title>파밍 대시보드</title>
      </Helmet>
      <h2>⛏️ 파밍을 얼마나 열심히 했는지 볼 수 있는 곳 👩🏻‍🌾</h2>
      <form id="form" onSubmit={onSubmit}>
        <div className="input-container">
          <input
            type="text"
            id="name"
            value={userInfo.name}
            onChange={handleUserInfo}
            placeholder="이름 입력"
          />
          <input
            type="text"
            id="phone"
            value={userInfo.phone}
            placeholder="휴대폰 뒷자리 4자리"
            onChange={handleUserInfo}
            maxLength={4}
          />
        </div>
        <CButton mode="default" id="searchBtn" type="submit">
          얼마나 열심히 했는지 보자!
        </CButton>
      </form>

      <div className="result-container">
        <div id="result" className="result">
          노가다의 흔적...
          <RenderResultController
            isLoading={isLoading}
            error={error}
            result={result}
          />
        </div>
        <div id="inventory" className="inventory">
          인벤토리
          <RenderInventoryController
            isLoading={isLoading}
            error={error}
            result={result}
          />
        </div>
      </div>
      <CButton mode="link" to={ROUTE_PATH.ROOT} className="back-home">
        🏠 메인으로 돌아가기
      </CButton>
    </>
  );
};

export default Status;

function RenderResultController({
  isLoading,
  error,
  result,
}: {
  isLoading: boolean;
  error: string;
  result: any;
}) {
  if (isLoading) {
    return <p className="loading">⏳ 데이터를 불러오는 중...</p>;
  } else if (error) {
    return <NoStudent />;
  } else if (result) {
    return <Result {...result} />;
  } else {
    return <></>;
  }
}

function NoStudent() {
  return <p>❌ 일치하는 수강생을 찾을 수 없습니다.</p>;
}

function Result({
  name,
  goldGet,
  goldUse,
  goldLeft,
  exp,
  lv,
  remainExp,
}: {
  name: string;
  goldGet: number;
  goldUse: number;
  goldLeft: number;
  exp: number;
  lv: number;
  remainExp: number;
}) {
  const levelTable = [
    0, 675, 1600, 2775, 4200, 5875, 7800, 9975, 12400, 15075, 18000,
  ];
  const prevExp = levelTable[lv - 1] || 0;
  const nextExp = levelTable[lv] || exp + 1;
  const progress = Math.min(
    100,
    Math.round(((exp - prevExp) / (nextExp - prevExp)) * 100)
  );
  return (
    <div className="player-card">
      <h2 className="player-title">🎮 플레이어 ${name}의 파밍 현황</h2>

      <div className="gold-section">
        <p>
          💰 남은 GOLD: <span className="highlight">${goldLeft}</span>
        </p>
        <p className="sub">
          (획득 ${goldGet} - 사용 ${goldUse})
        </p>
      </div>

      <div className="exp-section">
        <p>
          ⭐ 경험치: <span className="highlight">${exp}</span>
        </p>
        <p>
          현재 레벨: <span className="highlight">Lv ${lv}</span>
        </p>
        <p>
          다음 레벨까지 필요: <span className="highlight">${remainExp}</span>
        </p>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>

      <table className="status-table">
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
            <td>${goldGet}</td>
            <td>${goldUse}</td>
            <td>${goldLeft}</td>
            <td>${exp}</td>
            <td>Lv ${lv}</td>
            <td>${remainExp}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function RenderInventoryController({
  result,
  isLoading,
  error,
}: {
  isLoading: boolean;
  error: string;
  result: { itemMeal: number; itemMentor: number; itemBook: number } | null;
}) {
  if (isLoading) {
    return <p className="loading">⏳ 데이터를 불러오는 중...</p>;
  }

  if (error) {
    return <NoStudent />;
  }

  if (!result) return "";

  const items = [
    { name: "GM 식사권", icon: "🎫", count: result.itemMeal },
    { name: "멘토링 추가권", icon: "🎟️", count: result.itemMentor },
    { name: "도서 구매권", icon: "📚", count: result.itemBook },
  ];
  return (
    <>
      <h2>🎒 인벤토리</h2>
      <div className="inv-grid">
        {items.map((item, index) => (
          <div className={`inv-slot ${item.count && "inv-empty"}`} key={index}>
            <span className="inv-icon">{item.icon}</span>
            <span className="inv-count">
              {item.count ? item.count : "빈 슬롯"}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
