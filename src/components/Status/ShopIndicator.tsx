import { useState, useEffect } from "react";

export const ShopIndicator = () => {
    const [dots, setDots] = useState(".");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length === 3 ? "." : prev + "."));
        }, 500); // 0.5초마다 점 추가
        return () => clearInterval(interval);
    }, []);

    return <p className="loading">🛍️ 아이템을 배송중입니다{dots}</p>;
};
