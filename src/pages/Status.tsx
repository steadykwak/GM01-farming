import { Helmet } from "react-helmet";
import { CButton } from "@/components/_common";
import { ROUTE_PATH } from "@/routes";
import "./styles/Status.style.scss";

const Status = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="This is the status page." />
        <title>파밍 대시보드</title>
      </Helmet>
      <h2>⛏️ 파밍을 얼마나 열심히 했는지 볼 수 있는 곳 👩🏻‍🌾</h2>
      <form id="form">
        <div className="input-container">
          <input type="text" id="name" placeholder="이름 입력" />
          <input
            type="text"
            id="phone"
            placeholder="휴대폰 뒷자리 4자리"
            // maxlength="4"
          />
        </div>
        <CButton mode="default" id="searchBtn" type="submit">
          얼마나 열심히 했는지 보자!
        </CButton>
      </form>

      <div className="result-container">
        <div id="result" className="result">
          노가다의 흔적...
        </div>
        <div id="inventory" className="inventory">
          인벤토리
        </div>
      </div>
      <CButton mode="link" to={ROUTE_PATH.ROOT} className="back-home">
        🏠 메인으로 돌아가기
      </CButton>
    </>
  );
};

export default Status;
