import "./styles/Status.style.scss";
import { Helmet } from "react-helmet";
import type { StudentInfo } from "@/apis/types";
import { CButton, CustomForm, type InputValueType } from "@/components/_common";
import { ROUTE_PATH } from "@/routes";
import { RenderResultController } from "@/components/Status/result";
import { RenderInventoryController } from "@/components/Status/inventory";
import { useUserInfo } from "@/contexts/UserInfoContext";
import { useFetch } from "@/hooks/useFetch";
import { LoadingIndicator } from "@/components/Status/LoadingIndicator";

const Status = () => {
  const { userInfo, handleUserInfo, removeUserInfo } = useUserInfo();
  const [result, setResult] = useState<StudentInfo | null>(null);
  const { error, isLoading, fetchData } = useFetch<StudentInfo>({
    action: "getstudentinfo",
  });

  const getUserStatus = useCallback(
    async (value?: InputValueType) => {
      try {
        if (value?.name && value?.phone) {
          const data = await fetchData(
            `name=${value?.name}&phone=${value?.phone}`
          );
          if (!data) throw new Error("잘못된 정보입니다. 다시 입력하세요.");

          setResult(data);
          handleUserInfo({
            name: value?.name,
            phone: value?.phone,
            goldLeft: data?.goldLeft || 0,
          });
        } else if (userInfo.name && userInfo.phone) {
          const data = await fetchData(
            `name=${userInfo.name}&phone=${userInfo.phone}`
          );
          if (!data) throw new Error("잘못된 정보입니다. 다시 입력하세요.");

          setResult(data);
          handleUserInfo({
            name: userInfo.name,
            phone: userInfo.phone,
            goldLeft: data?.goldLeft || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    },
    [userInfo.name, userInfo.phone]
  );

  const submitCallback = async (value?: InputValueType) => {
    if (!value) return;
    await getUserStatus(value);
  };

  useEffect(() => {
    if (userInfo.name && userInfo.phone) {
      getUserStatus();
    }
  }, [getUserStatus]);

  return (
    <>
      <Helmet>
        <meta name="description" content="This is the status page." />
        <title>파밍 대시보드</title>
      </Helmet>
      <div className="form-container">
        <h2>⛏️ 파밍을 얼마나 열심히 했는지 볼 수 있는 곳 👩🏻‍🌾</h2>
        {error && <p>{error}</p>}
        {userInfo.name
          ? isLoading || (
              <CButton mode="primary" onClick={removeUserInfo}>
                정보 재입력
              </CButton>
            )
          : isLoading || <CustomForm submitCallback={submitCallback} />}
      </div>

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
