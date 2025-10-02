import { Helmet } from "react-helmet";
import "./styles/Ranking.style.scss";
import { CButton } from "@/components/_common";
import { ROUTE_PATH } from "@/routes";

const Ranking = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="This is the ranking page of My App."
        />
        <title>파밍 랭킹</title>
      </Helmet>
      <h2>🏆 파밍 랭킹</h2>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>플레이어</th>
            <th>레벨</th>
            <th>경험치</th>
            <th>다음 레벨까지</th>
          </tr>
        </thead>
        <tbody id="ranking-body">
          <tr></tr>
        </tbody>
      </table>
      <CButton mode="link" to={ROUTE_PATH.ROOT} className="back-home">
        🏠 메인으로 돌아가기
      </CButton>
    </>
  );
};

export default Ranking;
