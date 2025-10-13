import { LoadingIndicator } from "../LoadingIndicator";
import { NoStudent } from "../NoStudent";

interface RendorInventoryControllerProps {
  isLoading: boolean;
  error: string;
  result: { itemMeal: number; itemMentor: number; itemBook: number } | null;
}

export const RenderInventoryController = ({
  result,
  isLoading,
  error,
}: RendorInventoryControllerProps) => {
  if (isLoading) {
    return <LoadingIndicator />;
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
};
