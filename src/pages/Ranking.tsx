import { Helmet } from "react-helmet";
import "./styles/Ranking.style.scss";
import { CButton } from "@/components/_common";
import { ROUTE_PATH } from "@/routes";
import { useFetch } from "@/hooks/useFetch";
import { useUserInfo } from "@/contexts/UserInfoContext";

interface RankEntry {
  name: string;
  lv: number;
  exp: number;
  goldLeft: number;
  remainExp: number;
}

const Ranking = () => {
  const [rank, setRank] = useState<RankEntry[]>([]);
  const { isLoading, error, fetchData } = useFetch({ action: "getranking" });

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const data = await fetchData();
        setRank(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRankingData();
  }, []);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="This is the ranking page of My App."
        />
        <title>Farming Rank</title>
      </Helmet>
      <h1>🏆 랭킹</h1>
      <CButton mode="link" to={ROUTE_PATH.ROOT} className="back-home">
        🏠 메인으로 돌아가기
      </CButton>
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
          {isLoading ? (
            <tr>
              <td colSpan={4}>⏳ 랭킹 데이터를 불러오는 중...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={4}>❗ 오류가 발생했습니다: {error}</td>
            </tr>
          ) : rank && rank.length > 0 ? (
            <RankList rank={rank} />
          ) : (
            <tr>
              <td colSpan={4}>랭킹 데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

interface RankListProps {
  rank: RankEntry[];
}

type RankRefType = { lastRank: number; shownCount: number };

function RankList({ rank }: RankListProps) {
  const { userInfo } = useUserInfo();
  const myRank = useRef<HTMLTableRowElement>(null);
  const rankRef = useRef<RankRefType>({ lastRank: 0, shownCount: 0 });

  useEffect(() => {
    if (!myRank.current || !userInfo.name) {
      return;
    }
    myRank.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    myRank.current.focus();
  }, []);

  return rank.map((entry, index, rawRank) => {
    rankRef.current.shownCount++;
    // 동점자 순위 유지
    if (
      entry.lv !== rawRank[index - 1]?.lv ||
      entry.exp !== rawRank[index - 1]?.exp
    ) {
      rankRef.current.lastRank = rankRef.current?.shownCount;
    }

    let medal = "";

    const isMe = entry.name === userInfo.name;
    console.log(isMe);
    let className = "";
    switch (rankRef.current?.lastRank) {
      case 1:
        className = isMe ? "my-rank first" : "first";
        medal = "🥇";
        break;
      case 2:
        className = isMe ? "my-rank second" : "second";
        medal = "🥈";
        break;
      case 3:
        className = isMe ? "my-rank third" : "third";
        medal = "🥉";
        break;
      default:
        className = isMe ? "my-rank" : "";
    }
    return (
      <tr key={index} ref={isMe ? myRank : null} className={className}>
        <td>
          {medal} {entry.name}
        </td>
        <td>Lv {entry.lv}</td>
        <td>⭐ {entry.exp.toLocaleString()}</td>
        <td>{entry.remainExp.toLocaleString()}</td>
      </tr>
    );
  });
}

export default Ranking;
