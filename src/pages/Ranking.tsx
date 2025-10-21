import { Helmet } from "react-helmet";
import "./styles/Ranking.style.scss";
import { CButton } from "@/components/_common";
import { ROUTE_PATH } from "@/routes";
import { useFetch } from "@/hooks/useFetch";

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
    let lastExp = 0,
        lastLv = 0,
        lastRank = 0,
        shownCount = 0;

    useEffect(() => {
        const fetchRankingData = async () => {
            try {
                const data = await fetchData();
                setRank(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRankingData();
    }, []);

    return (
        <>
            <Helmet>
                <meta name="description" content="This is the ranking page of My App." />
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
                    {isLoading ? (
                        <tr>
                            <td colSpan={4}>⏳ 랭킹 데이터를 불러오는 중...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={4}>❗ 오류가 발생했습니다: {error}</td>
                        </tr>
                    ) : rank && rank.length > 0 ? (
                        rank.map((entry, index) => {
                            shownCount++;
                            if (entry.lv === lastLv && entry.exp === lastExp) {
                                // 동점자 순위 유지
                            } else {
                                lastRank = shownCount;
                            }
                            lastLv = entry.lv;
                            lastExp = entry.exp;

                            let medal = "";
                            if (lastRank === 1) medal = "🥇";
                            else if (lastRank === 2) medal = "🥈";
                            else if (lastRank === 3) medal = "🥉";
                            return (
                                <tr key={index}>
                                    <td>
                                        {medal} {entry.name}
                                    </td>
                                    <td>Lv {entry.lv}</td>
                                    <td>⭐ {entry.exp.toLocaleString()}</td>
                                    <td>{entry.remainExp.toLocaleString()}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={4}>랭킹 데이터가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <CButton mode="link" to={ROUTE_PATH.ROOT} className="back-home">
                🏠 메인으로 돌아가기
            </CButton>
        </>
    );
};

export default Ranking;
