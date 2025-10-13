import type { ChangeEvent } from "react";
import { Helmet } from "react-helmet";
import { CButton } from "@/components/_common";
import { ROUTE_PATH } from "@/routes";
import { RenderResultController } from "@/components/Status/result";
import { RenderInventoryController } from "@/components/Status/inventory";
import "./styles/Status.style.scss";

const Status = () => {
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
