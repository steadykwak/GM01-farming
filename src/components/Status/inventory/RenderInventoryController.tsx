import { CButton } from "@/components/_common";
import { InvenIndicator } from "../InvenIndicator";
import { NoStudent } from "../NoStudent";
import { ROUTE_PATH } from "@/routes";
import type { StudentInfo } from "@/apis/types";

type InventoryProps = Pick<StudentInfo, "itemMeal" | "itemMentor" | "itemBook" | "itemZepPoint">;
interface RendorInventoryControllerProps {
    isLoading: boolean;
    error: string;
    result: InventoryProps | null;
}

export const RenderInventoryController = ({ result, isLoading, error }: RendorInventoryControllerProps) => {
    if (isLoading) {
        return <InvenIndicator />;
    }

    if (error) {
        return <NoStudent />;
    }
    if (!result) return "";

    const items = [
        { name: "GM 식사권", icon: "🎫", count: result.itemMeal },
        { name: "멘토링 신청권", icon: "🎟️", count: result.itemMentor },
        { name: "도서 구매권", icon: "📚", count: result.itemBook },
        { name: "ZEP 포인트 구매권", icon: "🪙", count: result.itemZepPoint },
    ];

    return (
        <>
            <h2>🎒 인벤토리</h2>
            <div className="inv-grid">
                {items.map((item, index) => (
                    <div className={`inv-slot ${!item.count && "inv-empty"}`} key={index}>
                        <span className="inv-icon">{item.icon}</span>
                        <p className="inv-name">{item.name}</p>
                        <span className="inv-count">x{item.count ? item.count : "0"}</span>
                    </div>
                ))}
            </div>
            <CButton mode="link" to={ROUTE_PATH.STORE} className="go-inventory">
                상점 가기
            </CButton>
        </>
    );
};
