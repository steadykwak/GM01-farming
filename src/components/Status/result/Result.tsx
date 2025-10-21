import type { ResultProps } from "./RenderResultController";

const makeProgress = (lv: number, exp: number) => {
    const levelTable = [0, 675, 1600, 2775, 4200, 5875, 7800, 9975, 12400, 15075, 18000];

    const prevExp = levelTable[lv - 1] || 0;
    const nextExp = levelTable[lv] || exp + 1;
    const progress = Math.min(100, Math.round(((exp - prevExp) / (nextExp - prevExp)) * 100));
    return { progress };
};
export const Result = ({ name, goldGet, goldUse, goldLeft, exp, lv, remainExp }: ResultProps) => {
    const { progress } = makeProgress(lv, exp);
    return (
        <div className="player-card">
            <h2 className="player-title">🎮 플레이어 {name}의 노가다의 흔적...</h2>

            <div className="gold-section">
                <p>
                    💰 남은 GOLD: <span className="highlight">{goldLeft}</span>
                </p>
                <p className="sub">
                    (획득 {goldGet} - 사용 {goldUse})
                </p>
            </div>

            <div className="exp-section">
                <p>
                    ⭐ 경험치: <span className="highlight">{exp}</span>
                </p>
                <p>
                    현재 레벨: <span className="highlight">Lv {lv}</span>
                </p>
                <p>
                    다음 레벨까지 필요: <span className="highlight">{remainExp}</span>
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
                        <td>{goldGet}</td>
                        <td>{goldUse}</td>
                        <td>{goldLeft}</td>
                        <td>{exp}</td>
                        <td>Lv {lv}</td>
                        <td>{remainExp}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
