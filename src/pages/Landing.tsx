import { CButton } from "@/components/_common";
import { ROUTE_PATH } from "@/routes";
import "./styles/Landing.style.scss";

const Landing = () => {
  return (
    <main className="container">
      <CButton className="menuBtn" mode="link" to={ROUTE_PATH.STATUS}>
        🔍 플레이어 상태 확인하기
      </CButton>
      <CButton className="menuBtn" mode="link" to={ROUTE_PATH.RANKING}>
        🏆 랭킹보기
      </CButton>
    </main>
  );
};

export default Landing;
