import "./styles/Store.style.scss";
import type { MouseEvent } from "react";
import { Helmet } from "react-helmet";
import { SALES } from "@/assets/configs";
import { CButton, CustomForm, type InputValueType } from "@/components/_common";
import { ROUTE_PATH } from "@/routes";
import { useUserInfo } from "@/contexts/UserInfoContext";
import { useFetch } from "@/hooks/useFetch";
import { useModal } from "@/contexts/ModalContext";
import { LoadingIndicator } from "@/components/Status/LoadingIndicator";
import { useCookieHandler } from "@/hooks/useCookieHandler";
import type { StudentInfo } from "@/apis/types";

type Cart = { date: number; mentor: number; book: number };

const Store = () => {
  const { cookies } = useCookieHandler("uu");
  const {
    userInfo: { name, phone, goldLeft: gold },
    handleUserInfo,
  } = useUserInfo();
  const [totalG, setTotalG] = useState<number>(0);
  const [cart, setCart] = useState<Cart>({ date: 0, mentor: 0, book: 0 });
  const navigate = useNavigate();
  const modal = useModal();

  useEffect(() => {
    if (cookies.uu.name && cookies.uu.phone) {
      handleUserInfo({
        name: cookies.uu.name,
        phone: cookies.uu.phone,
        goldLeft: cookies.uu.goldLeft,
      });
    } else if (!name || !phone) {
      alert("잘못된 접근입니다.");
      navigate(ROUTE_PATH.ROOT);
    }
  }, [navigate]);

  const handleCartSelect = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const id = target.id as keyof Cart;
    const name = target.dataset;
    if (name.minus) {
      if (cart[id] === 0) return;
      const item = SALES.find((item) => item.id === id);
      if (item) {
        setTotalG((prev) => prev - item.price);
      }
      setCart((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    } else {
      const item = SALES.find((item) => item.id === id);
      if (totalG + (item?.price || 0) > (gold || 0)) {
        alert("현재 골드 이상 담을 수 없습니다.");
        return;
      }
      if (item) {
        setTotalG((prev) => prev + item.price);
      }
      setCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
  };

  const onSubmit = async () => {
    if (totalG === 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }

    modal.open({
      id: "purchase",
      title: "✅ 구매 확인",
      mode: "no-btn",
      content: <PurchaseModal cart={cart} />,
    });
  };

  const updateUser = () => {
    modal.open({
      id: "store-entrance",
      title: "다른 플레이어 검색하기",
      content: <StoreEntrance />,
      mode: "no-btn",
    });
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="This is the status page." />
        <title>파밍 상점</title>
      </Helmet>
      <div className="store">
        <div className="store-header">
          <h2>🏪 파밍 상점</h2>

          <div className="wallet">
            <span className="gold">{name}</span>
            <span className="label">님의 보유 골드</span>
            <span className="gold">{gold?.toLocaleString()} G</span>
          </div>
          <CButton className="back-home" mode="default" onClick={updateUser}>
            🔍 다른 플레이어 검색하기
          </CButton>
          <CButton mode="link" to={ROUTE_PATH.ROOT} className="back-home">
            🏠 메인으로 돌아가기
          </CButton>
        </div>

        <div className="store-grid" onClick={handleCartSelect}>
          {SALES.map((item, index) => (
            <div className="slot" key={index} id={item.id}>
              <div className="title" id={item.id}>
                <span className="icon" id={item.id}>
                  {item.icon}
                </span>
                <span className="name" id={item.id}>
                  {item.name}
                </span>
              </div>
              <span className="desc" id={item.id}>
                {item.desc}
              </span>
              <span className="count" id={item.id}>
                {item.price.toLocaleString()} G
              </span>
            </div>
          ))}
        </div>

        <div className="checkout card">
          <h2>🛒 장바구니</h2>
          <div className="cart">
            {SALES.map((item) => {
              const ea = cart[item.id as keyof Cart];
              return (
                <div className="wrapper" key={item.id}>
                  <div className="title">
                    <span className="icon">{item.icon}</span>
                    <span className="name">{item.name}</span>
                  </div>
                  <div className="info">
                    <div className="controller" onClick={handleCartSelect}>
                      <CButton mode="default" id={item.id} data-minus>
                        -
                      </CButton>
                      <span className="ea">{ea}</span>
                      <CButton mode="default" id={item.id} data-plus>
                        +
                      </CButton>
                    </div>
                    <span className="price">
                      {(item.price * ea).toLocaleString()} G
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="summary">
            <span>총 금액</span>
            <strong className="price">{totalG.toLocaleString()} G</strong>
          </div>

          <CButton mode="primary" disabled={totalG === 0} onClick={onSubmit}>
            구매하기
          </CButton>
        </div>
      </div>
    </>
  );
};

export default Store;

interface PurchaseModalProps {
  cart: Cart;
}

const PurchaseModal = ({ cart }: PurchaseModalProps) => {
  const { userInfo } = useUserInfo();
  const modal = useModal();
  const navigate = useNavigate();
  const { fetchData, isLoading } = useFetch({
    action: "purchase",
  });
  const onSubmit = async () => {
    const result = await fetchData("", {
      method: "POST",
      body: JSON.stringify({
        name: userInfo.name,
        phone: userInfo.phone,
        sales: cart,
      }),
    });
    if (result) {
      alert("구매가 완료되었습니다.");
      navigate(ROUTE_PATH.STATUS);
    } else {
      alert("구매에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
    modal.close("purchase");
  };
  return (
    <div>
      <p>구매하시겠습니까?</p>

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="btn-container">
          <CButton
            className="menuBtn close-btn"
            mode="primary"
            disabled={isLoading}
            onClick={onSubmit}
          >
            구매
          </CButton>
          <CButton
            className="menuBtn close-btn"
            mode="outline"
            disabled={isLoading}
            onClick={() => modal.close("purchase")}
          >
            취소
          </CButton>
        </div>
      )}
    </div>
  );
  if (isLoading) {
    return <LoadingIndicator />;
  }

  return <div>구매하시겠습니까?</div>;
};

const StoreEntrance = () => {
  const modal = useModal();
  const { handleUserInfo } = useUserInfo();
  const { isLoading, error, fetchData } = useFetch<StudentInfo>({
    action: "getstudentinfo",
  });
  const navigate = useNavigate();
  const submitCallback = async (value?: InputValueType) => {
    if (!value) return;
    if (value?.name === "" && value?.phone === "") return;
    const data = await fetchData(`name=${value?.name}&phone=${value?.phone}`);
    if (!data) return;

    handleUserInfo({
      name: value?.name,
      phone: value?.phone,
      goldLeft: data?.goldLeft,
    });

    modal.close("store-entrance");
    navigate(ROUTE_PATH.STORE);
  };
  return (
    <div className="store-entrance">
      {isLoading || (error && <p>{error}</p>)}

      <CButton
        className="menuBtn close-btn"
        mode="outline"
        disabled={isLoading}
        onClick={() => modal.close("store-entrance")}
      >
        X
      </CButton>

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <CustomForm submitCallback={submitCallback} />
      )}
    </div>
  );
};
