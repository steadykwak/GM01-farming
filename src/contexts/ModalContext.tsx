import ModalContents from "@/components/_common/ModalContent";
import type { PropsWithChildren } from "react";

export type ModalState = {
    id: string;
    title?: string;
    content: React.ReactNode;
    mode: "alert" | "confirm" | "no-btn";
    onConfirm?: () => void;
    onCancel?: () => void;
};

export interface ModalContextType {
    modalState: ModalState[];
    open: (modal: ModalState) => void;
    close: (id: string) => void;
}

const ModalContext = createContext<ModalContextType>({
    modalState: [],
    open: () => {},
    close: () => {},
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
    const [modalState, setModalState] = useState<ModalState[]>([]);
    const open = (modal: ModalState) => {
        if (modal.id in modalState) {
            return;
        }
        setModalState((prev) => [...prev, modal]);
    };
    const close = (id: string) => {
        setModalState((prev) => prev.filter((m) => m.id !== id));
    };
    return (
        <ModalContext.Provider value={{ modalState, open, close }}>
            {children}
            {modalState.map((modal) => (
                <ModalContents key={modal.id} {...modal} />
            ))}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error("ContextError: Modal context is not defined");

    return ctx;
};
